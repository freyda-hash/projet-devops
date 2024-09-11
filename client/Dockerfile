# une image de base Node.js 
FROM node:18 AS build

WORKDIR /usr/src/app

# Copie les fichiers de l'application dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construire l'application front-end
RUN npm run build

# Utiliser une image de serveur Nginx pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire Nginx
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
