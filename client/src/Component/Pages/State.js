import React, { useEffect, useState } from "react";
import Axios from "axios";
import { IsLoading } from "../Helper/IsLoading";
import { Link } from "react-router-dom";
export const State = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState({ error: false });
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  let state = "";
  useEffect(() => {
    const { location } = props.props;
    const search = location.search.split("=");

    if (search.length == 2 && search[1] != "") {
      state = search[1].replace(/_/g, " ");

      Axios.post("/covid/get/cases/state/districts", { state })
        .then((res) => {
          setIsLoading(false);
          if (res.data.error) {
            setError(res.data);
            return;
          }
          if (res.data.districtData.length > 0) {
            setDistrictData(res.data.districtData[0].Districts);
          } else {
          }
          setStateData(res.data.stateData[0]);
        })
        .catch((err) => {
          setIsLoading(false);
          setError({
            error: true,
            msg: "Unable To Fetch Data",
          });
        });
    } else {
      setIsLoading(false);
      setError({
        error: true,
        msg: "State Not Found",
      });
    }
  }, []);
  return (
    <div className="page-container">
      {isLoading == true ? (
        <div className="loading">
          <IsLoading isLoading={isLoading} />
        </div>
      ) : (
        <>
          {isError.error == true ? (
            <>
              <p className="error">{isError.msg}</p>
            </>
          ) : (
            <div className="state-data">
              <div className="heading">
                <h4>{stateData.State}</h4>
              </div>
              <hr className="hr-style" />
              <div className="body">
                <div className="sd1">
                  <div className="left">
                    <div className="cd">
                      {/* cd = cases data 
                    tc : total confirmed*/}
                      <div className="tc">
                        <div></div>
                        <h4>Total Confirmed : {stateData.Confirmed}</h4>
                      </div>
                      <div className="ta">
                        <div></div>
                        <h4>Total Active : {stateData.Active}</h4>
                      </div>

                      <div className="tr">
                        <div></div>
                        <h4>Total Recovered : {stateData.Recovered}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="cd">
                      {/* cd = cases data 
                    tc : total confirmed*/}

                      <div className="td">
                        <div></div>
                        <h4>Total Deaths : {stateData.Deaths}</h4>
                      </div>
                      <div className="cs">
                        <div></div>
                        <h4>State : {stateData.State}</h4>
                      </div>

                      <div className="lu">
                        <div></div>
                        <h4>Last Updated : {stateData.lastUpdatedTime}</h4>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="district-data">
                  <div className="heading">
                    <h4>Districts Data</h4>
                  </div>
                  <hr className="hr-style" />

                  {districtData.length > 0 ? (
                    <>
                      {districtData.map((item) => {
                        let url = "";
                        if (stateData.State != undefined) {
                          url = `state=${stateData.State.replace(
                            /\s/g,
                            "_"
                          )}?district=${item.DistrictName.replace(/\s/g, "_")}`;
                        }
                        return (
                          <div className="district" key={item._id}>
                            <div className="dis">
                              <div
                                className="card c"
                                style={{ display: "inline-block" }}
                              >
                                <div className="card-header">
                                  <h4>{item.DistrictName}</h4>
                                </div>
                                <div className="card-body">
                                  <p>
                                    <b>Active :</b>
                                    {item.Active}
                                  </p>
                                  <p>
                                    <b>Confirmed :</b>
                                    {item.Confirmed}
                                  </p>
                                  <p>
                                    <b>Recovered :</b>
                                    {item.Recovered}
                                  </p>

                                  <p>
                                    <b>Deceased :</b>
                                    {item.Deceased}
                                  </p>
                                  <>
                                    {stateData.State == "Punjab" &&
                                    stateData.State != "" ? (
                                      <>
                                        <Link
                                          className="hos-link"
                                          to={`/hospitals?${url}`}
                                        >
                                          Search Hospital
                                        </Link>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                  {item.Notes == "" ? (
                                    <></>
                                  ) : (
                                    <p
                                      style={{
                                        marginLeft: "4px",
                                        marginRight: "4px",
                                      }}
                                    >
                                      <b>Nots :</b>
                                      {item.Notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <p className="error">District Data Not Available</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
