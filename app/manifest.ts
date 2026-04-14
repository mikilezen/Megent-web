import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Megent",
    short_name: "Megent",
    description: "Operations, routing, and governance for AI agents in production.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/openclaw.png",
        sizes: "640x640",
        type: "image/png",
      },
      {
        src: "/icon-224x224.png",
        sizes: "224x224",
        type: "image/png",
      },
      {
        src: "/Group.ico",
        type: "image/x-icon",
      },
    ],
  };
}
