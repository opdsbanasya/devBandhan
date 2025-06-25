const express = require("express");
const { userAuth } = require("../middlewares/authMiddleware");
const razorpayInstance = require("../utils/razorpay");
const PaymentModel = require("../models/payment");

const paymentRouter = express.Router();

paymentRouter.post("/create/order", userAuth, async (req, res) => {
  try {
    const { user } = req;

    const order = await razorpayInstance.orders.create({
      amount: 50000,
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
    });

    const orderData = await createOrder.save();

    res.json({ ...orderData.toJSON()});
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = paymentRouter;
