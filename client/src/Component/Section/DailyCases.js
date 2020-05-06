import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IsLoading } from "../Helper/IsLoading";
function DailyCases(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState({ error: false });
  useEffect(() => {
    if (props.error == true) {
      setError(props.error);
      setIsLoading(props.isLoading);
      return;
    }
    if (props.data.length > 0 && props.error.error === false) {
      setData(props.data);
      setIsLoading(false);
    } else if (props.error.error) {
      setError(props.error);
    }
  }, [props]);
  return (
    <div className="sec-container">
      <section className="dailyCases">
        <div className="heading">
          <h4>Daily Cases</h4>
        </div>
        <hr className="hr-style" />

        <div className="body">
          {isLoading === true ? (
            <>
              <IsLoading isLoading={isLoading} />
            </>
          ) : (
            <>
              {isError.error == true ? (
                <>
                  <p>{isError.msg}</p>
                </>
              ) : (
                <div className="all-card">
                  {data.map((val, ind) => {
                    return (
                      <div
                        key={ind}
                        style={{
                          margin: "10px",
                          display: "inline-block",
                          // textAlign: "center",
                        }}
                      >
                        <div className="card dailyCard">
                          <div className="card-header">
                            <h4>{val.date}</h4>
                          </div>
                          <div className="card-body">
                            <div className="card-item">
                              <div className="tc">
                                <div></div>
                                <h4>Confirmed : {val.dailyConfirmed}</h4>
                              </div>
                              <div className="tr">
                                <div></div>
                                <h4>Recovered : {val.dailyRecovered}</h4>
                              </div>
                              <div className="td">
                                <div></div>
                                <h4>Deceased : {val.dailyDeceased}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
          {props.showMoreBtn == true ? (
            <div className="more-btn">
              <Link className="link" to="/daily/all">
                More
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
}

export default DailyCases;
