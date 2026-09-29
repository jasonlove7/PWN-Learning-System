import type { NextConfig } from "next";

// GitHub Pages serves this site from the repository subpath /PWN-Learning-System/.
// Next requires assetPrefix without a trailing slash.
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/PWN-Learning-System",
  assetPrefix: "/PWN-Learning-System",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
