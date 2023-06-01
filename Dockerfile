# Étape 1 : Construction de l'application React
FROM node:latest AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json /app/frontend/
RUN npm install
COPY frontend/ /app/frontend/
RUN npm run build

# Étape 2 : Configuration du serveur PHP
FROM php:7.4-apache AS php-server
WORKDIR /var/www/html
COPY backend/api/ /var/www/html/api/
COPY backend/deploy.sql /docker-entrypoint-initdb.d/
COPY backend/composer.json backend/composer.lock /var/www/html/
RUN apt-get update && apt-get install -y unzip
RUN docker-php-ext-install pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Étape 4 : Configuration du serveur MySQL
FROM mysql:8 AS mysql-server
ENV MYSQL_ROOT_PASSWORD=root_password
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=ltkZPbxzP3m8HA6c
ENV MYSQL_DATABASE=IA_Pau_database

# Copie du fichier deploy.sql pour initialiser la base de données
COPY backend/deploy.sql /docker-entrypoint-initdb.d/

# Ajout du script d'initialisation personnalisé pour créer les tables
COPY backend/init-database.sh /docker-entrypoint-initdb.d/init-database.sh
RUN chmod +x /docker-entrypoint-initdb.d/init-database.sh

# Étape 5 : Assemblage des composants
FROM php-server AS final
COPY --from=frontend-builder /app/frontend/build/ /var/www/html/

# Configuration du fichier BDDCredentials
# RUN sed -i "s/localhost/$MYSQL_DATABASE/g" /var/www/html/api/utils/BDDCredentials.php
# RUN sed -i "s/user/$MYSQL_USER/g" /var/www/html/api/utils/BDDCredentials.php
# RUN sed -i "s/password/$MYSQL_PASSWORD/g" /var/www/html/api/utils/BDDCredentials.php
