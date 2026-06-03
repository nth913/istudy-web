/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.aistudy.com.vn" },
      { protocol: "https", hostname: "h913.aistudy.com.vn" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
};

export default nextConfig;
