import React from "react";
import { MainPage, CartPage } from "../pages";
import AppHeader from "../app-header";
import WithGurmanService from "../hoc/with-gurman-service";
import { Route } from "react-router-dom";

import Background from "./food-bg.jpg";

const App = () => {
  return (
    <div
      style={{ background: `url(${Background}) center center/cover no-repeat` }}
      className="app"
    >
      <AppHeader total={50} />
      <Route path="/" exact component={MainPage}/>
      <Route path="/cart" component={CartPage}/>
    </div>
  );
};

export default WithGurmanService()(App);
