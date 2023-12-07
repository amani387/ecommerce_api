import expressAsyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

export const CreatBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  //brand exist

  const brandExist = await Brand.findOne({ name: brand?.toLowerCase() });
  if (brandExist) {
    throw new Error("brand aleady exist ");
  }
  //create brand
  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "you have succussfully created brand",
    brand,
  });
});
//get all brands
export const getallbrand = expressAsyncHandler(async (req, res) => {
  const allbrand = await Brand.find();
  res.json({
    status: "success",
    message: "successfull all brands have been fetched ",
    allbrand,
  });
});
//get single brand

export const getsingleBrand = expressAsyncHandler(async (req, res) => {
  const brandId = req.params.id;
  const singlebrand = await Brand.findById(brandId);
  res.json({
    status: "success",
    message: "succssfully fetched the single brand",
    singlebrand,
  });
});

export const updateBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand =await Brand.findByIdAndUpdate(req.params.id, { name }, { new: true });

  res.json({
    status: "success",
    message: "you have successfully updated the brand ",
    brand,
  });
});
export const deleteBrand = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  await Brand.findByIdAndDelete(id);
  res.json({
    status: "success",
    message: "you have deleted succussfully",
  });
});
