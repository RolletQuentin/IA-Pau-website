---
documentclass: article
graphics: true
title: Rapport Projet Ing1
subtitle: "Référente : Elisabeth RANISAVLJEVIC"
titlegraphic: images/cytech
institute: "CY-Tech année : 2022-2023"
date: Du 22 mai au 1er juin
author:

- ROLLET Quentin
- RIMAUDIERE Arthur
- NOAILLES Valentin
- DEJARDIN Maxime
- SOULIER Patrice
toc: true
toc-title: Table des matières
lof: true
header-includes: |
  \usepackage{caption}
  \usepackage{subcaption}
  \usepackage{ dsfont }
  \usepackage{ amssymb }
  \usepackage{ tipa }
  \usepackage{ stmaryrd }

---

# Introduction

## Présentation du projet ING1 GI

Au cours de notre première année à l'école d'ingénieurs CY-Tech Pau, nous avons eu l'opportunité de mettre en pratique nos connaissances et compétences acquises en informatique en réalisant un projet de fin d'année. Notre projet consistait à développer un site internet complet et dynamique pour l'association IAPau.

## Contexte et objectifs du projet

Ce projet a été conçu dans le but de nous permettre d'appliquer concrètement les compétences que nous avons acquises tout au long de notre première année. En travaillant en équipe, nous avons eu l'occasion de collaborer avec des camarades de promotion, formant ainsi des équipes aléatoires, afin de développer nos compétences en travail d'équipe et de renforcer notre capacité à travailler avec autrui.
L'objectif principal était de concevoir un site permettant aux utilisateurs de s'inscrire et de participer aux Data Challenges et Data Battles proposés par l'association IA Pau, ainsi que de permettre aux Gestionnaires de gérer ces Data Challenges/Battles et aux Administrateurs de gérer en plus des Data Challenges/Battles les utilisateurs et ressources du site. 

# Analyse des besoins

## Présentation du contexte de l'association IA PAU

L’association IA PAU est une association à but non lucratif qui rassemble chercheurs, enseignants, étudiants, entrepreneurs, particuliers autour de la thématique du traitement des données et propose de rapprocher la sphère économique, le monde académique et le grand public en organisant des événements et des projets collaboratifs.
Son objectif est de vulgariser et partager les connaissances autour de ce progrès majeur du XXIème siècle qui suscite de nombreuses interrogations scientifiques, technologiques, éthiques, et démocratiques.
L’intelligence artificielle, de plus en plus présente dans notre quotidien et dans les médias, suscite de nombreuses interrogations. Alors qu’elle est parfois présentée comme une simple évolution de l’informatique, seulement capable de reproduire des comportements observés dans une grande quantité de données, les progrès réalisés ces cinq dernières années par l’IA questionnent sur les ingrédients et les limites des technologies de l’intelligence artificielle.
L’ association IA PAU a pour ambition de démystifier l’intelligence artificielle en la rendant accessible au plus grand nombre en proposant des événements d’acculturation, d’information et de partage. Elle favorise et accompagne également des projets collaboratifs entre entreprises, associations, collectivités et étudiants pour faciliter les échanges dans le domaine de l’Intelligence Artificielle et pour instaurer une dynamique collective pérenne dans le territoire.


## Description du déroulement d'un data challenge

Un Data Challenge est une compétition sur un weekend dans laquelle plusieurs équipes s'affrontent pour résoudre un problème spécifique en utilisant des techniques de traitement et d'analyse des données. Les équipes sont évaluées en fonction de la qualité de leurs résultats et de leur approche méthodologique.
Un Data Battle est une variante du Data Challenge qui se déroule sur une période d'un mois, il se compose d'un projet unique et les équipes participantes doivent répondre à des questionnaires hebdomadaires. Un podium est affiché sur la page d'accueil du site, mis à jour chaque semaine en fonction des résultats des questionnaires.

## Identification des besoins et enjeux de l'application

L'objectif de l'application que nous devons développer est de fournir une plateforme en ligne permettant aux utilisateurs de s'inscrire et de participer aux Datas Challenges et aux Dats Battles organisés par l'association IA Pau. Les principaux besoins et enjeux identifiés sont :


- VISITEUR : Accès aux informations des Data Challenges et Battles.


- VISITEUR (Uniquement pour Data Battle) : Le podium doit être affiché sur la page d'accueil du site, montrant le classement des équipes en fonction de leurs performances dans les questionnaires. Il doit être actualisé toutes les semaines après la date de rendu des questionnaires hebdomadaires.


- VISITEUR : Les visiteurs doivent pouvoir s'inscrire sur le site en fournissant leurs informations personnelles.


- ÉTUDIANT : Les étudiants doivent avoir la possibilité de former des équipes ou de rejoindre des équipes existantes pour participer aux compétitions.


- ÉTUDIANT : Les équipes participantes à un Data Challenge ou un Data Battle doivent pouvoir soumettre leurs résultats pour évaluation.


- ÉTUDIANT : Les étudians doivent pouvoir communiquer avec les gestionnaires des evenements par messages.


- ÉTUDIANT (Uniquement pour Data Battle) : Les équipes doivent pouvoir répondre aux questionnaires hebdomadaires pour accumuler des points et améliorer leur classement.


- GESTIONNAIRE : Les gestionnaires doivent accéder à tous les Data Challenges et Battle qu'ils gèrent.


- GESTIONNAIRE : Les gestionnaires doivent pouvoir échanger des messages avec tous les Étudiants d'un Data Challenge/Battle,  d'un Projet et d'une équipe.


- GESTIONNAIRE : Les gestionnaires doivent pouvoir créer des questionnaires, consulter les réponses des équipes et les noter.


- ADMINISTRATEUR : Les Administrateurs du site doivent pouvoir créer, éditer et supprimer des Administrateurs, Gestionnaires et Étudiants, des Data Challenges, Battle, des Projets et des ressources.


Nous détaillerons plus bas les besoins et enjeux, ainsi que les fonctionnalités spécifiques à mettre en place pour répondre à ces exigences.


# Spécifications fonctionnelles

## Présentation des différents profils utilisateurs

Le site accueille quatre types d'utilisateurs, des Administrateurs, des Gestionnaires (interne ou externe), des Étudiants et des Visiteurs.

## Description des fonctionnalités d'administration

L'Administrateur peut accéder à un panneau principal où il peut administrer les Utilisateurs, les Data Challenges ainsi que les ressources.

### Administration des utilisateurs

L'administrateur pour modifier les données de tous les utilisateurs. Il peut également créer d'autres comptes Administrateurs, créer des comptes Étudiants et des comptes Gestionnaires.
Il peut également gérer les équipes des utilisateurs.

### Administration des Data Challenges/Battles

L'administrateur peur créer, modifier ou supprimer des Data Challenges/Battles. Créer des projets à l'intérieur des Data Challenges/Battles (un unique projet pour les Data Battles). Assigner des Gestionnaires aux Datas Challenges/Battles. Ajouter des ressources aux Datas Challenges/Battles ainsi qu'à tous les projets.

### Administration des Ressources

L'administrateur peut créer, modifier ou supprimer des ressources.

## Description des fonctionnalités pour les gestionnaires

Il existe deux types de gestionnaire, le gestionnaire interne (fait partie de IA Pau, pas de date de fin d'activation) et le gestionnaire externe (gestionnaire temporaire le temps d'un Data Challenge/Battle venant d'une entreprise extérieure).

Seul un Administrateur peut créer un compte Gestionnaire et l'assigner à des Datas Challenges/Battles.

Le gestionnaire peut éditer son profil et ainsi redéfinir son mot de passe, il peut accéder aux Datas Challenges/Battles qu'il gère.

S'il clic sur un Data Challenge/Battle, il peut envoyer des messages à tous ses membres, s'il clic sur un projet d'un Data Challenge, il peut envoyer des messages à tous les membres du projet et s'il clic sur une équipe il peut envoyer un message à tous les membres d'une équipe. Il peut également accéder aux dossiers des équipes afin de voir leur lien GitHub et de les noter à la fin de l'évènement.

S'il clic sur un DataBattle il peut envoyer des messages à tous les membres du DataBattle. Il peut également créer des questions pour le questionnaire du DataBattle, ainsi que noter les réponses des équipes.

## Description des fonctionnalités principales pour les étudiants connectés

Un étudiant connecté peut consulter la même page d'accueil qu'un étudiant non connecté et ainsi voir les Data Challenges/Battles, leurs informations et y participer.

Si un étudiant connecté choisi de participer à un événement, cela crée une équipe et le met capitaine. Il peut ensuite choisir un nom d'équipe, le projet auquel il souhaite participer (seulement pour les Data Challenges, car il n'y a qu'un projet unique pour les Data Battle) et inviter d'autres Étudiants à rejoindre son équipe.

Les membres de l'équipe qui ne sont pas capitaine peuvent uniquement accéder aux informations de l'équipe (projet choisi par le capitaine, nom équipe et nom des membres).

Une fois qu'un étudiant connecté participe à un Data Challenge il accède à toutes les informations du DataChallenge, peut consulter les ressources, échanger des messages avec les gestionnaires de l'évènement. De plus, s'il est capitaine, il peut ajouter le lien GitHub du projet.

Une fois qu'un étudiant connecté participe à un Data Battle en plus de tout ce qui est écrit ci-dessus, l'utilisateur peut voir les questionnaires et s'il est capitaine, il peut y répondre.

## Description des fonctionnalités des utilisateurs non connectés

Les visiteurs voient la page d'accueil avec tous les Data Challenges/Battles, peuvent consulter les informations et choisir d'y participer. S'ils cliquent sur participer ils sont invités à se connecter ou à créer un compte.

# Conception et architecture

## Présentation de l'architecture globale de l'application

L'architecture globale de l'application se compose d'un front-end développé avec React, un back-end utilisant des API en PHP et Java, un serveur MySQL pour gérer la base de données, le tout étant conteneurisé à l'aide de Docker. Cette architecture permet une conception modulaire et flexible de l'application, facilitant son développement, sa gestion des données et son déploiement sur différents environnements.

## Description des choix technologiques et des outils utilisés

Front : React est une bibliothèque JavaScript populaire pour la création d'interfaces utilisateur interactives et réactives. Il offre une approche déclarative et modulaire du développement d'applications web, ce qui facilite la création et la gestion de composants réutilisables. React permet également une mise à jour efficace et optimisée de l'interface utilisateur, grâce à son algorithme de rendu virtuel. Son écosystème riche et sa grande communauté de développeurs en font un choix solide pour le développement de l'interface utilisateur d'une application web.

Back : L'utilisation d'API PHP et Java offre une flexibilité dans le choix des technologies de développement du backend. PHP est un langage de script côté serveur largement utilisé, connu pour sa facilité d'apprentissage et sa compatibilité avec de nombreux systèmes d'exploitation et serveurs web. Java, quant à lui, est un langage de programmation polyvalent et robuste, souvent utilisé pour le développement d'applications d'entreprise et de services web. Ces deux langages offrent une grande variété de bibliothèques et de frameworks pour faciliter le développement, la gestion des données et la communication avec d'autres services.

Serveur MySQL : MySQL est un système de gestion de base de données relationnelle largement utilisé. Il offre une grande fiabilité, des performances élevées et une compatibilité avec de nombreux langages de programmation. En utilisant MySQL, l'application peut stocker et gérer les données de manière efficace et sécurisée.

Docker : Docker est une technologie de conteneurisation qui permet de créer et de gérer des conteneurs légers et portables pour les applications. En utilisant Docker, il devient plus facile de déployer et de gérer l'application sur différents environnements, en assurant la portabilité et la cohérence du système. Les conteneurs Docker permettent également d'isoler les différentes parties de l'application, facilitant ainsi la gestion des dépendances et la scalabilité horizontale. Docker simplifie le déploiement de l'application et réduit les problèmes potentiels liés à la configuration de l'environnement de production.

En résumé, l'utilisation de React pour le frontend, des API PHP et Java pour le backend, et Docker pour la conteneurisation, offre une combinaison solide de technologies qui permet une conception modulaire, une flexibilité de développement et un déploiement simplifié de l'application. Ces choix sont basés sur la popularité, la facilité d'utilisation, la robustesse et la compatibilité des technologies, ainsi que sur la disponibilité d'une vaste communauté de développeurs et de ressources pour les soutenir.

## Présentation des diagrammes et de la maquette

Avant de commencer la conception du modèle conceptuel de données (MCD) et de la base de données (BDD), nous avons réalisé plusieurs diagrammes spécifiques afin de mieux appréhender le projet et visualiser les fonctionnalités ainsi que les pages que nous devrons développer. Ces diagrammes nous ont permis de nous approprier le projet et d'avoir une vision claire de sa structure et de son fonctionnement. Ils constituent une étape préliminaire importante dans le processus de conception de l'application.

### Diagramme use case

Dans un premier temps, nous avons créé un diagramme de cas d'utilisation qui illustre toutes les interactions de nos utilisateurs avec le système.

![Diagramme use case](images/diagramme_use_case.jpg){height=100%}

### Diagramme pages

Ensuite, nous avons élaboré des diagrammes pour visualiser les pages que nous devrons développer et leurs interactions.

![Diagramme page 1](images/diagramme_page1.jpg){height=100%}

![Diagramme page 2](images/diagramme_page2.jpg){height=100%}

### Maquette

Grâce à ces diagrammes, nous avons réalisé une maquette pour nous assurer de développer un site cohérent et pour faciliter la répartition des tâches entre les membres de l'équipe.

#### Utilisateur non connecté

![Visiteur : Accueil](images/maquette/Visiteur/nonConnect%C3%A9_Accueil.png){height=100%}

![Visiteur : Infos Evenement](images/maquette/Visiteur/nonConnect%C3%A9_DataChallengeExemple.png){height=100%}

![Visiteur : Connexion](images/maquette/Visiteur/nonConnect%C3%A9_Connexion.png){height=100%}

![Visiteur : Créer compte](images/maquette/Visiteur/nonConnect%C3%A9_Cr%C3%A9erCompte.png){height=100%}

#### Utilisateur connecté

![Étudiant connecté : Mes évènements](images/maquette/Etudiant/Connect%C3%A9_MesDataChallenges.png){height=100%}

![Étudiant connecté : Créer équipe](images/maquette/Etudiant/Connect%C3%A9_MesDataChallengesEexmpleCreerEquipe.png){height=100%}

![Étudiant connecté : Voir équipe](images/maquette/Etudiant/Connect%C3%A9_MesDataChallengesExempleVoirEquipe(PasChef).png){height=100%}

![Étudiant connecté : Information projet suivi](images/maquette/Etudiant/Connect%C3%A9_MesDataChallengesExempleEquipe.png){height=100%}

![Étudiant connecté : Profil](images/maquette/Etudiant/Connect%C3%A9_MesDataChallengesExemple.png){height=100%}

#### Gestionnaire

![Gestionnaire : Mes évènements](images/maquette/Gestionnaire/Mes_evenements.png){height=100%}

![Gestionnaire : Gestion Data Challenge](images/maquette/Gestionnaire/Gestionnaire_DataChallengesExemple.png){height=100%}

![Gestionnaire : Gestion Data Battle](images/maquette/Gestionnaire/Gestionnaire_ProjetExemple.png){height=100%}

![Gestionnaire : Profil](images/maquette/Gestionnaire/profil.png){height=100%}

#### Administrateur

![Administrateur : Administrer](images/maquette/Administrateur/1.png){height=100%}

![Administrateur : Administrer Utilisateurs](images/maquette/Administrateur/2.png){height=100%}

![Administrateur : Administrer Utilisateurs -> Admin/Étudiant](images/maquette/Administrateur/3.png){height=100%}

![Administrateur : Administrer Utilisateurs -> Gestionnaire](images/maquette/Administrateur/4.png){height=100%}

![Administrateur : Administrer Evenements](images/maquette/Administrateur/5.png){height=100%}

![Administrateur : Administrer Evenements -> Data Challenge](images/maquette/Administrateur/6.png){height=100%}

![Administrateur : Administrer Evenements -> Data Battle](images/maquette/Administrateur/7.png){height=100%}

![Administrateur : Administrer Evenements -> Data Challenge -> Projet](images/maquette/Administrateur/8.png){height=100%}

![Administrateur : Administrer Ressources](images/maquette/Administrateur/9.png){height=100%}


### Postman

Nous avons adopté une approche de développement où nous avons séparé le backend (API PHP) du frontend de notre application. Pour documenter et tester les différentes requêtes de notre API, nous avons utilisé Postman.

Postman est un outil très pratique qui nous permet de documenter et d'explorer les fonctionnalités de notre API. Nous pouvons créer des collections de requêtes, définir les paramètres et les en-têtes nécessaires, et tester chaque requête pour nous assurer qu'elle fonctionne correctement.

En utilisant Postman, nous avons pu établir une documentation complète de notre API, y compris les différentes routes, les méthodes HTTP supportées, les paramètres requis et facultatifs, ainsi que les réponses attendues. Cela facilite la collaboration avec notre équipe de développement frontend, car ils peuvent consulter la documentation pour comprendre comment interagir avec l'API et utiliser les données retournées.

De plus, Postman nous a permis de tester chaque requête individuellement pour nous assurer que notre API répond correctement et renvoie les données attendues. Nous avons pu vérifier les résultats et traiter les erreurs éventuelles pour améliorer la robustesse et la fiabilité de notre application.

En résumé, l'utilisation de Postman pour documenter et tester notre API PHP nous a permis de faciliter la communication et la collaboration entre le backend et le frontend de notre application, en assurant une compréhension commune des fonctionnalités de l'API et en garantissant son bon fonctionnement.

![Postman toutes nos requêtes](images/postman/requetes.jpg){height=100%}

![Postman exemple 1](images/postman/exemple_createEvenement.png){height=100%}

![Postman exemple 2](images/postman/exemple2.jpg){height=100%}

## Présentation des modèles de données 

Lors de la conception de notre application, nous avons réalisé une modélisation des données en utilisant un Modèle Conceptuel de Données (MCD) et en construisant une Base de Données (BDD) en conséquence. Cette étape est cruciale pour définir la structure des données et les relations entre les différentes entités de notre système.

Nous avons récemment mis à jour notre Modèle Conceptuel de Données (MCD) et notre Base de Données (BDD) pour prendre en compte les nouvelles fonctionnalités et les évolutions de notre application. Les choix de modélisation ont été faits en tenant compte de la nature des données à stocker, des relations entre les entités et des contraintes de notre système.

![MCD](images/mcd.png){height=100%}

Pour répondre aux besoins de notre application, nous avons fait les choix de modélisation suivants :

- Table "Evenement" : Nous avons créé une table "Evenement" pour stocker les informations relatives aux événements, tels que les Data Challenges et les Data Battles. Cette table contient des attributs tels que "TypeEvenement" (pour distinguer les différents types d'événements), "Libele" (le titre de l'événement), "Description" (une brève description de l'événement), "Recompenses" (les récompenses associées à l'événement) et les dates de début et de fin de l'événement.

- Tables "Projet" et "Questionnaire" : Nous avons créé une table "Projet" pour stocker les informations sur les projets associés à un événement. Chaque projet est lié à un événement spécifique. De plus, nous avons ajouté une table "Questionnaire" pour stocker les informations sur les questionnaires associés à chaque projet. Cette modélisation nous permet de lier plusieurs questionnaires à un projet spécifique.

- Tables "Equipe" et "User" : Nous avons créé une table "Equipe" pour stocker les informations sur les équipes participantes. Chaque équipe est liée à un projet spécifique. De plus, nous avons une table "User" pour stocker les informations sur les utilisateurs, tels que leur nom, prénom, adresse e-mail, etc. Les utilisateurs peuvent appartenir à une équipe spécifique, ce qui est modélisé par une relation "Appartenir" entre les tables "User" et "Equipe".

- Tables de relations et de liens : Nous avons créé des tables de relations pour modéliser les liens entre les entités. Par exemple, nous avons une table "Preinscription" pour stocker les préinscriptions des utilisateurs à des équipes spécifiques, une table "NoteQuestionnaire" pour stocker les notes attribuées par une équipe à un questionnaire, et une table "ReponseQuestion" pour stocker les réponses des équipes aux questions du questionnaire.

- Contraintes d'intégrité référentielle : Nous avons utilisé des contraintes d'intégrité référentielle pour garantir la cohérence des données entre les tables. Par exemple, nous avons défini des clés étrangères pour relier les entités entre elles et assurer la suppression en cascade des enregistrements liés lorsque des entités parentes sont supprimées.

Ces choix de modélisation nous permettent de stocker et de gérer efficacement les données de notre application, en assurant la cohérence et l'intégrité des informations.

# Développement et implémentation

## Présentation des différentes étapes de développement

Expliquer nos étapes, on a commencé brainstorming, fait les diagrammes séquence, use case puis BDD et maquette, creation equipes BACK ET FRONT, ensuite on a développé Backend et Front end symbiose.

## Présentation du développement des composants React (EQUIPE FRONT !!!!!!!!!)


## Présentation du web service REST PHP (PARLER DE LA SECURISATION)

Parler de la sécurisation PHP avec JWT

## Présentation de l'API Java (ARTHUR !!!!!!!!!!)

Description du fonctionnement de l'analyseur de code et de la visualisation des résultats.

Mettre graphe.

## Description des fonctionnalités implémentées

Descriptions fonctionnalités implémentés et mettre des images. 

# Résultats et évaluation

## Présentation des résultats obtenus par l'application

Parler des réultats obtenus par l'app

## Évaluation de la conformité des fonctionnalités par rapport aux attentes

Présentation de la conformité des fonctionnalités par rapport aux attendes

# Perspectives et améliorations futures

## Liste des fonctionnalités restantes à implémenter

Ici on parle des fonctionnalités restantes à implémenter et au cahier des charges

## Propositions d'améliorations et d'évolutions pour l'application

Ici on parle des fonctionnalités qu'on pourrait implémenter mais qui ne sont pas au cahier des charges

# Conclusion 

## Bilan du projet

Notre mission consistait à concevoir et à développer un site internet interactif et convivial, offrant une plateforme intuitive permettant aux utilisateurs de s'inscrire et de participer aux différentes compétitions liées à l'intelligence artificielle organisées par l'association IA Pau. Le site devait présenter un design moderne et attractif, tout en offrant une navigation fluide et une expérience utilisateur agréable.

L'une des principales fonctionnalités que nous avons développées était le système d'inscription aux Data Battles et aux Data Challenges. Les utilisateurs pouvaient créer un compte, se connecter et choisir parmi les différentes compétitions disponibles. Le site devait également permettre aux utilisateurs de consulter les informations détaillées sur chaque compétition, telles que les dates, les règles et les récompenses.

Nous avons également inclus des fonctionnalités de suivi des progrès et de classement, où les utilisateurs pouvaient suivre leur évolution tout au long des compétitions et comparer leurs résultats avec ceux des autres participants. Cela favorisait un esprit de compétition sain et stimulant, encourageant les utilisateurs à s'impliquer davantage et à améliorer leurs compétences en matière d'intelligence artificielle.

En outre, nous avons accordé une attention particulière à la convivialité du site, en veillant à ce qu'il soit accessible à tous les utilisateurs, quel que soit leur niveau de compétence en informatique. Nous avons optimisé l'interface utilisateur, en mettant l'accent sur la simplicité et la clarté, afin de garantir une expérience utilisateur fluide et agréable.

En résumé, ce projet de fin d'année a été une occasion unique de mettre en pratique nos compétences et connaissances en développement web tout en travaillant en équipe. Nous sommes fiers d'avoir contribué à la création d'un site internet complet et dynamique pour l'association IA Pau, offrant aux utilisateurs une plateforme interactive pour s'inscrire et participer aux compétitions liées à l'intelligence artificielle. Ce projet nous a permis d'acquérir une expérience précieuse et de nous préparer pour les défis à venir dans notre parcours d'ingénieur.

## Récapitulation des réalisations

SUREMENT RIEN


## Retour sur les apprentissages et les difficultés rencontrées

Parler des difficultés à utiliser GitHub, on a du s'auto former, une formation au sein de l'école en première année d'ing serait superbe. Cours sur le versionning. Taille du projet particulièrement longue.

# Annexes

Surement rien ici.

## Fichiers de code source pertinents

Surement rien

## Documentation technique

Surement rien

## Capture d'écran de l'application ou lien vers une démo en ligne
