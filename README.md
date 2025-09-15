# header-mob

## Règles server/client

- Les composants sont des **Server Components** par défaut.
- Ajouter `"use client"` uniquement lorsque le composant contient de l’interaction (hooks d’état, navigation, gestion d’événements...).
- Les pages statiques et les composants purement visuels ne doivent pas inclure cette directive.
- Séparer la logique de contexte du rendu visuel pour limiter le poids du bundle client.
