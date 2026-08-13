/** @type {import("next").NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const buildDate = new Date().toISOString().slice(0, 10);

const nextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BUILD_DATE: buildDate,
  },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  typescript: {
    tsconfigPath: process.env.GITHUB_ACTIONS
      ? "tsconfig.pages.json"
      : "tsconfig.json",
  },
};

export default nextConfig;
