/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: {
      // Enable source maps in development for easier debugging
      sourceMap: process.env.NODE_ENV !== 'production',
      // Automatically generate meaningful class names
      autoLabel: 'dev-only',
      // Set the format for the class names
      // labelFormat: '[filename]--[local]'
    }
  },
};

export default nextConfig;
