USE rimarti;

DELETE FROM users;

INSERT INTO users VALUES ('Root', 'Root@cy-tech.fr', 'passwordRoot');

DELETE FROM produits;

INSERT INTO produits VALUES ('Le berlioz', 80, 'Ganache chocolat noir Vénézuéla.', 300, 'assets/Images/ganache_berlioz.png', 'ganaches');
INSERT INTO produits VALUES ('Le palet d or', 78, 'Ganache café corsé. Disponible en Noir et Lait', 200, 'assets/Images/ganache_palet-or.png', 'ganaches');
INSERT INTO produits VALUES ('L Alibaba', 75, 'Praliné noisettes au sésame grillé. ', 300, 'assets/Images/ganache_alibaba.png', 'ganaches');
INSERT INTO produits VALUES ('Le fabiola', 85, 'Ganache à la fine champagne, noix (en saison) (uniquement au chocolat au lait). (spécialité)', 150, 'assets/Images/ganache_fabiola.png', 'ganaches');
INSERT INTO produits VALUES ('Le symphonie', 80, ' Ganache noix de coco, au lait de coco. Disponible en chocolat Noir et Lait', 250, 'assets/Images/ganache_symphonie.png', 'ganaches');
INSERT INTO produits VALUES ('Le roche terre d ivoire', 90, 'Abricots, feuilletines.', 400, 'assets/Images/croquant_rocher-terre-ivoire.png', 'croquants');
INSERT INTO produits VALUES ('Le croquentin', 92, 'Bâtonnets d amandes caramélisées, riz soufflé.', 250, 'assets/Images/croquant_croquentin.png', 'croquants');
INSERT INTO produits VALUES ('Le pyrénéen', 82, 'Noisettes entières grillées caramélisées avec un soupçon de praliné.', 300, 'assets/Images/croquant_pyrenees.png', 'croquants');
INSERT INTO produits VALUES ('Le bourbon', 85, 'Praliné amandes- noisettes, décor noix.', 300, 'assets/Images/croquant_bourbon.png', 'ganaches');
INSERT INTO produits VALUES ('Le classique cacahuete', 75, 'Praliné cacahuètes, soufflétines.', 250, 'assets/Images/croquant_cahuete.png', 'croquants');
INSERT INTO produits VALUES ('Le saint Louis', 84, 'Praliné amandes noisettes, éclats d’amandes.', 300, 'assets/Images/praline_saint-louis.png', 'pralines');
INSERT INTO produits VALUES ('Le bourbon', 85, 'Praliné amandes- noisettes, décor noix. ', 300, 'assets/Images/croquant_bourbon.png', 'pralines');
INSERT INTO produits VALUES ('L Alibaba', 75, 'Praliné noisettes au sésame grillé.', 300, 'assets/Images/ganache_alibaba.png', 'pralines');
INSERT INTO produits VALUES ('Le Napoléon', 79, 'Praliné pur amandes.', 440, 'assets/Images/pralline_napoleon.png', 'pralines');
INSERT INTO produits VALUES ('Le saragosse', 81, 'Praliné amandes noisettes, éclats d’amandes caramélisées.', 720, 'assets/Images/praline_saragosse.png', 'pralines');
