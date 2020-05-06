import React, { useState } from "react";
import Axios from "axios";
import { IsLoading } from "../Helper/IsLoading";

export const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
  });
  const [result, setResult] = useState(null);
  const linksData = [
    {
      Title: "Update Daily Cases",
      Link: "/covid/insert/daily",
      btnText: "Update",
    },
    {
      Title: "Update State Cases",
      Link: "/covid/update/state/daily",
      btnText: "Update",
    },
    {
      Title: "Update District Cases",
      Link: "/covid/update/district/cases",
      btnText: "Update",
    },
  ];

  const updateData = (item) => {
    setIsLoading(true);
    setResult(null);
    if (localStorage.getItem("auth")) {
      const Auth = JSON.parse(localStorage.getItem("auth"));
      Axios.defaults.headers = {
        Authorization: Auth.Token,
      };
      Axios.post(item.Link, { refresh: true })
        .then((res) => {
          setIsLoading(false);
          if (res.data.error) {
            setError(res.data);
            return;
          }
          setResult(res.data);
        })
        .catch((err) => {
          setError({
            error: true,
            msg: "unable to update data",
          });
        });
    } else {
      window.location = "/login";
    }
  };
  return (
    <div className="page-container">
      <div className="admin">
        <div className="heading">
          <h4>Admin DashBoard</h4>
        </div>
        <div className="hr-style"></div>
        <div className="body">
          <div className="output">
            {error.error == true ? (
              <>
                <p>{error.msg}</p>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="loa">
            {isLoading == true ? (
              <>
                <IsLoading isLoading={isLoading} />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="output">
            {result == null ? (
              <></>
            ) : (
              <>
                <p>{result.msg}</p>
              </>
            )}
          </div>
          <div className="items">
            {linksData.map((item, index) => {
              return (
                <>
                  <div className="item" key={item.Link}>
                    <p>{item.Title}</p>
                    <button onClick={updateData.bind(this, item)}>
                      {item.btnText}
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
