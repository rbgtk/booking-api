import { sendMail } from '../utils/mailer.js'

export async function sendAdminReservationCreatedEmail(date, name, email, phone, notes, guests) {
  await sendMail({
    to: process.env.ADMIN_EMAIL,
    subject: 'A new reservation has been made',
    html: `<h3>A new reservation</h3>
      <ul>
        <li>Date: ${date}</li>
        <li>From: ${name}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Guests: ${guests}</li>
      </ul>
      <h4>Notes</h4>
      <p>${notes}</p>
    `,
  })
}
