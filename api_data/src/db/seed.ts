import { AppDataSource } from "./data-source";

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
    await queryRunner.query(`DELETE FROM "budget" CASCADE`);
    await queryRunner.query(`DELETE FROM "credit_debit" CASCADE`);
    await queryRunner.query(`DELETE FROM "vat" CASCADE`);

    // init sequences
    await queryRunner.query(`ALTER SEQUENCE role_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE user_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE bank_id_seq RESTART WITH 1;`);
    await queryRunner.query(
      `ALTER SEQUENCE bank_account_id_seq RESTART WITH 1;`
    );
    await queryRunner.query(`ALTER SEQUENCE budget_id_seq RESTART WITH 1;`);
    await queryRunner.query(
      `ALTER SEQUENCE credit_debit_id_seq RESTART WITH 1;`
    );
    await queryRunner.query(`ALTER SEQUENCE vat_id_seq RESTART WITH 1;`);

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

    // insert budget
    await queryRunner.query(`
      INSERT INTO "budget" ("id", "label", "start_date", "end_date") VALUES
        (1,	'Budget 2022',	'2022-02-01 00:00:00',	'2023-01-31 00:00:00'),
        (2,	'Super Budget 2023',	'2023-02-01 00:00:00',	'2024-01-31 00:00:00');
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

    await queryRunner.commitTransaction();

    console.info("Seeding Done.");
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  }
})();
