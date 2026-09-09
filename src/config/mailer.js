import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';
import { generateLeadEmailTemplate, generateApplicationEmailTemplate } from '../utils/emailTemplates.js';

let transporter = null;

export const getTransporter = () => {
  if (!transporter) {
    const user = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
    const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim().replace(/\s+/g, '') : '';

    if (!user || !pass) {
      console.warn('⚠️ [Mailer Notice]: EMAIL_USER or EMAIL_PASS is not configured. Emails will be logged to console.');
      return null;
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });
  }
  return transporter;
};

/**
 * Send instant email notification to Admin when a new inquiry / contact form is submitted
 */
export const sendLeadNotification = async (leadData) => {
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER || 'admin@buildzone.tech';
  const htmlContent = generateLeadEmailTemplate(leadData);

  const senderName = process.env.EMAIL_FROM_NAME || 'BuildZone Inquiries';
  const senderEmail = process.env.EMAIL_USER || 'noreply@buildzone.tech';
  const fromAddress = `"${senderName}" <${senderEmail}>`;

  const mailOptions = {
    from: fromAddress,
    to: recipient,
    replyTo: leadData.email,
    subject: `🔔 [New Inquiry] ${leadData.name} - ${leadData.service || 'Software Development'} (${leadData.budget || 'Scope Discussion'})`,
    html: htmlContent,
  };

  try {
    const transport = getTransporter();
    if (!transport) {
      console.log('📬 [DEV EMAIL LOG - New Lead Received]:', {
        to: recipient,
        name: leadData.name,
        email: leadData.email,
        service: leadData.service,
        budget: leadData.budget,
        message: leadData.message || leadData.projectDetails,
      });
      return { success: true, mode: 'dev-log' };
    }

    const info = await transport.sendMail(mailOptions);
    console.log(`🚀 [Email Dispatched]: Lead notification sent to ${recipient} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ [Mailer Error]: Failed to send lead notification email:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send custom composed direct email from CRM Admin to Client
 */
export const sendClientDirectEmail = async ({ to, subject, message }) => {
  const senderName = process.env.EMAIL_FROM_NAME || 'BuildZone Technology';
  const senderEmail = process.env.EMAIL_USER || 'info@buildzonetechnology.com';
  const fromAddress = `"${senderName}" <${senderEmail}>`;

  const formattedMessage = message ? message.replace(/\n/g, '<br/>') : '';

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${subject || 'Message from BuildZone Technology'}</title>
    </head>
    <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <div style="background: #0B1938; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: bold; letter-spacing: -0.5px;">BuildZone Technology</h1>
          <p style="margin: 4px 0 0; color: #0066FF; font-size: 11px; font-family: monospace; font-weight: bold; letter-spacing: 1.5px;">#1 SOFTWARE HOUSE IN SIALKOT</p>
        </div>
        <div style="padding: 32px 28px; font-size: 14px; line-height: 1.65; color: #334155; font-family: sans-serif;">
          ${formattedMessage}
        </div>
        <div style="background: #f8fafc; padding: 20px 28px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; line-height: 1.5;">
          <p style="margin: 0 0 6px;"><strong>BuildZone Technology</strong> — Enterprise Software & AI Engineering</p>
          <p style="margin: 0;">Official Email: <a href="mailto:info@buildzonetechnology.com" style="color: #0066FF; text-decoration: none;">info@buildzonetechnology.com</a> | WhatsApp: <a href="https://wa.me/92105464116" style="color: #0066FF; text-decoration: none;">+92 105464116</a></p>
          <p style="margin: 6px 0 0; font-size: 11px; color: #94a3b8;">Paris Road / Defense Road, Sialkot, Punjab, Pakistan</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: fromAddress,
    to,
    replyTo: 'info@buildzonetechnology.com',
    subject: subject || 'Message from BuildZone Technology',
    html: htmlContent,
  };

  try {
    const transport = getTransporter();
    if (!transport) {
      console.log('📬 [DEV LOG - Direct Client Email]:', { to, subject, message });
      return { success: true, mode: 'dev-log' };
    }

    const info = await transport.sendMail(mailOptions);
    console.log(`🚀 [Client Email Dispatched]: Sent to ${to} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ [Mailer Error]: Failed to send client direct email:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send instant candidate application notification to Recruitment email
 */
export const sendApplicationNotification = async (candidateData, jobTitle) => {
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER || 'careers@buildzone.tech';
  const htmlContent = generateApplicationEmailTemplate(candidateData, jobTitle);

  const senderName = process.env.EMAIL_FROM_NAME || 'BuildZone Careers';
  const senderEmail = process.env.EMAIL_USER || 'careers@buildzone.tech';
  const fromAddress = `"${senderName}" <${senderEmail}>`;

  const mailOptions = {
    from: fromAddress,
    to: recipient,
    replyTo: candidateData.applicantEmail,
    subject: `💼 [New Application] ${candidateData.applicantName} for ${jobTitle}`,
    html: htmlContent,
  };

  try {
    const transport = getTransporter();
    if (!transport) {
      console.log('📬 [DEV EMAIL LOG - New Job Application]:', {
        job: jobTitle,
        candidate: candidateData.applicantName,
        email: candidateData.applicantEmail,
      });
      return { success: true, mode: 'dev-log' };
    }

    const info = await transport.sendMail(mailOptions);
    console.log(`🚀 [Email Dispatched]: Candidate application sent to ${recipient} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ [Mailer Error]: Failed to send job application email:', error.message);
    return { success: false, error: error.message };
  }
};
