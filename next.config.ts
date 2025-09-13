import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // ⚠️ Remplace experimental.turbo → turbopack (clé officielle)
    turbopack: {
        // Laisse vide tant que tu n’as pas de libs à ré-aliaser
        // resolveAlias: { 'lodash': 'lodash-es', 'uuid': 'uuid/dist/esm-browser/index.js' },
    },

    eslint: {
        ignoreDuringBuilds: true,
    },

    webpack: (config) => {
        // Préférer l’ESM quand dispo (utile si tu actives Webpack en prod)
        config.resolve.conditionNames = [
            "import",
            "module",
            "browser",
            "require",
            "default",
        ];
        // Pas d’alias tant que les libs ne sont pas installées
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
