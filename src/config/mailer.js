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
      console.warn('?? [Mailer Notice]: EMAIL_USER or EMAIL_PASS is not configured. Emails will be logged to console.');
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
    subject: `?? [New Inquiry] ${leadData.name} - ${leadData.service || 'Software Development'} (${leadData.budget || 'Scope Discussion'})`,
    html: htmlContent,
  };

  try {
    const transport = getTransporter();
    if (!transport) {
      console.log('?? [DEV EMAIL LOG - New Lead Received]:', {
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
    console.log(`? [Email Dispatched]: Lead notification sent to ${recipient} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('? [Mailer Error]: Failed to send lead notification email:', error.message);
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
    subject: `?? [New Application] ${candidateData.applicantName} for ${jobTitle}`,
    html: htmlContent,
  };

  try {
    const transport = getTransporter();
    if (!transport) {
      console.log('?? [DEV EMAIL LOG - New Job Application]:', {
        job: jobTitle,
        candidate: candidateData.applicantName,
        email: candidateData.applicantEmail,
      });
      return { success: true, mode: 'dev-log' };
    }

    const info = await transport.sendMail(mailOptions);
    console.log(`? [Email Dispatched]: Candidate application sent to ${recipient} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('? [Mailer Error]: Failed to send job application email:', error.message);
    return { success: false, error: error.message };
  }
};
