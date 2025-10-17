import type { NextConfig } from "next";
import "dotenv/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
  legacyBrowsers: false,
  browsersListForSwc: true,
},
compiler: { removeConsole: true },

};

module.exports = nextConfig;


export default nextConfig;
