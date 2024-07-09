/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                hostname: "localhost"
            },
            {
                protocol: 'https',
                hostname: 'api.xlaccounting.com.au'
            }
        ],
    },
};

module.exports = nextConfig;
