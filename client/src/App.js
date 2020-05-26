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
import { SearchResult } from "./Component/Pages/SearchResult";
import Search from "./Component/Layout/Search";
import { Hospital } from "./Component/Pages/Hospital";
import { Splash } from "./Component/Helper/Splash";
import { About } from "./Component/Pages/About";
function App(props) {
  return (
    <Router>
      <div className="App">
        <Header />
        {localStorage.getItem("sp-screen") == null ? (
          <div className="sp-screen-container">
            <Splash />
          </div>
        ) : (
          <></>
        )}
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
            path="/search"
            render={(props) => {
              return <SearchResult props={props} />;
            }}
          />

          <Route
            path="/hospitals"
            render={(props) => {
              return <Hospital props={props} />;
            }}
          />

          <Route
            path="/about"
            render={(props) => {
              return <About />;
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

        <div className="mob-search-form">
          <hr className="hr-style" />
          <Search />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
