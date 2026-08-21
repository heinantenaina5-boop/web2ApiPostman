# TP CRUD Étudiants — Express + TypeScript

## Installation

```bash
npm install
```

## Lancer le serveur (mode dev, redémarre automatiquement)

```bash
npm run dev
```

Le serveur tourne sur **http://localhost:3000**

## Tester dans Postman

1. Ouvre Postman → **Import** → sélectionne le fichier `postman_collection.json`
2. Lance ton serveur (`npm run dev`) dans un terminal
3. Exécute les requêtes de la collection une par une

## Routes disponibles

| Méthode | URL              | Description                    | Succès  |
|---------|------------------|---------------------------------|---------|
| GET     | /etudiants       | Liste tous les étudiants        | 200     |
| GET     | /etudiants/:id   | Un étudiant précis              | 200     |
| POST    | /etudiants       | Créer (body: nom, prenom, email, age) | 201 |
| PUT     | /etudiants/:id   | Remplacer entièrement (tous les champs requis) | 200 |
| PATCH   | /etudiants/:id   | Modifier partiellement          | 200     |
| DELETE  | /etudiants/:id   | Supprimer                       | 204     |

## Gestion des erreurs centralisée

Toutes les erreurs passent par `src/middlewares/errorHandler.ts`.
- Étudiant introuvable → 404
- Champs manquants (POST/PUT) → 400
- Route inexistante → 404
- Erreur inattendue → 500

Format de réponse en erreur :
```json
{ "success": false, "message": "..." }
```

Format de réponse en succès :
```json
{ "success": true, "data": { ... } }
```

## Structure du projet

```
src/
  models/etudiant.model.ts       -> interface Etudiant
  controllers/etudiant.controller.ts -> logique CRUD (tableau en mémoire)
  routes/etudiant.routes.ts      -> déclaration des routes
  middlewares/ApiError.ts        -> classe d'erreur custom
  middlewares/errorHandler.ts    -> gestion centralisée des erreurs + 404
  app.ts                         -> config Express
  index.ts                       -> lancement du serveur
```

⚠️ Les données sont stockées **en mémoire** : elles sont réinitialisées à chaque redémarrage du serveur (`npm run dev`).
