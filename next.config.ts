import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXTJS_ROOT: __dirname,
  },
};

export default nextConfig;
