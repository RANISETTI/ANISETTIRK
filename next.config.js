/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'cache-control',
            value: 'no-cache no-store must-revalidate, max-age=0, s-maxage=0',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' https://securegw-stage.paytm.in https://static-staging.paytm.in https://staticpg.paytm.in https://accounts-staging.paytm.in https://securegw.paytm.in https://static.paytm.in https://staticpg.paytm.in https://accounts.paytm.in 'unsafe-inline' 'unsafe-eval'; object-src 'none'",
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
