import { Seed } from '@aws-amplify/backend-cli';

export const seed = async () => {
  console.log("Starting seeding...");

  // Ajoute ici ta logique pour insérer des données dans le sandbox, comme des utilisateurs, des configurations, etc.
  
  // Exemple d'une donnée fictive :
  const userData = {
    username: "testuser",
    email: "testuser@example.com",
  };

  console.log("User Data:", userData);

  // Ajoute ici ta logique d'interaction avec les services Amplify si nécessaire.
  // Par exemple, ajouter des utilisateurs, des données à DynamoDB, etc.

  console.log("Seeding completed!");
};

// Exécution du seed
seed();
