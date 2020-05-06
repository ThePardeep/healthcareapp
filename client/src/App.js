import React from "react";
import "./Public/Css/style.css";
import Header from "./Component/Layout/Header";
import Main from "./Component/Main.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllState from "./Component/Pages/AllState";
import { Footer } from "./Component/Layout/Footer";
import { Login } from "./Component/User/Login";
import { State } from "./Component/Pages/State";
import { DailyAll } from "./Component/Pages/DailyAll";
import { Admin } from "./Component/User/Admin";
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
            path="/daily/all/"
            render={() => {
              return <DailyAll />;
            }}
          />
          <Route
            path="/login"
            render={() => {
              if (localStorage.getItem("auth")) {
                const authData = JSON.parse(localStorage.getItem("auth"));

                if (authData.expiresIn < Date.now() / 1000) {
                  localStorage.removeItem("auth");
                  return <Login />;
                } else {
                  window.location = "/admin";
                }
              }

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

          <Route
            exact
            path="/admin"
            render={(props) => {
              if (localStorage.getItem("auth")) {
                const authData = JSON.parse(localStorage.getItem("auth"));

                if (authData.expiresIn < Date.now() / 1000) {
                  localStorage.removeItem("auth");
                  return <Login />;
                }
                return <Admin />;
              } else {
                return <Login />;
              }
            }}
          />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
