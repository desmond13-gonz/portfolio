/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/about', destination: '/' },   // render the About section in home page
      { source: '/projects', destination: '/' }, // render Project section in home page
      { source: '/hero', destination: '/' },
      { source: '/header', destination: '/' },
      { source: '/testimonials', destination: '/' },
      { source: '/services', destination: '/' },
      { source: '/footer', destination: '/' },
      { source: '/contact', destination: '/' },
      // Add more rewrites as needed
    ];
  },
};

export default nextConfig;
