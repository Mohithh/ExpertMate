import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, phone, experience, specialization, qualifications, whyJoin } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.COMPANY_EMAIL, // Recipient's email address
      subject: 'New Arbitration Panel Application',
      text: `
        You have a new application for the arbitration panel:
        
        - Email: ${email}
        - Phone: ${phone}
        - Years of Legal Experience: ${experience}
        - Specialization: ${specialization}
        - Relevant Qualifications: ${qualifications}
        - Why Join: ${whyJoin}
      `,
    };

    try {
      console.log("Sending email...");
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: `Failed to send email: ${error.message}` });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
