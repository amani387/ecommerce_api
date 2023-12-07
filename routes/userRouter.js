import  express  from "express";
import { getuserprofile, loginUserCtrl, registerUserCtrl, updateShippingAdress } from "../controllers/userCtrl.js";
import { islogedin } from "../middlewares/isLogedIn.js";

const userRoutes=express.Router();

userRoutes.post('/register',registerUserCtrl)

userRoutes.post('/login',loginUserCtrl)

userRoutes.get('/profile',islogedin,getuserprofile)

userRoutes.put('/update/shipping',islogedin,updateShippingAdress)

export default userRoutes;

