import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import asyncHandler from "express-async-handler";

// whenever user login, akan mem protect url `.get('/getNotes)` pada noteRoutes.js
// jadi user harus melewati middlewares `protect` ini sehingga bisa masuk kedalam url `.get('/getNotes')`
class protectRoutes {
  static async protected(req, res, next) {
    // akan mendeclare variable baru dengan nama `token`
    let token; // let , karena kondisi token bisa berubah

    if (
      req.headers.authorization && // disini mengecek apakah user login dengan authorization
      req.headers.authorization.startsWith("Bearer") // mengecek apakah user login dengan auth dan `Bearer`
      // dan jika kedua kondisi diatas terisi maka akan lanjut ke proses `try & catch`
    ) {
      try {
        token = req.headers.authorization.split(" ")[1]; // di line ini, hanyak akan mengambil toke karena `Bearer` sendiri sudah tersplit

        // membaca token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // proses ini akan mengecek apakah user memliki token id dengan mem verifikasi menggunakan token dan JWT_SECRET

        req.user = await User.findById(decoded.id).select("-password"); // jika berhasil proses ini akan dijalankan dengan mencari User berdasarkan id nya dan tidak mengambil 'password'

        next(); // setelah itu akan memanggil function next, which akan mengirim data pada api .get(/getNotes)
      } catch (error) {
        res.status(400);
        throw new Error("Not Authorized, token failed"); // jika proses pada pengecekan token failed akan memunculkan error ini
      }
    }

    // dan jika user tidak membawa token 
    // proses ini akan dijalankan 
    if(!token) {
        res.status(401);
        throw new Error("Not Authorized, token not found")
    }
  }
}

export default protectRoutes;
