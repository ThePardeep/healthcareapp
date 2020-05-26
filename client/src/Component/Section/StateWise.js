import React, { useState, useEffect } from "react";
import Card from "../Helper/Card";
import { Link } from "react-router-dom";
import { IsLoading } from "../Helper/IsLoading";
function StateWise(props) {
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
      let data = [];

      props.data.forEach((val, index) => {
        if (val.State != "Total" && index < 5) {
          data.push(val);
        } else {
          return;
        }
      });
      setData(data);
      setIsLoading(false);
    } else if (props.error.error) {
      setError(props.error);
    }
  }, [props]);
  return (
    <section className="secondSec" style={{ marginTop: "20px" }}>
      <div className="firstSec">
        <div className="heading">
          <h4>StateWise Cases</h4>
        </div>
        <hr className="hr-style" />
      </div>
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
                  if (val.State == "Total") {
                    return <></>;
                  }
                  return (
                    <div
                      key={ind}
                      style={{
                        margin: "10px",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      <Card
                        data={val}
                        error={isError.error}
                        isLoading={isLoading}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        <div className="more-btn">
          <Link className="link" to="/state/all">
            More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default StateWise;
