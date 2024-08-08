/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "job-portal-2.s3.amazonaws.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
