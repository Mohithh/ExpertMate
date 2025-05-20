    import nodemailer from "nodemailer";

    export async function POST(req) {
    const {
        name,
        email,
        phone,
        caseType,
        opposingParty,
        incidentDate,
        caseDescription,
        documents,
        budget,
        urgency,
    } = await req.json();

    if (!name || !email || !phone || !caseType || !caseDescription) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        });
    }

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
        },
        logger: true,
        debug: true,
    });

    try {
        // Email to the law firm
        await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.COMPANY_EMAIL,
        subject: `📋 New Case Submission: ${caseType} (${urgency} priority)`,
        text: `
    Client Information:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}

    Case Details:
    Type: ${caseType}
    Opposing Party: ${opposingParty || "Not specified"}
    Incident Date: ${incidentDate || "Not specified"}
    Urgency: ${urgency}
    Budget Range: ${budget || "Not specified"}

    Case Description:
    ${caseDescription}

    Relevant Documents:
    ${documents || "None specified"}

    This case was submitted on ${new Date().toLocaleString()}
        `,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #1a365d;">New Case Submission</h2>
            
            <h3 style="color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Client Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            
            <h3 style="color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Case Details</h3>
            <p><strong>Type:</strong> ${caseType}</p>
            <p><strong>Opposing Party:</strong> ${opposingParty || "Not specified"}</p>
            <p><strong>Incident Date:</strong> ${incidentDate || "Not specified"}</p>
            <p><strong>Urgency:</strong> ${urgency}</p>
            <p><strong>Budget Range:</strong> ${budget || "Not specified"}</p>
            
            <h3 style="color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Case Description</h3>
            <p>${caseDescription.replace(/\n/g, "<br>")}</p>
            
            <h3 style="color: #2d3748; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px;">Relevant Documents</h3>
            <p>${documents ? documents.replace(/\n/g, "<br>") : "None specified"}</p>
            
            <p style="margin-top: 20px; color: #718096; font-size: 0.9em;">
                This case was submitted on ${new Date().toLocaleString()}
            </p>
            </div>
        `,
        });

        // Confirmation email to the client
        await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "✅ We've received your case details",
        text: `Hi ${name},

    Thank you for submitting your case details to our law firm. Here's a summary of what we received:

    Case Type: ${caseType}
    Urgency: ${urgency}

    Your Description:
    ${caseDescription}

    We will review your information and contact you within 1-2 business days to discuss next steps. If this is urgent, please call our office directly at [Law Firm Phone Number].

    - The Team at [Law Firm Name]
    `,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #1a365d;">Thank You for Your Submission</h2>
            <p>Hi ${name},</p>
            
            <p>Thank you for submitting your case details to our law firm. Here's a summary of what we received:</p>
            
            <h3 style="color: #2d3748;">Case Information</h3>
            <p><strong>Case Type:</strong> ${caseType}</p>
            <p><strong>Urgency:</strong> ${urgency}</p>
            
            <h3 style="color: #2d3748;">Your Description</h3>
            <p>${caseDescription.replace(/\n/g, "<br>")}</p>
            
            <p>We will review your information and contact you within 1-2 business days to discuss next steps. If this is urgent, please call our office directly at <strong>[Law Firm Phone Number]</strong>.</p>
            
            <p style="margin-top: 20px;">- The Team at <strong>[Law Firm Name]</strong></p>
            </div>
        `,
        });

        return new Response(
        JSON.stringify({ message: "Case submitted successfully!" }),
        { status: 200 }
        );
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(
        JSON.stringify({ error: `Failed to submit case: ${error.message}` }),
        { status: 500 }
        );
    }
    }