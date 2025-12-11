/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
  },

  // Force Next.js to use Webpack instead of Turbopack
  webpack: (config) => {
    config.devtool = false;
    return config;
  },

  // Tell Vercel to NOT use Turbopack
  turbopack: false,
};

module.exports = nextConfig;
