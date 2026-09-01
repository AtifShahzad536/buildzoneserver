/**
 * Modern HTML Email Templates for BuildZone Notifications
 */

export const generateLeadEmailTemplate = (lead) => {
  const {
    name,
    email,
    phone,
    company,
    country,
    service,
    budget,
    timeline,
    message,
    projectScope,
    source,
    createdAt = new Date(),
  } = lead;

  const formattedDate = new Date(createdAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Received - BuildZone</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #F8FAFC;
      color: #0B1938;
      margin: 0;
      padding: 24px 12px;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(11, 25, 56, 0.05);
    }
    .header {
      background: #0B1938;
      color: #FFFFFF;
      padding: 28px 24px;
      text-align: center;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: 1px;
      margin: 0;
      color: #FFFFFF;
    }
    .badge {
      display: inline-block;
      margin-top: 8px;
      padding: 4px 12px;
      background: rgba(0, 102, 255, 0.25);
      border: 1px solid #0066FF;
      color: #60A5FA;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      border-radius: 20px;
      letter-spacing: 0.5px;
    }
    .body-content {
      padding: 32px 24px;
    }
    .lead-heading {
      font-size: 18px;
      font-weight: 800;
      color: #0B1938;
      margin-top: 0;
      margin-bottom: 20px;
      border-bottom: 2px solid #F1F5F9;
      padding-bottom: 12px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .info-table td {
      padding: 10px 12px;
      font-size: 13px;
      border-bottom: 1px solid #F1F5F9;
    }
    .info-label {
      font-weight: 700;
      color: #64748B;
      width: 35%;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    .info-value {
      font-weight: 600;
      color: #0B1938;
    }
    .info-value.highlight {
      color: #0066FF;
    }
    .message-box {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 16px;
      margin-top: 20px;
    }
    .message-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      color: #64748B;
      margin-bottom: 8px;
    }
    .message-text {
      font-size: 14px;
      line-height: 1.6;
      color: #1E293B;
      margin: 0;
      white-space: pre-wrap;
    }
    .footer {
      background: #F8FAFC;
      border-top: 1px solid #E2E8F0;
      padding: 20px 24px;
      text-align: center;
      font-size: 12px;
      color: #64748B;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1 class="brand-title">? BUILDZONE</h1>
      <span class="badge">?? New Client Inquiry Alert</span>
    </div>

    <div class="body-content">
      <h2 class="lead-heading">Client & Project Specifications</h2>

      <table class="info-table">
        <tr>
          <td class="info-label">Full Name</td>
          <td class="info-value"><strong>${name || 'N/A'}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Email Address</td>
          <td class="info-value"><a href="mailto:${email}" style="color: #0066FF; text-decoration: none;">${email || 'N/A'}</a></td>
        </tr>
        <tr>
          <td class="info-label">Phone / WhatsApp</td>
          <td class="info-value"><a href="tel:${phone}" style="color: #0B1938; text-decoration: none;">${phone || 'N/A'}</a></td>
        </tr>
        <tr>
          <td class="info-label">Company / Org</td>
          <td class="info-value">${company || 'Independent Startup'}</td>
        </tr>
        <tr>
          <td class="info-label">Location / Country</td>
          <td class="info-value">${country || 'Global'}</td>
        </tr>
        <tr>
          <td class="info-label">Requested Service</td>
          <td class="info-value highlight"><strong>${service || 'General Software Engineering'}</strong></td>
        </tr>
        <tr>
          <td class="info-label">Budget Scope</td>
          <td class="info-value" style="color: #059669; font-weight: 700;">${budget || 'Flexible / Discussion'}</td>
        </tr>
        <tr>
          <td class="info-label">Target Timeline</td>
          <td class="info-value">${timeline || 'Standard Delivery'}</td>
        </tr>
        <tr>
          <td class="info-label">Channel Source</td>
          <td class="info-value">${source || 'BuildZone Website'}</td>
        </tr>
        <tr>
          <td class="info-label">Received At</td>
          <td class="info-value" style="font-size: 11px; color: #64748B;">${formattedDate}</td>
        </tr>
      </table>

      ${(message || projectScope) ? `
      <div class="message-box">
        <div class="message-title">Project Scope & Requirements:</div>
        <p class="message-text">${message || projectScope}</p>
      </div>
      ` : ''}
    </div>

    <div class="footer">
      <p style="margin: 0;">BuildZone Digital Technologies — Automated Engineering Dispatch System</p>
      <p style="margin: 4px 0 0 0; font-size: 11px; color: #94A3B8;">Please respond to the client within the standard 24h SLA window.</p>
    </div>
  </div>
</body>
</html>
`;
};

export const generateApplicationEmailTemplate = (candidate, jobTitle) => {
  const {
    applicantName,
    applicantEmail,
    applicantPhone,
    portfolioUrl,
    resumeUrl,
    coverLetter,
  } = candidate;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Job Application - BuildZone</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #F8FAFC; color: #0B1938; padding: 20px; }
    .wrapper { max-width: 580px; margin: 0 auto; background: #FFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; }
    .header { background: #0B1938; color: #FFF; padding: 20px; text-align: center; }
    .content { padding: 24px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
    td { padding: 8px 12px; font-size: 13px; border-bottom: 1px solid #F1F5F9; }
    .label { font-weight: 700; color: #64748B; width: 35%; font-size: 11px; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h2 style="margin: 0; color: #FFF;">? BUILDZONE RECRUITMENT</h2>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #93C5FD;">New Candidate Application for: <strong>${jobTitle}</strong></p>
    </div>
    <div class="content">
      <table>
        <tr><td class="label">Candidate Name</td><td><strong>${applicantName}</strong></td></tr>
        <tr><td class="label">Email</td><td><a href="mailto:${applicantEmail}">${applicantEmail}</a></td></tr>
        <tr><td class="label">Phone</td><td>${applicantPhone || 'N/A'}</td></tr>
        <tr><td class="label">Portfolio / GitHub</td><td>${portfolioUrl ? `<a href="${portfolioUrl}">${portfolioUrl}</a>` : 'Not provided'}</td></tr>
        <tr><td class="label">Resume Link</td><td>${resumeUrl ? `<a href="${resumeUrl}">${resumeUrl}</a>` : 'Not provided'}</td></tr>
      </table>
      ${coverLetter ? `<div style="background: #F8FAFC; padding: 12px; border-radius: 8px; font-size: 13px;"><strong>Cover Letter:</strong><br/>${coverLetter}</div>` : ''}
    </div>
  </div>
</body>
</html>
`;
};
