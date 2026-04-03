import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, asc } from "drizzle-orm";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

export async function getExpertsFromDB(industrySlug?: string) {
  const rows = await db
    .select()
    .from(schema.expertsTable)
    .where(eq(schema.expertsTable.active, 1))
    .orderBy(asc(schema.expertsTable.sortOrder));

  const filtered = industrySlug
    ? rows.filter((r) => r.industries.split(",").includes(industrySlug))
    : rows;

  return filtered;
}

export async function getExpertBySlug(slug: string) {
  const [expert] = await db
    .select()
    .from(schema.expertsTable)
    .where(eq(schema.expertsTable.slug, slug))
    .limit(1);
  return expert ?? null;
}
