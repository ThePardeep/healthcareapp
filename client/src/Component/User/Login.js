import React, { useState } from "react";
import Logo from "../../Public/Images/logo.png";
import Axios from "axios";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    error: false,
  });
  const OnSubmit = (e) => {
    e.preventDefault();
    setError({
      error: false,
    });
    if (email == "" && password == "") {
      setError({
        error: true,
        msg: "Enter Correct Credentials",
      });
      return;
    }

    Axios.post("/user/login", { email, password })
      .then((res) => {
        if (res.data.error) {
          setError(res.data);
          return;
        }
        const data = JSON.stringify(res.data);
        localStorage.setItem("auth", data);
        window.location = "/admin";
      })
      .catch((err) => {
        setError({
          error: true,
          msg: "unable to fetch data",
        });
      });
  };
  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login">
          {error.error == true ? (
            <>
              <p className="error">{error.msg}</p>
            </>
          ) : (
            <></>
          )}
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <div className="inputs">
            <form onSubmit={OnSubmit}>
              <div className="inp_field">
                <i className="fa fa-star" aria-hidden="true"></i>
                <input
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="inp"
                />
              </div>
              <br />
              <div className="inp_field">
                <i className="fa fa-star" aria-hidden="true"></i>
                <input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="inp"
                />
              </div>
              <div className="login-btn">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
