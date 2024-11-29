import { AppDataSource } from "./data-source";
console.info("test seed");

(async () => {
  // initializing data source
  await AppDataSource.initialize();

  console.info("Starting Seeding...");

  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    // big cleanup
    await queryRunner.query("DELETE FROM user_roles_role CASCADE");
    await queryRunner.query(`DELETE FROM "user" CASCADE`);
    await queryRunner.query(`DELETE FROM "role" CASCADE`);
    await queryRunner.query(`DELETE FROM "bank_account" CASCADE`);
    await queryRunner.query(`DELETE FROM "bank" CASCADE`);
    await queryRunner.query(`DELETE FROM "subcategory" CASCADE`);
    await queryRunner.query(`DELETE FROM "category" CASCADE`);
    await queryRunner.query(`DELETE FROM "commission" CASCADE`);
    await queryRunner.query(`DELETE FROM "budget" CASCADE`);
    await queryRunner.query(`DELETE FROM "credit_debit" CASCADE`);
    await queryRunner.query(`DELETE FROM "vat" CASCADE`);
    await queryRunner.query(`DELETE FROM "status" CASCADE`);
    await queryRunner.query(`DELETE FROM "invoice" CASCADE`);

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
      INSERT INTO "role" ("id", "label") VALUES
        (1,	'Administrateur'),
        (2,	'Comptable'),
        (3,	'Responsable Commission');
    `);

    // insert users
    await queryRunner.query(`
      INSERT INTO "user" ("id", "email", "firstname", "lastname", "password") VALUES
        (1,	'maxime.roux@association.com',	'Maxime',	'Roux',	'aaa'),
        (2,	'lucie.bernard@association.com',	'Lucie',	'Bernard',	'aaaaa'),
        (3,	'caroline.mercier@association.com',	'Caroline',	'Mercier',	'cccc'),
        (4,	'sophie.thomas@association.com',	'Sophie',	'Thomas',	'ssss');
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
      INSERT INTO "bank" ("id", "label") VALUES
        (1, 'Bank A'),
        (2, 'Bank B');
    `);

    // insert bank accounts
    await queryRunner.query(`
      INSERT INTO "bank_account" ("id", "name", "account_number", "balance", "bankId") VALUES
        (1, 'Compte courant', 'FR7612345678900000001234564', '10000.00', 1),
        (2, 'Livret A', 'FR7612345678900000001234562', '5000.00', 1),
        (3, 'Livret Développement Durable', 'FR7612345678900000001234566', '15000.00', 1),
        (4, 'Livret A', 'FR7612345678900000001234565', '25000.00', 2),
        (5, 'Livret Développement Durable', 'FR7612345678900000001234563', '12000.00', 2),
        (6, 'Compte courant', 'FR7612345678900000001234561', '20000.00', 2);
    `);

    // insert categories
    await queryRunner.query(`
      INSERT INTO "category" ("id", "label") VALUES
        (1, 'Vente de marchandises'),
        (2, 'Dons'),
        (3, 'Bancaire'),
        (4, 'Cotisations'),
        (5, 'Prestation'),
        (6, 'Subventions'),
        (7, 'Véhicule'),
        (8, 'Partenariat'),
        (9, 'Location'),
        (10, 'Opérationnel');
    `);

    // insert subcategories
    await queryRunner.query(`
      INSERT INTO "subcategory" ("id", "category_id", "code", "label", "categoryId") VALUES
        (1, 1, 'DIV365', 'Divers', 1),
        (2, 2, 'ANN232', 'Annuel', 2),
        (3, 1, 'GOO209', 'Goodies', 1),
        (4, 3, 'INT124', 'Intérêt', 3),
        (5, 4, 'FAM511', 'Famille', 4),
        (6, 4, 'JEU704', 'Jeunesse', 4),
        (7, 9, 'FAM452', 'Famille', 9),
        (8, 9, 'MAT138', 'Matériel', 9),
        (9, 8, 'EVE967', 'Événement', 8),
        (10, 3, 'INT424', 'Intérêt', 3);
    `);

    // insert budget
    await queryRunner.query(`
      INSERT INTO "budget" ("id", "label", "start_date", "end_date") VALUES
        (1,	'Budget 2022',	'2022-02-01 00:00:00',	'2023-01-31 00:00:00'),
        (2,	'Super Budget 2023',	'2023-02-01 00:00:00',	'2024-01-31 00:00:00');
    `);

    // insert commission
    await queryRunner.query(`
      INSERT INTO "commission" ("id", "name") VALUES
        (1,	'Equipement'),
        (2,  'Communication'),
        (3,	'Événementiel'),
        (4,	'Formation'),
        (5,	'Animation'),
        (6,	'Opérationnel');
        
    `);
    // insert TVA
    await queryRunner.query(`
      INSERT INTO "vat" ("id", "label", "rate") VALUES
        (1,	'TVA 0%', 0),
        (2,	'TVA 5.5%', 5.5),
        (3,	'TVA 10%', 10),
        (4,	'TVA 20%', 20);
    `);

    // insert credit_debit
    await queryRunner.query(`
          INSERT INTO "credit_debit" ("id", "label") VALUES
            (1, 'crédit'),
            (2, 'débit');
        `);

    // insert roles
    await queryRunner.query(`
          INSERT INTO "status" ("id", "label") VALUES
            (1,	'Validé'),
            (2,	'En attente'),
            (3,	'Refusé');
        `);

    // // insert invoice accounts
    // await queryRunner.query(`
    //   INSERT INTO "invoice" ("id", "invoice_date", "status", "price_without_vat", "vat", "label", "receipt", "credit_debit", "info", "paid") VALUES
    //     (1, "2019-11-15", 1 , 400,  ),
    //     (2, "2019-11-27", 1, ),
    //     (3, "2019-12-12", 1, ),
    //     (4, "2019-12-12),
    //     (5, ),
    //     (6, ),
    //     (7, "2019-11-15", , ),
    //     (8, "2019-11-27", ),
    //     (9, "2019-12-12", ),
    //     (10, ),
    //     (11, ),
    //     (12, );
    // `);

    await queryRunner.commitTransaction();

    console.info("Seeding Done.");
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  }
})();
