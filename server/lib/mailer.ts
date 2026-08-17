import nodemailer from "nodemailer";

export type ContactData = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

// Sends the contact enquiry by email if SMTP is configured. Returns true if sent.
// Never throws — the submission is always saved to the database regardless.
export async function sendContactEmail(data: ContactData): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  if (!host) return false;

  try {
    const port = Number(process.env.SMTP_PORT || 587);
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });

    const to = process.env.CONTACT_TO || "info@gmrbuildcon.com";
    const from = process.env.SMTP_FROM || "GMR Buildcon <no-reply@gmrbuildcon.com>";
    const subject = `[Website Enquiry] ${data.name} — ${data.interest || "General"}`;
    const text =
      `New enquiry from the GMR Buildcon website:\n\n` +
      `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n` +
      `Interest: ${data.interest}\n\nMessage:\n${data.message}\n`;

    await transport.sendMail({
      to,
      from,
      subject,
      text,
      replyTo: `${data.name} <${data.email}>`,
    });
    return true;
  } catch (err) {
    console.error("[contact] email failed:", err);
    return false;
  }
}
