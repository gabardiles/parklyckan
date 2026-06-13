import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { articles } from "@/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${siteUrl}/personuppgiftspolicy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const blog: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/nyheter/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...routes, ...blog];
}
