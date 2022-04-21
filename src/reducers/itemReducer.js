import {
  COMMENT_FAIL,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  ITEM_COMMENT_FETCH_FAIL,
  ITEM_COMMENT_FETCH_REQUEST,
  ITEM_COMMENT_FETCH_SUCCESS,
  ITEM_FETCH_FAIL,
  ITEM_FETCH_REQUEST,
  ITEM_FETCH_RESET,
  ITEM_FETCH_SUCCESS,
  ITEM_HOME_FAIL,
  ITEM_HOME_REQUEST,
  ITEM_HOME_SUCCESS,
} from "../constants/itemConstants";

export const homeReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_HOME_REQUEST:
      return { loading: true };
    case ITEM_HOME_SUCCESS:
      return { loading: false, items: action.payload };
    case ITEM_HOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_FETCH_REQUEST:
      return { loading: true };
    case ITEM_FETCH_SUCCESS:
      return { loading: false, item: action.payload };
    case ITEM_FETCH_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_FETCH_RESET:
      return { loading: false, item: null };
    default:
      return state;
  }
};

export const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_COMMENT_FETCH_REQUEST:
      return { loading: true };
    case ITEM_COMMENT_FETCH_SUCCESS:
      return { loading: false, comments: action.payload };
    case ITEM_COMMENT_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const makeCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return { loading: true };
    case COMMENT_SUCCESS:
      return { loading: false, comments: action.payload };
    case COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
