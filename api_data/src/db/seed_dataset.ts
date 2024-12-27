import { AppDataSource } from "./data-source";

(async () => {
  // initializing data source
  await AppDataSource.initialize();

  console.info("Starting Mega Seeding...");

  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    // big cleanup
    await queryRunner.query(`DELETE FROM "invoice"`);
    await queryRunner.query(`DELETE FROM "bank_account"`);
    await queryRunner.query(`DELETE FROM "bank"`);
    await queryRunner.query(`DELETE FROM "subcategory"`);
    await queryRunner.query(`DELETE FROM "category"`);
    await queryRunner.query(`DELETE FROM "user_commissions_commission"`);
    await queryRunner.query(`DELETE FROM "commission"`);
    await queryRunner.query(`DELETE FROM "budget"`);
    await queryRunner.query(`DELETE FROM "exercise"`);
    await queryRunner.query(`DELETE FROM "credit_debit"`);
    await queryRunner.query(`DELETE FROM "vat"`);
    await queryRunner.query(`DELETE FROM "status"`);
    await queryRunner.query(`DELETE FROM "user_roles_role"`);
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

    // insert status
    await queryRunner.query(`
      INSERT INTO "status" ("label") VALUES
       ('Validé'),
       ('En attente'),
       ('Refusé');
    `);

    // insert unique credit_debit
    await queryRunner.query(`
      INSERT INTO credit_debit (label)
      SELECT DISTINCT credit_debit
      FROM csv_import
      WHERE credit_debit IS NOT NULL
      ON CONFLICT (label) DO NOTHING;
    `);

    // insert unique banks
    await queryRunner.query(`
      INSERT INTO bank (label)
      SELECT DISTINCT bank
      FROM csv_import
      WHERE bank IS NOT NULL
      ON CONFLICT (label) DO NOTHING;
    `);

    // insert unique banks accounts
    await queryRunner.query(`
      INSERT INTO bank_account (name, account_number, balance, "bankId")
      SELECT DISTINCT
          bank_act,
          num_act,
          0.0,
          b.id
      FROM csv_import ci
      JOIN bank b ON b.label = ci.bank
      WHERE bank_act IS NOT NULL AND num_act IS NOT NULL
      ON CONFLICT (account_number) DO NOTHING;
    `);

    // insert unique categories with credit_debit relationship
    await queryRunner.query(`
      INSERT INTO category (label, "creditDebitId")
      SELECT DISTINCT
          ci.category,
          cd.id
      FROM csv_import ci
      JOIN credit_debit cd ON cd.label = ci.credit_debit
      WHERE ci.category IS NOT NULL
      ON CONFLICT (label) DO NOTHING;
    `);

    // insert unique subcategories
    await queryRunner.query(`
      INSERT INTO subcategory (code, label, "categoryId")
      SELECT DISTINCT
          ci.code_subcategory,
          ci.subcategory,
          c.id
      FROM csv_import ci
      JOIN category c ON c.label = ci.category
      WHERE ci.subcategory IS NOT NULL AND ci.code_subcategory IS NOT NULL;
    `);

    // insert unique commissions
    await queryRunner.query(`
      INSERT INTO commission (name)
      SELECT DISTINCT commission
      FROM csv_import
      WHERE commission IS NOT NULL
      ON CONFLICT (name) DO NOTHING;
    `);

    // insert unique vat
    await queryRunner.query(`
      INSERT INTO vat (label, rate)
      SELECT DISTINCT
          CASE
              WHEN vat = 0 THEN 'TVA 0%'
              ELSE CONCAT('TVA ', vat, '%')
          END,
          vat
      FROM csv_import
      WHERE vat IS NOT NULL
      ON CONFLICT (label) DO NOTHING;
    `);

    // insert unique users
    await queryRunner.query(`
      INSERT INTO "user" (email, firstname, lastname, password)
      SELECT DISTINCT
          representant_email,
          split_part(representant, ' ', 1),
          split_part(representant, ' ', 2),
          '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8'
      FROM csv_import
      WHERE representant_email IS NOT NULL
      ON CONFLICT (email) DO NOTHING;
    `);

    // insert super admin (test password: whS0@cqnuros)
    await queryRunner.query(`
      INSERT INTO "user" ("email", "firstname", "lastname", "password") VALUES
      ('super@admin.net', 'Super', 'Admin', '$argon2id$v=19$m=65536,t=3,p=4$kjem4qjZeE8bL8x+Nwt6hg$UtS5vzoj5WOkINl0oyNWNVZtjtH8fWe76Wzy6OQsev8');
    `);

    // insert user_roles_role
    await queryRunner.query(`
      INSERT INTO "user_roles_role" ("userId", "roleId") VALUES
        (1,	3),
        (2,	3),
        (3,	3),
        (4,	3),
        (5, 3),
        (6, 3),
        (7, 3),
        (8, 3),
        (9, 3),
        (10, 3),
        (11, 3),
        (12, 3),
        (13, 3),
        (14, 3),
        (15, 3),
        (16, 3),
        (17, 3),
        (18, 3),
        (19, 3),
        (20, 3),
        (21, 1),
        (21, 2),
        (21, 3);
    `);

    // insert user-commission relationships
    await queryRunner.query(`
      INSERT INTO user_commissions_commission ("userId", "commissionId")
      SELECT DISTINCT
          u.id as "userId",
          c.id as "commissionId"
      FROM csv_import ci
      JOIN "user" u ON u.email = ci.representant_email
      JOIN commission c ON c.name = ci.commission
      WHERE ci.representant_email IS NOT NULL
        AND ci.commission IS NOT NULL
      ON CONFLICT ("userId", "commissionId") DO NOTHING;
    `);

    // insert invoices
    await queryRunner.query(`
      INSERT INTO invoice (
        price_without_vat,
        label,
        receipt,
        info,
        paid,
        date,
        "statusId",
        "vatId",
        "creditDebitId",
        "subcategoryId",
        "commissionId",
        "bankAccountId",
        "userId",
        "invoiceNumber"
      )
      SELECT
          ci.amount_without_vat,
          ci.label,
          ci.receipt,
          ci.info,
          true,
          CAST(ci.date AS timestamp),
          (SELECT id FROM status WHERE label = 'Validé'),
          v.id,
          cd.id,
          sc.id,
          com.id,
          ba.id,
          u.id,
          CASE
              WHEN ci.receipt ~ '^Facture_.*.pdf$' THEN
                  substring(ci.receipt from '^Facture_(.*?).pdf$')
              ELSE NULL
          END as "invoiceNumber"
      FROM csv_import ci
      JOIN credit_debit cd ON cd.label = ci.credit_debit
      JOIN subcategory sc ON sc.code = ci.code_subcategory
      JOIN commission com ON com.name = ci.commission
      JOIN bank_account ba ON ba.account_number = ci.num_act
      JOIN "user" u ON u.email = ci.representant_email
      JOIN vat v ON v.rate = ci.vat;
    `);

    await queryRunner.commitTransaction();

    console.info("Finished Mega Seeding.");
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    console.info("Seeding Done.");
    await AppDataSource.destroy();
  }
})();
