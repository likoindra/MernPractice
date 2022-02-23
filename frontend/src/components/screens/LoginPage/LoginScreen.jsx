import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import { Col, Form, Row, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import MainScreen from "../../helpers/MainScreen/MainScreen";
// import axios from "axios"
// import Loading from "../../Loader/Loading";
// import ErrorMessage from "../../Loader/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/userActions";
import ErrorMessage from "../../Loader/ErrorMessage";
import Loading from "../../Loader/Loading";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState("");
  const history = useHistory();
  const dispatch = useDispatch(); // useDispatch disini akan memanggail function yang sudah dibuat pada constant
  const userLogin = useSelector((state) => state.userLogin); // useSelector disini akan memanggil reducers yang akan dipilih yakni `userLogin` pada combineReducers, yang dimana akan mengakses state didalamnya
  const { loading, error, userInfo } = userLogin; // mengambil state yang digunakan pada login screen yaitu loading, error dan `userInfo`

  useEffect(() => {
    if(userInfo) { // jika ada sesuatu pada userInfo yakni email dan password 
        history.push('/mynotes')
    }
  }, [history, userInfo]) // dependencies disini akan trigger jika ada perubahan pada `userInfo` which saat melakukan login 

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email,password)); // memanggil actions login pada userAction, dan akan mengirimikan email dan password 

    // console.log(email, password, '<<<');
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   };

    // jika terjadi fetch akan memanggil setLoading menjaadi true
    // setLoading(true);

    // request data dari API
    // const { data } = await axios.post(
    //   "/api/users/login",
    //   {
    //     // akan mengirim email dan password ke db
    //     email,
    //     password,
    //   },
    //   config
    // );
    // setelah proses berhasil akan menampung email dan password ke dalam local storaage
    // local storage tidak bisa menyimpan object data, jadi harus convert menjadi string data "stringify"
    // console.log(data, 'data <<<')
    // localStorage.setItem('userInfo', JSON.stringify(data))
    //  jika fetch sudah berhasil setLoading akan menjadi false
    //   setLoading(false);
    // } catch (error) {
    //   setError(error.response.data.message)
    //   // setelah message muncul akan menghilangkan spinner loading
    //   setLoading(false);
    // }
  };
  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {/* jika loading error akan memunculkan text error  */}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {/* jika loading true akan memunculkan spinner  */}
        { loading && <Loading/>}
        <Form onSubmit={handleSubmit}>
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}
