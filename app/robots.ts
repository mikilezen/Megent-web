import type { MetadataRoute } from "next";

const siteUrl = "https://megent.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/op", "/registry"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/op", "/registry"],
        disallow: ["/api/", "/dashboard", "/login"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
