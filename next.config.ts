import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.dropbox.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.dropboxusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
