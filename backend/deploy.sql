
DROP DATABASE IF EXISTS IA_Pau_database;

CREATE DATABASE IF NOT EXISTS IA_Pau_database;

USE IA_Pau_database;

-- EVENEMENT (DataChallenge ou DataBattle)
CREATE TABLE IF NOT EXISTS Evenement (
    IdEvenement INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    TypeEvenement VARCHAR(32),
    Libele VARCHAR(64),
    Description VARCHAR(2048),
    Recompenses VARCHAR(2048),
    Debut DATE,
    Fin DATE
);

-- ------------------------- MODIF PATRICE --------------------------------
-- EVENEMENT (Projet) MODIFICATION POUR LIER A EVENEMENT
CREATE TABLE IF NOT EXISTS Projet(
    IdProjet INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdEvenement INTEGER(16),
    Libele VARCHAR(64),
    Description VARCHAR(2048),
    Image VARCHAR(2048),
    Entreprise VARCHAR(128),
    FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement) ON DELETE CASCADE
);

-- EVENEMENT
CREATE TABLE IF NOT EXISTS Questionnaire(
    IdQuestionnaire INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdProjet INTEGER(16),
    Titre VARCHAR(64),
    Sujet VARCHAR(2048),
    Debut DATE,
    Fin DATE,
    FOREIGN KEY (IdProjet) REFERENCES Projet (IdProjet) ON DELETE CASCADE
);

-- EVENEMENT
CREATE TABLE IF NOT EXISTS Question(
    IdQuestion INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdQuestionnaire INTEGER(16),
    Question VARCHAR(512),
    FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire) ON DELETE CASCADE
);

-- USER ?
CREATE TABLE IF NOT EXISTS Equipe (
    IdEquipe INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(128),
    IdLeader INTEGER(16),
    Score INTEGER(16),
    LienProjet VARCHAR(512),
    IdProjet INTEGER(16),
    FOREIGN KEY (IdProjet) REFERENCES Projet (IdProjet) ON DELETE CASCADE
);

-- USER
CREATE TABLE IF NOT EXISTS User(
    Identifiant INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(128),
    Nom VARCHAR(32),
    Prenom VARCHAR(32),
    Img VARCHAR(256),
    NumTel INTEGER(10),
    Mdp VARCHAR(255)
);

-- USER
CREATE TABLE IF NOT EXISTS Preinscription(
    Identifiant INTEGER(16),
    IdEquipe INTEGER(16),
    CONSTRAINT fkPreInsc1 FOREIGN KEY (Identifiant) REFERENCES User (Identifiant) ON DELETE CASCADE,
    CONSTRAINT fkPreInsc2 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe) ON DELETE CASCADE,
    CONSTRAINT pkPreInsc PRIMARY KEY (Identifiant, IdEquipe)
);

-- USER
CREATE TABLE IF NOT EXISTS Etudiant(
    NumeroEtudiant INTEGER(255) PRIMARY KEY,
    NiveauEtude VARCHAR(4),
    Ecole VARCHAR(32),
    Ville VARCHAR(32),
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant) ON DELETE CASCADE
);

-- USER
CREATE TABLE IF NOT EXISTS Gestionnaire(
    IdGestionnaire INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Entreprise VARCHAR(64),
    Ville VARCHAR(32),
    Debut DATE,
    Fin DATE,
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant) ON DELETE CASCADE
);

-- USER
CREATE TABLE IF NOT EXISTS Administrateur(
    IdAdmin INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    Identifiant INTEGER(16),
    FOREIGN KEY (Identifiant) REFERENCES User (Identifiant) ON DELETE CASCADE
);

-- EVENEMENT (Bizarre, un message peut être envoyé à un dataChallenge, à un projet, à une éuipe, à un user)
-- IMPLEMENTE GESTION MESSAGE PRIVE ET BOUCLER POUR LES AUTRES ? REDONDANCE DONNEES ? REVOIR MODELISATION MESSAGE !!!!!!!!!
CREATE TABLE IF NOT EXISTS Message(
    IdMessage INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    IdEvenement INTEGER(16),
    DateMessage DATE,
    IdSender INTEGER(16),
    Contenu VARCHAR(4096),
    IdEquipe INTEGER(16),
    CONSTRAINT fk1 FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement) ON DELETE CASCADE,
    CONSTRAINT fk2 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe) ON DELETE CASCADE
);

-- RESSOURCES Doit pouvoir etre lié a plusieurs projets il nous manque le lien posseder
CREATE TABLE IF NOT EXISTS Ressources(
    IdRessource INTEGER(16) PRIMARY KEY AUTO_INCREMENT,
    UrlRessource VARCHAR(2048),
    NomRessource VARCHAR(512)
);
-- RESSOURCE A ECRIRE
CREATE TABLE IF NOT EXISTS PossederRessource(
    IdRessource INTEGER(16) AUTO_INCREMENT,
    IdProjet INTEGER(16),
    CONSTRAINT pPR PRIMARY KEY (IdRessource, IdProjet),
    CONSTRAINT fkPR1 FOREIGN KEY (IdProjet) REFERENCES Projet (IdProjet) ON DELETE CASCADE,
    CONSTRAINT fkPR2 FOREIGN KEY (IdRessource) REFERENCES Ressources (IdRessource) ON DELETE CASCADE
);
-- ------------------------------------------------

-- EVENEMENT (Notes Questionnaire)
CREATE TABLE IF NOT EXISTS NoteQuestionnaire(
    IdQuestionnaire INTEGER(16),
    IdEquipe INTEGER(16),
    Score INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (IdQuestionnaire, IdEquipe),
    CONSTRAINT fk3 FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire) ON DELETE CASCADE,
    CONSTRAINT fk4 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ReponseQuestion(
    IdQuestion INTEGER(16),
    IdEquipe INTEGER(16),
    Reponse VARCHAR(4096),
    CONSTRAINT pkRQuestion PRIMARY KEY (IdQuestion, IdEquipe),
    CONSTRAINT fkRQuestion1 FOREIGN KEY (IdQuestion) REFERENCES Question (IdQuestion) ON DELETE CASCADE,
    CONSTRAINT fkRQuestion2 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ReponseQuestionnaire(
    IdQuestionnaire INTEGER(16),
    IdEquipe INTEGER(16),
    DateReponse DATE,
    CONSTRAINT pkRQuestionnaire PRIMARY KEY (IdQuestionnaire, IdEquipe),
    CONSTRAINT fkRQuestionnaire1 FOREIGN KEY (IdQuestionnaire) REFERENCES Questionnaire (IdQuestionnaire) ON DELETE CASCADE,
    CONSTRAINT fkRQuestionnaire2 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe) ON DELETE CASCADE
);


-- USER
CREATE TABLE IF NOT EXISTS Inscrire(
    Identifiant INTEGER(16),
    IdEvenement INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (Identifiant, IdEvenement),
    CONSTRAINT fk5 FOREIGN KEY (Identifiant) REFERENCES User (Identifiant) ON DELETE CASCADE,
    CONSTRAINT fk6 FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement) ON DELETE CASCADE
);

-- USER (User appartenir à Equipe)
CREATE TABLE IF NOT EXISTS Appartenir(
    Identifiant INTEGER(16),
    IdEquipe INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (Identifiant, IdEquipe),
    CONSTRAINT fk7 FOREIGN KEY (Identifiant) REFERENCES User (Identifiant) ON DELETE CASCADE,
    CONSTRAINT fk8 FOREIGN KEY (IdEquipe) REFERENCES Equipe (IdEquipe) ON DELETE CASCADE
);

-- USER & EVENEMENT
CREATE TABLE IF NOT EXISTS Gerer(
    IdGestionnaire INTEGER(16),
    IdEvenement INTEGER(16),
    CONSTRAINT p1 PRIMARY KEY (IdEvenement, IdGestionnaire),
    CONSTRAINT fk9 FOREIGN KEY (IdGestionnaire) REFERENCES Gestionnaire (IdGestionnaire) ON DELETE CASCADE,
    CONSTRAINT fk10 FOREIGN KEY (IdEvenement) REFERENCES Evenement (IdEvenement) ON DELETE CASCADE
);


-- ON CHARGE DONNEES TEST -----------------
-- Administrateur: --
INSERT INTO User (Email, Nom, Prenom, NumTel, Mdp) VALUES ('root@root.fr', 'Root', 'Root', 769030682, '$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O');
INSERT INTO Administrateur (Identifiant) VALUES (1);
-- Etudiant --
INSERT INTO User (Email, Nom, Prenom, NumTel, Mdp) VALUES ('etudiant@etudiant.fr', 'Etudiant', 'Etudiant', 769590682, '$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O');
INSERT INTO Etudiant VALUES (225618948, "L3", "CyTech", "Pau", 2);


-- User etudiant--
-- Ceux de l'équipe 1 (Sur DataBattle)
INSERT INTO User VALUES (4,"test@test.fr", "Dupont", "Jean", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O"); -- (Notre Leader equipe 1)
INSERT INTO Etudiant VALUES (00000004, "L3", "NomEcole", "NomVille", 4);
INSERT INTO User VALUES (5,"test1@test.fr", "Dupont", "Paul", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O"); -- (Nos membres equipe 1)
INSERT INTO Etudiant VALUES (00000005, "M1", "NomEcole", "NomVille", 5);
INSERT INTO User VALUES (6,"test2@test.fr", "Dupont", "Bob", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000006, "L3", "NomEcole", "NomVille", 6);
INSERT INTO User VALUES (7,"test3@test.fr", "Dupont", "Quentin", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000007, "M2", "NomEcole", "NomVille", 7);
-- Ceux de l'équipe 2 (Sur DataBattle)
INSERT INTO User VALUES (8, "test4@test.fr", "Martin", "Sophie", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000008, "L3", "NomEcole", "NomVille", 8);
INSERT INTO User VALUES (9, "test5@test.fr", "Lefebvre", "Alexandre", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000009, "M1", "NomEcole", "NomVille", 9);
INSERT INTO User VALUES (10, "test6@test.fr", "Dubois", "Emma", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000010, "L3", "NomEcole", "NomVille", 10);
INSERT INTO User VALUES (11, "test7@test.fr", "Roux", "Lucas", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000011, "M2", "NomEcole", "NomVille", 11);
-- Ceux de l'équipe 3 (Sur DataChallenge1 Projet 1)
INSERT INTO User VALUES (12, "test8@test.fr", "Leclerc", "Camille", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000012, "L3", "NomEcole", "NomVille", 12);
INSERT INTO User VALUES (13, "test9@test.fr", "Girard", "Inès", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000013, "M1", "NomEcole", "NomVille", 13);
INSERT INTO User VALUES (14, "test10@test.fr", "Fournier", "Arthur", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000014, "L3", "NomEcole", "NomVille", 14);
INSERT INTO User VALUES (15, "test11@test.fr", "Moreau", "Léa", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000015, "M2", "NomEcole", "NomVille", 15);
-- Ceux de l'équipe 4 (Sur DataChallenge1 Projet 2)
INSERT INTO User VALUES (16, "test12@test.fr", "Dupuis", "Maxime", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000016, "L3", "NomEcole", "NomVille", 16);
INSERT INTO User VALUES (17, "test13@test.fr", "Marchand", "Laura", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000017, "M1", "NomEcole", "NomVille", 17);
INSERT INTO User VALUES (18, "test14@test.fr", "Noel", "Antoine", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000018, "L3", "NomEcole", "NomVille", 18);
INSERT INTO User VALUES (19, "test15@test.fr", "Lemoine", "Julie", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000019, "M2", "NomEcole", "NomVille", 19);
-- Ceux de l'équipe 5 (Sur DataChallenge2 Projet 1)
INSERT INTO User VALUES (20, "test16@test.fr", "Roy", "Nicolas", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000020, "L3", "NomEcole", "NomVille", 20);
INSERT INTO User VALUES (21, "test17@test.fr", "Morin", "Catherine", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000021, "M1", "NomEcole", "NomVille", 21);
INSERT INTO User VALUES (22, "test18@test.fr", "Gagnon", "Thomas", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000022, "L3", "NomEcole", "NomVille", 22);
INSERT INTO User VALUES (23, "test19@test.fr", "Bouchard", "Mathilde", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000023, "M2", "NomEcole", "NomVille", 23);
-- Ceux de l'équipe 6 (Sur DataChallenge2 Projet 2)
INSERT INTO User VALUES (24, "test20@test.fr", "Fortin", "Alexis", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000024, "L3", "NomEcole", "NomVille", 24);
INSERT INTO User VALUES (25, "test21@test.fr", "Laplante", "Emma", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000025, "M1", "NomEcole", "NomVille", 25);
INSERT INTO User VALUES (26, "test22@test.fr", "Dejardin", "Maxime", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000026, "L3", "NomEcole", "NomVille", 26);
INSERT INTO User VALUES (27, "test23@test.fr", "Lamoureux", "Sophie", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Etudiant VALUES (00000027, "M2", "NomEcole", "NomVille", 27);

-- User Gestionnaire (Si interne date > 2100)
INSERT INTO User VALUES (28, "gest1@test.fr", "Rimaudiere", "Arthur", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Gestionnaire VALUES (1, "NomEntreprise", "Ville", "2023-06-01", "2023-06-17", 28);
INSERT INTO User VALUES (29, "gest2@test.fr", "Quentin", "Rollet", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Gestionnaire VALUES (2, "IaPau", "Ville", "2023-01-01", "2100-12-31", 29);
INSERT INTO User VALUES (30, "gest3@test.fr", "Valentin", "Noailles", "imageProfil", 0600000000, "$2y$10$t3JBKvbPU0OMqA/zwP/7deivYYJMtxVpH.uO9sAKziX6bsEMc2n9O");
INSERT INTO Gestionnaire VALUES (3, "IaPau", "Ville", "2023-01-01", "2100-12-31", 30);

-- Evenements --
INSERT INTO Evenement VALUES (1, "DataBattle", "Cyberdéfense des entreprises", "Rejoignez-nous pour l'événement exclusif de lancement de CyberShield, la solution révolutionnaire en matière de cybersécurité. Cet événement d'une journée rassemblera les principaux experts en sécurité informatique, les professionnels de l'industrie et les décideurs pour discuter des défis actuels de la cybersécurité et des meilleures pratiques pour protéger les entreprises contre les menaces numériques.", "1er 2000€, 2eme 1000€, 3eme 500€","2023-06-10", "2023-06-11");
INSERT INTO Evenement VALUES (2, "DataChallenge", "Eco Challenge", "Rejoignez notre projet de développement en lien avec l'écologie et devenez un acteur clé dans la préservation de notre planète. Nous vous offrons l'opportunité de créer des solutions technologiques innovantes qui contribueront à un avenir durable. Avec notre équipe passionnée d'experts en développement et d'écologistes, vous serez immergé dans un environnement de travail dynamique et motivant.", "1er 5000€, 2eme 3000€, 3eme 1000€", "2023-07-01", "2023-07-31");
INSERT INTO Evenement VALUES (3, "DataChallenge", "Another random Challenge", "Rejoignez notre projet de développement en lien avec l'écologie et devenez un acteur clé dans la préservation de notre planète. Nous vous offrons l'opportunité de créer des solutions technologiques innovantes qui contribueront à un avenir durable. Avec notre équipe passionnée d'experts en développement et d'écologistes, vous serez immergé dans un environnement de travail dynamique et motivant. ------- 2", "1er 3500€, 2eme 2000€, 3eme 1000€","2023-06-17", "2023-06-18");

-- Projets --
INSERT INTO Projet VALUES (1, 1, "CyberShield", "Le projet CyberShield vise à développer une solution avancée de cybersécurité pour protéger les entreprises contre les cyberattaques et les menaces en ligne. En combinant des technologies de pointe telles que l'intelligence artificielle et l'apprentissage automatique, CyberShield offre une défense proactive et adaptative contre les intrusions malveillantes, les logiciels malveillants et les attaques de phishing. La plateforme analyse en temps réel le trafic réseau, détecte les comportements suspects et bloque les tentatives d'intrusion. Elle fournit également des rapports détaillés et des analyses de vulnérabilité pour renforcer la résilience des systèmes informatiques. CyberShield permet aux entreprises de se concentrer sur leurs activités principales en leur offrant une protection solide et fiable contre les menaces cybernétiques.", "IMAGE", "Secure Tech Solutions"); -- Projet du DataBattle
INSERT INTO Projet VALUES (2, 2, "EcoTechClean", "EcoTechClean est une plateforme en ligne dédiée à la promotion et à la vente de produits de nettoyage écologiques et durables pour les particuliers et les entreprises. Notre objectif est de faciliter l'accès à des solutions respectueuses de l'environnement, tout en garantissant une efficacité optimale. Grâce à notre vaste gamme de produits soigneusement sélectionnés, allant des nettoyants multi-usages aux produits spécialisés, les utilisateurs peuvent maintenir un environnement propre et sain sans compromettre la planète. Notre site web convivial offre une expérience d'achat pratique et informative, avec des descriptions détaillées, des conseils d'utilisation et des évaluations des produits. Faites un pas vers un avenir plus propre avec EcoTechClean !", "IMAGE", "CleanEarth Solutions"); -- Projets dataChallenge 1
INSERT INTO Projet VALUES (3, 2, "EcoLink", "EcoLink est une plateforme en ligne qui vise à encourager et faciliter les échanges de produits et services écologiques entre les particuliers. L'objectif principal d'EcoLink est de promouvoir un mode de vie durable en favorisant la réutilisation et le partage des ressources. Les utilisateurs peuvent créer des profils, lister les articles qu'ils souhaitent donner, vendre ou échanger, et interagir avec d'autres membres de la communauté. L'interface conviviale d'EcoLink permet une navigation facile et intuitive, facilitant ainsi les échanges et renforçant les liens sociaux autour de la durabilité. Rejoignez EcoLink dès aujourd'hui et contribuez à construire un avenir plus respectueux de l'environnement.", "IMAGE", "GreenShare");
INSERT INTO Projet VALUES (4, 2, "EcoWave", "EcoWave est un projet novateur qui vise à développer une technologie révolutionnaire pour la production d'énergie propre à partir des vagues océaniques. En utilisant des convertisseurs d'énergie spécialement conçus, EcoWave exploite la force des vagues pour générer de l'électricité renouvelable de manière efficace et respectueuse de l'environnement. Cette technologie prometteuse offre une solution durable pour répondre aux besoins croissants en énergie tout en réduisant les émissions de carbone et en préservant les écosystèmes marins.", "IMAGE", "Ocean Power Tech");
INSERT INTO Projet VALUES (5, 2, "Smart Garden", "SmartGarden est un projet innovant qui vise à révolutionner l'expérience de jardinage en utilisant des technologies intelligentes. Il offre aux amateurs de jardinage une solution complète pour cultiver des plantes saines et prospères, même sans avoir de connaissances approfondies en horticulture. Grâce à un système automatisé de surveillance et de contrôle, SmartGarden ajuste automatiquement l'arrosage, l'éclairage et les nutriments pour chaque plante, en fonction de ses besoins spécifiques. Les utilisateurs peuvent suivre et gérer leur jardin à distance via une application mobile conviviale, qui fournit des conseils personnalisés, des alertes en cas de problèmes et des informations sur les plantes. Avec SmartGarden, tout le monde peut désormais profiter d'un jardinage simple, intelligent et gratifiant.", "IMAGE", "GreenTech Solutions"); -- Projets dataChallenge 2
INSERT INTO Projet VALUES (6, 2, "Plateforme écologique Connectée", "Le projet de la Plateforme Écologique Connectée vise à développer une solution technologique novatrice pour encourager et faciliter les comportements écologiques au quotidien. Grâce à une combinaison de capteurs intelligents, d'applications mobiles conviviales et de données environnementales, cette plateforme permet aux utilisateurs de suivre et de réduire leur empreinte carbone, de gérer efficacement leur consommation d'énergie, d'eau et de ressources, et de promouvoir des habitudes de vie durables. Elle offre également des conseils personnalisés, des défis écologiques et des incitations pour encourager les utilisateurs à adopter des pratiques respectueuses de l'environnement. La Plateforme Écologique Connectée constitue ainsi une solution globale pour contribuer à la préservation de notre planète.", "IMAGE", "Eco Tech Solution");

-- Gestionnaire par projet
INSERT INTO Gerer VALUES (1,1);
INSERT INTO Gerer VALUES (2,1);
INSERT INTO Gerer VALUES (3,2);

-- Equipe 1 --
INSERT INTO Equipe VALUES (1, "CodeWarrios", 4, 10, "https://github.com/CodeWarrios/random-repo", 1);
INSERT INTO Appartenir VALUES (4, 1);
INSERT INTO Appartenir VALUES (5, 1);
INSERT INTO Appartenir VALUES (6, 1);
INSERT INTO Appartenir VALUES (7, 1);
-- Equipe 2 --
INSERT INTO Equipe VALUES (2, "WhaleCode", 8, 14, "https://github.com/WhaleCode/repo", 1);
INSERT INTO Appartenir VALUES (8, 2);
INSERT INTO Appartenir VALUES (9, 2);
INSERT INTO Appartenir VALUES (10, 2);
INSERT INTO Appartenir VALUES (11, 2);
-- Equipe 3 --
INSERT INTO Equipe VALUES (3, "CodeWave", 12, 18, "https://github.com/CodeWave/repository", 2);
INSERT INTO Appartenir VALUES (12, 3);
INSERT INTO Appartenir VALUES (13, 3);
INSERT INTO Appartenir VALUES (14, 3);
INSERT INTO Appartenir VALUES (15, 3);
-- Equipe 4 --
INSERT INTO Equipe VALUES (4, "WebTech Wizards", 16, 6, "https://github.com/WebTechWizards/random-repository", 3);
INSERT INTO Appartenir VALUES (16, 4);
INSERT INTO Appartenir VALUES (17, 4);
INSERT INTO Appartenir VALUES (18, 4);
INSERT INTO Appartenir VALUES (19, 4);
-- Equipe 5 --
INSERT INTO Equipe VALUES (5, "PixelPioneers", 20, 12, "https://github.com/PixelPioneers/repo", 5);
INSERT INTO Appartenir VALUES (20, 5);
INSERT INTO Appartenir VALUES (21, 5);
INSERT INTO Appartenir VALUES (22, 5);
INSERT INTO Appartenir VALUES (23, 5);
-- Equipe 6 --
INSERT INTO Equipe VALUES (6, "PixelCrafters", 24, 19, "https://github.com/PixelCrafters/random-repository", 6);
INSERT INTO Appartenir VALUES (24, 6);
INSERT INTO Appartenir VALUES (25, 6);
INSERT INTO Appartenir VALUES (26, 6);
INSERT INTO Appartenir VALUES (27, 6);

-- Ressources --
-- Ressources Projet 1
INSERT INTO Ressources VALUES (1,"test.consignes.fr", "Cosigne");
INSERT INTO Ressources VALUES (2,"test.conseils.fr", "Conseils");
INSERT INTO Ressources VALUES (3,"test.videoPrensentation.fr", "Vidéo présentation");
INSERT INTO Ressources VALUES (4,"test.fichier1.fr", "fichier1");
INSERT INTO PossederRessource VALUES (1,1);
INSERT INTO PossederRessource VALUES (2,1);
INSERT INTO PossederRessource VALUES (3,1);
INSERT INTO PossederRessource VALUES (4,1);
-- Ressources Projet 2
INSERT INTO Ressources VALUES (5,"doc1.db_ia.fr", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus a sem aliquam tincidunt. Quisque cursus quam id purus eleifend, at ultrices nisi feugiat. Vivamus posuere lorem id libero cursus, eu aliquam urna eleifend. ");
INSERT INTO Ressources VALUES (6,"doc3.db_ia.fr", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus a sem aliquam tincidunt. Quisque cursus quam id purus eleifend, at ultrices nisi feugiat. Vivamus posuere lorem id libero cursus, eu aliquam urna eleifend. ");
INSERT INTO Ressources VALUES (7,"dataset.mydata.fr/1515159", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus a sem aliquam tincidunt. Quisque cursus quam id purus eleifend, at ultrices nisi feugiat. Vivamus posuere lorem id libero cursus, eu aliquam urna eleifend. ");
INSERT INTO Ressources VALUES (8,"try2.code.fr", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut lectus a sem aliquam tincidunt. Quisque cursus quam id purus eleifend, at ultrices nisi feugiat. Vivamus posuere lorem id libero cursus, eu aliquam urna eleifend. ");
INSERT INTO PossederRessource VALUES (5,2);
INSERT INTO PossederRessource VALUES (6,2);
INSERT INTO PossederRessource VALUES (7,2);
INSERT INTO PossederRessource VALUES (8,2);
-- Ressources Projet 3
INSERT INTO Ressources VALUES (9,"test.consignes3.fr", "Cosigne Projet 3");
INSERT INTO Ressources VALUES (10,"test.conseils3.fr", "Conseils Projet 3");
INSERT INTO Ressources VALUES (11,"test.videoPrensentation3.fr", "Vidéo présentation Projet 3");
INSERT INTO Ressources VALUES (12,"test.fichier3.fr", "fichier3 Projet 3");
INSERT INTO PossederRessource VALUES (9,3);
INSERT INTO PossederRessource VALUES (10,3);
INSERT INTO PossederRessource VALUES (11,3);
INSERT INTO PossederRessource VALUES (12,3);
-- Ressources Projet 4
INSERT INTO Ressources VALUES (13,"test.consignes4.fr", "Cosigne Projet 4");
INSERT INTO Ressources VALUES (14,"test.conseils4.fr", "Conseils Projet 4");
INSERT INTO Ressources VALUES (15,"test.videoPrensentation4.fr", "Vidéo présentation Projet 4");
INSERT INTO Ressources VALUES (16,"test.fichier4.fr", "fichier4 Projet 4");
INSERT INTO PossederRessource VALUES (13,4);
INSERT INTO PossederRessource VALUES (14,4);
INSERT INTO PossederRessource VALUES (15,4);
INSERT INTO PossederRessource VALUES (16,4);
-- Ressources Projet 5
INSERT INTO Ressources VALUES (17,"test.consignes5.fr", "Cosigne Projet 5");
INSERT INTO Ressources VALUES (18,"test.conseils5.fr", "Conseils Projet 5");
INSERT INTO Ressources VALUES (19,"test.videoPrensentation5.fr", "Vidéo présentation Projet 5");
INSERT INTO Ressources VALUES (20,"test.fichier5.fr", "fichier5 Projet 5");
INSERT INTO PossederRessource VALUES (17,5);
INSERT INTO PossederRessource VALUES (18,5);
INSERT INTO PossederRessource VALUES (19,5);
INSERT INTO PossederRessource VALUES (20,5);
-- Ressources Projet 6
INSERT INTO Ressources VALUES (21,"test.consignes6.fr", "Cosigne Projet 6");
INSERT INTO Ressources VALUES (22,"test.conseils6.fr", "Conseils Projet 6");
INSERT INTO Ressources VALUES (23,"test.videoPrensentation6.fr", "Vidéo présentation Projet 6");
INSERT INTO Ressources VALUES (24,"test.fichier6.fr", "fichier6 Projet 6");
INSERT INTO PossederRessource VALUES (21,6);
INSERT INTO PossederRessource VALUES (22,6);
INSERT INTO PossederRessource VALUES (23,6);
INSERT INTO PossederRessource VALUES (24,6);

-- Questionnaires pour DataBattle1 --
INSERT INTO Questionnaire VALUES (1, 1, "Questionnaire JAVA", "Testez vos connaissances du langage java !", "2023-07-01", "2023-07-08");
INSERT INTO Questionnaire VALUES (2, 1, "C a vous !", "Testez vos connaissances du langage C", "2023-07-08", "2023-07-15");
INSERT INTO Questionnaire VALUES (3, 1, "Ocaml", "Attrapez la bosse de la programmation !", "2023-07-15", "2023-07-22");
INSERT INTO Questionnaire VALUES (4, 1, "VotreOrdi.quiz", "Testez vos connaissances sur votre ordinateur !", "2023-07-22", "2023-07-29");
-- Questions --
-- pour questionnaire 1
INSERT INTO Question VALUES (1, 1,"Quelles sont les différences entre les méthodes equals() et == en Java et quand devrait-on les utiliser ?");
INSERT INTO Question VALUES (2, 1,"Quelle est la différence entre une classe abstraite et une interface en Java ?");
INSERT INTO Question VALUES (3, 1,"Quels sont les avantages de l'utilisation des classes abstraites en Java et comment peuvent-elles être utilisées dans la conception de programmes orientés objet ?");
INSERT INTO Question VALUES (4, 1,"Quels sont les avantages du polymorphisme en Java et comment pouvez-vous les exploiter dans votre code pour améliorer la flexibilité et la maintenabilité de votre programme ?");
-- pour questionnaire 2
INSERT INTO Question VALUES (5, 2, "Quelle est la différence entre un tableau statique et un tableau dynamique en C ?");
INSERT INTO Question VALUES (6, 2, "Comment déclarer et utiliser une fonction en C ?");
INSERT INTO Question VALUES (7, 2, "Qu'est-ce qu'un pointeur en C et comment pouvez-vous l'utiliser pour manipuler des données ?");
INSERT INTO Question VALUES (8, 2, "Quelles sont les principales différences entre les structures et les unions en C et comment décidez-vous de les utiliser dans votre programme ?");
-- pour questionnaire 3
INSERT INTO Question VALUES (9, 3, "Quelle est la différence entre les types primitifs et les types composés en OCaml, et comment déclarez-vous des variables de chaque type ?");
INSERT INTO Question VALUES (10, 3, "Quelle est la syntaxe pour définir une fonction récursive en OCaml, et comment pouvez-vous l'utiliser pour résoudre des problèmes récursifs ?");
INSERT INTO Question VALUES (11, 3, "Qu'est-ce que le pattern matching en OCaml, et comment pouvez-vous l'utiliser pour effectuer des opérations conditionnelles sur les valeurs d'un type de données personnalisé ?");
INSERT INTO Question VALUES (12, 3, "Qu'est-ce qu'une fonction d'ordre supérieur en OCaml, et comment pouvez-vous l'utiliser pour manipuler des fonctions comme des valeurs de première classe ?");
-- pour questionnaire 4
INSERT INTO Question VALUES (13, 4, "Qu'est-ce qu'un système d'exploitation et quel est son rôle essentiel dans un ordinateur ?");
INSERT INTO Question VALUES (14, 4, "Quelle est la différence entre la mémoire vive (RAM) et le stockage (disque dur ou SSD) dans un ordinateur, et comment sont-ils utilisés ?");
INSERT INTO Question VALUES (15, 4, "Qu'est-ce qu'un processeur (CPU) et quel est son rôle dans le fonctionnement global d'un ordinateur ?");
INSERT INTO Question VALUES (16, 4, "Qu'est-ce qu'un réseau informatique et comment les ordinateurs sont-ils connectés les uns aux autres pour partager des informations et des ressources ?");
-- Réponse questionaire par équipe 1 -- A IMPLEMENTER