#  une image de base Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers de l'application dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port sur lequel l'application tourne
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["npm", "start"]
