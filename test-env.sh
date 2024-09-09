#!/bin/bash

# Variables
APP_DIR="/var/www/phone-shop"
DB_NAME= $DB_NAME
DB_USER= $DB_USER
DB_PASS= $DB_PASS

# Mise à jour du système
echo "Mise à jour des paquets..."
sudo apt update && sudo apt upgrade -y

# Installation des outils nécessaires
echo "Installation de Nginx, MySQL, et Node.js..."
sudo apt install -y nginx mysql-server mysql-client nodejs npm

# Configuration de MySQL
echo "Configuration de la base de données MySQL..."
sudo mysql -e "CREATE DATABASE $DB_NAME;"
sudo mysql -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
sudo mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Clonage de l'application (assurez-vous que Git est installé ou ajoutez une étape d'installation de Git)
echo "Clonage de l'application depuis le dépôt..."
git clone https://github.com/your-repository/phone-shop.git $APP_DIR

# Installation des dépendances de l'application
echo "Installation des dépendances de l'application..."
cd $APP_DIR
npm install

# Configuration de Nginx
echo "Configuration de Nginx..."
cat <<EOL | sudo tee /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name localhost;

    root $APP_DIR/public;
    index index.html index.htm;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL

# Activer la configuration de Nginx
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Lancer l'application (ajustez selon le script de démarrage de votre application)
echo "Lancement de l'application..."
nohup npm start > /var/log/phone-shop.log 2>&1 &

echo "Configuration terminée. L'application devrait être disponible sur http://localhost"
