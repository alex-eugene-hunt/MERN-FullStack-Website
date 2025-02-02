// routes/sendEmail.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required.' });
  }

  try {
    // Configure the transporter using Gmail and your app password.
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'alex.eugene.hunt@gmail.com',
        pass: process.env.EMAIL_PASSWORD, // Use your Gmail app password here
      },
    });

    // Set up mail options.
    // Here, we use a fixed "from" (your Gmail) and send the message to your Gmail.
    let mailOptions = {
      from: 'alex.eugene.hunt@gmail.com',
      to: 'alex.eugene.hunt@gmail.com',
      subject: `Message from ${name} via Portfolio`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;
