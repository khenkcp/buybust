/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,

  // Disable Turbopack source maps (THIS FIXES THE WINDOWS BUG)
  turbopack: {
    // disable all sourcemaps
    resolve: {
      sourceMaps: false,
    },
  },

  // Force Next.js to STOP trying to use Webpack source maps
  webpack(config) {
    config.devtool = false;
    return config;
  },
};

export default nextConfig;
