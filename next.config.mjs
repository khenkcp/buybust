/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {},
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      { protocol: "https", hostname: "i.dummyjson.com" },
      { protocol: "https", hostname: "dummyjson.com" },
    ],
  },

  // ✔ REQUIRED: Silence Turbopack error
  turbopack: {},
};

export default nextConfig;
