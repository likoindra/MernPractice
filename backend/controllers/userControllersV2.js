import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // hanya user yang sudah terdaftar dan sukses login yang bisa mengupdate profile

  if (user) {
    // jika user tidak mengirim sesuai dengan req.body . akan mengambil parameter setelah nya yaitu `user.name`
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    // jika `body` berisi password 
    // di function digunakan agar password tidak terekpose ke luar 
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save(); //jika sudah berhasil data diatas akan tersimpan dengan function ini
    // save() disini method dari mongodBD yaitu menyimpan data yang sudah diberikan `user`

    //disini akan memberikan response .json ke Front end jika sudah berhasil
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),// generateToken : akan mengenerate token dari `updatedUser` 
    });
  } else {
    res.status(404);
    // jika error akan memeberikan error ini 
    throw new Error("User Not Found");
  }
});

export { authUser, updateUserProfile, registerUser };
