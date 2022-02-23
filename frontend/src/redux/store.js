import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  noteCreateReducer,
  noteDeleteReducer,
  noteListReducer,
  noteUpdateReducer,
} from "./reducers/notesReducers";
// setup untuk redux di dalam sebuah app

// combine reducers akan mengganbungkan reducers yang akan dibuat
const reducer = combineReducers({
  // di dalam ini berisi semua reducers
  userLogin: userLoginReducer, // berisi reducers dari reducers userLoginReducers
  userRegister: userRegisterReducer, // berisi reducers dari reducers userRegisterReducers
  noteList: noteListReducer, // berisi reducers dari noteReducers
  noteCreate: noteCreateReducer, // berisin reducer dar noteCreateReducers
  noteUpdate: noteUpdateReducer,
  noteDelete: noteDeleteReducer,
  userUpdate: userUpdateReducer,
});

// fetch user state dari localStorage , jika user kembali lagi akan memfetch semua data dari localStorage
// note : jika user refresh page , web akan membaaca data dari localStorage unutk menampilkan state pada `Redux devtools`
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")) // jika `userInfo` ada akan terconvert menjadi string jika tidak ada akan return null
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage }, // disini State dari `userLogin` akan mempunyai state seperti yang di jelaskan di `userInfoFormLocalStorage`
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) // { ...middleware }semua middleware akan berada dalam applyMiddleware
);

export default store;
