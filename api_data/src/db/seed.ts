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
    await queryRunner.query(`DELETE FROM "budget"`);
    await queryRunner.query(`DELETE FROM "credit_debit"`);
    await queryRunner.query(`DELETE FROM "vat"`);
    await queryRunner.query(`DELETE FROM "status"`);
    await queryRunner.query(`DELETE FROM "invoice"`);
    await queryRunner.query(`DELETE FROM "budget_commission"`);
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
    await queryRunner.query(`ALTER SEQUENCE budget_id_seq RESTART WITH 1;`);
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
        ('sophie.thomas@association.com',	'Sophie',	'Thomas',	'ssss');
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
        (4,	2);
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
      INSERT INTO "budget" ("label", "start_date", "end_date") VALUES
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
        (400,	'essence',	'',	'reçu plein scooter livraison',	'f',	1,	1,	2,	3,	4,	1, 2, '2022-03-02', 'facture_2022_1'),
        (50,	'cigarette',	'',	'cartouche à la frontière',	'f',	2,	3,	2,	4,	6,	2, 4, '2022-04-05', 'facture_2022_2'),
        (60,	'chaussure',	'',	'chaussure de sécurité',	'f',	3,	4,	1,	3,	5,	3, 1, '2022-08-11', 'facture_2022_3'),
        (500,	'chocolat',	'',	'goûter',	'f',	1,	1,	2,	3,	4,	4, 4, '2022-07-11', 'facture_2022_4'),
        (30,	'bijoux',	'',	'chaine en toc',	'f',	2,	3,	2,	4,	6,	5, 1, '2022-03-24', 'facture_2022_5'),
        (600,	'Lego',	'',	'cadeaux',	'f',	3,	4,	1,	3,	5,	6, 2 , '2022-04-09', 'facture_2022_6');
    `);

    //Insert budget_commission
    await queryRunner.query(`
      INSERT INTO "budget_commission" ("budgetId", "commissionId", "amount") VALUES
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
