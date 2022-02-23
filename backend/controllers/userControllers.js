import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";
// import authUser from "./userLogin.js";

class authentication {
  // this will do register function
  static async registerUser(req, res) {
    const { name, email, password, pic } = req.body;

    // checking if the user is exist in database
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        message: "User Already Exists",
      });
      // throw new Error("User Already Exists");
    } else {

      const user = await User.create({
        name,
        email,
        password,
        pic,
      });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
      });
    }

    // if already created 'user'
    // if (user) {
    // 201 is 'successfull'
    // if there's something inside 'user'
    //   res.status(201).json({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     isAdmin: user.isAdmin,
    //     pic: user.pic,
    //   });
    // }
    // else {
    // if error
    //   res.status(400);
    //   throw new Error("Error Occured");
    // }

    // res.status(201).json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   isAdmin: user.isAdmin,
    //   pic: user.pic,
    // });
  }

  static async login(req, res) {
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
        //   this data above will send to front end and add the jwt token. /
        // token berguna untuk authenticate ke backend
        token: generateToken(user._id),
      });
    }
    //   if the users not found
    else {
      //   if error
      res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
  }
}

export default authentication;
