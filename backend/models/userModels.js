import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      //  if we need admin role we can just it
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  //   check when the data created and updated , it will show at mongoDB database
  {
    timestamps: true,
  }
);

// this will encrypt the password before saving to database
userSchema.pre("save", async function (next) {
  // if this password not modified
  if (!this.isModified("password")) {
    next();
  }

  //   genSalt = generate the value of password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// this will decrypt password, and match the password 
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

// module.exports = User;
export default User;
