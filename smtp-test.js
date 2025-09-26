import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // loads your .env file

async function main() {
  try {
    // 1. Create transporter
    const transporter = nodemailer.createTransport({
  host: "smtp.stackmail.com", // ✅ use actual host with valid SSL cert
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER, // e.g. yourname@zayarsenergy.com
    pass: process.env.SMTP_PASS,
  },
});


    // 2. Send a test mail
    const info = await transporter.sendMail({
      from: `"SMTP Test" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAILS, // comma-separated list from your .env
      subject: "SMTP Test ✅",
      text: "Hello, this is a test email from Nodemailer + Stackmail setup!",
    });

    console.log("✅ Test mail sent successfully:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send test mail:", error);
  }
}

main();
