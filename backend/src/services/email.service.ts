import nodemailer from 'nodemailer';

// Email templates
const emailTemplates = {
  passwordReset: (token: string, userName: string) => ({
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hi ${userName},</p>
        <p>We received a request to reset your password. Click the button below to reset it.</p>
        <p>
          <a href="${process.env.CLIENT_URL}/reset-password?token=${token}" 
             style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </p>
        <p>Or copy this link: ${process.env.CLIENT_URL}/reset-password?token=${token}</p>
        <p>This link will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">CampusOS - University Management System</p>
      </div>
    `
  }),

  emailVerification: (token: string, userName: string) => ({
    subject: 'Verify Your Email Address',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Hi ${userName},</p>
        <p>Welcome to CampusOS! Please verify your email address to complete your registration.</p>
        <p>
          <a href="${process.env.CLIENT_URL}/verify-email?token=${token}" 
             style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </p>
        <p>Or copy this link: ${process.env.CLIENT_URL}/verify-email?token=${token}</p>
        <p>This link will expire in 24 hours.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">CampusOS - University Management System</p>
      </div>
    `
  }),

  welcome: (userName: string) => ({
    subject: 'Welcome to CampusOS',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to CampusOS!</h2>
        <p>Hi ${userName},</p>
        <p>Your account has been successfully created. You can now log in to access all features of CampusOS.</p>
        <p>
          <a href="${process.env.CLIENT_URL}/login" 
             style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Login to CampusOS
          </a>
        </p>
        <p style="margin-top: 20px;">Key Features:</p>
        <ul>
          <li>Course Management & Enrollment</li>
          <li>Assignment & Exam Tracking</li>
          <li>Attendance Monitoring</li>
          <li>Grade Tracking</li>
          <li>Finance Management</li>
          <li>AI-Powered Academic Assistant</li>
        </ul>
        <hr>
        <p style="color: #666; font-size: 12px;">CampusOS - University Management System</p>
      </div>
    `
  }),

  notification: (title: string, message: string) => ({
    subject: title,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>${title}</h2>
        <p>${message}</p>
        <p>
          <a href="${process.env.CLIENT_URL}" 
             style="background-color: #007bff; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View in CampusOS
          </a>
        </p>
        <hr>
        <p style="color: #666; font-size: 12px;">CampusOS - University Management System</p>
      </div>
    `
  })
};

// Email service class
export class EmailService {
  private transporter!: nodemailer.Transporter;

  constructor() {
    // Use environment variable or default to test email (if not in production)
    const emailProvider = process.env.EMAIL_PROVIDER || 'smtp';

    if (emailProvider === 'smtp' && process.env.SMTP_HOST) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      });
    } else if (emailProvider === 'sendgrid' && process.env.SENDGRID_API_KEY) {
      const sgTransport = require('nodemailer-sendgrid-transport');
      this.transporter = nodemailer.createTransport(
        sgTransport({
          apiKey: process.env.SENDGRID_API_KEY
        })
      );
    } else if (emailProvider === 'gmail' && process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
    } else {
      // Fallback to ethereal test email (development only)
      console.warn('No email provider configured. Using test email service.');
      this.setupTestTransporter();
    }
  }

  private async setupTestTransporter() {
    const testAccount = await nodemailer.createTestAccount();
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }

  async sendPasswordResetEmail(email: string, token: string, userName: string): Promise<void> {
    try {
      const template = emailTemplates.passwordReset(token, userName);
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@campusos.com',
        to: email,
        ...template
      });
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send password reset email to ${email}:`, error);
      throw new Error('Failed to send password reset email');
    }
  }

  async sendEmailVerification(email: string, token: string, userName: string): Promise<void> {
    try {
      const template = emailTemplates.emailVerification(token, userName);
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@campusos.com',
        to: email,
        ...template
      });
      console.log(`Email verification sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send email verification to ${email}:`, error);
      throw new Error('Failed to send email verification');
    }
  }

  async sendWelcomeEmail(email: string, userName: string): Promise<void> {
    try {
      const template = emailTemplates.welcome(userName);
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@campusos.com',
        to: email,
        ...template
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send welcome email to ${email}:`, error);
      // Don't throw here as this is non-critical
    }
  }

  async sendNotificationEmail(email: string, title: string, message: string): Promise<void> {
    try {
      const template = emailTemplates.notification(title, message);
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@campusos.com',
        to: email,
        ...template
      });
    } catch (error) {
      console.error(`Failed to send notification email to ${email}:`, error);
      // Don't throw here as this is non-critical
    }
  }

  async sendBulkEmails(emails: string[], subject: string, html: string): Promise<void> {
    try {
      await Promise.all(
        emails.map(email =>
          this.transporter.sendMail({
            from: process.env.EMAIL_FROM || 'noreply@campusos.com',
            to: email,
            subject,
            html
          })
        )
      );
      console.log(`Bulk emails sent to ${emails.length} recipients`);
    } catch (error) {
      console.error('Failed to send bulk emails:', error);
      throw new Error('Failed to send bulk emails');
    }
  }
}

// Singleton instance
export const emailService = new EmailService();
