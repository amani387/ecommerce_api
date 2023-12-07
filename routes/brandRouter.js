import express from "express";
import Brand from "../model/Brand.js";
import { islogedin } from "../middlewares/isLogedIn.js";
import {
  deleteBrand,
  CreatBrand,
  updateBrand,
  getallbrand,
  getsingleBrand,
} from "../controllers/brandCtrl.js";

const brandRouter = express.Router();
brandRouter.post("/", islogedin, CreatBrand);
brandRouter.get("/", getallbrand);
brandRouter.delete("/:id", deleteBrand);
brandRouter.get("/:id", getsingleBrand);
brandRouter.put("/:id", updateBrand);
export default brandRouter;
