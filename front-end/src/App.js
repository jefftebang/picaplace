import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Users from "./user/pages/Users";
import NewPost from "./posts/pages/NewPost";
import MainNav from "./global/components/Navbar/MainNav";
import UserPosts from "./posts/pages/UserPosts";
import UpdatePost from "./posts/pages/UpdatePost";
import Login from "./user/pages/Login";
import SignUp from "./user/pages/SignUp";
import UserContext from "./global/context/UserContext";

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("x-auth-token");
      if (token === null) {
        localStorage.setItem("x-auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await axios.get(
          "REACT_APP_BACKEND_URL/api/api/users/users",
          {
            headers: { "x-auth-token": token },
          }
        );
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  let routes;
  if (sessionStorage.token) {
    routes = (
      <Switch>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/:userId/posts" exact>
          <UserPosts />
        </Route>
        <Route path="/posts/new" exact>
          <NewPost />
        </Route>
        <Route path="/posts/:postId" component={UpdatePost} />
        <Redirect to="/users" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        {sessionStorage.token && <MainNav />}
        {routes}
      </UserContext.Provider>
    </Router>
  );
};

export default App;
