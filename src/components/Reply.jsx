import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import FormContainer from "./FormContainer";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { getItem, makeComment } from "../actions/itemActions";
import Loader from "./Loader";
import Message from "./Message";
import { ITEM_FETCH_RESET } from "../constants/itemConstants";
import { unixToSeconds } from "../functions/unixToSeconds";

const Reply = ({ history, match }) => {
  const [comment, setComment] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const { loading, item, error } = useSelector((state) => state.item);

  const userLogin = useSelector((state) => state.currentUser);
  const { user } = userLogin;

  useEffect(() => {
    if (!item || !item.id) {
      dispatch(getItem(match.params.id));
    }
    if (match.params.id !== url) {
      setUrl(match.params.id);
      dispatch({ type: ITEM_FETCH_RESET });
    }
  }, [item, dispatch, match.params.id, url]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (user) {
      const { id } = user;
      dispatch(
        makeComment({
          text: comment,
          user: id,
          parent: match.params.id,
          type: "comment",
          time: parseInt(new Date().getTime() / 1000),
        })
      );
      setComment("");
    } else {
      history.push(`/user/login?redirect=/item/${item.id}`);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        item && (
          <>
            <Container>
              <Row>
                <Col>
                  {`Commented by `}
                  <a href={`/user/details/${item.user}`}>{item.user}</a>
                </Col>
                <Col>
                  <a href={`/item/${item.id}`}>{unixToSeconds(item.time)}</a>
                </Col>
              </Row>
              <br />

              <p>
                <span style={{ fontSize: "24px" }}>Comment : </span>
                <span dangerouslySetInnerHTML={{ __html: item.text }}></span>
              </p>
              <Container style={{ marginLeft: "2vh" }}>
                <br />
                <FormContainer>
                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId='Comment'>
                      <Form.Control
                        type='Comment'
                        placeholder='Type your comment here...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                      Comment
                    </Button>
                  </Form>
                </FormContainer>
              </Container>
            </Container>
            <Container className='mt-5' key={item.id}>
              <Comments itemId={item.id} kids={item.kids} />
            </Container>
          </>
        )
      )}
    </>
  );
};

export default Reply;
