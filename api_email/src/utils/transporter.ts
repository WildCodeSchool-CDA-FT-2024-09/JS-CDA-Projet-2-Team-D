import * as dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

export const transporter = nodemailer.createTransport({
  port: Number(SMTP_PORT),
  host: SMTP_HOST,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
  secure: true,
});
