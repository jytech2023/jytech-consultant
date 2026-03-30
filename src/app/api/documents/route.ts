import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users, documents } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import {
  getLlamaKey,
  parseDocument,
  getParseStatus,
  getParseResult,
} from "@/lib/llamacloud";

// GET /api/documents — list user's documents
export async function GET() {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await getUser(session.user.sub!);
  if (!dbUser) {
    return NextResponse.json({ documents: [] });
  }

  const docs = await db
    .select({
      id: documents.id,
      fileName: documents.fileName,
      fileSize: documents.fileSize,
      fileType: documents.fileType,
      parseStatus: documents.parseStatus,
      keySource: documents.keySource,
      createdAt: documents.createdAt,
    })
    .from(documents)
    .where(eq(documents.userId, dbUser.id))
    .orderBy(desc(documents.createdAt))
    .limit(50);

  return NextResponse.json({ documents: docs });
}

// POST /api/documents — upload & parse a document
export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const dbUser = await getOrCreateUser(session.user);
  const apiKey = getLlamaKey(dbUser.llamaindexApiKey);
  const keySource = dbUser.llamaindexApiKey ? "byok" : "system";

  // Upload to LlamaParse
  const { jobId } = await parseDocument(file, file.name, apiKey);

  // Save to DB
  const [doc] = await db
    .insert(documents)
    .values({
      userId: dbUser.id,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type || file.name.split(".").pop() || "unknown",
      parseJobId: jobId,
      parseStatus: "processing",
      keySource,
    })
    .returning();

  // Poll for result in background (non-blocking)
  pollParseResult(doc.id, jobId, apiKey).catch(() => {});

  return NextResponse.json({
    document: {
      id: doc.id,
      fileName: doc.fileName,
      parseStatus: doc.parseStatus,
    },
  });
}

// Background poll for parse result
async function pollParseResult(docId: string, jobId: string, apiKey: string) {
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 2000));

    const { status, errorMessage } = await getParseStatus(jobId, apiKey);

    if (status === "SUCCESS") {
      const content = await getParseResult(jobId, apiKey);
      await db
        .update(documents)
        .set({ parseStatus: "success", content, updatedAt: new Date() })
        .where(eq(documents.id, docId));
      return;
    }

    if (status === "ERROR") {
      await db
        .update(documents)
        .set({
          parseStatus: "error",
          content: errorMessage || "Parse failed",
          updatedAt: new Date(),
        })
        .where(eq(documents.id, docId));
      return;
    }
  }

  // Timeout
  await db
    .update(documents)
    .set({ parseStatus: "error", content: "Parse timeout", updatedAt: new Date() })
    .where(eq(documents.id, docId));
}

// DELETE /api/documents?id=xxx — delete a document
export async function DELETE(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const docId = searchParams.get("id");
  if (!docId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const dbUser = await getUser(session.user.sub!);
  if (!dbUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await db
    .delete(documents)
    .where(eq(documents.id, docId));

  return NextResponse.json({ success: true });
}

// ── Helpers ────────────────────────────────────────────────────────

async function getUser(auth0Id: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.auth0Id, auth0Id))
    .limit(1);
  return result[0] ?? null;
}

async function getOrCreateUser(auth0User: {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const existing = await getUser(auth0User.sub!);
  if (existing) return existing;

  const [newUser] = await db
    .insert(users)
    .values({
      auth0Id: auth0User.sub!,
      email: auth0User.email,
      name: auth0User.name,
      picture: auth0User.picture,
    })
    .returning();
  return newUser;
}
