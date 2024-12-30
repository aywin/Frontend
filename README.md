Bookstore Frontend

Description :
Ce projet est le frontend de l'application Bookstore, développé avec React et Next.js. Il offre une interface utilisateur intuitive pour gérer les utilisateurs, les livres et les catégories, ainsi que pour consulter et télécharger les fichiers PDF associés.

Fonctionnalités :
- Inscription et connexion des utilisateurs.
- Ajout, modification, suppression et consultation des livres.
- Téléchargement des fichiers PDF associés aux livres.
- Gestion des catégories avec affichage dynamique.
- Expérience utilisateur fluide grâce à une interface responsive.

Technologies utilisées :
- React : Framework pour construire l'interface utilisateur.
- Next.js : Framework pour le rendu côté serveur et le routage.
- Tailwind CSS : Framework CSS pour des interfaces modernes.
- Axios : Bibliothèque pour gérer les appels API.
- TypeScript : Typage statique pour un code robuste et maintenable.

Installation :

Prérequis :
- Node.js installé sur votre machine.
- Un outil comme Postman ou votre backend déjà en cours d'exécution.

Étapes :
1. Clonez le dépôt :
   git clone https://github.com/aywin/Frontend.git
   cd Frontend

2. Installez les dépendances :
   npm install

3. Configurez les variables d'environnement dans un fichier `.env.local` :
   NEXT_PUBLIC_API_URL=http://localhost:8080/api

4. Lancez l'application :
   npm run dev

5. Accédez à l'application via :
   http://localhost:3000

Documentation des pages principales :
- Page d'inscription : Permet aux utilisateurs de créer un compte.
- Page de connexion : Authentification pour accéder aux fonctionnalités.
- Page de liste des livres : Affiche tous les livres disponibles.
- Page d'ajout/modification : Permet de créer ou modifier un livre avec fichier PDF.
- Page de gestion des catégories : Affiche et modifie les catégories existantes.

Tests :
Toutes les fonctionnalités ont été testées manuellement avec le backend opérationnel. Les appels API ont été validés pour garantir une intégration correcte.

Auteurs :
Aymar OUEDRAOGO
