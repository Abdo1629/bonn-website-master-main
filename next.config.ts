import "dotenv/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
  legacyBrowsers: false,
},
compiler: { removeConsole: true },

};

module.exports = nextConfig;


export default nextConfig;
