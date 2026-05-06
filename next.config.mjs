import createNextIntlPlugin from 'next-intl/plugin';
import { createMDX } from 'fumadocs-mdx/next';


const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const config = {
  env: {
    NEXT_PUBLIC_BASE_URL: '',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://flectone.net/api/:path*',
      },
    ]
  },
  trailingSlash: true,
  basePath: '',
  serverExternalPackages: ["@takumi-rs/core"],
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'flectone.net',
      }
    ],
  },
};

const withMDX = createMDX({
  configPath: "source.config.ts"
});

export default withNextIntl(withMDX(config));