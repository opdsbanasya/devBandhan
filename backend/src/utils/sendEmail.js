const { EmailClient } = require("@azure/communication-email");

const connectionString = process.env.AZURE_CONNECTION_STRING;
const client = new EmailClient(connectionString);

async function sendEmail(emailData) {
  const emailMessage = {
    senderAddress: "DoNotReply@devbandhan.tech",
    content: {
      subject: emailData.subject,
      plainText: emailData?.text || "Hello world via email.",
      html: emailData?.html || `<p>devBandhan</p>`,
    },
    recipients: {
      to: emailData.adresses,
    },
    attachments: [],
  };

  const poller = await client.beginSend(emailMessage);
  const result = await poller.pollUntilDone();
  console.log(result);
}

module.exports = { sendEmail };
