/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        // port: '',
        pathname: "/vi/**",
      },
    ],
  },
};
// https://i.ytimg.com/vi/fhpfemCmSN4/mqdefault.jpg

module.exports = nextConfig;
