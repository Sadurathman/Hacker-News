import axios from "axios";

import {
  COMMENT_FAIL,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  ITEM_COMMENT_FETCH_FAIL,
  ITEM_COMMENT_FETCH_REQUEST,
  ITEM_COMMENT_FETCH_SUCCESS,
  ITEM_CREATE_FAIL,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_FETCH_FAIL,
  ITEM_FETCH_REQUEST,
  ITEM_FETCH_SUCCESS,
  ITEM_HOME_FAIL,
  ITEM_HOME_REQUEST,
  ITEM_HOME_SUCCESS,
} from "../constants/itemConstants";

export const home = (type) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_HOME_REQUEST,
    });
    if (type) type = "/" + type;
    else type = "";
    const res = await axios.get(`http://127.0.0.1:3001/api${type}`);
    dispatch({ type: ITEM_HOME_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ITEM_HOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getItem = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_FETCH_REQUEST,
    });

    const res = await axios.get(`http://127.0.0.1:3001/api/item/${id}`);
    dispatch({ type: ITEM_FETCH_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ITEM_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getComments = (itemId) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_COMMENT_FETCH_REQUEST,
    });
    const { data } = await axios.get(
      `http://127.0.0.1:3001/api/item/comments/${itemId}`
    );
    // console.log(data);
    dispatch({ type: ITEM_COMMENT_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_COMMENT_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const makeComment = (comment) => async (dispatch) => {
  try {
    console.log(comment);
    dispatch({
      type: COMMENT_REQUEST,
    });
    if (comment.text === "") new Error("Enter the comment before you submit");
    const { data } = await axios.post(
      `http://127.0.0.1:3001/api/item/new-comment/${comment.parent}`,
      comment
    );
    dispatch({ type: COMMENT_SUCCESS, payload: data });
    dispatch({ type: ITEM_FETCH_SUCCESS, payload: data });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createItem = (item) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      `http://127.0.0.1:3001/api/item/create`,
      item
    );
    dispatch({ type: ITEM_CREATE_SUCCESS });
    dispatch({ type: ITEM_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ITEM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: ITEM_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
