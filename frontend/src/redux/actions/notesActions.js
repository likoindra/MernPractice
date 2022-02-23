import axios from "axios";
import {
  NOTE_CREATE_FAIL,
  NOTE_CREATE_REQUEST,
  NOTE_CREATE_SUCCESS,
  NOTE_DELETE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_LIST_FAIL,
  NOTE_LIST_REQUEST,
  NOTE_LIST_SUCCESS,
  NOTE_UPDATE_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
} from "../constants/notesConstants";

// GET LIST NOTES
export const listNotes = () => async (dispatch, getState) => {
  try {
    // memanggil dispatch rqeuest terlebih dahulu melakukan request dan membuat loading menjadi true
    dispatch({
      type: NOTE_LIST_REQUEST,
    });

    // setelah itu mendapatkan data dari userlogin state yang berisi userInfo
    const {
      userLogin: { userInfo },
    } = getState(); // didalam getState ini mendapatkan data userInfo dan userLogin State

    // object `config` ini digunakan untuk mem provid bearer token seperti pada userAction
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, // token disini berasal dari { userInfo } pada line 13
      },
    };

    // step selanjutnya memanggil api dengan axios , dan pass `config` object diatas
    const { data } = await axios.get(`/api/notes`, config);

    // jika request diatas berhasil
    // memanggil dispatch
    dispatch({
      type: NOTE_LIST_SUCCESS,
      payload: data, // dengan payload data yang sudah terisi , yang mana terinisialisasi pada `userReducer` yang berisi userInfo untuk payloadnya
    });
  } catch (error) {
    // dan jika proses tidak berhasil dijalankan
    const message =
      error.response && error.response.message
        ? error.response.data.message
        : error.message;

    // memanggil dispatch NOTE_FAIL
    dispatch({
      type: NOTE_LIST_FAIL,
      payload: message, //dengan paylaod message error yang sudah dibuat pada backend
    });
  }
};

// FUNCTION CREATE NEW NOTES
export const createNoteAction =
  // disini akan mengambil 3 parameter untuk membuat note baru yang akan dikirim ke database
  (title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTE_CREATE_REQUEST }); // pertama, memanggil dispatch request terlebih dahulu

      const {
        userLogin: { userInfo }, // mengambil state daru userInfo yang akan di define pada getState()
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/notes/create`, // mengirim title, content , category ke api `create`
        {
          title,
          content,
          category,
        },
        config // dan mngoper atau passing `config` object yang sudah dibuat
      );

      // jika proses diatas berhasil
      dispatch({ type: NOTE_CREATE_SUCCESS, payload: data }); // memanggil dispatch success dan payloadnya
    } catch (error) {
      // jika terjadi error
      const message =
        error.response && error.response.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: NOTE_CREATE_FAIL, payload: message }); // memanggil dispatch error jika terjadi error pada proses diatas
    }
  };

// FUNCTION UPDATE NOTES
// important! . disini akan mengambil id, karena akan mengecek id user apakah sudah sesuai atau tidak setelah itu mengambil sisanya
export const updateNoteAction =
  (id, title, content, category) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTE_UPDATE_REQUEST }); // membuat loading menjadi true karena request

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      //  setelah itu akan melakukan fetch ke API
      const { data } = await axios.put(
        `/api/notes/${id}`, // pada step ini memanggil `id` user untuk melakukan update
        {
          title,
          content,
          category,
        },
        config
      );

      // jika sukses memanggil type SUCCESS dari constant dan payload data yang sudah berisi { id , title , content, category }
      dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      // jika error
      const message =
        error.response && error.response.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: NOTE_UPDATE_FAIL, payload: message });
    }
  };

// FUNCTION DELETE NOTES
// menghaous `id` user pada database
export const deleteNoteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/notes/${id}`, config); //melakukan delete pada `id` user 

    dispatch({
      type: NOTE_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload: message,
    });
  }
};
