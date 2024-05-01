import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
   name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      lowercase: true,
   },
   email: {
      type: String,
      required: [true, "Name is Required"],
      unique: [true, "Email should be unique"],
      trim: true,
   },
   phone: {
      type: Number,
      required: [true, "Phone number is Required"],
      trim: true,
   },
   password: {
      type: String,
      required: [true, "Password is Required"],
   },
});

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
