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
          subject: "Un compte a été créé pour vous",
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
