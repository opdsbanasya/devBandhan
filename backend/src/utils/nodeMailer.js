const nodemailer = require("nodemailer");
const { otpHTML } = require("./constants");

const sendMailViaNodeMailer = async (otp, email) => {
  try {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    console.log("auth completed");

    console.log("sending mail...");
    const info = await transporter.sendMail({
      from: `"Admin" <${process.env.GOOGLE_MAIL}>`,
      to: email,
      subject: "Your OTP from Dev Bandhan",
      html: otpHTML(otp),
    });

    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { sendMailViaNodeMailer };
