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

    // init sequences
    await queryRunner.query(`ALTER SEQUENCE role_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE user_id_seq RESTART WITH 1;`);

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

    await queryRunner.commitTransaction();

    console.info("Seeding Done.");
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  }
})();
