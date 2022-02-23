import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";

// ------ Login
const authUser = asyncHandler(async (req, res) => {
  // will need just email and password on this case, can be added
  const { email, password } = req.body;

  //    if login successfully
  const user = await User.findOne({ email });
  // check wheter the password true or false
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      //   this data above will send to front end and add the jwt token also
      token: generateToken(user._id),
    });
  }
  //   if the users not found
  else {
    //   if error
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

export default authUser;
