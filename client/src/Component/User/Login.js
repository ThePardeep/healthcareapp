import React, { useState } from "react";
import Logo from "../../Public/Images/logo.png";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const OnSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };
  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login">
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
