import React, { useState, useEffect } from "react";
import Axios from "axios";
import { IsLoading } from "../Helper/IsLoading";
import { Link } from "react-router-dom";

export const SearchResult = (props) => {
  const [error, setError] = useState({ error: false });
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const { location } = props.props;
    const search = location.search.split("=");
    let query = "";
    if (search.length == 2 && search[1] != "") {
      query = search[1].replace(/_/g, " ");

      Axios.post("/covid/search", { query: query })
        .then((res) => {
          setIsLoading(false);
          if (res.data.error) {
            setError(res.data);
            return;
          }
          setResult(res.data.result);
        })
        .catch((err) => {
          setIsLoading(false);
          setError({
            error: true,
            msg: "unable to fetch data",
          });
        });
    } else {
      window.location = "/";
    }
  }, []);
  return (
    <div className="page-container">
      <div className="search-page">
        <div className="heading">
          <h4>Search</h4>
        </div>
        <div className="hr-style"></div>
        <div className="body">
          <div className="items">
            {isLoading == true ? (
              <>
                <IsLoading isLoading={isLoading} />
              </>
            ) : (
              <>
                {error.error == true ? (
                  <>
                    <p className="error">{error.msg}</p>
                  </>
                ) : (
                  <>
                    {result.map((val) => {
                      return (
                        <div className="item" key={val.State}>
                          <Link
                            className="link-rec"
                            to={`/state/?state=${val.State.replace(
                              /\s/g,
                              "_"
                            )}`}
                          >
                            <h5>{val.State}</h5>
                          </Link>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
