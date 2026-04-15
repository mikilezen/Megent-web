import type { MetadataRoute } from "next";

const siteUrl = "https://megent.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/op", "/registry", "/llms.txt", "/sitemap.xml"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/op", "/registry", "/llms.txt", "/sitemap.xml"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/op", "/registry", "/llms.txt", "/sitemap.xml"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
      {
        userAgent: "ClaudeBot",
        allow: ["/", "/op", "/registry", "/llms.txt", "/sitemap.xml"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/op", "/registry", "/llms.txt", "/sitemap.xml"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
