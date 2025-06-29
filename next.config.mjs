/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['i.annihil.us'],
    unoptimized: true,
  },
  // Remover a seção env para evitar conflitos
}

export default nextConfig
