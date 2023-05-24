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