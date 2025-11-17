import type { Handler, HandlerEvent } from "@netlify/functions";
import * as nodemailer from "nodemailer";

interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  degreeProgram: string;
  yearOfStudy: string;
  affiliation?: string;
  linkedIn: string;
  github?: string;
  hasTeam: boolean;
  wantTeamAssignment: boolean;
  teamMembers?: string;
  firstTrack: string;
  secondTrack: string;
  motivation: string;
  cvFileName?: string;
  cvData?: string; // base64 encoded
}

export const handler: Handler = async (event: HandlerEvent) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const data: ApplicationData = JSON.parse(event.body || "{}");

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your regular password)
      },
    });

    // Prepare email content
    const htmlContent = `
      <h2>New INNOVAITE Application</h2>
      
      <h3>Personal Information</h3>
      <ul>
        <li><strong>Full Name:</strong> ${data.fullName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Degree Program:</strong> ${data.degreeProgram}</li>
        <li><strong>Year of Study:</strong> ${data.yearOfStudy}</li>
        ${data.affiliation ? `<li><strong>Affiliation:</strong> ${data.affiliation}</li>` : ''}
      </ul>

      <h3>Profile</h3>
      <ul>
        <li><strong>LinkedIn:</strong> <a href="${data.linkedIn}">${data.linkedIn}</a></li>
        ${data.github ? `<li><strong>GitHub:</strong> <a href="${data.github}">${data.github}</a></li>` : ''}
        ${data.cvFileName ? `<li><strong>CV:</strong> ${data.cvFileName} (attached)</li>` : ''}
      </ul>

      <h3>Team Participation</h3>
      <ul>
        <li><strong>Has Team:</strong> ${data.hasTeam ? 'Yes' : 'No'}</li>
        <li><strong>Wants Team Assignment:</strong> ${data.wantTeamAssignment ? 'Yes' : 'No'}</li>
        ${data.teamMembers ? `<li><strong>Team Members:</strong><br><pre>${data.teamMembers}</pre></li>` : ''}
      </ul>

      <h3>Track Preferences</h3>
      <ul>
        <li><strong>1st Choice:</strong> ${data.firstTrack}</li>
        <li><strong>2nd Choice:</strong> ${data.secondTrack}</li>
      </ul>

      <h3>Motivation</h3>
      <p>${data.motivation.replace(/\n/g, '<br>')}</p>
    `;

    // Create CSV data for easy Excel import
    const csvHeaders = [
      "Timestamp",
      "Full Name",
      "Email",
      "Phone",
      "Degree Program",
      "Year of Study",
      "Affiliation",
      "LinkedIn",
      "GitHub",
      "Has Team",
      "Want Team Assignment",
      "Team Members",
      "First Track",
      "Second Track",
      "Motivation",
      "CV File"
    ];

    const csvRow = [
      new Date().toISOString(),
      data.fullName,
      data.email,
      data.phone,
      data.degreeProgram,
      data.yearOfStudy,
      data.affiliation || "",
      data.linkedIn,
      data.github || "",
      data.hasTeam ? "Yes" : "No",
      data.wantTeamAssignment ? "Yes" : "No",
      data.teamMembers ? data.teamMembers.replace(/\n/g, " | ") : "",
      data.firstTrack,
      data.secondTrack,
      data.motivation.replace(/\n/g, " "),
      data.cvFileName || ""
    ];

    // Escape CSV fields that contain commas or quotes
    const escapeCsvField = (field: string) => {
      if (field.includes(',') || field.includes('"') || field.includes('\n')) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    const csvContent = [
      csvHeaders.map(escapeCsvField).join(','),
      csvRow.map(escapeCsvField).join(',')
    ].join('\n');

    // Prepare mail options
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: `INNOVAITE Application - ${data.fullName}`,
      html: htmlContent,
      replyTo: data.email,
      attachments: [],
    };

    // Attach CSV file
    mailOptions.attachments!.push({
      filename: `application_${data.fullName.replace(/\s+/g, '_')}_${Date.now()}.csv`,
      content: csvContent,
      contentType: 'text/csv',
    });

    // Attach CV if provided
    if (data.cvData && data.cvFileName) {
      mailOptions.attachments!.push({
        filename: data.cvFileName,
        content: data.cvData,
        encoding: "base64",
      });
    }

    // Prepare applicant confirmation email content
    const applicantHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #254117;">Thank you for applying to INNOVAITE!</h2>
        
        <p>Dear ${data.fullName},</p>
        
        <p>Thank you for submitting your application to <strong>InnovAIte</strong>, the AI hackathon organized by Bocconi associations. We're excited about your interest in joining our community of innovators!</p>
        
        <h3>Your Application Summary:</h3>
        <ul>
          <li><strong>Full Name:</strong> ${data.fullName}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Phone:</strong> ${data.phone}</li>
          <li><strong>Degree Program:</strong> ${data.degreeProgram}</li>
          <li><strong>Year of Study:</strong> ${data.yearOfStudy}</li>
          ${data.affiliation ? `<li><strong>Affiliation:</strong> ${data.affiliation}</li>` : ''}
          <li><strong>LinkedIn:</strong> <a href="${data.linkedIn}">${data.linkedIn}</a></li>
          ${data.github ? `<li><strong>GitHub:</strong> <a href="${data.github}">${data.github}</a></li>` : ''}
          <li><strong>Team Participation:</strong> ${data.hasTeam ? 'Has a team' : (data.wantTeamAssignment ? 'Wants team assignment' : 'Individual applicant')}</li>
          <li><strong>Track Preferences:</strong> 1st: ${data.firstTrack}, 2nd: ${data.secondTrack}</li>
        </ul>

        <h3>What happens next?</h3>
        <p>We will review all applications carefully and get in touch with you regarding the outcome. The selection process may take a few days, so please be patient.</p>
        
        <p>If you have any questions in the meantime, feel free to reach out to us at <a href="mailto:aihub.bocconistudents@gmail.com">aihub.bocconistudents@gmail.com</a>.</p>
        
        <p>Best regards,<br>
        The InnovAIte Team<br></p>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">
          This is an automated confirmation email. Please do not reply to this message.
        </p>
      </div>
    `;

    // Send confirmation email to applicant
    const applicantMailOptions: nodemailer.SendMailOptions = {
      from: process.env.GMAIL_USER,
      to: data.email,
      subject: "INNOVAITE Application Confirmation - Thank You!",
      html: applicantHtmlContent,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(mailOptions), // Organizer email
      transporter.sendMail(applicantMailOptions) // Applicant confirmation
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Application submitted successfully" }),
    };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Failed to submit application",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
    };
  }
};
