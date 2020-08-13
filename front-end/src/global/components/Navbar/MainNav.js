import React, { Fragment } from "react";
import "./MainNav.css";
import MainWrap from "./MainWrap";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideBar from "./SideBar";
import { useState } from "react";
import Shadow from "../front-end-comps/Shadow";

const MainNav = (props) => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  const openSideBarHandler = () => {
    setSideBarIsOpen(true);
  };

  const closeSideBarHandler = () => {
    setSideBarIsOpen(false);
  };

  return (
    <Fragment>
      {sideBarIsOpen && <Shadow onClick={closeSideBarHandler} />}
      <SideBar show={sideBarIsOpen} onClick={closeSideBarHandler}>
        <nav className="main-nav__side-bar">
          <NavLinks />
        </nav>
      </SideBar>
      <MainWrap>
        <button className="main-nav__menu-btn" onClick={openSideBarHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-nav__title">
          <Link to="/" className="logo1">
            <span>Picaplace</span>
          </Link>
        </h1>
        <nav className="main-nav__wrap-nav">
          <NavLinks />
        </nav>
      </MainWrap>
    </Fragment>
  );
};

export default MainNav;
