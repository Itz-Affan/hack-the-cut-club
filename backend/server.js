const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

app.get('/test-email', async (req, res) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'affanplayz0@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email to check if Nodemailer is working.'
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Test message sent: %s', info.messageId);
    res.json({ success: true, message: 'Test email sent successfully!' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ success: false, message: 'Failed to send test email.', error: error.toString() });
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Please fill out all fields.' });
  }

  const mailOptions = {
    from: `"Website Contact Form" <${email}>`,
    to: 'affanplayz0@gmail.com',
    subject: 'New Contact Form Message',
    text: `You received a new message from ${name} (${email}):\n\n${message}`
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.', error: error.toString() });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
