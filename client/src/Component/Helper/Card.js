import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IsLoading } from "./IsLoading";

function Card(props) {
  const [data, setData] = useState(props.data);
  const [isLoading, setIsLoading] = useState(props.isLoading);
  const [isError, setError] = useState(props.error);
  useEffect(() => {}, []);
  return (
    <div className="card">
      {isLoading == true ? (
        <>
          <IsLoading isLoading={isLoading} />
        </>
      ) : (
        <>
          {isError == true ? (
            <>
              <p>Unable To Fetch Data</p>
            </>
          ) : (
            <>
              <div className="card-header">
                <h4>{data.State}</h4>
              </div>
              <div className="card-body">
                <div className="data">
                  <div className="left">
                    <div className="cd">
                      {/* cd = cases data 
                  tc : total confirmed*/}
                      <div className="tc">
                        <div></div>
                        <h4>Total Confirmed : {data.Confirmed}</h4>
                      </div>
                      <div className="ta">
                        <div></div>
                        <h4>Total Active : {data.Active}</h4>
                      </div>

                      <div className="tr">
                        <div></div>
                        <h4>Total Recovered : {data.Recovered}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="cd">
                      {/* cd = cases data 
                     tc : total confirmed*/}

                      <div className="td">
                        <div></div>
                        <h4>Total Deaths : {data.Deaths}</h4>
                      </div>

                      <div className="lu">
                        <div></div>
                        <h4>
                          Last Updated : {data.lastUpdatedTime.substr(0, 10)}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-btn">
                  <Link
                    className="card-link"
                    to={`/state/?state=${data.State.replace(/\s/g, "_")}`}
                  >
                    More Info
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Card;
