import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import ErrorBoundary from "./components/error-boundry";
import GurmanServiceContext from "./components/gurman-service-context";
import GurmanService from "./services/gurman-service";
import "./index.scss";

const gurmanService = new GurmanService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <GurmanServiceContext.Provider value={gurmanService}>
        <Router>
          <App />
        </Router>
      </GurmanServiceContext.Provider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
