import nodemailer from 'nodemailer'

// Create a reusable transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // use TLS if port is 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

/**
 * Send an email
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email body (HTML)
 */
export async function sendMail({ to, subject, html }) {
  await transporter.sendMail({
    from: `"Beer Tasting Bruges" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  })
}
