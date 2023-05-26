# IA-Pau-website

## Comment lancer le projet ?
Lancer le serveur MySQL
```
sudo service mysql start
```

Lancer le serveur php
```
cd backend
composer install
php -S localhost:8080 --docroot=backend
```

Lancer le serveur node
```
cd frontend
npm install
npm start
```


## Dépendences
sudo apt install php7.4-mysql