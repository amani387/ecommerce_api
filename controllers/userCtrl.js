import User from "../model/User.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import generatetoken from "../utils/generatetoken.js";
import { gettokenfromrequset } from "../utils/reqheader.js";
import { verifyToken } from "../utils/verifyToken.js";
export const registerUserCtrl = expressAsyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new error("user already exists ");
  }
  //hash the password if the user didnt found
  const salt = await bcrypt.genSalt(10);
  const hashdPassword = await bcrypt.hash(password, salt);
  // register user to the db

  const user = await User.create({
    fullname,
    email,
    password: hashdPassword,
  });

  res.status(201).json({
    status: "success",
    message: "user Regesterd succefully ",
    data: user,
  });
});

export const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("password is : ", password);
  //Find the user in db by email only
  const userFound = await User.findOne({
    email,
  });
  console.log(userFound.password);
  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      msg: "user successfully found",
      userFound,
      token: generatetoken(userFound?.id),
    });
  } else {
    res.json({
      msg: "Invalid login ",
    });
  }
});

export const getuserprofile = expressAsyncHandler(async (req, res) => {
 const user = await User.findById(req.userAuthId).populate('orders');
res.json({
  status:"success",
  message:"your orders are ",
  user
})

});

//@desc update user shipping address
//@route Put/api/v1/users/update/shipping
//@access Private
// firstName:  lastName: city:  postalCode: province: country: phone:

export const updateShippingAdress = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, city, postalCode, province, phone } = req.body;
  const userShippingUpdated = await User.findByIdAndUpdate(
    req.userAuthId,
    //console.log("the id " ,req.userAuthId,),
    { $set:{
      shippingAdress: {
        firstName,
        lastName,
        city,
        postalCode,
        province,
        phone,
      },
      hasShippingAddress: true,
     
    },},
  
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    msg: "succecfully upadted",
    userShippingUpdated,
  });
});
