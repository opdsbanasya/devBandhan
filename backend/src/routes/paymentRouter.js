const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const razorpayInstance = require("../utils/razorpay");
const PaymentModel = require("../models/payment");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

const paymentRouter = express.Router();

paymentRouter.post("/create/order", userAuth, async (req, res) => {
  try {
    const { user } = req;
    const { membershipType } = req.body;
    let amount;

    if (membershipType === "gold") {
      amount = 100000;
    } else if ((membershipType === "silver")) {
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
      membershipType: membershipType,
    });

    const orderData = await createOrder.save();

    res.json({
      ...orderData.toJSON(),
      publicKeyId: process.env.RAZORPAY_TEST_KEY_ID,
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.header("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.SECRET_KEY
    );

    if (!isWebhookValid) {
      throw new Error("Invalid signature");
    }

    const paymentDetails = req.body.payload.payment.entity;

    // Update payment status
    const payment = await PaymentModel.findOne({
      orderId: paymentDetails.order_id,
    });
    payment.status = paymentDetails.status;
    await payment.save();

    // update the user as premium
    const user = await User.findById({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.membershipType;
    user.save();

    // return success response to razorpay with 200 status
    return res.status(200).json({ message: "Webhook received" });
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
});

paymentRouter.get("/payment/verify", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user.isPremium) {
      return res.json({ isPremium: true });
    }
    return res.json({ isPremium: false });
  } catch (err) {
    res.status(400).json({ message: "ERROR: " + err.message });
  }
});

module.exports = paymentRouter;
