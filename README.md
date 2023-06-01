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
