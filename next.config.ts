import type { NextConfig } from "next";
//https://linked-posts.routemisr.com/uploads/undefined"
const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linked-posts.routemisr.com',
        pathname: '/uploads/**'
      },
    ],
  },
};

export default nextConfig;
