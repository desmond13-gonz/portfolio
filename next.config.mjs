/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allow any hostname
        port: '',
        pathname: '/**', // allow any path
      },
    ],
  },
}

export default nextConfig
