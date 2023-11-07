/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions:["/^((?!api).)*$/gm"],


}

module.exports = nextConfig
