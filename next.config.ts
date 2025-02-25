import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  crossOrigin: "anonymous",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sable-assets-public.s3.us-east-1.amazonaws.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
}
 
module.exports = nextConfig