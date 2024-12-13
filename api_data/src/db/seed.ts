import { AppDataSource } from "./data-source";

(async () => {
  // initializing data source
  await AppDataSource.initialize();

  console.info("Starting Seeding...");

  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    // big cleanup
    await queryRunner.query(`DELETE FROM "bank_account"`);
    await queryRunner.query(`DELETE FROM "bank"`);
    await queryRunner.query(`DELETE FROM "subcategory"`);
    await queryRunner.query(`DELETE FROM "category"`);
    await queryRunner.query(`DELETE FROM "commission"`);
    await queryRunner.query(`DELETE FROM "exercise"`);
    await queryRunner.query(`DELETE FROM "credit_debit"`);
    await queryRunner.query(`DELETE FROM "vat"`);
    await queryRunner.query(`DELETE FROM "status"`);
    await queryRunner.query(`DELETE FROM "invoice"`);
    await queryRunner.query(`DELETE FROM "budget"`);
    await queryRunner.query(`DELETE FROM "user_commissions_commission"`);
    await queryRunner.query("DELETE FROM user_roles_role");
    await queryRunner.query(`DELETE FROM "user"`);
    await queryRunner.query(`DELETE FROM "role"`);

    // init sequences
    await queryRunner.query(`ALTER SEQUENCE role_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE user_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE bank_id_seq RESTART WITH 1;`);
    await queryRunner.query(
      `ALTER SEQUENCE bank_account_id_seq RESTART WITH 1;`
    );
    await queryRunner.query(`ALTER SEQUENCE category_id_seq RESTART WITH 1;`);
    await queryRunner.query(
      `ALTER SEQUENCE subcategory_id_seq RESTART WITH 1;`
    );
    await queryRunner.query(`ALTER SEQUENCE exercise_id_seq RESTART WITH 1;`);
    await queryRunner.query(
      `ALTER SEQUENCE credit_debit_id_seq RESTART WITH 1;`
    );
    await queryRunner.query(`ALTER SEQUENCE vat_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE status_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE commission_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE invoice_id_seq RESTART WITH 1;`);

    // insert roles
    await queryRunner.query(`
      INSERT INTO "role" ("label") VALUES
        ('Administrateur'),
        ('Comptable'),
        ('Responsable Commission');
    `);

    // insert users
    await queryRunner.query(`
      INSERT INTO "user" ("email", "firstname", "lastname", "password") VALUES
        ('maxime.roux@association.com',	'Maxime',	'Roux',	'aaa'),
        ('lucie.bernard@association.com',	'Lucie',	'Bernard',	'aaaaa'),
        ('caroline.mercier@association.com',	'Caroline',	'Mercier',	'cccc'),
        ('sophie.thomas@association.com',	'Sophie',	'Thomas',	'ssss'),
        ('john.doe1@example.com', 'John', 'Doe1', 'password1'),
        ('jane.smith1@example.com', 'Jane', 'Smith1', 'password2'),
        ('alice.johnson@example.com', 'Alice', 'Johnson', 'password3'),
        ('bob.brown@example.com', 'Bob', 'Brown', 'password4'),
        ('charlie.davis@example.com', 'Charlie', 'Davis', 'password5'),
        ('emily.miller@example.com', 'Emily', 'Miller', 'password6'),
        ('frank.moore@example.com', 'Frank', 'Moore', 'password7'),
        ('grace.taylor@example.com', 'Grace', 'Taylor', 'password8'),
        ('henry.anderson@example.com', 'Henry', 'Anderson', 'password9'),
        ('isabel.thomas@example.com', 'Isabel', 'Thomas', 'password10'),
        ('jack.evans@example.com', 'Jack', 'Evans', 'password11'),
        ('kate.white@example.com', 'Kate', 'White', 'password12'),
        ('liam.green@example.com', 'Liam', 'Green', 'password13'),
        ('mia.hill@example.com', 'Mia', 'Hill', 'password14'),
        ('noah.adams@example.com', 'Noah', 'Adams', 'password15'),
        ('olivia.lee@example.com', 'Olivia', 'Lee', 'password16'),
        ('paul.clark@example.com', 'Paul', 'Clark', 'password17'),
        ('quinn.walker@example.com', 'Quinn', 'Walker', 'password18'),
        ('rachel.allen@example.com', 'Rachel', 'Allen', 'password19'),
        ('sam.king@example.com', 'Sam', 'King', 'password20'),
        ('tina.wright@example.com', 'Tina', 'Wright', 'password21'),
        ('ulysses.scott@example.com', 'Ulysses', 'Scott', 'password22'),
        ('victor.wood@example.com', 'Victor', 'Wood', 'password23'),
        ('wendy.james@example.com', 'Wendy', 'James', 'password24'),
        ('xander.morgan@example.com', 'Xander', 'Morgan', 'password25'),
        ('yara.bell@example.com', 'Yara', 'Bell', 'password26'),
        ('zane.bennett@example.com', 'Zane', 'Bennett', 'password27'),
        ('amber.ross@example.com', 'Amber', 'Ross', 'password28'),
        ('bruce.cole@example.com', 'Bruce', 'Cole', 'password29'),
        ('clara.bailey@example.com', 'Clara', 'Bailey', 'password30'),
        ('david.hughes@example.com', 'David', 'Hughes', 'password31'),
        ('ella.richards@example.com', 'Ella', 'Richards', 'password32'),
        ('felix.watson@example.com', 'Felix', 'Watson', 'password33'),
        ('gina.brooks@example.com', 'Gina', 'Brooks', 'password34'),
        ('harry.griffin@example.com', 'Harry', 'Griffin', 'password35'),
        ('ivy.morris@example.com', 'Ivy', 'Morris', 'password36'),
        ('jackson.reed@example.com', 'Jackson', 'Reed', 'password37'),
        ('karen.cook@example.com', 'Karen', 'Cook', 'password38'),
        ('leo.bell@example.com', 'Leo', 'Bell', 'password39'),
        ('mona.cox@example.com', 'Mona', 'Cox', 'password40'),
        ('nathan.perez@example.com', 'Nathan', 'Perez', 'password41'),
        ('olga.long@example.com', 'Olga', 'Long', 'password42'),
        ('peter.hughes@example.com', 'Peter', 'Hughes', 'password43'),
        ('quincy.morgan@example.com', 'Quincy', 'Morgan', 'password44'),
        ('ruby.stewart@example.com', 'Ruby', 'Stewart', 'password45'),
        ('steve.mitchell@example.com', 'Steve', 'Mitchell', 'password46'),
        ('tracy.ward@example.com', 'Tracy', 'Ward', 'password47'),
        ('ursula.rogers@example.com', 'Ursula', 'Rogers', 'password48'),
        ('vincent.harris@example.com', 'Vincent', 'Harris', 'password49'),
        ('wanda.hayes@example.com', 'Wanda', 'Hayes', 'password50');
    `);

    // insert user_roles_role
    await queryRunner.query(`
      INSERT INTO "user_roles_role" ("userId", "roleId") VALUES
        (1,	1),
        (1,	2),
        (2,	2),
        (2,	3),
        (3,	3),
        (4,	1),
        (4,	2),
        (5, 1),
        (6, 2),
        (7, 3),
        (8, 1),
        (9, 2),
        (10, 3),
        (11, 1),
        (12, 2),
        (13, 3),
        (14, 1),
        (15, 2),
        (16, 3),
        (17, 1),
        (18, 2),
        (19, 3),
        (20, 1),
        (21, 2),
        (22, 3),
        (23, 1),
        (24, 2),
        (25, 3),
        (26, 1),
        (27, 2),
        (28, 3),
        (29, 1),
        (30, 2),
        (31, 3),
        (32, 1),
        (33, 2),
        (34, 3),
        (35, 1),
        (36, 2),
        (37, 3),
        (38, 1),
        (39, 2),
        (40, 3),
        (41, 1),
        (42, 2),
        (43, 3),
        (44, 1),
        (45, 2),
        (46, 3),
        (47, 1),
        (48, 2),
        (49, 3),
        (50, 1),
        (51, 2),
        (52, 3),
        (53, 1),
        (54, 2);
    `);

    // insert banks
    await queryRunner.query(`
      INSERT INTO "bank" ("label") VALUES
        ('Bank A'),
        ('Bank B');
    `);

    // insert bank accounts
    await queryRunner.query(`
      INSERT INTO "bank_account" ("name", "account_number", "balance", "bankId") VALUES
        ('Compte courant', 'FR7612345678900000001234564', '10000.00', 1),
        ('Livret A', 'FR7612345678900000001234562', '5000.00', 1),
        ('Livret Développement Durable', 'FR7612345678900000001234566', '15000.00', 1),
        ('Livret A', 'FR7612345678900000001234565', '25000.00', 2),
        ('Livret Développement Durable', 'FR7612345678900000001234563', '12000.00', 2),
        ('Compte courant', 'FR7612345678900000001234561', '20000.00', 2);
    `);

    // insert credit_debit
    await queryRunner.query(`
      INSERT INTO "credit_debit" ("label") VALUES
        ('crédit'),
        ('débit');
    `);

    // insert categories
    await queryRunner.query(`
      INSERT INTO "category" ("label", "creditDebitId") VALUES
        ('Vente de marchandises', 1),
        ('Dons', 1),
        ('Bancaire', 1),
        ('Cotisations', 2),
        ('Prestation', 2),
        ('Subventions', 1),
        ('Véhicule', 2),
        ('Partenariat', 2),
        ('Location', 1),
        ('Opérationnel', 2);
    `);

    // Insert subcategories
    await queryRunner.query(`
      INSERT INTO "subcategory" ("code", "label", "categoryId") VALUES
        -- Vente de marchandises (Catégorie 1)
        ('VEN123', 'Promotion', 1),
        ('VEN456', 'Accessoires', 1),
        -- Dons (Catégorie 2)
        ('DON789', 'Campagnes caritatives', 2),
        ('DON012', 'Don anonyme', 2),
        -- Bancaire (Catégorie 3)
        ('BAN345', 'Opérations diverses', 3),
        ('BAN678', 'Retraits', 3),
        -- Cotisations (Catégorie 4)
        ('COT890', 'Abonnements', 4),
        ('COT321', 'Adhésion collective', 4),
        -- Prestation (Catégorie 5)
        ('PRE654', 'Consulting premium', 5),
        ('PRE987', 'Service technique', 5),
        -- Subventions (Catégorie 6)
        ('SUB852', 'Projets éducatifs', 6),
        ('SUB963', 'Développement durable', 6),
        -- Véhicule (Catégorie 7)
        ('VEH741', 'Réparations', 7),
        ('VEH852', 'Équipement', 7),
        -- Partenariat (Catégorie 8)
        ('PAR963', 'Événements publics', 8),
        ('PAR147', 'Échange commercial', 8),
        -- Location (Catégorie 9)
        ('LOC258', 'Équipements spécifiques', 9),
        -- Opérationnel (Catégorie 10)
        ('OPE369', 'Petite maintenance', 10),
        ('OPE147', 'Achats informatiques', 10);
    `);

    // insert budget
    await queryRunner.query(`
      INSERT INTO "exercise" ("label", "start_date", "end_date") VALUES
        ('Budget 2022',	'2022-02-01 00:00:00',	'2023-01-31 00:00:00'),
        ('Super Budget 2023',	'2023-02-01 00:00:00',	'2024-01-31 00:00:00');
    `);

    // insert commission
    await queryRunner.query(`
      INSERT INTO "commission" ("name") VALUES
        ('Equipement'),
        ('Communication'),
        ('Événementiel'),
        ('Formation'),
        ('Animation'),
        ('Opérationnel');
    `);
    // insert TVA
    await queryRunner.query(`
      INSERT INTO "vat" ("label", "rate") VALUES
        ('TVA 0%', 0),
        ('TVA 5.5%', 5.5),
        ('TVA 10%', 10),
        ('TVA 20%', 20);
    `);

    // insert status
    await queryRunner.query(`
        INSERT INTO "status" ("label") VALUES
         ('Validé'),
         ('En attente'),
         ('Refusé');
    `);

    // insert invoice
    await queryRunner.query(`
      INSERT INTO "invoice" ("price_without_vat", "label", "receipt", "info", "paid", "statusId", "vatId", "creditDebitId", "subcategoryId", "commissionId", "bankAccountId", "userId", "date", "invoiceNumber") VALUES
          (400, 'essence', '', 'reçu plein scooter livraison', 'f', 1, 1, 2, 3, 4, 1, 2, '2022-03-02', 'facture_2022_1'),
          (50, 'cigarette', '', 'cartouche à la frontière', 'f', 2, 3, 2, 4, 6, NULL, 4, '2022-04-05', 'facture_2022_2'),
          (60, 'chaussure', '', 'chaussure de sécurité', 'f', 3, 4, 1, 3, 5, 3, 1, '2022-08-11', 'facture_2022_3'),
          (500, 'chocolat', '', 'goûter', 'f', 1, 1, 2, 3, 4, 4, 4, '2022-07-11', 'facture_2022_4'),
          (30, 'bijoux', '', 'chaine en toc', 'f', 2, 3, 2, 4, 6, NULL, 1, '2022-03-24', 'facture_2022_5'),
          (600, 'Lego', '', 'cadeaux', 'f', 3, 4, 1, 3, 5, 6, 2, '2022-04-09', 'facture_2022_6'),
          (450, 'entretien', '', 'nettoyage voiture', 'f', 1, 1, 2, 3, 4, 1, 2, '2022-06-15', 'facture_2022_7'),
          (550, 'transport', '', 'billet train', 'f', 1, 2, 2, 4, 6, 3, 3, '2022-07-10', 'facture_2022_8'),
          (90, 'outillage', '', 'outil professionnel', 'f', 3, 4, 1, 3, 5, 3, 1, '2022-09-18', 'facture_2022_9'),
          (200, 'électronique', '', 'accessoire bureau', 'f', 3, 4, 1, 3, 5, 6, 2, '2022-11-05', 'facture_2022_10'),
          (80, 'livre', '', 'achat livre technique', 'f', 2, 3, 2, 4, 6, NULL, 1, '2022-12-01', 'facture_2022_11'),
          (300, 'vêtements', '', 'achat uniforme', 'f', 2, 3, 2, 4, 6, NULL, 4, '2023-01-10', 'facture_2022_12'),
          (100, 'frais divers', '', 'facture générique 1', 'f', 1, 1, 2, 3, 4, 1, 2, '2023-02-05', 'facture_2022_13'),
          (70, 'services', '', 'abonnement mensuel', 'f', 3, 4, 1, 3, 5, 3, 1, '2023-03-15', 'facture_2022_14'),
          (120, 'restaurant', '', 'repas cloture année', 'f', 2, 3, 2, 4, 6, NULL, 4, '2023-04-20', 'facture_2022_15');
    `);

    //Insert budget
    await queryRunner.query(`
      INSERT INTO "budget" ("exerciseId", "commissionId", "amount") VALUES
        (1,	1,	50500),
        (2,	2,	12600),
        (1,	3,	15000),
        (1,	4,	9000),
        (2,	5,	8000),
        (2,	6,	3000);
 `);

    //Insert user_commissions_commission
    await queryRunner.query(`
    INSERT INTO "user_commissions_commission" ("userId", "commissionId") VALUES
      (1,	1),
      (1,	2),
      (2,	2),
      (2,	3),
      (3,	3),
      (4,	1),
      (4,	2);
  `);

    await queryRunner.commitTransaction();

    console.info("Finished Seeding.");
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    console.info("Seeding Done.");
    await AppDataSource.destroy();
  }
})();
