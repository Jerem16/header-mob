import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {},
    images: {
        minimumCacheTTL: 60 * 60 * 24 * 365, // 365 jours
    },

    async headers() {
        return [
            {
                source: "/workers/(.*)",
                headers: [
                    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp",
                    },
                ],
            },
            {
                source: "/img/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
    turbopack: {
        resolveAlias: {
            "@next/polyfill-module": path.resolve(
                __dirname,
                "src/shims/next-polyfills-empty.js",
            ),
            "next/dist/build/polyfills/polyfill-module.js": path.resolve(
                __dirname,
                "src/shims/next-polyfills-empty.js",
            ),
        },
    },
    webpack: (config) => {
        config.resolve = config.resolve || {};
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            "@next/polyfill-module": path.resolve(
                __dirname,
                "src/shims/next-polyfills-empty.js",
            ),
            "next/dist/build/polyfills/polyfill-module.js": path.resolve(
                __dirname,
                "src/shims/next-polyfills-empty.js",
            ),
        };
        return config;
    },
};

export default nextConfig;
