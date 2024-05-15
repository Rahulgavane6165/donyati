// utils/sendEmail.js
const nodemailer = require("nodemailer");
require("dotenv").config();
const ReactDOMServer = require("react-dom/server");
const {emailTemplate} = require("./mailTemplete"); // Import the mailTemplate component
const emailData = require("./emailData"); // Import email data

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendWelcomeEmail = async (to) => {
  const { subject, content } = emailData.welcome;
  const html =  emailTemplate(subject, content)
  sendEmail(to, subject, html);
};

const sendOTPEmail = async (to, otp) => {
  const { subject, content } = emailData.otp;
  const html = emailTemplate(subject, content+ otp)
  sendEmail(to, subject , html);
};

const sendInformationEmail = async (to) => {
  const { subject, content } = emailData.information;
  const html =  emailTemplate(subject, content)
  sendEmail(to, subject, html);
};

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html,      
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendOTPEmail,
  sendInformationEmail,
};
