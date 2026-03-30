import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

interface LinkedInConnection {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  position: string;
  connectedOn: string;
}

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  // LinkedIn CSVs may have BOM and extra spaces in headers
  const headers = lines[0]
    .replace(/^\uFEFF/, "")
    .split(",")
    .map((h) => h.trim().replace(/^"|"$/g, ""));

  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? "";
    });
    return row;
  });
}

// POST /api/linkedin-import — parse uploaded LinkedIn CSV files
export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const fileType = formData.get("type") as string; // "connections" | "profile"

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const text = await file.text();
  const rows = parseCSV(text);

  if (fileType === "connections") {
    // LinkedIn Connections.csv headers:
    // "First Name","Last Name","Email Address","Company","Position","Connected On"
    const connections: LinkedInConnection[] = rows
      .map((r) => ({
        firstName: r["First Name"] ?? "",
        lastName: r["Last Name"] ?? "",
        email: r["Email Address"] ?? "",
        company: r["Company"] ?? "",
        position: r["Position"] ?? "",
        connectedOn: r["Connected On"] ?? "",
      }))
      .filter((c) => c.firstName || c.lastName);

    // Grant 5% referral discount for importing connections
    if (connections.length > 0) {
      const auth0Id = session.user.sub!;
      await db
        .update(users)
        .set({
          referralCommission: 5,
          linkedinImported: connections.length,
          updatedAt: new Date(),
        })
        .where(eq(users.auth0Id, auth0Id));
    }

    return NextResponse.json({
      type: "connections",
      total: connections.length,
      connections,
      referralCommission: connections.length > 0 ? 5 : 0,
    });
  }

  if (fileType === "profile") {
    // LinkedIn Profile.csv — single row with user's own data
    const profile = rows[0] ?? {};
    return NextResponse.json({
      type: "profile",
      profile: {
        firstName: profile["First Name"] ?? "",
        lastName: profile["Last Name"] ?? "",
        headline: profile["Headline"] ?? "",
        summary: profile["Summary"] ?? "",
        industry: profile["Industry"] ?? "",
        location: profile["Geo Location"] ?? profile["Location"] ?? "",
      },
    });
  }

  // Generic CSV — return parsed rows
  return NextResponse.json({
    type: "generic",
    headers: rows.length > 0 ? Object.keys(rows[0]) : [],
    total: rows.length,
    rows: rows.slice(0, 100), // limit preview
  });
}
