import React from "react";
import "./Public/Css/style.css";
import Header from "./Component/Layout/Header";
import Main from "./Component/Main.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllState from "./Component/Pages/AllState";
import { Footer } from "./Component/Layout/Footer";
import { Login } from "./Component/User/Login";
import { State } from "./Component/Pages/State";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Main />;
            }}
          />
          <Route
            path="/state/all/"
            render={() => {
              return <AllState />;
            }}
          />
          <Route
            path="/login"
            render={() => {
              return <Login />;
            }}
          />

          <Route
            exact
            path="/state"
            render={(props) => {
              return <State props={props} />;
            }}
          />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
