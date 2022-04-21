import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const formContainer = ({ children }) => {
  return (
    <Container>
      <Row className='ml-4'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default formContainer;
