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
const { PORT, EMAIL_FROM } = process.env;

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (_, res: Response) => {
  res.send("Hello Email!");
});

app.post("/send-email-invoice", async (req: Request, res: Response) => {
  const { recipient, subject, fullname, invoiceNumber } = req.body;

  // Data for the template
  const templateData = { fullname, invoiceNumber };

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
  const { recipient, subject, fullname, email, password } = req.body;

  // Data for the template
  const templateData = { fullname, email, password };

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

app.listen(PORT, () => {
  console.info(`🚀 API email server ready at http://localhost:${PORT}`);
});
