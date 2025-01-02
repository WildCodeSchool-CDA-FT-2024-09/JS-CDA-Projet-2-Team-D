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

    // insert users (test password: whS0@cqnuros)
    await queryRunner.query(`
      INSERT INTO "user" ("email", "firstname", "lastname", "password") VALUES
        ('maxime.roux@association.com',	'Maxime',	'Roux',	'$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('lucie.bernard@association.com',	'Lucie',	'Bernard',	'$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('caroline.mercier@association.com',	'Caroline',	'Mercier',	'$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('sophie.thomas@association.com',	'Sophie',	'Thomas',	'$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('john.doe1@example.com', 'John', 'Doe1', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('jane.smith1@example.com', 'Jane', 'Smith1', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('alice.johnson@example.com', 'Alice', 'Johnson', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('bob.brown@example.com', 'Bob', 'Brown', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('charlie.davis@example.com', 'Charlie', 'Davis', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('emily.miller@example.com', 'Emily', 'Miller', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('frank.moore@example.com', 'Frank', 'Moore', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('grace.taylor@example.com', 'Grace', 'Taylor', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('henry.anderson@example.com', 'Henry', 'Anderson', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('isabel.thomas@example.com', 'Isabel', 'Thomas', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('jack.evans@example.com', 'Jack', 'Evans', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('kate.white@example.com', 'Kate', 'White', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('liam.green@example.com', 'Liam', 'Green', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('mia.hill@example.com', 'Mia', 'Hill', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('noah.adams@example.com', 'Noah', 'Adams', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('olivia.lee@example.com', 'Olivia', 'Lee', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('paul.clark@example.com', 'Paul', 'Clark', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('quinn.walker@example.com', 'Quinn', 'Walker', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('rachel.allen@example.com', 'Rachel', 'Allen', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('sam.king@example.com', 'Sam', 'King', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('tina.wright@example.com', 'Tina', 'Wright', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('ulysses.scott@example.com', 'Ulysses', 'Scott', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('victor.wood@example.com', 'Victor', 'Wood', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('wendy.james@example.com', 'Wendy', 'James', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('xander.morgan@example.com', 'Xander', 'Morgan', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('yara.bell@example.com', 'Yara', 'Bell', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('zane.bennett@example.com', 'Zane', 'Bennett', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('amber.ross@example.com', 'Amber', 'Ross', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('bruce.cole@example.com', 'Bruce', 'Cole', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('clara.bailey@example.com', 'Clara', 'Bailey', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('david.hughes@example.com', 'David', 'Hughes', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('ella.richards@example.com', 'Ella', 'Richards', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('felix.watson@example.com', 'Felix', 'Watson', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('gina.brooks@example.com', 'Gina', 'Brooks', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('harry.griffin@example.com', 'Harry', 'Griffin', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('ivy.morris@example.com', 'Ivy', 'Morris', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('jackson.reed@example.com', 'Jackson', 'Reed', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('karen.cook@example.com', 'Karen', 'Cook', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('leo.bell@example.com', 'Leo', 'Bell', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('mona.cox@example.com', 'Mona', 'Cox', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('nathan.perez@example.com', 'Nathan', 'Perez', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('olga.long@example.com', 'Olga', 'Long', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('peter.hughes@example.com', 'Peter', 'Hughes', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('quincy.morgan@example.com', 'Quincy', 'Morgan', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('ruby.stewart@example.com', 'Ruby', 'Stewart', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('steve.mitchell@example.com', 'Steve', 'Mitchell', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('tracy.ward@example.com', 'Tracy', 'Ward', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('ursula.rogers@example.com', 'Ursula', 'Rogers', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('vincent.harris@example.com', 'Vincent', 'Commission', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('wanda.hayes@example.com', 'Wanda', 'Comptable', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('zen@noisette.net', 'Zen', 'Noisette', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'),
        ('super@admin.net', 'Super', 'Admin', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8');
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
        (53, 3),
        (54, 2),
        (55, 1),
        (56, 1),
        (56, 2),
        (56, 3);
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
        ('Budget 2020', '2020-01-01 00:00:00', '2020-12-31 00:00:00'),
        ('Budget 2021', '2021-01-01 00:00:00', '2021-12-31 00:00:00'),
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
        (120, 'restaurant', '', 'repas cloture année', 'f', 2, 3, 2, 4, 6, NULL, 4, '2023-04-20', 'facture_2022_15'),
        (400,	'essence',	'',	'reçu plein scooter livraison',	'f',	1,	1,	2,	3,	4,	1, 2, '2022-03-02', 'facture_2022_1'),
        (50,	'cigarette',	'',	'cartouche à la frontière',	'f',	2,	3,	2,	4,	6,	2, 4, '2022-04-05', 'facture_2022_2'),
        (60,	'chaussure',	'',	'chaussure de sécurité',	'f',	3,	4,	1,	3,	5,	3, 1, '2022-08-11', 'facture_2022_3'),
        (500,	'chocolat',	'',	'goûter',	'f',	1,	1,	2,	3,	4,	4, 4, '2022-07-11', 'facture_2022_4'),
        (30,	'bijoux',	'',	'chaine en toc',	'f',	2,	3,	2,	4,	6,	5, 1, '2022-03-24', 'facture_2022_5'),
        (600,	'Lego',	'',	'cadeaux',	'f',	3,	4,	1,	3,	5,	6, 2 , '2022-04-09', 'facture_2022_6'),
        (45, 'café', '', 'capsules café', 'f', 1, 2, 1, 3, 4, 6, 2, '2022-02-10', 'facture_2022_7'),
        (250, 'équipement', '', 'matériel sportif', 'f', 2, 3, 2, 4, 4, 6, 4, '2022-05-15', 'facture_2022_8'),
        (70, 'restaurant', '', 'repas réunion', 'f', 3, 1, 2, 3, 4, 6, 1, '2022-06-20', 'facture_2022_9'),
        (100, 'livres', '', 'documents formation', 'f', 1, 1, 2, 3, 4, 6, 2, '2022-03-14', 'facture_2022_10'),
        (90, 'papeterie', '', 'matériel bureau', 'f', 2, 2, 2, 4, 4, 6, 4, '2022-09-05', 'facture_2022_11'),
        (200, 'logiciels', '', 'achat logiciel', 'f', 3, 3, 1, 3, 4, 6, 1, '2022-11-12', 'facture_2022_12'),
        (80, 'impression', '', 'cartouches imprimante', 'f', 1, 4, 2, 3, 4, 6, 2, '2022-01-19', 'facture_2022_13'),
        (400, 'transport', '', 'déplacement équipe', 'f', 2, 1, 2, 4, 4, 6, 4, '2023-12-25', 'facture_2023_14'),
        (35, 'fournitures', '', 'accessoires divers', 'f', 3, 3, 2, 3, 4, 6, 1, '2023-04-17', 'facture_2023_15'),
        (300, 'animation', '', 'services animation', 'f', 1, 2, 1, 4, 4, 6, 2, '2023-07-03', 'facture_2023_16'),
        (120, 'sécurité', '', 'alarme bureau', 'f', 2, 1, 2, 3, 4, 6, 4, '2023-10-10', 'facture_2023_17'),
        (65, 'nettoyage', '', 'produits ménagers', 'f', 3, 4, 1, 3, 4, 6, 1, '2023-08-25', 'facture_2023_18'),
        (75, 'décoration', '', 'plantes bureau', 'f', 1, 1, 2, 3, 4, 6, 2, '2023-09-08', 'facture_2023_19'),
        (150, 'publicité', '', 'flyers événement', 'f', 2, 2, 2, 4, 4, 6, 4, '2023-05-21', 'facture_2023_20');
    `);

    //Insert budget
    await queryRunner.query(`
      INSERT INTO "budget" ("exerciseId", "commissionId", "amount") VALUES
        (1,	1,	5000),
        (2,	1,	20500),
        (3,	1,	30500),
        (4,	1,	40500),
        (1,	2,	12600),
        (2,	2,	22600),
        (3,	2,	32600),
        (4,	2,	42600),
        (1,	3,	15000),
        (2,	3,	25000),
        (3,	3,	35000),
        (4,	3,	45000),
        (1,	4,	9000),
        (2,	4,	18000),
        (3,	4,	28000),
        (4,	4,	13000),
        (1,	5,	8000),
        (2,	5,	23000),
        (3,	5,	32000),
        (4,	5,	45000),
        (1,	6,	3000),
        (2,	6,	6000),
        (3,	6,	9000),
        (4,	6,	11000);
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
      (4,	2),
      (56, 3);
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
