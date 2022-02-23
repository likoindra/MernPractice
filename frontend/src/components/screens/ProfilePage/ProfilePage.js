import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateProfile } from "../../../redux/actions/userActions";
import MainScreen from "../../helpers/MainScreen/MainScreen";
import ErrorMessage from "../../Loader/ErrorMessage";
import Loading from "../../Loader/Loading";
import Styles from "./Styles.module.css";

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  //dengan memanggil userLogin dari state redux , akan memudahkan untuk auto fill saat mengupdate profile
  //
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    //   jika tidak ada data login dari userInfo makan akan kembali ke hompage
    if (!userInfo) {
      history.push("/");
    } else {
      // disini akan mengambil dada dari user sudah ada
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

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

  const submitHandler = (e) => {
    e.preventDefault();
    // mengecek passwrod dan confim pasword , setleah itu ke step selanjutnya
    if (password === confirmPassword)
      //memanggil disptch untuk mengirim data yang akan di update
      dispatch(updateProfile({name, email, password, pic}));
  };

  return (
    <MainScreen title="UPDATE PROFILE ">
      <div>
        <Row className={Styles.ProfileContainer}>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic">
                <Form.Label>Change Profile Picture</Form.Label>
                <Form.File
                  onChange={(e) => postDetail(e.target.files[0])}
                  id="custom-file"
                  type="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex ",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt="" className={Styles.ProfilePic} />
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}
