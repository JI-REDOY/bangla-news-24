import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ichef.bbci.co.uk",
                pathname: "/**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/api/news",
                destination: "https://news-api-v2.vercel.app/api/news",
            },
            {
                source: "/api/category/:slug",
                destination: "https://news-api-v2.vercel.app/api/category/:slug",
            },
            {
                source: "/api/article/:id",
                destination: "https://news-api-v2.vercel.app/api/article/:id",
            },
        ];
    },
};

export default nextConfig;