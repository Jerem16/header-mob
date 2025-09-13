import type { NextConfig } from "next";
import path from "node:path";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: { minimumCacheTTL: 60 * 60 * 24 * 365 },

    // **Turbopack** (Next 15.5+) : remap vers un stub
    turbopack: {
        resolveAlias: {
            "@next/polyfill-module": "./stubs/empty.js",
            "next/dist/build/polyfills/polyfill-module": "./stubs/empty.js",
            "next/dist/build/polyfills/polyfill-module.js": "./stubs/empty.js",
        },
    },

    // **Webpack** fallback + remplacement robuste (avec query)
    webpack: (config, { isServer, webpack }) => {
        if (!isServer) {
            // 1) alias = false -> Webpack ignore le module (doc officielle)
            config.resolve.alias = {
                ...(config.resolve.alias ?? {}),
                "@next/polyfill-module": false,
                "next/dist/build/polyfills/polyfill-module": false,
                "next/dist/build/polyfills/polyfill-module.js": false,
            };

            // 2) plugin de remplacement pour *toutes* les variantes (avec ?query)
            config.plugins = config.plugins || [];
            config.plugins.push(
                new webpack.NormalModuleReplacementPlugin(
                    /next[\\/]dist[\\/]build[\\/]polyfills[\\/]polyfill-module(?:\.js)?(?:\?.*)?$/,
                    path.resolve(__dirname, "stubs/empty.js")
                )
            );
        }
        return config;
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
