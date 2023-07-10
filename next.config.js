/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { // ! Necessary for Next Image.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
