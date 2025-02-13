import * as dotenv from "dotenv";

dotenv.config();
const { MAILER_HOST, MAILER_PORT } = process.env;

export async function sendPasswordByEmail(
  email: string,
  password: string,
  firstname: string,
  lastname: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `http://${MAILER_HOST}:${MAILER_PORT}/send-email-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: email,
          subject: "ClubCompta - Votre compte est actif",
          fullname: `${firstname} ${lastname}`,
          email: email,
          password: password,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export async function sendResetPasswordEmail(
  email: string,
  resetUrl: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `http://${MAILER_HOST}:${MAILER_PORT}/send-reset-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: email,
          subject: "ClubCompta - Réinitialisation de votre mot de passe",
          resetUrl: resetUrl,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export async function sendEmailToCommission(
  email: string,
  firstname: string,
  lastname: string,
  invoiceNumber?: string,
  reason?: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `http://${MAILER_HOST}:${MAILER_PORT}/send-email-invoice`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: email,
          subject: "ClubCompta - Facture refusée",
          fullname: `${firstname} ${lastname}`,
          invoiceNumber: `${invoiceNumber}`,
          reason: reason ? ` ${reason}` : "",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
