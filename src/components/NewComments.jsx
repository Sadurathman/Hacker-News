import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { home } from "../actions/itemActions";
import Comment from "./Comment";
import Loader from "./Loader";
import Message from "./Message";

const NewComments = () => {
  const dispatch = useDispatch();
  const { loading, items, error } = useSelector((state) => state.home);

  useEffect(() => {
    if (!items) {
      dispatch(home("comment"));
    }
  }, [items, dispatch]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {items && items.map((item) => <Comment comment={item} />)}
    </>
  );
};

export default NewComments;
