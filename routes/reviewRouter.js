import express from 'express'
import { createReviwew } from '../controllers/Review.js'
import { islogedin } from '../middlewares/isLogedIn.js';
const reviewRouter=express.Router();
reviewRouter.post('/:productID',islogedin,createReviwew);
export default reviewRouter
