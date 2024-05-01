import mongoose from "mongoose";

const connectDB = async () => {
   try {
      const connectionInstance = await mongoose.connect(
         `${process.env.MONGODB_URL}`
      );
      if (!connectionInstance) {
         process.exit(1);
      }
      console.log(
         `MongoDB Connected DB Host : ${connectionInstance.connection}`
      );
   } catch (error) {
      console.log("DataBase Connection Failed", error);
      process.exit(1);
   }
};

export default connectDB;
