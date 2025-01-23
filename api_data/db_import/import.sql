CREATE TABLE csv_import (
  category VARCHAR(50),
  subcategory VARCHAR(50),
  code_subcategory VARCHAR(30),
  credit_debit VARCHAR(20),
  amount_without_vat FLOAT(4),
  vat FLOAT(4),
  amount_with_vat FLOAT(4),
  label VARCHAR(50),
  date VARCHAR(20),
  bank VARCHAR(50),
  bank_act VARCHAR(100),
  num_act VARCHAR(100),
  receipt VARCHAR(100),
  commission VARCHAR(100),
  representant VARCHAR(100),
  representant_email VARCHAR(100),
  info VARCHAR(255)
);

COPY csv_import
FROM '/docker-entrypoint-initdb.d/dataset.csv'
DELIMITER ','
CSV HEADER;
