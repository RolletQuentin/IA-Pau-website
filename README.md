# IA-Pau-website

## Comment lancer le projet ?

Il faut dans un premier temps build le projet dans un conteneur docker. L'option -d permet de lancer le conteneur en arrière plan.

```
docker compose up --build -d
```


Il faut ensuite lancer le serveur java

```
java -jar backend/AnalyseurDeCode.jar
```

Et enfin rendez-vous à l'adresse http://localhost:8765

Attention : Comme le site fonction en local (localhost), il existe un problème avec Mozilla Firefox qui empêche certaines reqêtes au serveur PHP, il est préférable d'utiliser Google Chrome.

/!\ Dans le cas ou il n'y aurait pas de données insérées lors de la création
dans le conteneur docker. Il vous faudra:

Pré-requis: mysql

1. Isoler le fichier backend/deploy.sql
2. Modifier le fichier backend/api/utils/BDDCredentials.php
   Ajoutez vos identifiants MYSQL sans changer le dbname
3. Utilisez la commande ``mysql -u <userName> -p`` pour vous connecter
   a mysql dans le dossier contenant deploy.sql.
4. Une fois dans la console mysql faire: ``source deploy.sql;``.