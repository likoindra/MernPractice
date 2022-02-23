import express from "express";
// import notesData from "../controllers/noteController.js";
import { CreateNote, DeleteNote, getNoteById, getNotes, UpdateNote } from "../controllers/noteControllersV2.js";
// import protectRoutes from "../middlewares/authMIddlewares.js";
import { protect } from "../middlewares/authMiddlewares2.js";
const router = express.Router();

// function get disini akan get all semua `note` pada backend
// use this 
// router.get("/", protectRoutes.protected, notesData.getNotes);
// ---------

// router.route("/").get(protectRoutes.protected, notesData.getNotes);

// function postt disini akan membuat `note` yang akan dikirim ke backend
// uset this 
// router.post("/create", protectRoutes.protected, notesData.createNotes)
// ----------

// router.route("/create").post(protectRoutes.protected, notesData.createNotes)

// function ini akan mencari notes sesuai dengan id yang sudah terdaftar pada database 
// router.get("/:id" , notesData.getNotesById).put(protectRoutes.protected, notesData.updateNotes).delete(protectRoutes.protected, notesData.deleteNotes)


// 
// router
//   .route("/:id")
//   .get(notesData.getNotesById)
//   .delete(protectRoutes.protected, notesData.deleteNotes)
//   .put(protectRoutes.protected, notesData.updateNotes);

// Step pertama akan `get` note yang ada dengan `id` yang sudah ada .function ini mengupdate `single note` dengan id user yang sudah dibuat
// Step ke-2 untuk mengupdate `note` yang sudah dibuat menggunakan method .put
// Step ke-3 untuk delete `note` yang terpilih sesuai id dengan methode .delete
// .delete()

// router.get("/:id" , getNotesById)
// --------------

// -------------- Version 2 from source code all 

// get all function 
router.route('/').get(protect, getNotes)


// create Note 
router.route('/create').post(protect, CreateNote)


// get by id, update and delele function 
router.route('/:id').get(getNoteById).put(protect, UpdateNote).delete(protect, DeleteNote)


export default router;
