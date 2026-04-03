import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { expertsTable } from "../src/lib/schema";
import { experts } from "../src/lib/data";

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const sql = neon(url);
  const db = drizzle(sql);

  console.log("Seeding experts table...");

  for (const expert of experts) {
    const values = {
      slug: expert.slug,
      name: expert.name,
      nameZh: expert.nameZh,
      industries: expert.industries.join(","),
      title: expert.title,
      titleZh: expert.titleZh,
      bio: expert.bio,
      bioZh: expert.bioZh,
      hourlyRate: expert.hourlyRate,
      city: expert.city,
      profileUrl: expert.profileUrl,
      avatarUrl: expert.avatarUrl ?? null,
      externalAvatarUrl: expert.externalAvatarUrl ?? null,
    };

    await db
      .insert(expertsTable)
      .values(values)
      .onConflictDoUpdate({
        target: expertsTable.slug,
        set: {
          name: values.name,
          nameZh: values.nameZh,
          industries: values.industries,
          title: values.title,
          titleZh: values.titleZh,
          bio: values.bio,
          bioZh: values.bioZh,
          hourlyRate: values.hourlyRate,
          city: values.city,
          profileUrl: values.profileUrl,
          avatarUrl: values.avatarUrl,
          externalAvatarUrl: values.externalAvatarUrl,
          updatedAt: new Date(),
        },
      });

    console.log(`  ✓ ${expert.name} (${expert.slug})`);
  }

  console.log(`\nDone! Seeded ${experts.length} experts.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
