# AGENTS.md

## Installation

-   Toujours commencer par `yarn install` pour installer toutes les dépendances.
-   Si vous utilisez Yarn v4.x (Berry/PnP), ajoutez ou vérifiez dans `.yarnrc.yml` :

    ```yaml
    nodeLinker: node-modules
    ```

## Scripts

Utilisez les scripts définis dans le `package.json` :

-   **`yarn dev`** : lance l’application en mode développement (`next dev`).
-   **`yarn build`** : construit la production (`next build`).
-   **`yarn start`** : démarre le serveur en production (`next start`).
-   **`yarn lint`** : exécute le lint via Next.js (`next lint`).
-   **`yarn generate:sitemap`** : génère le sitemap (`node scripts/generate-sitemap.js`).

## Style de code

-   Utiliser **Prettier** pour formater le code :

    ```bash
    yarn prettier --write .
    ```

-   Respecter les règles **ESLint** intégrées à Next.js :

    ```bash
    yarn lint
    ```

## Dépendances clés

-   **Framework** : Next.js v15.0.3
-   **AWS & Amplify** : aws-amplify 6.9.0 et @aws-amplify/ui-react

## Tests

-   Actuellement, il n’y a pas de script de test défini.
-   Si vous ajoutez des tests, créez un script `yarn test` et assurez-vous qu’il passe avant chaque PR.

## Pull Request

-   **Titre de la PR** : `[Fix|Feat] courte description`
-   **Description** : expliquer l’objectif du changement.
-   **Tests effectués** : listez les commandes exécutées (ex. `yarn dev`, `yarn lint`, `yarn build`).

---

Règles internes de développement — Next.js Performance Mobile
Objectif :

    Garantir un chargement rapide et fluide sur mobile (LCP, TTI, TBT et INP optimisés), même en conditions réseau dégradées.

🧱 Structure de découpage des composants
Lazy-loading ciblé :

    Lazy-load uniquement les composants lourds :

        Sliders

        Charts et graphiques

        Maps interactives

        Éditeurs riches (texte, markdown, WYSIWYG)

        Animations complexes (carrousels, transitions lourdes)

    Les composants structurels légers restent chargés immédiatement :

        Header

        Footer

        Navigation principale

        Layout principal

Providers et Context :

    Les providers avec une forte logique métier ou calculs lourds peuvent être lazy-loadés uniquement si non nécessaires au premier render.

    Éviter les imbrications excessives de Suspense et de Context.Provider imbriqués inutilement.

Découpage des chunks :

    Regrouper les lazy chunks par zones fonctionnelles cohérentes (feature chunks).

    Éviter le micro-découpage extrême (trop de petits fichiers JS téléchargés séparément nuisent à la perf mobile, même en HTTP/2/3).


    Objectifs techniques mobiles (Core Web Vitals)

Metric Objectif cible
LCP (Largest Contentful Paint) < 2.5s
TTI (Time to Interactive) < 3s
TBT (Total Blocking Time) < 200ms
INP (Interaction to Next Paint) < 200ms
🚫 À éviter absolument

    Lazy-load d’icônes, boutons ou petits composants pures visuels.

    Découpage de micro-providers pour chaque feature isolée.

    Suspense imbriqué en profondeur sans réelle nécessité.

    Sur-dépendance aux charges asynchrones en cascade (éviter le “lazy hell”).

✅ Résultat attendu

    Main thread mobile libéré rapidement.

    Expérience utilisateur fluide et réactive même sur réseau dégradé.

    Score Lighthouse > 90% sur mobile.
