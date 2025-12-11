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

  // 🚀 Disable Turbopack completely
  // Force Next.js to use Webpack instead (compatible with your structure)
  webpack: (config) => {
    return config;
  },

  // Tell Next.js NOT to use Turbopack
  turbo: false,
};

export default nextConfig;
