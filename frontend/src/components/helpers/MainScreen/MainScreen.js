import React from "react";
import { Container, Row } from "react-bootstrap";
import Styles from "./MainScreen.modules.css";


const MainScreen = ({ title, children }) => {
  return (
    <div className={Styles.MainBack}>
      <Container>
        <Row>
          <div className={Styles.Page}>
            {title && (
              <>
                <h1 className={Styles.Heading}>{title}</h1>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreen;
