import expressAsyncHandler from "express-async-handler";
import ColorSchema from "../model/Color.js";

export const createColor = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const colorExist = await ColorSchema.findOne({ name });
  if (colorExist) {
    throw new Error("Color already exist ");
  }
  const Color = await ColorSchema.create({
    name:name.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "you have successfully create color ",
    Color,
  });
});
//get all the colors 

export const getallcolors =expressAsyncHandler(async (req,res)=>{
    const colors =await ColorSchema.find()
    res.json({
        status:"success",
        message:"you have fetched all the colored successfully ",
        colors
    })
})
//get a single color 
export const getSingleColor=expressAsyncHandler(async(req,res)=>{
const id =req.params.id;

const color =await ColorSchema.findById(id)
//check if it is found 
if(!color){
    throw new Error("srry no color found ")
}
res.json({
    status:"success",
    message:"you have fetched succssufully",
    color
})

})
//updating the color 
export const updateColor=expressAsyncHandler(async (req,res )=>{
    const {name} =req.body
    const updatedColor= await ColorSchema.findByIdAndUpdate(req.params.id,{name},{
        new:true
    });
    res.json({ 
        status:"success",
        message:"you have succussfully updated the color ",
        updateColor
    })
})
//deleting the color
export const deletcolor =expressAsyncHandler(async (req,res)=>{
    const id =req.params.id
    await ColorSchema.findByIdAndDelete(id)
    res.json({
        status:"success",
        message:"you have deleted succusfully",

    })
})