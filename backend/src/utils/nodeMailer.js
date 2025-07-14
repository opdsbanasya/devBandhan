const nodemailer = require("nodemailer");


const sendMailViaNodeMailer = async (emailData) => {
  try {
    // Create a test account or replace with real credentials.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"DevBandhan@admin.com" <${process.env.GOOGLE_MAIL}>`,
      to: emailData?.email,
      subject: "Your OTP from Dev Bandhan",
      html: emailData?.html,
    });

    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { sendMailViaNodeMailer };
