/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Game-Of-Life',
  assetPrefix: '/Game-Of-Life',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
