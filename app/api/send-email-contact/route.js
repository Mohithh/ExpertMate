import nodemailer from 'nodemailer';

// Helper function to sanitize input
const sanitizeInput = (input) => {
  if (!input) return '';
  return input.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Email template
const generateEmailTemplate = ({ name, email, subject, message }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { padding: 20px; background-color: #f9fafb; border: 1px solid #e5e7eb; }
    .footer { margin-top: 20px; font-size: 12px; color: #6b7280; text-align: center; }
    .info-item { margin-bottom: 15px; }
    .info-label { font-weight: bold; color: #4b5563; }
    .message { background-color: #f3f4f6; padding: 15px; border-radius: 4px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <h2>New Contact Form Submission</h2>
  </div>
  <div class="content">
    <div class="info-item">
      <span class="info-label">From:</span> ${name} &lt;${email}&gt;
    </div>
    ${subject ? `<div class="info-item"><span class="info-label">Subject:</span> ${subject}</div>` : ''}
    <div class="info-item">
      <span class="info-label">Message:</span>
      <div class="message">${message.replace(/\n/g, '<br>')}</div>
    </div>
  </div>
  <div class="footer">
    <p>This email was sent via your website contact form.</p>
  </div>
</body>
</html>
`;

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return Response.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email
    const mailOptions = {
      from: `"Website Contact Form" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM,
      replyTo: email,
      subject: subject || `New message from ${name}`,
      html: generateEmailTemplate({
        name: sanitizeInput(name),
        email: sanitizeInput(email),
        subject: subject ? sanitizeInput(subject) : '',
        message: sanitizeInput(message)
      }),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
    
  } catch (error) {
    console.error("Email sending error:", error);
    return Response.json(
      { success: false, error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}