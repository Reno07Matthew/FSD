const nodemailer = require('nodemailer');

// Email transporter configuration (No changes here)
const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  return transporter;
};

// Send registration confirmation email with a Professional Cyber-Tech theme
const sendRegistrationEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"CYBER - AUTH" <${process.env.EMAIL_USER}>`, // A more corporate-tech sender name
      to: userEmail,
      subject: 'Account Activation Confirmed | Welcome to CYBER - AUTH',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Account Activated</title>
          <style>
            body { 
              font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif; 
              line-height: 1.6; 
              background-color: #0f172a; /* Dark blue-slate background */
              color: #cbd5e1; /* Soft cool gray text */
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background-color: #1e293b; /* Darker slate container */
              border-radius: 8px;
              border: 1px solid #334155;
            }
            .header { 
              background: #0f172a;
              color: #ffffff; 
              padding: 30px; 
              text-align: center; 
              border-bottom: 1px solid #334155;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 26px;
              font-weight: 500;
            }
            .content { 
              padding: 30px; 
            }
            .highlight { 
              color: #7dd3fc; /* Light Sky Blue */
              font-weight: 600; 
            }
            .button-container {
              text-align: center;
              margin: 30px 0;
            }
            .button {
              display: inline-block;
              background-color: #38bdf8;
              color: #0f172a;
              padding: 12px 28px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              font-size: 16px;
            }
            .footer { 
              text-align: center; 
              margin-top: 20px; 
              color: #94a3b8; 
              font-size: 12px;
              border-top: 1px solid #334155;
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Quantum Systems, <span class="highlight">${userName}</span></h1>
            </div>
            <div class="content">
              <p>Your new account has been successfully created and secured. We're excited to have you on board.</p>
              
              <p>You can now access your personalized dashboard to manage your profile, explore our services, and begin your journey with us.</p>
              
              <div class="button-container">
                <a href="[Your Login URL Here]" class="button">Go to Dashboard</a>
              </div>
              
              <p>For enhanced security, we recommend enabling two-factor authentication (2FA) in your account settings at your earliest convenience.</p>

              <p>If you have any questions or require support, please don't hesitate to contact us through our official support channels.</p>
              
              <p>Sincerely,<br><strong>The Quantum Systems Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Quantum Systems Inc. All Rights Reserved.</p>
              <p>This is a system-generated message. Please do not reply directly.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to Quantum Systems, ${userName},

        Your new account has been successfully created and secured. We're excited to have you on board.
        
        You can now access your personalized dashboard to manage your profile, explore our services, and begin your journey with us.
        
        Go to Dashboard: [Your Login URL Here]
        
        For enhanced security, we recommend enabling two-factor authentication (2FA) in your account settings at your earliest convenience.
        
        If you have any questions or require support, please don't hesitate to contact us through our official support channels.
        
        Sincerely,
        The Quantum Systems Team
        
        (c) 2025 Quantum Systems Inc. All Rights Reserved.
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Registration email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending registration email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendRegistrationEmail
};