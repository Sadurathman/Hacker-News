import React, { useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { makeComment } from "../actions/itemActions";
import { unixToSeconds } from "../functions/unixToSeconds";
import FormContainer from "./FormContainer";
import NestedComment from "./NestedComment";

// const history = useHistory();

const Comment = ({ comment, comments, history }) => {
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.currentUser);
  const { user } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (user) {
      const { id } = user;
      dispatch(
        makeComment({
          text: reply,
          user: id,
          parent: comment.id,
          type: "comment",
          time: parseInt(new Date().getTime() / 1000),
        })
      );
      // history.push(`/item/${comment.poll}`);
      setReply("");
    } else {
      history.push(`/user/login?redirect=/item/${comment.poll}#${comment.id}`);
    }
  };

  return (
    <ListGroup.Item as='li' id={comment.id}>
      <Row>
        <Col>
          <a href={`/user/details/${comment.user}`}>{comment.user}</a>
        </Col>
        <Col>
          <a href={`/item/${comment.parent}`}>parent</a>
        </Col>
        <Col>{unixToSeconds(comment.time)}</Col>
      </Row>
      <Row>
        <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
      </Row>
      {/* <Button variant='info'>
        reply
        <Link to={`/item/comment/${comment.id}`}>reply</Link>
      </Button> */}
      <FormContainer>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='Comment'>
            <Form.Control
              type='Comment'
              placeholder='Type your reply here...'
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='info'>
            Reply
          </Button>
        </Form>
      </FormContainer>
      <NestedComment comments={comments} kids={comment.kids} />
    </ListGroup.Item>
  );
};

export default Comment;
