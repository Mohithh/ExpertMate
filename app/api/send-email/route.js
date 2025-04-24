import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, number, email, message, location, preferredTime, urgency } = await req.json();

  // Validate required fields
  const requiredFields = { name, number, email, message, location, preferredTime, urgency };
  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return new Response(
      JSON.stringify({ 
        error: "Missing required fields", 
        missingFields 
      }), 
      { status: 400 }
    );
  }

  // Create nodemailer transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Generate reference number and date
    const referenceNumber = `SS-${Math.floor(100000 + Math.random() * 900000)}`;
    const currentDate = new Date().toLocaleString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    // Modern email template for TEAM (internal notification)
    const teamHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New Client Inquiry: ${name}</title>
      <style>
        body {
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 0;
          background-color: #f5f7fa;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin: 20px auto;
        }
        .header {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          padding: 25px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 600;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          margin-left: 10px;
          background-color: ${urgency === 'High' ? '#ef4444' : '#10b981'};
          color: white;
        }
        .content {
          padding: 25px;
        }
        .section {
          margin-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 20px;
        }
        .section:last-child {
          border-bottom: none;
        }
        .label {
          font-weight: 600;
          color: #4b5563;
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }
        .value {
          font-size: 15px;
          color: #111827;
        }
        .message-box {
          background-color: #f9fafb;
          border-radius: 6px;
          padding: 15px;
          margin-top: 10px;
          border-left: 3px solid #2563eb;
        }
        .footer {
          background-color: #f9fafb;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #6b7280;
        }
        .ref-number {
          background-color: #e0e7ff;
          color: #2563eb;
          padding: 8px 15px;
          border-radius: 6px;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Client Inquiry <span class="badge">${urgency}</span></h1>
        </div>
        
        <div class="content">
          <div class="ref-number">Reference: ${referenceNumber}</div>
          
          <div class="section">
            <span class="label">Client Information</span>
            <div class="value">
              <strong>${name}</strong><br>
              📞 ${number}<br>
              ✉️ ${email}<br>
              📍 ${location}
            </div>
          </div>
          
          <div class="section">
            <span class="label">Preferred Contact Time</span>
            <div class="value">⏰ ${preferredTime}</div>
          </div>
          
          <div class="section">
            <span class="label">Case Details</span>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        
        <div class="footer">
          <p>This inquiry was submitted via SettleSmart website on ${currentDate}</p>
          <p>© ${new Date().getFullYear()} SettleSmart Solutions. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Modern email template for USER (confirmation)
    const userHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Thank You for Contacting SettleSmart</title>
      <style>
        body {
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 0;
          background-color: #f5f7fa;
        }
        .container {
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin: 20px auto;
        }
        .header {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          color: white;
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .header p {
          margin: 8px 0 0;
          opacity: 0.9;
        }
        .content {
          padding: 30px;
        }
        .thank-you {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .ref-card {
          background-color: #f0f7ff;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 25px;
          text-align: center;
        }
        .ref-number {
          font-size: 18px;
          font-weight: 700;
          color: #2563eb;
          margin: 10px 0;
        }
        .details {
          margin-bottom: 25px;
        }
        .detail-item {
          display: flex;
          margin-bottom: 12px;
        }
        .detail-label {
          font-weight: 600;
          color: #4b5563;
          width: 120px;
          font-size: 14px;
        }
        .detail-value {
          flex: 1;
          color: #111827;
        }
        .message-box {
          background-color: #f9fafb;
          border-radius: 6px;
          padding: 15px;
          margin: 20px 0;
          border-left: 3px solid #2563eb;
        }
        .next-steps {
          background-color: #f0fdf4;
          border-radius: 8px;
          padding: 20px;
          margin: 25px 0;
          border-left: 4px solid #10b981;
        }
        .next-steps h3 {
          margin-top: 0;
          color: #065f46;
        }
        .next-steps ul {
          padding-left: 20px;
          margin-bottom: 0;
        }
        .next-steps li {
          margin-bottom: 8px;
        }
        .contact-info {
          text-align: center;
          margin-top: 25px;
          font-size: 15px;
        }
        .footer {
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You, ${name}!</h1>
          <p>We've received your inquiry</p>
        </div>
        
        <div class="content">
          <div class="thank-you">
            Thank you for contacting <strong>SettleSmart Solutions</strong>. We appreciate the opportunity to assist you.
          </div>
          
          <div class="ref-card">
            <div style="font-size: 14px; color: #4b5563;">Your Reference Number</div>
            <div class="ref-number">${referenceNumber}</div>
            <div style="font-size: 13px; color: #6b7280;">Submitted on ${currentDate}</div>
          </div>
          
          <div class="details">
            <div class="detail-item">
              <div class="detail-label">Name:</div>
              <div class="detail-value">${name}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Phone:</div>
              <div class="detail-value">${number}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Email:</div>
              <div class="detail-value">${email}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Location:</div>
              <div class="detail-value">${location}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Preferred Time:</div>
              <div class="detail-value">${preferredTime}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">Urgency:</div>
              <div class="detail-value" style="color: ${urgency === 'High' ? '#ef4444' : '#10b981'}; font-weight: 500;">${urgency}</div>
            </div>
          </div>
          
          <div>
            <div style="font-weight: 600; margin-bottom: 8px; color: #4b5563;">Your Message:</div>
            <div class="message-box">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div class="next-steps">
            <h3>What Happens Next?</h3>
            <ul>
              <li>Our team will review your inquiry within <strong>24 hours</strong></li>
              <li>We'll contact you at the provided details to discuss next steps</li>
              <li>For urgent matters, please call us directly at <strong>+1 (555) 789-1234</strong></li>
            </ul>
          </div>
          
          <div class="contact-info">
            <p>Need immediate assistance?<br>
            📞 <strong>+1 (555) 789-1234</strong> | ✉️ <strong>support@settlesmart.com</strong></p>
          </div>
        </div>
        
        <div class="footer">
          <p>SettleSmart Resolution Services</p>
          <p>500 Resolution Way, Suite 200 • New York, NY 10001</p>
          <p>© ${new Date().getFullYear()} SettleSmart Solutions. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Send email to team
    await transporter.sendMail({
      from: `"SettleSmart Solutions" <${process.env.EMAIL_FROM}>`,
      to: process.env.COMPANY_EMAIL,
      subject: `📋 New Case: ${name} (${referenceNumber}) | ${urgency} Priority`,
      text: `New client inquiry received:\n\nName: ${name}\nPhone: ${number}\nEmail: ${email}\nLocation: ${location}\nPreferred Time: ${preferredTime}\nUrgency: ${urgency}\n\nMessage:\n${message}\n\nReference: ${referenceNumber}`,
      html: teamHtml
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"SettleSmart Solutions" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: `✅ Inquiry Received (Ref: ${referenceNumber}) | SettleSmart Solutions`,
      text: `Dear ${name},\n\nThank you for contacting SettleSmart Solutions.\n\nReference Number: ${referenceNumber}\n\nWe've received your inquiry and will respond within 24 hours. For urgent matters, please call +1 (555) 789-1234.\n\nYour Message:\n"${message}"\n\nBest regards,\nThe SettleSmart Team`,
      html: userHtml
    });

    return new Response(
      JSON.stringify({ 
        message: "Emails sent successfully!",
        reference: referenceNumber
      }), 
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send email",
        details: error.message 
      }), 
      { status: 500 }
    );
  }
}