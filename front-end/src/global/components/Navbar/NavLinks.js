import React, { useContext, Fragment } from "react";
import "./NavLinks.css";
import { NavLink, useHistory } from "react-router-dom";
import UserContext from "../../../global/context/UserContext";

const NavLinks = (props) => {
  const { setUserData } = useContext(UserContext);

  const history = useHistory();

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    sessionStorage.clear();
    history.push("/login");
  };

  return (
    <ul className="nav-links">
      {sessionStorage.creator && (
        <Fragment>
          <li>
            <NavLink to="/users" exact>
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts/new">Add Post</NavLink>
          </li>
          <li>
            <NavLink to={`/${sessionStorage.getItem("creator")}/posts`}>
              {sessionStorage.name}
            </NavLink>
          </li>
        </Fragment>
      )}
      {sessionStorage.creator && (
        <li>
          <NavLink to="" onClick={logout}>
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
