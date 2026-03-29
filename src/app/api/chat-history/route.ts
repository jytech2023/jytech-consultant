import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { db } from "@/lib/db";
import { users, chatSessions, chatMessages } from "@/lib/schema";
import { eq, and, desc } from "drizzle-orm";

// GET /api/chat-history?industrySlug=...&moduleSlug=...
// Returns chat sessions for the current user (optionally filtered by industry/module)
export async function GET(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const industrySlug = searchParams.get("industrySlug");
  const moduleSlug = searchParams.get("moduleSlug");
  const sessionId = searchParams.get("sessionId");

  // Get or create user
  const dbUser = await getOrCreateUser(session.user);

  // If sessionId is provided, return messages for that session
  if (sessionId) {
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);

    return NextResponse.json({ messages });
  }

  // Otherwise return session list
  const conditions = [eq(chatSessions.userId, dbUser.id)];
  if (industrySlug) conditions.push(eq(chatSessions.industrySlug, industrySlug));
  if (moduleSlug) conditions.push(eq(chatSessions.moduleSlug, moduleSlug));

  const sessions = await db
    .select({
      id: chatSessions.id,
      industrySlug: chatSessions.industrySlug,
      moduleSlug: chatSessions.moduleSlug,
      title: chatSessions.title,
      messageCount: chatSessions.messageCount,
      updatedAt: chatSessions.updatedAt,
    })
    .from(chatSessions)
    .where(and(...conditions))
    .orderBy(desc(chatSessions.updatedAt))
    .limit(20);

  return NextResponse.json({ sessions });
}

// POST /api/chat-history
// Save messages to a chat session
export async function POST(request: NextRequest) {
  const session = await auth0.getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { sessionId, industrySlug, moduleSlug, messages } = body as {
    sessionId?: string;
    industrySlug: string;
    moduleSlug: string;
    messages: { role: string; content: string }[];
  };

  if (!industrySlug || !moduleSlug || !messages?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const dbUser = await getOrCreateUser(session.user);

  let chatSessionId = sessionId;

  if (!chatSessionId) {
    // Create new session — use first user message as title
    const firstUserMsg = messages.find((m) => m.role === "user");
    const title = firstUserMsg
      ? firstUserMsg.content.slice(0, 100)
      : "New conversation";

    const [newSession] = await db
      .insert(chatSessions)
      .values({
        userId: dbUser.id,
        industrySlug,
        moduleSlug,
        title,
        messageCount: messages.length,
      })
      .returning({ id: chatSessions.id });

    chatSessionId = newSession.id;
  } else {
    // Update existing session message count
    const existing = await db
      .select({ messageCount: chatSessions.messageCount })
      .from(chatSessions)
      .where(
        and(eq(chatSessions.id, chatSessionId), eq(chatSessions.userId, dbUser.id))
      );

    if (!existing.length) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    await db
      .update(chatSessions)
      .set({
        messageCount: existing[0].messageCount + messages.length,
        updatedAt: new Date(),
      })
      .where(eq(chatSessions.id, chatSessionId));
  }

  // Insert messages
  await db.insert(chatMessages).values(
    messages.map((m) => ({
      sessionId: chatSessionId!,
      role: m.role,
      content: m.content,
    }))
  );

  return NextResponse.json({ sessionId: chatSessionId });
}

// ── Helper ─────────────────────────────────────────────────────────

async function getOrCreateUser(auth0User: {
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}) {
  const auth0Id = auth0User.sub!;

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.auth0Id, auth0Id))
    .limit(1);

  if (existing.length) {
    // Update profile if changed
    const u = existing[0];
    if (u.email !== auth0User.email || u.name !== auth0User.name) {
      await db
        .update(users)
        .set({
          email: auth0User.email ?? u.email,
          name: auth0User.name ?? u.name,
          picture: auth0User.picture ?? u.picture,
          updatedAt: new Date(),
        })
        .where(eq(users.id, u.id));
    }
    return u;
  }

  const [newUser] = await db
    .insert(users)
    .values({
      auth0Id,
      email: auth0User.email,
      name: auth0User.name,
      picture: auth0User.picture,
    })
    .returning();

  return newUser;
}
