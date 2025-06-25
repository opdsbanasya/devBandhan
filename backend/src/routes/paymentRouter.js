const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const razorpayInstance = require("../utils/razorpay");

const paymentRouter = express.Router();

paymentRouter.post("/create/order", userAuth, async (req, res) => {
  try {
    const { user } = req;

    console.log("Creating...");

    const order = await razorpayInstance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
      },
    });

    console.log("Created!!!");
    
    // save to DB


    // send order id

    res.json({ ...order });
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = paymentRouter;
