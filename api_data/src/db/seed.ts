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

    // insert subcategories
    await queryRunner.query(`

      INSERT INTO "subcategory" ("code", "label", "categoryId") VALUES
        ('DIV365', 'Divers', 1),
        ('ANN232', 'Annuel', 2),
        ('GOO209', 'Goodies', 1),
        ('INT124', 'Intérêt', 3),
        ('FAM511', 'Famille', 4),
        ('JEU704', 'Jeunesse', 4),
        ('FAM452', 'Famille', 9),
        ('MAT138', 'Matériel', 9),
        ('EVE967', 'Événement', 8),
        ('INT424', 'Intérêt', 3);
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
        (600,	'Lego',	'',	'cadeaux',	'f',	3,	4,	1,	3,	5,	6, 2 , '2022-04-09', 'facture_2022_6'),
        (45, 'café', '', 'capsules café', 'f', 1, 2, 1, 3, 4, 6, 2, '2022-02-10', 'facture_2022_7'),
        (250, 'équipement', '', 'matériel sportif', 'f', 2, 3, 2, 4, 4, 6, 4, '2022-05-15', 'facture_2022_8'),
        (70, 'restaurant', '', 'repas réunion', 'f', 3, 1, 2, 3, 4, 6, 1, '2022-06-20', 'facture_2022_9'),
        (100, 'livres', '', 'documents formation', 'f', 1, 1, 2, 3, 4, 6, 2, '2022-03-14', 'facture_2022_10'),
        (90, 'papeterie', '', 'matériel bureau', 'f', 2, 2, 2, 4, 4, 6, 4, '2022-09-05', 'facture_2022_11'),
        (200, 'logiciels', '', 'achat logiciel', 'f', 3, 3, 1, 3, 4, 6, 1, '2022-11-12', 'facture_2022_12'),
        (80, 'impression', '', 'cartouches imprimante', 'f', 1, 4, 2, 3, 4, 6, 2, '2022-01-19', 'facture_2022_13'),
        (400, 'transport', '', 'déplacement équipe', 'f', 2, 1, 2, 4, 4, 6, 4, '2022-12-25', 'facture_2022_14'),
        (35, 'fournitures', '', 'accessoires divers', 'f', 3, 3, 2, 3, 4, 6, 1, '2022-04-17', 'facture_2022_15'),
        (300, 'animation', '', 'services animation', 'f', 1, 2, 1, 4, 4, 6, 2, '2022-07-03', 'facture_2022_16'),
        (120, 'sécurité', '', 'alarme bureau', 'f', 2, 1, 2, 3, 4, 6, 4, '2022-10-10', 'facture_2022_17'),
        (65, 'nettoyage', '', 'produits ménagers', 'f', 3, 4, 1, 3, 4, 6, 1, '2022-08-25', 'facture_2022_18'),
        (75, 'décoration', '', 'plantes bureau', 'f', 1, 1, 2, 3, 4, 6, 2, '2022-09-08', 'facture_2022_19'),
        (150, 'publicité', '', 'flyers événement', 'f', 2, 2, 2, 4, 4, 6, 4, '2022-05-21', 'facture_2022_20');
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
