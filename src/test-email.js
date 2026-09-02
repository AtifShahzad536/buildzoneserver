import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

async function testEmail() {
  const user = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : '';
  const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.trim().replace(/\s+/g, '') : '';
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || 'buildzonetechnology@gmail.com';

  console.log(`🔍 Testing Gmail SMTP with:`);
  console.log(`   Sender (EMAIL_USER): "${user}"`);
  console.log(`   Password length: ${pass.length} chars`);
  console.log(`   Recipient (ADMIN_NOTIFICATION_EMAIL): "${recipient}"`);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
  });

  try {
    console.log('⏳ Verifying transporter connection...');
    await transporter.verify();
    console.log('✅ Connection verified successfully!');

    console.log('⏳ Sending test email...');
    const info = await transporter.sendMail({
      from: `"BuildZone Inquiries" <${user}>`,
      to: recipient,
      subject: '🧪 BuildZone Test Notification',
      text: 'Yeh test email BuildZone backend se kamyabi se bheja gaya hai!',
      html: '<h3>BuildZone Test Email</h3><p>Yeh test email BuildZone backend se kamyabi se bheja gaya hai!</p>'
    });
    console.log(`🎉 [SUCCESS]: Email dispatched successfully! Message ID: ${info.messageId}`);
  } catch (error) {
    console.error('❌ [ERROR]:', error.message);
    if (error.message.includes('BadCredentials') || error.message.includes('535')) {
      console.error('\n⚠️ GOOGLE AUTHENTICATION FAILED:');
      console.error('1. Gmail password/App Password ghalat hai ya expire ho chuka hai.');
      console.error('2. Google account "atifjaanjaan536@gmail.com" mein 2-Step Verification on karke naya App Password generate karein.');
      console.error('   Link: https://myaccount.google.com/apppasswords');
    }
  }
}

testEmail();
