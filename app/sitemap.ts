import type { MetadataRoute } from "next";

const siteUrl = "https://megent.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-09T00:00:00.000Z");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/op`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/registry`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
