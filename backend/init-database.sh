#!/bin/bash
set -e

# Attente que le serveur MySQL soit prêt
until mysqladmin ping -h"$MYSQL_HOST" -P"$MYSQL_PORT" --silent; do
    echo "En attente du serveur MySQL..."
    sleep 1
done

# Exécution du script deploy.sql pour créer les tables et les données
mysql -h"$MYSQL_HOST" -P"$MYSQL_PORT" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" < /docker-entrypoint-initdb.d/deploy.sql
