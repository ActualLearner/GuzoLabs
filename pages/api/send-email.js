import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { qrCodeData } = req.body;

  if (!qrCodeData) return res.status(400).json({ message: "No QR data" });

  const base64Image = qrCodeData.split("base64,")[1];

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,       // your Gmail address
      pass: process.env.GMAIL_APP_PASS,   // app password from Google
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: "actualliver@gmail.com", // your actual email
    subject: "Here is your QR Code",
    html: `
      <div>
        <h2>Your QR Code</h2>
        <img src="cid:qrcode" />
      </div>
    `,
    attachments: [
      {
        filename: "qr-code.png",
        content: base64Image,
        encoding: "base64",
        cid: "qrcode",
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Sent!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending email" });
  }
}