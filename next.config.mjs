/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vtrvhxbuuaveyscygrgq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
