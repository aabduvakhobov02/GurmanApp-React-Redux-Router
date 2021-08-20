import React from "react";
import cartIcon from "./shopping-cart-solid.svg";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./app-header.scss";

const AppHeader = ({ total }) => {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo"></img>
      <div className="header__nav">
        <Link className="header__link" to="/">
          Menu
        </Link>
        <Link className="header__link" to="/cart">
          <img className="header__cart" src={cartIcon} alt="cart"></img>
          Total: {total} $
        </Link>
      </div>
    </header>
  );
};

const mapStateToProps = ({ total }) => {
  return {
    total,
  };
};

export default connect(mapStateToProps)(AppHeader);
