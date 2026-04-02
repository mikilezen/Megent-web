import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  turbopack: {
    root: path.join(__dirname),
=======
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.icons8.com",
      },
    ],
>>>>>>> c2cfc6be5b2ce22b1bb4e692a354913c0154aec9
  },
};

export default nextConfig;