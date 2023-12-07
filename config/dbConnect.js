import mongoose, { mongo } from "mongoose";
const dbConnect = async () => {
  mongoose.set("strictQuery", false);
  try {
    const connected = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to mongodb ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default dbConnect;
//hcSXEtQiYaUGm8gS
//mongodb+srv://thanos:hcSXEtQiYaUGm8gS@node-ecommerce-api.isruuzm.mongodb.net/nodejs-ecommerce-api?retryWrites=true&w=majority
