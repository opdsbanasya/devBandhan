const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    notes: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model("payment", paymentSchema);

module.exports = PaymentModel;
