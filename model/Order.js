import mongoose from "mongoose";
const Schema = mongoose.Schema;
//gernerate a random text
const randomtxt = Math.random().toString(36).substring(7).toLocaleUpperCase();

//genrating a random number
const randomNumbers = Math.floor(1000 + Math.random() * 9000);

const OrderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: {
      type: Object,
      required: true,
    },
    shippingAdress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      required: true,
      default: randomtxt + randomNumbers,
    },
    //for stripe payment
    paymentStatus: {
      type: String,
      required: true,
      default: "Not paid",
    },
    paymentMethod: {
      type: String,
      default: "not specified",
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: "Not Specified",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "delivered"],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const Order =mongoose.model("Order",OrderSchema);
export default Order;
