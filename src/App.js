import React from "react";
import {
  BrowserRouter,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";
import CreateStory from "./components/CreateStory";
import Header from "./components/Header";
import Home from "./components/Home";
import Item from "./components/Item";
import Login from "./components/Login";
import NewComments from "./components/NewComments";
import Profile from "./components/Profile";
import RegisterScreen from "./components/Register";
import Reply from "./components/Reply";
import User from "./components/User";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Route path='/' component={Home} exact />
        <Route path='/user/login' component={Login} exact />
        <Route path='/user/register' component={RegisterScreen} exact />
        <Route path='/user/profile' component={Profile} exact />
        <Route path='/:type' component={Home} exact />
        <Route path='/comments/recent' component={NewComments} exact />
        <Route path='/user/details/:id' component={User} exact />
        <Route path='/item/:id' component={Item} exact />
        <Route path='/item/comment/:id' component={Reply} exact />
        <Route path='/story/create' component={CreateStory} exact />
      </main>
    </BrowserRouter>
  );
}

export default App;
