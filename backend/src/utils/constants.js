const otpHTML = (otp) => {
  return ` <html>
      <head>
        <style>
          .container {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f8f9fa;
            color: #333;
            border-radius: 8px;
            max-width: 500px;
            margin: auto;
          }
          .brand {
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            color: #2f855a;
            margin-bottom: 20px;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            color: #d53f8c;
            margin: 10px 0;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
            margin-top: 20px;
          }
            .title{
            text-decoration: none;
            color: #2f855a;
        }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="brand"><a class="title" href="https://devbandhan.tech/">Dev Bandhan</a></div>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) is:</p>
          <div class="otp">${otp}</div>
          <p>Please use this OTP to verify your identity. This code is valid for a limited time.</p>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Dev Bandhan. All rights reserved.
          </div>
        </div>
      </body>
    </html>`;
};

const emailSubjects = {
  otp: "Your OTP from Dev Bandhan",
};

const passwordChnageUpdateHtml = (name) => {
  return `<html>
  <head>
    <style>
      .container {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f8f9fa;
        color: #333;
        border-radius: 8px;
        max-width: 500px;
        margin: auto;
      }
      .brand {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        color: #2f855a;
        margin-bottom: 20px;
      }
      .message {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        color: #3182ce;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #666;
        margin-top: 20px;
      }
      .title {
        text-decoration: none;
        color: #2f855a;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="brand">
        <a class="title" href="https://devbandhan.tech/">Dev Bandhan</a>
      </div>
      <p>Hello ${name},</p>
      <div class="message">
        Your password has been successfully updated.
      </div>
      <p>If you did not request this change, please reset your password immediately and contact our support team.</p>
      <p>If you made this change, no further action is needed.</p>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Dev Bandhan. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
};

const cronJobHtml = (email) => {
  return `<html>
      <head>
      <style>
        .container {
        font-family: Arial, sans-serif;
        padding: 20px;
        background-color: #f8f9fa;
        color: #333;
        border-radius: 8px;
        max-width: 500px;
        margin: auto;
        }
        .brand {
        font-size: 32px;
        font-weight: bold;
        text-align: center;
        color: #2f855a;
        margin-bottom: 20px;
        }
        .message {
        font-size: 16px;
        text-align: center;
        color: #333;
        margin: 20px 0;
        }
        .footer {
        text-align: center;
        font-size: 12px;
        color: #666;
        margin-top: 20px;
        }
        .title {
        text-decoration: none;
        color: #2f855a;
        }
      </style>
      </head>
      <body>
      <div class="container">
        <div class="brand"><a class="title" href="https://devbandhan.tech/">Dev Bandhan</a></div>
        <p>Hello ${email.split("@")[0]},</p>
        <p>You have received new connection requests!</p>
        <div class="message">
        <a href="https://devbandhan.tech" style="color: #2f855a; text-decoration: none; font-weight: bold;">Review all requests on DevBandhan</a>
        </div>
        <div class="footer">
        &copy; ${new Date().getFullYear()} Dev Bandhan. All rights reserved.
        </div>
      </div>
      </body>
    </html>`;
};
module.exports = { otpHTML, passwordChnageUpdateHtml, emailSubjects, cronJobHtml };
