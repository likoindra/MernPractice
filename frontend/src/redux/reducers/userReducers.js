// import constant yang sudah di buat pada userConstants
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userConstants";

// userReducers Login Function
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }; // di case ini jika user melakukan request login makan return nya adalah loading
    case USER_LOGIN_SUCCESS:
      return { loading: true, userInfo: action.payload }; // jika sukses login akana menerima payload dari userInfo
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }; // jika error akan memunculkan error
    case USER_LOGOUT:
      return {}; // hanya return object kosong , karena akan membuat mengilangkan `userInfo` pada localStorage
    default:
      return state;
  }
};

// userReducers Register Function

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }; // jika registrasi berhasil loading menjadi false
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// updateReducer function
export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true }; // saat berhasil melakukan update user `success` akan nmaenjadi true
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false }; // jika tidak berhasil `success` akan menjadi failed
    default:
      return state;
  }
};
