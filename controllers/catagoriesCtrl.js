import Category from "../model/Category.js";
import expressAsyncHandler from "express-async-handler";
//creating category
export const createCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const isExistCategory = await Category.findOne({ name });

  if (isExistCategory) {
    throw new Error("Category already Exists ");
  }
  //create
  const category = await Category.create({
    name:name.toLowerCase(),
    user: req.userAuthId,
  });
  res.json({
    status: "success",
    message: "Category created successfully ",
    category,
  });

});
//fetching(getting ) all categories
export const getallCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json({
    status: "success",
    message: "successfully fetched all categories ",
    categories,
  });
});
//getting single category
export const getSingleCategory = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const singleCategory = await Category.findById(id);
  if (!singleCategory) {
    throw new Error("no category found with that name ");
  }
  res.json({
    status: "success",
    message: "successfully fetched one category",
    singleCategory,
  });
});
//updated category
export const updateCategory = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const UpdatedCategory =await Category.findByIdAndUpdate(
    id,
    {
      name,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "catagory updated successfully",
    UpdatedCategory,
  });
});
//delete category 
export const deleteCategory =expressAsyncHandler(async (req,res)=>{
    const id=req.params.id;
  await Category.findByIdAndDelete(id);
    res.json({
        status:"succuss",
        message:"deleted category succussfully"
    })
})