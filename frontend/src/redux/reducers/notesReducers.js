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

export const noteListReducer = (state = { notes: [] }, action) => {
  // didalam state sendiri berisi `notes` yang menampung array di dalam array tsb akan berisi data craeteNote baru dari user
  // function reducers disini hampir sama dengan pada userConstant
  switch (action.type) {
    case NOTE_LIST_REQUEST:
      return { loading: true }; // saat request terjadi akan berisi loading true
    case NOTE_LIST_SUCCESS:
      return { loading: false, notes: action.payload };
    case NOTE_LIST_FAIL:
      return { loading: false, error: action.payload }; // disaat error terjadi loading menjadi false
    default:
      return state;
  }
};

// create reducer
export const noteCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_CREATE_REQUEST:
      return { loading: true }; // saat request terjadi loading menjadi true
    case NOTE_CREATE_SUCCESS:
      return { loading: false, success: true }; //success true means: jika `notes` sudah terbuat , dan membuat loading menjadi false
    case NOTE_CREATE_FAIL:
      return { loading: false, error: action.payload }; // jika failed akan me return error message , disini error false
    default:
      return state;
  }
};

// update note reducer
export const noteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_UPDATE_REQUEST:
      return { loading: true }; // saat request terjadi loading menjadi true
    case NOTE_UPDATE_SUCCESS:
      return { loading: false, success: true }; //success true means: jika `notes` sudah terbuat , dan membuat loading menjadi false
    case NOTE_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }; // jika failed akan me return error message , disini error false
    default:
      return state;
  }
};

// Delete note reducer
export const noteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTE_DELETE_REQUEST:
      return { loading: true }; // saat request terjadi loading menjadi true
    case NOTE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTE_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
