const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const razorpayInstance = require("../utils/razorpay");
const PaymentModel = require("../models/payment");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const paymentRouter = express.Router();

paymentRouter.post("/create/order", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { membershipType } = req.body;
    let amount;

    if (membershipType === "gold") {
      amount = 100000;
    } else if ((membershipType = "silver")) {
      amount = 50000;
    }

    const order = await razorpayInstance.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        name: `${user?.firstName} ${user?.lastName}`,
        email: user?.email,
      },
    });

    // save to DB
    const createOrder = new PaymentModel({
      userId: user?._id,
      amount: order.amount,
      currency: order.currency,
      orderId: order.id,
      notes: order.notes,
      receipt: order.receipt,
      status: order.status,
      plan: membershipType,
    });

    const orderData = await createOrder.save();

    console.log("200 OK");

    res.json({
      ...orderData.toJSON(),
      publicKeyId: process.env.RAZORPAY_TEST_KEY_ID,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

paymentRouter.post("/payment/webhook", (req, res) => {
  try {
    const webhookSignature = req.header("X-Razorpay-Signature")
    console.log(webhookSignature);
    
    const paymentStatus = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.SECRET_KEY
    );

    const paymentDetails = req.body.payload;
    console.log(paymentDetails);
    
    
    // Update payment status

    // update the user as premium

    // return success response to razorpay with 200 status


    res.json({...paymentStatus});
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
});

module.exports = paymentRouter;
