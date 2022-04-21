import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { unixToSeconds } from "../functions/unixToSeconds";

const Story = ({ item }) => {
  return (
    <Container>
      <Row>{item.title}</Row>
      <Row>
        <Col>
          {`${item.score} points by `}
          <a href={`/user/details/${item.user}`}>{item.user}</a>
        </Col>
        <Col>
          <a href={`/item/${item.id}`}>{unixToSeconds(item.time)}</a>
        </Col>
        <Col>
          <a href={`/item/${item.id}`}>{`${item.descendants} comments`}</a>
        </Col>
      </Row>
    </Container>
  );
};

export default Story;
