/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions:["/^((?!requestApi.api.js).)*$/gm"],


}

module.exports = nextConfig
