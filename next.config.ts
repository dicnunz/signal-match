import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? "/signal-match" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/signal-match/" : undefined,
};

export default nextConfig;
