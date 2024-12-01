import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { transporter } from "./utils/transporter";
import bodyParser from "body-parser";
// import ejs from "ejs";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
const { PORT, EMAIL_FROM } = process.env;

app.get("/", (_, res: Response) => {
  res.send("Hello Email!");
});

app.post("/send-email", (req: Request, res: Response) => {
  const { recipient, subject, text_email, html_email } = req.body;

  transporter.sendMail(
    {
      from: EMAIL_FROM,
      to: recipient,
      subject: subject,
      text: text_email,
      html: html_email,
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
