/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.annihil.us",
        port: "",
        pathname: "/u/prod/marvel/**",
      },
      {
        protocol: "https",
        hostname: "i.annihil.us",
        port: "",
        pathname: "/u/prod/marvel/**",
      },
    ],
    unoptimized: true,
  },
  // Força o Next.js a reconhecer as rotas
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
