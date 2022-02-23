import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // ini untuk requiremnet yang dibutuhkan saat membuata `note` jadi user harus Register atau Login terlebih dahulu untuk memastikan sudah ada `id` untuk mengkases halaman selanjutnya
    },
  },
  { timestamps: true } // mnegetahui waktu  kapan `note`  di buat 
);

const Note = mongoose.model("Note", noteSchema);

// module.exports = User;
export default Note;
