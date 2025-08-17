const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmail");
const { cronJobHtml } = require("./constants");

cron.schedule("0 8 * * *", async () => {
  const yesterday = subDays(new Date(), 0);
  const yesterdayStart = startOfDay(yesterday);
  const yesterdayEnd = endOfDay(yesterday);

  const connectionRequest = await ConnectionRequestModel.find({
    status: "interested",
    createdAt: {
      $gte: yesterdayStart,
      $lt: yesterdayEnd,
    },
  }).populate("toUserId fromUserId");

  const emailList = [
    ...new Set(connectionRequest.map((request) => request?.toUserId?.email)),
  ];

  for (let email of emailList) {
    const emailData = {
      title: "New Connection Requests - Daily Summary",
      body: cronJobHtml(email),
    };
    const response = await sendEmail(emailData);
  }
});
