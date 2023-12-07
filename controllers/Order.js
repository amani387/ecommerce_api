import expressAsyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import user from "../model/User.js";
import Product from "../model/product.js";
import Stripe from "stripe"
import dotenv from 'dotenv'
dotenv.config();


//stripe 
const stripe =new Stripe(process.env.STRIPE_KEY);
export const orderCtrl = expressAsyncHandler(async (req,res) =>{
     //get the payload(customer ,orderItems ,shippingAddress,totalPrice);
 const {orderItems,shippingAdress,totalPrice} =req.body;
     //find the user 
 const User = await user.findById(req.userAuthId);
//check if the person has not a shipping adress
// if(!User?.hasShippingAddress){
// throw new Error("you need to provide a shipping adress")
// }
 //chek if order is not empty
 if(orderItems?.length <=0 ){
    throw new Error("empty order list ")
 }
 //place/create order
 const order =await Order.create({
    user:User?._id,
    orderItems,
    shippingAdress,
    totalPrice
 })
 console.log("the user order is :",order)
//push order to user 
User.orders?.push(order?._id);
await User.save(); 
console.log("ordrrItems are ...",orderItems.length)
 // update the product quantity sold 
 const products = await Product.find({ _id: { $in: orderItems } } );
 console.log("products ",products)
orderItems?.map(async (order)=>{
   const product = products?.find((product)=>{
      return product?._id?.toString() === order?._id?.toString()
   });

   if(product){
      product.totalSold += order.qty
   
   }
   await product.save();
})
 // make payment (stripe)
 //convert order items to have structure that stripe need s

 const converted_orders = orderItems.map((item)=>{
   return {
      price_data:{
         currency:"usd",
         product_data:{
            name:item?.name,
            description:item?.description,
         },unit_amount:item?.price * 100,
      },
      quantity:item?.qty
   }
 } )
 const session =await stripe.checkout.sessions.create({
   line_items:converted_orders,
   metadata:{
      orderId:JSON.stringify(order._id)
   },
   mode:'payment',
   success_url:'http://localhost:3000/success',
   cancel_url:'http://localhost:3000/success'
 })
 res.send({url:session.url})
 //payment webhook
 //update the user order
// res.json({
//    success:true,
//    message:"Order created ",
//    order,
//    user,
// })
})
//fetching all orders controllers 

export const getllOrdersctrl = expressAsyncHandler(async(req,res)=>{

   const orders =await Order.find() 
   res.json(  
      {
         status:"success",
         Message:"you have successfully fetched all the orders",
         orders
      }
   )
})

//get a single order by id 

export const getSingleOrderCtrl =expressAsyncHandler(async(req,res)=>{
//get the id from params 

   const id =req.params.id

   const SingleOrder = await Order.findById(id);
   if (!SingleOrder) {
      throw new Error("no SingleOrder found with that name ");
    }
   res.json({
      status:"success",
      message:"you have succefully fetched a single Order ",
      SingleOrder,
   })
})
//update the order status 
export const updateOrderStatus = expressAsyncHandler(async(req,res)=>{
   const id =req.params.id;
   const updateOrderStatus =await Order.findByIdAndUpdate(id,{
      status:req.body.status,

   },
   {
      new:true
   }
   
   
   );
   res.status(200).json({
      success:true,
      message:"Order updated",
      updateOrderStatus,
   })

})
