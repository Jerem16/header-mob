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
};

export default nextConfig;
