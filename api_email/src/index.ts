import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { transporter } from "./utils/transporter";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
const API_EMAIL_PORT = process.env.API_EMAIL_PORT
  ? parseInt(process.env.API_EMAIL_PORT)
  : 3000;
const { EMAIL_FROM } = process.env;

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_, res: Response) => {
  res.send("Hello Email!");
});

app.post("/send-email-invoice", async (req: Request, res: Response) => {
  const { recipient, subject, fullname, invoiceNumber, reason } = req.body;

  // Data for the template
  const templateData = { fullname, invoiceNumber, reason };

  // Render the email template
  const emailHtml = await ejs.renderFile(
    path.join(__dirname, "views", "email-template-invoice.ejs"),
    templateData
  );

  transporter.sendMail(
    {
      from: EMAIL_FROM,
      to: recipient,
      subject: subject,
      html: emailHtml,
    },
    (err, info) => {
      if (err) {
        console.error("Error sending email");
        res
          .status(400)
          .json({ success: false, message: "Error sending email" });
      } else {
        res
          .status(200)
          .json({ success: true, message: `Message ${info.messageId} sent` });
      }
    }
  );
});

app.post("/send-email-password", async (req: Request, res: Response) => {
  const { recipient, subject, fullname, password } = req.body;

  // Data for the template
  const templateData = { fullname, recipient, password };

  // Render the email template
  const emailHtml = await ejs.renderFile(
    path.join(__dirname, "views", "email-template-password.ejs"),
    templateData
  );

  transporter.sendMail(
    {
      from: EMAIL_FROM,
      to: recipient,
      subject: subject,
      html: emailHtml,
    },
    (err, info) => {
      if (err) {
        console.error("Error sending email");
        res
          .status(400)
          .json({ success: false, message: "Error sending email" });
      } else {
        res
          .status(200)
          .json({ success: true, message: `Message ${info.messageId} sent` });
      }
    }
  );
});

app.post("/send-reset-password", async (req: Request, res: Response) => {
  const { recipient, subject, resetUrl } = req.body;

  // Data for the template
  const templateData = { resetUrl };

  // Render the email template
  const emailHtml = await ejs.renderFile(
    path.join(__dirname, "views", "email-template-reset-password.ejs"),
    templateData
  );

  transporter.sendMail(
    {
      from: EMAIL_FROM,
      to: recipient,
      subject: subject,
      html: emailHtml,
    },
    (err, info) => {
      if (err) {
        console.error("Error sending email");
        res
          .status(400)
          .json({ success: false, message: "Error sending email" });
      } else {
        res
          .status(200)
          .json({ success: true, message: `Message ${info.messageId} sent` });
      }
    }
  );
});

app.listen(API_EMAIL_PORT, () => {
  console.info(`🚀 API email server ready at port ${API_EMAIL_PORT}`);
});
