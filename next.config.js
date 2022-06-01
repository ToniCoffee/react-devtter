/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'pbs.twimg.com',
      'randomuser.me'
    ]
  }
};

module.exports = nextConfig;
