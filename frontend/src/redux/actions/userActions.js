import axios from "axios";
import axiosInstance from "../../components/axiosInstance";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

// logic dari loginScreen akan dipindahkan kedalam userAction
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST }); // memanggil type dari constannt , step ini akan membuat `{loading : true}`

    const config = {
      headers: {
        "Content-type": "application/json",
        // "Access-Control-Allow-Origin": "*",
      },
    };
    // request data dari API
    const { data } = await axios.post(
      "/api/users/login",
      {
        // akan mengirim email dan password ke db
        email,
        password,
      },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); // step ini jika login berhasil akan mendapatkan data dari payload `userInfo`
    localStorage.setItem("userInfo", JSON.stringify(data)); // menempatkan `userInfo` pada local storage pada `application`
  } catch (error) {
    // jika tidak berhasil login
    dispatch({
      type: USER_LOGIN_FAIL,
      // dengan payload error message
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ---------------- LOGOUT
// logic dari register page akana di pindah kedalam redux agar memudahkan mengolah state
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo"); // remove item `userInfo` dari local storage
  dispatch({ type: USER_LOGOUT });
};

// -------------- REGISTER
export const register = (name, email, password, pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST }); // memanggil type request terlebih dahulu , kareana langkah awal adalah untuk mengirim reqquest

    const config = {
      headers: {
        "Content-type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // << kondisi tambahan untuk menghindarai error CORS
      },
    };
    // selanjutnya send data Regsiter ke DB
    // menggunakan `await` karena data yang dikirim membutuhkan proses , dan jika terjadi error akan `catch` error
    const { data } = await axios.post(
      // "/api/users/register",
      "/api/users", // << mengikuti dari source code
      { name, email, password, pic },
      config
    );

    //   jika call API success , akan mendapatkan return `userInfo` dan payload data yang ada pada useReducers
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data }); // selalu memanggil data `payload` jika berhasil men-dispatch

    // disiini kondisinya jika register berhasil akan langsung login dan menyimpan data kedalam  localStorage
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data }); // selalu memanggil data `payload` jika berhasil men-dispatch
    localStorage.setItem("userInfo", JSON.stringify(data)); // menempatkan `userInfo` pada local storage pada `application`
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    }); // jika terjadi error akan memunculkan error message
  }
};

// -------  ---------- UPDATE PROFILE
export const updateProfile = (user) => async (dispatch, getState) => {
  // user disini adalah id dari `user`
  // didalam user sendiri berisi data seperti name, email, dll dari bio `user`
  try {
    dispatch({ type: USER_UPDATE_REQUEST }); // STEP 1 akan me request terlebih dahulu dimana loading akan menjadi true

    //  mengambil userLogin information dari getSate()
    // jadi hanya `user` yang sudah login yang bisa mengupate data profilenya
    const {
      userLogin: { userInfo },
    } = getState();

    //config header seperti biasa
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`, // passing Bearer token dari getState()
      },
    };

    //  jika step ini gagal akan melempar pada block erorr / fail 
    // jika berhasil 
    const { data } = await axios.post("/api/users/profile", user, config);
    
    // akan memanggil dispaych success yang akan membuat `sucess` menjadi true sepertu pada useReducer
    dispatch({ type : USER_UPDATE_SUCCESS, payload: data })
    //membuat `user` login kembali disaat `profile` terupdate 
    dispatch({ type : USER_LOGIN_SUCCESS, payload: data })

    // step ini akan menyimpan data yang sudah terupdate pada `local storage`
    localStorage.setItem("userInfo" ,JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
