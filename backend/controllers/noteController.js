import Note from "../models/noteModels.js";

class notesData {
  // get all notes
  static async getNotes(req, res) {
    const notes = await Note.find({ user: req.user._id }); // function ini akan mendapatkan semua note yang sudah dibuat, dengan indikasi find user dengan Idnya
    res.json(notes);
  }
  // create notes
  static async createNotes(req, res) {
    const { title, content, category } = req.body; // disini mendeklarasi untuk  `createNotes` baru harus memiliki 3 obejct tersebut

    // jika tidak ada salah satu dari ke 3 obejct ini akan mengirim error
    if (!title || !content || !category) {
      res.status(400);
      throw new Error("Please fill all the fields");
    } else {
      // jika user mengirim semua object yang dibutuhkan
      // membuat variable baru dengan model yang sudah dibuat yaitu `Note` pada noteModel
      // .user_id disini ada pada saat user sukses Login , yang berasal juga dari auth.Middlwares.js yaitu `req.user` pada line 24
      const note = new Note({ user: req.user._id, title, content, category }); // membuat Note baru dengan storing data yang ada didalamnya

      //   jika notes baru sukses terbuat
      const createdNote = await note.save(); // dengan menggunakan note.save() fucntion akan mengirim dan menyimpan data pada DB

      // ini adalah respon jika sudah sukses terkirim
      res.status(201).json(createdNote);
    }
  }

  //   get notes by id
  static async getNotesById(req, res) {
    //   memfetch data dari url yang berisi :id pada noteRoutes untuk diakses
    const note = await Note.findById(req.params.id); // req.params.id disini didapat dari noteRoutes, which karena sudah memasang :id jadi kita bisa mengirim request ke backend

    // jika id sudah terindentifikasi akan mengirim data `note` ke database dan mendapatkan return res.json(note) which didalamnya berisi `note` yang sudah ada
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found" }); // jika id tidak temukan akan mengirimkan error ini
    }
  }

  // update notes by id
  static async updateNotes(req, res) {
    const { title, content, category } = req.body; // data dalamaobject tersebut yang akan diubah value nya unutk function update `notes`

    // funtion selanjutnya akan mencari id akan diupdate pada mongoDB
    const note = await Note.findById(req.params.id);
    // fucntion ini akan mengidentifikasi dan memastikan state login user dan `notes` yang akan di buat , jika user berhasil login akan mendapatkan askses tersebut

    // jika tidak sama dengan log login user, maksudnya browser akan mengecek terlebih dahulu apakah sudah sama atau tidak
    if (note.user.toString() !== req.user._id.toString()) {
      // jika tidak sama makan akan return error
      res.status(401);
      throw new Error("You cannot perform this action");
    }

    // jika kita mendapatkan data `note` dari const pada line 49
    if (note) {
      // didalam ini jika id nya benar dan ada data yang sudah di buat di dalamnya
      // kita akan udpate data tersebut
      note.title = title;
      note.content = content;
      note.category = category;

      // function yang akan mengirim dan menyimpan data yang sudah terisi
      const updatedNote = await note.save();

      // memberikan update respon pada user
      res.json(updatedNote);
    } else {
      // jika `note` tidak ditemukna / not found
      res.status(404); // memberikan fungsi error
      throw new Error("Note not found");
    }
  }

  // Delete Notes by Id
  static async deleteNotes(req, res) {
    // step 1 akan mecari id user terlebih dahulu apakaah sudah ada / tidak
    const note = await Note.findById(req.params.id);

    // hampir sama dengan updateNotes , jika user tidak memiliki id yang terdaftar tidak bisa melakukan action ini

    // jika tidak sama dengan log login user, maksudnya browser akan mengecek terlebih dahulu apakah sudah sama atau tidak
    if (note.user.toString() !== req.user._id.toString()) {
      // jika tidak sama makan akan return error
      res.status(401);
      throw new Error("You cannot perform this action");
    }

    // jika user memiliki id dan mendapatkan `note` dengan data didalamnya 
    if(note){
      await note.remove(); // disini akan menghapus `note` pada database 
      res.json({ message: 'Note Removed'}) // dan mengirimkan message ini 
    } else {
      // jika `note` tidak ditemukan 
      res.status(404); //memberikan status error 
      throw new Error('Note not found') // message ketika terjadi error yang akan muncul pada `postman`
    }
  }
}

export default notesData;
