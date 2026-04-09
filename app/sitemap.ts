import type { MetadataRoute } from "next";

const siteUrl = "https://megent.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString();

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
