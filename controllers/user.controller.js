import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
   console.log(req.body);
   const { name, email, phone, password } = req.body;

   if (!name || !email || !phone || !password) {
      return res.status(401).json({
         success: false,
         message: "All fileds are required",
      });
   }
   const existingUser = await User.findOne({
      email,
   });
   if (existingUser) {
      return res.status(400).json({
         success: false,
         message: "User Already exists",
      });
   }
   const user = await User.create({
      name,
      email,
      phone,
      password,
   });
   const createdUser = await User.findById(user._id).select("-password");
   console.log(createdUser);
   if (!createdUser) {
      return res.status(500).json({
         success: false,
         message: "Something went wrong while registering the user",
      });
   }
   return res.status(201).json({
      success: true,
      message: "User registered Successfully",
      createdUser,
   });
};

const loginUser = async function (req, res) {
   console.log(req.body);
   const { email, password } = req.body;
   if (!email) {
      return res.status(401).json({
         success: false,
         message: "Email is required",
      });
   }
   if (!password) {
      return res.status(401).json({
         success: false,
         message: "Password fileds is required",
      });
   }
   const user = await User.findOne({ email });
   console.log(user);
   if (!user) {
      return res.status(400).json({
         success: false,
         message: "User Does not Exists",
      });
   }
   const isPasswordValid = await user.isPasswordCorrect(password);
   if (!isPasswordValid) {
      return res.status(400).json({
         success: false,
         message: "Invalid user credentials",
      });
   }
   const loggedInUser = await User.findById(user._id).select("-password");
   return res.status(201).json({
      success: true,
      message: "User LoggedIn Successfully",
      loggedInUser,
   });
};

export { registerUser, loginUser };
