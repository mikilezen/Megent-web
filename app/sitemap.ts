import type { MetadataRoute } from "next";

const siteUrl = "https://megent.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: "2026-04-02T00:00:00.000Z",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/op`,
      lastModified: "2026-04-02T00:00:00.000Z",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/doc`,
      lastModified: "2026-04-02T00:00:00.000Z",
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
