import expressAsyncHandler from "express-async-handler";
import Product from "../model/product.js";
import Brand from "../model/Brand.js";
import Category from "../model/Category.js";

//product controller
export const productController = expressAsyncHandler(async (req, res) => {
console.log("hellloooooo");
console.log(req.file)
  
     //product,
  // });
  // const {
  //   name,
  //   description,
  //   category,
  //   sizes,
  //   colors,
  
  //   price,
  //   totalQty,
  //   brand,
  // } = req.body;
  // //product exists
  // const productExist = await Product.findOne({ name });
  // if (productExist) {
  //   throw new Error("Product already Exists");
  // }
  // //find the category
  // const categoryFound = await Category.findOne({
  //   name: category,
  // });

  // if (!categoryFound) {
  //   throw new Error(
  //     "Category not Found , please create category first or check category name "
  //   );
  // }
 
  // //find brand

  // const brandFound = await Brand.findOne({ name: brand.toLowerCase() });
  // if (!brandFound) {
  //   throw new Error(
  //     "brand not found ,please create a brand first or check the brand name "
  //   );
  // }

  // //create the product

  // const product = await Product.create({
  //   name,
  //   description,
  //   category,
  //   sizes,
  //   colors,
  //   user: req.userAuthId,
  //   price,
  //   totalQty,
  //   brand,
  // });
  // //push the product into catagory
  // categoryFound.products.push(product._id);
  // //resave
  // await categoryFound.save();
  // //push the product into brand 
  // brandFound.products.push(product._id)
  // //resave 
  // await brandFound.save()
  // //send the product into category
  // res.json({
  //   status: "success",
  //   message: "Product created successfully ",
  //   product,
  // });
});
export const getallproducts = expressAsyncHandler(async (req, res) => {
  //QUREY
  let productquery = Product.find();

  //search by name
  if (req.query.name) {
    productquery = productquery.find({
      name: { $regex: req.query.name, $options: "i  " },
    });
  }
  //filer by brand
  if (req.query.brand) {
    productquery = productquery.find({
      brand: { $regex: req.query.brand, $options: "i" },
    });
  }
  //filer by color
  if (req.query.colors) {
    productquery = productquery.find({
      colors: { $regex: req.query.colors, $options: "i" },
    });
  }
  //filer by price range
  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    console.log(priceRange);
    productquery = productquery.find({
      price: {
        $gte: priceRange[0],
        $lte: priceRange[1],
      },
    });
  }
  //pagination
  //page
  const page = parseInt(req.query.page) ? parseInt(req.parse.query) : 1;
  //limit
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
  //startIdx
  const startIndex = (page - 1) * limit;
  //endIdx
  const endIndex = page * limit;
  //total
  const total = await Product.countDocuments();
  //pagination result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  //AWAIT THE QUERY
  const products = await productquery.populate('reviews');

  console.log(products);
  res.json({
    status: "success ",
    total,
    results: products.length,
    pagination,
    message: "Products fetched seccussfully ",
    products,
  });
});
// get a single product
export const getsingleproduct = expressAsyncHandler(async (req, res) => {
  console.log(req.params);
  const product = await Product.findById(req.params.id).populate('reviews');
  if (!product) {
    throw new Error("no product found ");
  }
  res.json({
    status: "success",
    message: " Product found successfully ",
    product,
  });
});
//UPDATING A PRODUCT CONTEROLLER
export const updateproduct = expressAsyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      brand,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    {
      new: true,
    }
  );
  res.json({
    status: "success",
    message: "you update the product succussfully ",
    product,
  });
});
//delete product
export const deleteProductCtrl = expressAsyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "deleted successfully ",
  });
});
