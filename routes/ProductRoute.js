import express from 'express'
import { getallproducts, productController,getsingleproduct,updateproduct, deleteProductCtrl } from '../controllers/productController.js';
import { islogedin } from '../middlewares/isLogedIn.js';
import upload from '../config/fileUploads.js';

const productRouter=express.Router();

productRouter.post("/",islogedin,productController)
productRouter.get("/",getallproducts)
productRouter.get("/:id",getsingleproduct)
productRouter.put("/:id",islogedin,updateproduct)
productRouter.delete("/:id/delete",islogedin,deleteProductCtrl)
export default productRouter