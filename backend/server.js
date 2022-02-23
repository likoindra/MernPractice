// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import notes from "./data/notes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { dirname } from 'path';
import path from "path";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

//

// code ini akan dipindahkan pada stage 'Deployment`
// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// app.get("/api/notes", (req, res) => {
//   res.json();
// });

// this will related to useRoutes file users
app.use("/api/users", userRoutes); // ini digunakan juga pada userProfile pada backend

// ---------- this app.use for Notes API
app.use("/api/notes", noteRoutes);

// DEPLOYMENT STAGE
// __dirname = path.resolve();
const __dirname = path.resolve();
if(process.env.NODE_ENV === 'production') {
  // jika `apps` pada stage 'production' 
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  // function ini akan mengecek semua routes yang kita pakai 
  // menggunkan * disini memakau semua routes 
  app.get('*' , (req,res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })

} else {
  // 
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}
 
// DEPLOYMENT STAGE

// error handler from useMiddlewares
app.use(notFound);
app.use(errorHandler);

// app.get("/api/notes/:id", (req, res) => {
//   because just need to find 1 note
//   const note = notes.find((n) => n._id === req.params.id);

//   res.send(note);
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Connected to backend on PORT ${PORT}`));
