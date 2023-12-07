import express from 'express';
import { orderCtrl,getllOrdersctrl, getSingleOrderCtrl,updateOrderStatus } from '../controllers/Order.js';
import { islogedin } from '../middlewares/isLogedIn.js';

const orderRouter =express.Router();

orderRouter.post("/",islogedin,orderCtrl)
orderRouter.get("/",islogedin,getllOrdersctrl)
orderRouter.get("/:id",getSingleOrderCtrl)
orderRouter.put("/update/:id",updateOrderStatus)
export default orderRouter;