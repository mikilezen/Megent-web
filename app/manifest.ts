import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Megent — Runtime Policy for AI Agents",
    short_name: "Megent",
    description: "Open-source runtime policy for AI agent tool calls.",
    start_url: "/",
    display: "browser",
    background_color: "#f3f0ee",
    theme_color: "#f3f0ee",
    icons: [
      {
        src: "/icon-224x224.png",
        sizes: "224x224",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        type: "image/x-icon",
      },
    ],
  };
}
