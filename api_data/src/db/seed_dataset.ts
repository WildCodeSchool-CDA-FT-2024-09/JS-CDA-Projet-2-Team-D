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

    // insert unique categories
    await queryRunner.query(`
      INSERT INTO category (label, "creditDebitId")
      SELECT DISTINCT
          ci.category AS label,
          cd.id AS "creditDebitId"
      FROM csv_import ci
      JOIN credit_debit cd ON cd.label = ci.credit_debit
      WHERE ci.category IS NOT NULL
    `);

    // insert unique subcategories
    await queryRunner.query(`
      INSERT INTO subcategory (code, label, "categoryId")
      SELECT DISTINCT ON (ci.code_subcategory)
          ci.code_subcategory,
          ci.subcategory,
          c.id
      FROM csv_import ci
      JOIN credit_debit cd ON cd.label = ci.credit_debit
      JOIN category c ON c.label = ci.category
          AND c."creditDebitId" = cd.id
      WHERE ci.subcategory IS NOT NULL
          AND ci.code_subcategory IS NOT NULL
          AND ci.credit_debit IS NOT NULL
      ORDER BY ci.code_subcategory
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

    // insert ADMINs in user_roles_role
    await queryRunner.query(`
      INSERT INTO "user_roles_role" ("userId", "roleId")
      SELECT DISTINCT
        id,
        1
      FROM "user"
      WHERE email IN ('anne.robert@association.com', 'pierre.martin@association.com', 'claire.simon@association.com', 'super@admin.net')
      ON CONFLICT ("userId", "roleId") DO NOTHING;
    `);

    // insert ACCOUNTANTs in user_roles_role
    await queryRunner.query(`
      INSERT INTO "user_roles_role" ("userId", "roleId")
      SELECT
        id,
        2
      FROM "user"
      WHERE email IN ('claire.simon@association.com', 'nicolas.perret@association.com', 'super@admin.net')
      ON CONFLICT ("userId", "roleId") DO NOTHING;
    `);

    // insert COMMISSION USERs in user_roles_role
    await queryRunner.query(`
      INSERT INTO "user_roles_role" ("userId", "roleId")
      SELECT
        id,
        3
      FROM "user"
      WHERE email NOT IN ('anne.robert@association.com', 'pierre.martin@association.com', 'claire.simon@association.com', 'nicolas.perret@association.com')
      ON CONFLICT ("userId", "roleId") DO NOTHING;
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

    // superadmin gets all the commissions
    await queryRunner.query(`
      INSERT INTO user_commissions_commission ("userId", "commissionId") VALUES
        (21, 1),
        (21, 2),
        (21, 3),
        (21, 4),
        (21, 5),
        (21, 6),
        (21, 7);
    `);

    // insert exercise (civil year)
    // await queryRunner.query(`
    //   INSERT INTO "exercise" ("label", "start_date", "end_date") VALUES
    //     ('Budget 2019', '2019-01-01 00:00:00', '2019-12-31 00:00:00'),
    //     ('Budget 2020', '2020-01-01 00:00:00', '2020-12-31 00:00:00'),
    //     ('Budget 2021', '2021-01-01 00:00:00', '2021-12-31 00:00:00'),
    //     ('Budget 2022',	'2022-01-01 00:00:00', '2022-12-31 00:00:00'),
    //     ('Budget 2023',	'2023-01-01 00:00:00', '2023-12-31 00:00:00');
    // `);

    // insert exercise (school year)
    await queryRunner.query(`
      INSERT INTO "exercise" ("label", "start_date", "end_date") VALUES
        ('Budget 2019', '2019-09-01 00:00:00', '2020-08-31 00:00:00'),
        ('Budget 2020', '2020-09-01 00:00:00', '2021-08-31 00:00:00'),
        ('Budget 2021', '2021-09-01 00:00:00', '2022-08-31 00:00:00'),
        ('Budget 2022',	'2022-09-01 00:00:00', '2023-08-31 00:00:00'),
        ('Budget 2023',	'2023-09-01 00:00:00', '2024-08-31 00:00:00'),
        ('Budget 2024',	'2024-09-01 00:00:00', '2025-08-31 00:00:00');
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

    // insert budget
    // await queryRunner.query(`
    //   INSERT INTO "budget" ("exerciseId", "commissionId", "amount")
    //   SELECT DISTINCT
    //       e.id as "exerciseId",
    //       c.id as "commissionId",
    //       0.0 as "amount"
    //   FROM exercise e
    //   CROSS JOIN commission c -- the cross join combines all of the rows from the first table with all of the rows from the second table
    //   WHERE EXISTS (
    //       SELECT 1 -- performance optimization, we don't care about the result, we only want to know if there is at least one invoice
    //       FROM invoice i
    //       WHERE i."commissionId" = c.id
    //       AND i.date >= e.start_date
    //       AND i.date <= e.end_date
    //   )
    // `);

    await queryRunner.query(`
      INSERT INTO "budget" ("exerciseId", "commissionId", "amount")
      SELECT
          e.id as "exerciseId",
          c.id as "commissionId",
          COALESCE(SUM(
              CASE
                  WHEN cd.id = 1 THEN -1 * i.price_without_vat * (1 + v.rate/100)
                  ELSE i.price_without_vat * (1 + v.rate/100)
              END
          ), 0.0) as "amount"
      FROM exercise e
      CROSS JOIN commission c
      LEFT JOIN invoice i ON i."commissionId" = c.id
          AND i.date >= e.start_date
          AND i.date <= e.end_date
      LEFT JOIN vat v ON v.id = i."vatId"
      LEFT JOIN credit_debit cd ON cd.id = i."creditDebitId"
      GROUP BY e.id, c.id
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
