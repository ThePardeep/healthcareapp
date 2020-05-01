import React, { useEffect } from "react";
import "./Public/Css/style.css";

import { GoogleApiWrapper } from "google-maps-react";
import Header from "./Component/Layout/Header";
import Main from "./Component/Main.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllState from "./Component/Pages/AllState";
import { Footer } from "./Component/Layout/Footer";

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
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
