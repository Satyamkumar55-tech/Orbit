import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Treat mongoose as a server-only external package (avoids bundling issues)
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
