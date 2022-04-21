import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  commentReducer,
  homeReducer,
  itemReducer,
} from "./reducers/itemReducer";
import { currentUserReducer, userDetailReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  home: homeReducer,
  itemComment: commentReducer,
  item: itemReducer,
  userDetail: userDetailReducer,
  currentUser: currentUserReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const userInfoFromStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const store = createStore(
  reducer,
  { currentUser: { user: userInfoFromStorage } },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
