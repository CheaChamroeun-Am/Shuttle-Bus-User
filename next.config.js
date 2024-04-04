/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  skipMiddlewareUrlNormalize: true
};

module.exports = nextConfig;
