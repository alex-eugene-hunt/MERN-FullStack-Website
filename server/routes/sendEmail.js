// routes/sendEmail.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST: /api/send-email
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    // Configure the transporter. If using Gmail with 2FA, create an App Password.
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alex.eugene.hunt@gmail.com',
        pass: process.env.EMAIL_PASSWORD, // Store your email password or app password in an environment variable
      },
    });

    // Set up mail options
    let mailOptions = {
      from: email, // The sender's email address from the form
      to: 'alex.eugene.hunt@gmail.com',
      subject: `Message from ${name} (via portfolio)`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
