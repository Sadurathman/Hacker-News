import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import FormContainer from "./FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../actions/itemActions";

const CreateStory = ({ history }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.currentUser);
  const { user } = userRegister;

  const { loading, item, error } = useSelector((state) => state.item);

  useEffect(() => {
    if (!user) history.push("/user/login?redirect=/story/create");
    if (item && item.id && !error) history.push(`/item/${item.id}`);
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "" || (url === "" && text === "")) {
      setMessage("Enter the valid tilte and URL");
    } else {
      if (user) {
        const { id } = user;
        dispatch(createItem({ title, url, text, user: id, type: "story" }));
      }
    }
    console.log("created");
  };

  return (
    <FormContainer>
      {message && <Message variant='danger'>{message}</Message>}
      <h1>Create Your Post</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='title'
            placeholder='Enter the title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='url'>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type='URL'
            placeholder='Enter the URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <h2>(OR)</h2>

        <Form.Group controlId='url'>
          <Form.Label>Text</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter the description'
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Create
        </Button>
      </Form>
    </FormContainer>
  );
};

export default CreateStory;
