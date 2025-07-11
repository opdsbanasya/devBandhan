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

module.exports = { otpHTML };
