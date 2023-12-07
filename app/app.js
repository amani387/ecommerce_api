import dotenv from "dotenv";
import Stripe from "stripe";
import express from "express";
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/userRouter.js";
import { globalerrhandler, notFound } from "../middlewares/globalErrHandler.js";
import productRouter from "../routes/ProductRoute.js";
import categoriesRouter from "../routes/categoryRouter.js";
import brandRouter from "../routes/brandRouter.js";
import colorRouter from "../routes/colorRouter.js";
import reviewRouter from "../routes/reviewRouter.js";
import orderRouter from "../routes/OrderRouter.js";
import Order from "../model/Order.js";

dotenv.config();
dbConnect();
const app = express();

///Stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  "whsec_05f40f4f40982c5aacc4acbdb9754e0413731834cd4bda581f9e39d6dbbacc2b";

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => { 
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      console.log("event");
    } catch (err) {
      console.log("err", err.message);
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    if (event.type === 'checkout.session.completed') {
      //update the order
      const session = event.data.object;
      const { orderId } = session.metadata;
      const paymentStatus = session.payment_status;
      const paymentMethod = session.payment_method_types[0];
      const totalAmount = session.amount_total;
      const currency = session.currency;
    //find the order 
const order =await Order.findByIdAndUpdate(JSON.parse(orderId),
  {
    totalPrice:totalAmount / 100,
    currency,
    paymentMethod,
    paymentStatus,
  },
  {
    new:true,
  }
  );
  
  console.log(order)
    } else {
      return;
    }
    // Handle the event
    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     const paymentIntentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.use(express.json());
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/category", categoriesRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/color", colorRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/orders", orderRouter);

app.use(notFound);
//error
app.use(globalerrhandler);
export default app;
