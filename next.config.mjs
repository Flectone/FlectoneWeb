import createNextIntlPlugin from 'next-intl/plugin';
import { createMDX } from 'fumadocs-mdx/next';


const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://github.com/**')]
  }
};

const withMDX = createMDX({
  configPath: "source.config.ts"
});

export default withNextIntl(withMDX(config));