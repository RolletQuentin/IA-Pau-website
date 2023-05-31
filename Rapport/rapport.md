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

Ce projet a été conçu dans le but de nous permettre d'appliquer concrètement les compétences que nous avons acquises tout au long de notre première année. En travaillant en équipe, nous avons eu l'occasion de collaborer avec des camarades de promotion, formant ainsi des équipes aléatoires, afin de développer nos compétences en travail d'équipe et de renforcer notre capacité à travailler avec autrui. L'objectif principal était de concevoir un site permettant aux utilisateurs de s'inscrire et de participer aux DataBattles et Data Challenges proposés par l'association IAPau.

# Analyse des besoins

## Présentation du contexte de l'association IA PAU

L'association IA Pau est une organisation à but non lucratif qui organise divers événements liés à l'intelligence artificielle, dont les Data Challenges et les Data Battles.

## Description du déroulement d'un data challenge

Un Data Challenge est une compétition sur un weekend dans laquelle plusieurs équipes s'affrontent pour résoudre un problème spécifique en utilisant des techniques de traitement et d'analyse des données. Les équipes sont évaluées en fonction de la qualité de leurs résultats et de leur approche méthodologique.
Un Data Battle est une variante du Data Challenge qui se déroule sur une période d'un mois. Il se compose d'un projet unique et les équipes participantes doivent répondre à des questionnaires hebdomadaires. Un podium est affiché sur la page d'accueil du site, mis à jour chaque semaine en fonction des résultats des questionnaires.

## Identification des besoins et enjeux de l'application

L'objectif de l'application que nous devons développer est de fournir une plateforme en ligne permettant aux utilisateurs de s'inscrire et de participer aux Data Challenges et aux Data Battles organisés par l'association IA Pau. Les principaux besoins et enjeux identifiés sont :

- VISITEUR : Accès aux informations des Data Challenges et Battles pour tous les visiteurs non inscrits.

- VISITEUR : Affichage du podium (pour les DataBattle) : Un podium doit être affiché sur la page d'accueil du site, montrant le classement des équipes en fonction de leurs performances dans les questionnaires.

- ÉTUDIANT : Inscription des utilisateurs : Les utilisateurs doivent pouvoir s'inscrire sur le site en fournissant leurs informations personnelles.

- ÉTUDIANT : Gestion des équipes : Les utilisateurs doivent avoir la possibilité de former des équipes ou de rejoindre des équipes existantes pour participer aux compétitions.

- ÉTUDIANT : Soumission des résultats : Les équipes participantes doivent pouvoir soumettre leurs résultats pour évaluation.

- ÉTUDIANT : Communication avec les gestionnaires par messages.

- ÉTUDIANT : Questionnaires hebdomadaires (pour les DataBattle) : Les équipes doivent pouvoir répondre aux questionnaires hebdomadaires pour accumuler des points et améliorer leur classement.

- GESTIONNAIRE : Accéder à tous les Data Challenges et Battle que l'on gère.

- GESTIONNAIRE : Echanger des messages avec tous les Étudiants d'un Data Challenges et Battles et d'un Projet en particulier et même d'une équipe en particulier.

- GESTIONNAIRE : Création de questionnaires, voir les réponses des équipes et les noter.

- ADMINISTRATEUR : Gestion pour les Administrateurs : Les Administrateurs du sites doivent pouvoir créer, éditer et supprimer des Administrateurs, Gestionnaires et Étudiants, des Data Challenges, Battle et des Projets. 

Nous détaillerons plus bas les besoins et enjeux, ainsi que les fonctionnalités spécifiques à mettre en place pour répondre à ces exigences.

# Spécifications fonctionnelles

## Présentation des différents profils utilisateurs (administrateurs, gestionnaires, étudiants, visiteurs)

Le site accueille quatre types d'utilisateurs, des Administrateurs, des Gestionnaires (interne ou externe), des Étudiants et des visiteurs.

## Description des fonctionnalités d'administration

L'Administrateur peut accéder à un panneau principal où il peut administrer les Utilisateurs, les DataChallenges ainsi que les ressources.

- Utilisateurs :

Lorsqu'il administre les utilisateurs il peut modifier les informations des utilisateurs, créer un utilisateur (Administrateur, Étudiant ou Gestionnaire).
Il éxiste deux types de gestionnaire, le gestionnaire interne (fait partie de IA Pau, pas de date de fin d'activation) et le gestionnaire externe.

- DataChallenges :

Nous pouvons créer, modifier ou supprimer un DataChallenge. Un DataChallenge à deux type : DataChallenge ou DataBattle.
Si nous choisissons de créer un DataChallenge, nous pouvons créer plusieurs projets pour ce DataChallenge alors que si nous choisissons de créer un DataBattle, nous ne pouvons ajouter qu'un projet.

Nous pouvons ajouter des ressources au DataChallenge ainsi qu'à tous les projets.
Lier des gestionnaires.

- Ressources : 

Nous pouvons gérer nos ressources, les supprimer, les modifier ainsi qu'en ajouter.

## Description des fonctionnalités pour les gestionnaires

Le gestionnaire n'a pas beaucoup de fonctionnalités, son compte est crée par un Administrateur. Il peut être assigné à un/des DataChallenge et à un/des Projets.
Il peut modifier son profil afin de redéfinir son mot de passe.
Il peut accéder aux dataChallenges / battles qu'il gère.

S'il clic sur un DataChallenge ou un Projet, il peut envoyer des messages à tous les membres du DataChallenge/Projet. Il peut également assister aux dossier des étudiants afin de voir leur lien gitHub etc..

S'il clic sur un DataBattle il peut envoyer des messages à tous les membres du DataBattle. Il peut également créer des questions pour le questionnaire du DataBattle.


## Description des fonctionnalités principales pour les étudiants connectés

Un étudiant connecté peut consulter la même page d'accueil qu'un étudiant non connecté et ainsi voir les DataChallenges/Battles, leurs informations et y participer.
Si un étudiant connecté choisi d'y participer cela crée une équipe et le met chef. Il peut ensuite choisir un nom d'équpe, le projet auquel il souhaite participer (seulement si DataChallenges <=> projets multiples) et inviter des utilisateurs à rejoindre son équipe. Les membres de l'équipe qui ne sont pas le chef peuvent uniquement accéder aux informations de l'équipe (nom équipe et nom des membres).
Une fois qu'un étudiant connecté participe à un DataChallenge il accède à toutes les informations du DataChallenge peut consulter les ressources, s'il est chef d'équipe il peut ajouter le lien GitHub du projet. De plus il peut voir les messages que le gestionnaire lui envoi.
Un fois qu'un étudiant connecté participe à un DataBattle en plus de tout ce qui est écrit ci-dessus, l'utilisateur peut voir les questionnaires et s'il est le chef il peut y répondre.

## Description des fonctionnalités des utilisateurs non connectés

Les visiteurs voient la page d'accueil avec tous les DataChallenges/Battles, peuvent consulter les informations et choisir d'y participer.
S'ils cliquent sur participer ils sont invités à se connecter où à créer un compte.

# Conception et architecture

## Présentation de l'architecture globale de l'application



## Description des choix technologiques et des outils utilisés

Front : Serveur React

Back : Api PHP, Api Java

## Présentation des modèles de données (BDD, MCD)

Présenter la MCD et la BDD (Il faut les mettre à jour avant)

## Présentation des diagrammes pertinents (séquence, use case, etc.)

On ajoute les diagrammes ici

# Développement et implémentation

## Présentation des différentes étapes de développement

Expliquer nos étapes, on a commencé brainstorming, fait les diagrammes séquence, use case puis BDD et maquette, ensuite on a développé Backend et Front end symbiose.

## Description des fonctionnalités implémentées

Descriptions fonctionnalités implémentés

## Présentation du web service REST et de l'API en Java pour l'analyse de code source

PARTIE ARTHUR

## Description de la visualisation des résultats d'analyse de code source

PARTIE ARTHUR Mettre Graphe

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



## Retour sur les apprentissages et les difficultés rencontrées

Parler des difficultés à utiliser GitHub, on a du s'auto former, une formation au sein de l'école en première année d'ing serait superbe. Cours sur le versionning. Taille du projet particulièrement longue.

# Annexes

Surement rien ici.

## Fichiers de code source pertinents

## Documentation technique

## Capture d'écran de l'application ou lien vers une démo en ligne
