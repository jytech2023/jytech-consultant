import type { MetadataRoute } from "next";
import { industries, consultingModules, caseStudies } from "@/lib/data";
import { locales } from "@/lib/i18n";

const BASE_URL = "https://jytech-consultant.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    // Home
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    // Studies index
    entries.push({
      url: `${BASE_URL}/${locale}/studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Industry pages
    for (const industry of industries) {
      entries.push({
        url: `${BASE_URL}/${locale}/industry/${industry.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      });

      // Module pages
      for (const mod of consultingModules) {
        entries.push({
          url: `${BASE_URL}/${locale}/industry/${industry.slug}/${mod.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }

    // Case study pages
    for (const study of caseStudies) {
      entries.push({
        url: `${BASE_URL}/${locale}/industry/${study.industrySlug}/studies/${study.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
