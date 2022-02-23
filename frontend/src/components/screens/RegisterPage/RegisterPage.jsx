import React, { useEffect, useState } from "react";
import MainScreen from "../../helpers/MainScreen/MainScreen";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import ErrorMessage from "../../Loader/ErrorMessage";
import Loading from "../../Loader/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../redux/actions/userActions";
export default function RegisterPage() {
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory()
  // dengan useSelector , memanggil state `register` pada userAction pada redux
  const userRegister = useSelector(state => state.userRegister) // seperti `userLogin` , `userRegister sendiri akan mengakses state pada `combineReducers` yang ada pada store 
  // dan di dalam `userRegister` akan memanggil { laoding , error , userInfo}
  const { loading,error, userInfo} = userRegister

  useEffect(() => {
    if(userInfo) { // seperti pada `Login` , dalam `Register` akan melihat juga apakaha ada data pada `userInfo` 
        history.push('./mynotes')
    }
  },[userInfo, history])

  const handleSubmit = async (e) => {
    e.preventDefault();

    // kondisi yang sama pada bagian `register` di dalam userAction
    if(password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(register(name,email,password,pic)) // memanggil `register` funtion function pada userAction dengan mengirim { naame,email,password,pic} ke database 
    }

    // mengecek apakah password sudah cocok atau tidak dengan confirmPassword
    // if (password !== confirmPassword) {
    //   setMessage("Password do not match");
    // } else {
    // jika tidak error setMessage akan null
    // setMessage(null);
    // try catch lagi untuk memanggil api
    // try {
    // saat fetch api pastikan menambahkan `headers`
    // const config = {
    //   headers: {
    //     "Content-type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
    // jika terjadi fetch akan memanggil setLoading menjaadi true
    // setLoading(true);

    // request data dari API
    // const { data } = await axios.post(
    //   "/api/users/register",
    //   {
    // akan mengirim data di bawah ke db untuk membuat acount
    //   name,
    //   email,
    //   password,
    //   pic,
    // },
    // panggil config diatas setelah fetch api
    //   config
    // );
    // console.log(data);
    // dan menempatkan item pada localStorage.setItem
    // seperti di login, localStorage ttidak bisa menerima data array object langsung, jadi harus dibuat menajdi string dengan .stringify
    // localStorage.setItem("userInfo", JSON.stringify(data));
    // setelah proses diatas selesai
    // membuat Loading menghilang
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error.response.data.message);
    //   }
    // }
  };

  // function untuk profile image dan mengupload ke cloudinary
  const postDetail = (pics) => {
    // jika gambar tidak ada
    if (!pics) {
      return setPicMessage("Please selece an Image");
    }
    // jika tidak memunculkan message diatas
    setPicMessage(null);

    // function ini akan membaca tipe gambar yang dimasukkan user
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      // disini akan membuat file baru jika user mengupload image image
      //
      const data = new FormData();
      // menambahkan file baru yang akan disesuaikan di cloudinary
      // data.append disini , adalah generic code yang dibutuhkan untuk mengupload image ke cloudinary
      data.append("file", pics); // fields baru untuk `picts`
      data.append("upload_preset", "notezipperliko"); // harus sesuai dengan nama yang ada pada `upload presets ` di cloidinary
      data.append("cloud_name", "likomern");
      // fetch disni menggukanan api yang telah disediakan dari cloudinary
      fetch("https://api.cloudinary.com/v1_1/likomern/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url?.toString()); // toString() disini akan merubah data menjadi string
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // jika image tidak png atau jpeg
      return setPicMessage("Please select an Image");
    }
  };
  return (
    <MainScreen title="REGISTER">
      {" "}
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && (
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.File
              onChange={(e) => postDetail(e.target.files[0])} // disiini akan mengambil image dari index ke 0 yaitu image pertama
              id="custom-file"
              type="image/png"
              label="Upload Profile Picture"
              custom
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}
