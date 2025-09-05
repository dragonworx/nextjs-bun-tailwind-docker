/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Configure path aliases to match the existing project structure
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/app',
      '@lib': '/app/lib',
      '@components': '/app/components',
      '@config': '/config',
      '@assets': '/assets',
    };
    return config;
  },
  // Allow Three.js and other assets
  transpilePackages: ['three'],
}

module.exports = nextConfig