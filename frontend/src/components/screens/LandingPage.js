import React, { useEffect } from "react";
import { Container, Row , Button} from "react-bootstrap";
import { useHistory } from "react-router";
import Styles from "./LandingPage.module.css";

const LandingPage = () => {
  const history = useHistory()
  // jika login sukses, mengambil `userInfo` pada localStorage dan memindahkan kehalaman mynotes
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      history.push("/mynotes")
    }
  },[history])
  return (
    <div className={Styles.Main}>
      <Container>
        <Row>
            <div className={Styles.IntroText}>
                <div>
                    <h1 className={Styles.Title}> Note Zipper </h1>
                </div>
                <div className={Styles.ButtonContainer}>
                    <a href="/login">
                        <Button size="lg" className={Styles.LandingButton}>
                            Login
                        </Button>
                    </a>
                    <a href="/register">
                        <Button size="lg" className={Styles.LandingButton} variant="outline-primary">
                            Signup
                        </Button>
                    </a>
                </div>
            </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
