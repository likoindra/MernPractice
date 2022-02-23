import React, { useEffect } from "react";
import Styles from "./Header.module.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/userActions";

function Header({ setSearch }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin); // menggunakan reducers dari userLogin karena setelah login item `userInfo` akan tersimpan pada localStorage
  const { userInfo } = userLogin; // mengakses `userInfo` yang ada pada state userLogin

  // ---- logout function
  const logoutHandler = () => {
    dispatch(logout()); // memanggil function logout pada redux, yang dimana akan mereset/ menghilankan `userInfo` pada localStorage
    history.push("/");
    // setelah logout berhasil user akan menuju ke halaman awasl `homescreen`
  };

  useEffect(() => {}, [userInfo]);
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container style={{ paddingInline: 20 }}>
        <Navbar.Brand>
          <Link to="">
            <span className={Styles.Title}>Note Zipper</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                // disini akan menerima `setSearch` dari App.js
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo ? (
            <Nav style={{ maxHeight: "100px" }}>
              <Nav.Link to="/mynotes">
                <Link to="/mynotes">
                  <span className={Styles.Title}>My Notes</span>
                </Link>
              </Nav.Link>
              <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={logoutHandler} // function yang akan di panggil menggunakan redux
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link>
                <Link to="/login">
                  <span className={Styles.Title}>Login</span>
                </Link>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
