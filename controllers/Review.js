import expressAsyncHandler from "express-async-handler";
import Review from "../model/Review.js";
import Product from "../model/product.js";

export const createReviwew = expressAsyncHandler(async (req, res) => {
  const { product, message, rating } = req.body;
  const { productID } = req.params;
  console.log(productID);
  const productFound = await Product.findById(productID).populate('reviews');
  console.log(productFound);
  if (!productFound) {
    throw new Error("Product Not  Found ");
  }
  // check if user already reviewd this product
const hasReviewed = productFound?.reviews?.find((review)=>{
return review?.user.toString() === req?.userAuthId.toString()

})
if(hasReviewed){
    throw new Error("you have reviewd already this product ")
}
  //create review
  const review = await Review.create({
    message,
    rating,
    product: productFound?.id,
    user: req.userAuthId,
  });
  //push review into product Found
  productFound.reviews.push(review?._id);
  await productFound.save();
  res.status(201).json({
    success: true,
    message: "Review created successfully ",
  });
});
