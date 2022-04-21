import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Story from "./Story";
import FormContainer from "./FormContainer";
import Comments from "./Comments";
import { useDispatch, useSelector } from "react-redux";
import { getItem, makeComment } from "../actions/itemActions";
import Loader from "./Loader";
import Message from "./Message";
import { ITEM_FETCH_RESET } from "../constants/itemConstants";

// const item = {
//   by: "dhouston",
//   descendants: 71,
//   id: 8863,
//   kids: [
//     8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067,
//     8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998,
//     8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876,
//   ],
//   score: 111,
//   time: 1175714200,
//   title: "My YC app: Dropbox - Throw away your USB drive",
//   type: "story",
//   url: "http://www.getdropbox.com/u/2/screencast.html",
// };

const Item = ({ history, match }) => {
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
      history.push(`/item/${item.poll}`);
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
              <Story item={item} />
              <br />
              <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
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
            <Container className='mt-5' key={item.id}>
              <Comments itemId={item.poll} kids={item.kids} />
            </Container>
          </>
        )
      )}
    </>
  );
};

export default Item;
