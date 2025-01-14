import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { transporter } from "./utils/transporter";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";
import jwt from "jsonwebtoken";

dotenv.config();
const { PORT, EMAIL_FROM, AUTH_SECRET_KEY } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

type Role = {
  id: string;
};

type User = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  roles: Role[];
};

// Custom interface for authenticated requests
interface AuthenticatedRequest extends Request {
  user?: User;
}

// Authentication middleware
const authenticatedRoute = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Authorization header missing" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ message: "Token missing" });
    return;
  }

  try {
    // Verify the token using the same secret as api_data
    const user = jwt.verify(token, AUTH_SECRET_KEY!) as User;
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Invalid or expired token" });
    return;
  }
};

app.get("/", (_, res: Response) => {
  res.send("Hello Email!");
});

app.post(
  "/send-email-invoice",
  authenticatedRoute,
  async (req: AuthenticatedRequest, res: Response) => {
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
  }
);

app.post(
  "/send-email-password",
  authenticatedRoute,
  async (req: AuthenticatedRequest, res: Response) => {
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
  }
);

app.post(
  "/send-reset-password",
  authenticatedRoute,
  async (req: AuthenticatedRequest, res: Response) => {
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
  }
);

app.listen(PORT, () => {
  console.info(`🚀 API email server ready at http://localhost:${PORT}`);
});
