#!/bin/bash
echo "_________________________________________________________________________________"
echo "Bonjour et bienvenu sur l'assistant de démarage d'IA-Pau ! V1.0"
echo "IMPORTANT : Vous devez impérativement avoir installé Apache2, MySQL, Npm (18.16.0), Composer et Firefox !"
echo "---------------------------------------------------------------------------------"

# -------------------------------------------- VERIF ----------------------------------------
# Vérifie si Apache2, MySql et Firefox sont installés
# Vérifie si Apache2 est installé
if ! command -v apache2 &> /dev/null; then
    echo "Apache2 n'est pas installé. Veuillez installer Apache2 et réessayer."
    exit 1
fi

# Vérifie si MySQL est installé
if ! command -v mysql &> /dev/null; then
    echo "MySQL n'est pas installé. Veuillez installer MySQL et réessayer."
    exit 1
fi

# Vérifie si Npm est installé
if ! command -v npm &> /dev/null; then
    echo "Npm n'est pas installé. Installez le."
    exit 1
fi

# Vérifie la version de Nvm et installa la bonne sinon
# if [[ "$(nvm current)" != "v18.16.0" ]]; then
#     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh
#     # Source le fichier de configuration de Nvm
#     source ~/.nvm/nvm.sh
#     nvm install v18.16.0
#     nvm use v18.16.0
# fi

# Vérifie si Composer est installé
if ! command -v composer &> /dev/null; then
    echo "Composer n'est pas installé. Nous l'installons."
    sudo apt install -y composer
fi

# Vérifie si Firefox est installé
if ! command -v firefox &> /dev/null; then
    echo "Firefox n'est pas installé. Veuillez installer Firefox et réessayer."
    exit 1
fi

#------------------------------------ MySQL ---------------------------------------------
# Vérifie si le serveur MySQL est lancé
statusMySql=$(service mysql status | grep running | wc -l)
if [ "$statusMySql" -eq 1 ]; then
    echo "Le serveur MySql est déjà lancé."
else
    echo "Le serveur MySql n'est pas lancé. Lancement en cours..."
    sudo service mysql start
fi
# On demande à l'utilisateur de nous donner son nom et son password pour acceder à MySql
echo "Veuillez entrez vos identifiants pour accéder à votre serveur MySql situé en localhost"
read -p "Nom d'utilisateur : " username
read -s -p "Mot de passe : " password
# Connecte toi et charge les deux fichiers pimpWhale.sql et pimpWhaleData.sql
# Exécute la commande mysql pour se connecter et exécuter les fichiers SQL
mysql -u "$username" -p"$password" -e "source backend/deploy.sql;"
# Met à jour le ficier bddData.php avec ses données
sudo sed -i "s|^\s*\$username =.*|\$username = \"$username\";|" backend/api/utils/BDDCredentials.php
sudo sed -i "s|^\s*\$password =.*|\$password = \"$password\";|" backend/api/utils/BDDCredentials.php

#------------------------------------ APACHE2 ---------------------------------------------
# Vérifie si le serveur Apache2 est lancé
# Exécute la commande et récupère le résultat dans une variable
statusApache=$(service apache2 status | grep running | wc -l)
# Vérifie si le résultat est égal à 1
if [ "$statusApache" -eq 1 ]; then
    echo "Le serveur Apache2 est déjà lancé."
else
    echo "Le serveur Apache2 n'est pas lancé. Lancement en cours..."
    sudo service apache2 start
fi

# On paramètre le serveur Apache2
# On récupère le chemin du site
current_path=$(pwd)
backend_path="${current_path}/backend"
# Donner les droits à l'utilisateur www-data
chown www-data $backend_path -Rf
# Attribuer l'accès total à l'utilisateur "Simple"
sudo chmod 777 -R $backend_path


# Editer les fichiers de configuration d'apache2
#   Vérifie si le fichier de configuration existe
if [ -f "/etc/apache2/sites-available/000-default.conf" ]; then
    # Recherche la ligne contenant "DocumentRoot" et remplace la ligne entière par le nouveau chemin
    sudo sed -i "s|^\s*DocumentRoot.*|DocumentRoot $backend_path|"
    echo "La valeur de DocumentRoot dans 000-default.conf a été mise à jour."
else
    echo "Le fichier de configuration 000-default.conf n'existe pas."
fi
if [ -f "/etc/apache2/apache2.conf" ]; then
    # Recherche la ligne contenant "<Directory var/www/" (si on ne l'a jamais modifié) ou "<Directory /home/*" si on l'a déjà modifié et remplace la ligne entière par le nouveau chemin
    sudo sed -i "s|^\s*<Directory /home.*|<Directory $backend_path>|" /etc/apache2/apache2.conf
    sudo sed -i "s|^\s*<Directory var/www>|<Directory $backend_path>|" /etc/apache2/apache2.conf
    echo "La valeur de Directory dans apache2.conf a été mise à jour."
else
    echo "Le fichier de configuration apache2.conf n'existe pas."
fi
sudo service apache2 restart

#------------------------------------ Composer ---------------------------------------------
# Vérifie si les dépendances sont installées
cd backend/
composer install
cd ..
#------------------------------------ Npm ---------------------------------------------


# Vérifie si les dépendances sont installées
cd frontend/
npm i
# Lance le site
echo 'Tout est bon. Profitez bien de votre visite sur IA-Pau !'
npm start