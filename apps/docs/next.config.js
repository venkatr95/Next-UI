/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@next-ui/core",
    "@next-ui/utils",
    "@next-ui/theme",
    "@next-ui/responsive",
    "@next-ui/button",
    "@next-ui/card",
    "@next-ui/navbar",
    "@next-ui/tabs",
    "@next-ui/link",
    "@next-ui/code",
    "@next-ui/snippet",
    "@next-ui/divider",
  ],
};
module.exports = nextConfig;
