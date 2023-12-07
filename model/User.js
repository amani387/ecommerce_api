//const mongoose=require('mongoose')
import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    WhishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WishList",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    hasShippingAddress: {
      type: Boolean,
      default: false,
    },
   
    shippingAdress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      city: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      province: {
        type: String,
      },
      country: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);
const user = mongoose.model("User", UserSchema);
export default user;
//https://dotnet.microsoft.com/download
