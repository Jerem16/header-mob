// next.config.ts
const isProd = process.env.NODE_ENV === "production";
const repo = "mob-peur-de-la-conduite"; // ← ton nom de repo

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Export statique (GitHub Pages ne sait servir que des fichiers)
    output: "export",
    // Évite les 404 en deep-link (GH Pages sert index.html par dossier)
    trailingSlash: true,
    // Désactive l'optimisation d'image côté serveur
    images: { unoptimized: true },
    // Nécessaire pour Project Pages (URL de type /<repo>/...)
    basePath: isProd ? `/${repo}` : "",
    assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
