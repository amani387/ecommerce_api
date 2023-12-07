import express from 'express'
import { updateColor,createColor,getSingleColor,getallcolors,deletcolor } from '../controllers/colorsCtrl.js'
import { islogedin } from '../middlewares/isLogedIn.js';
const colorRouter =express.Router();
colorRouter.post("/",islogedin,createColor);
colorRouter.get("/",getallcolors);
colorRouter.get("/:id",getSingleColor);
colorRouter.delete("/:id",deletcolor);
colorRouter.put("/:id",updateColor);
export default colorRouter; 
