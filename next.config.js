/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      { protocol: "https", hostname: "i.dummyjson.com" },
      { protocol: "https", hostname: "dummyjson.com" },
    ],
  },

  // REQUIRED: Prevent Vercel from erroring
  turbopack: {},

  // DO NOT USE WEBPACK HERE — REMOVE IT COMPLETELY
};

export default nextConfig;
