import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "../Helper/Card";
import { IsLoading } from "../Helper/IsLoading";

const AllState = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState({ error: false });
  const [data, setStateData] = useState([]);

  useEffect(() => {
    Axios.get("/covid/get/cases/statewise")
      .then((res) => {
        if (res.data.error) {
          setError(res.data);
          setIsLoading(false);
          return;
        }
        setStateData(res.data.cases);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          error: true,
          msg: "Unable To Fetch Data",
        });
      });
  }, []);
  return (
    <div className="all-state">
      <div className="heading">
        <h4>States</h4>
      </div>
      <hr className="hr-style" />
      <div className="body" style={{ textAlign: "center" }}>
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
                {data.map((val, index) => {
                  if (val.State == "Total") {
                    return <></>;
                  }
                  return (
                    <div
                      key={val._id}
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
      </div>
    </div>
  );
};

export default AllState;
