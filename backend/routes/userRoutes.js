import express from "express";
// import  authentication from "../controllers/userControllers.js";
import { registerUser, authUser, updateUserProfile} from '../controllers/userControllersV2.js'
import { protect } from "../middlewares/authMiddlewares2.js";

// import authUser from "../controllers/userLogin.js";
const router = express.Router();


// basically an API
// this will do the POST method // register fucntion
// router.route("/register").post(registerUser);
// router.post("/register", authentication.registerUser);

// login function
// router.post("/login", authentication.login);

// router.route("/login").post(authUser);


// -------- version from source code 
router.route("/").post(registerUser);
router.post("/login", authUser);
router.route('/profile').post(protect, updateUserProfile) // protect dsini akan mengecek. `user` harus login terlbih dahulu 

export default router;
