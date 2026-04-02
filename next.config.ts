import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    domains: ["img.icons8.com", "freepik.com"],
  },
};

export default nextConfig;