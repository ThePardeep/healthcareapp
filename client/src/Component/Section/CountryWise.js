import React, { useState, useEffect } from "react";
import indiaSvg from "../../Public/Images/india.svg";
const CountryWise = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState({ error: false });
  const [totalCases, setTotalCases] = useState([]);
  useEffect(() => {
    if (props.data.length > 0 && props.error.error === false) {
      let tc = {};
      for (let index = 0; index < props.data.length; index++) {
        const element = props.data[index];

        if (element["State"] == "Total") {
          tc = element;
          break;
        }
      }

      setIsLoading(false);
      setTotalCases(tc);
    }

    if (props.error.error) {
      setError(props.error);
      setIsLoading(false);
    }
  }, [props]);
  return (
    <section className="firstSec">
      <div className="heading">
        <h4>Total Cases</h4>
      </div>
      <hr className="hr-style" />
      <div className="body">
        <div className="country-svg">
          <img src={indiaSvg} />
        </div>
        <div className="data">
          {isLoading === true ? (
            <>
              <p>isLoading</p>{" "}
            </>
          ) : (
            <>
              {isError.error === true ? (
                <>
                  <p>{isError.msg}</p>
                </>
              ) : (
                <>
                  <div className="left">
                    <div className="cd">
                      {/* cd = cases data 
                    tc : total confirmed*/}
                      <div className="tc">
                        <div></div>
                        <h4>Total Confirmed : {totalCases.Confirmed}</h4>
                      </div>
                      <div className="ta">
                        <div></div>
                        <h4>Total Active : {totalCases.Active}</h4>
                      </div>

                      <div className="tr">
                        <div></div>
                        <h4>Total Recovered : {totalCases.Recovered}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="cd">
                      {/* cd = cases data 
                    tc : total confirmed*/}

                      <div className="td">
                        <div></div>
                        <h4>Total Deaths : {totalCases.Deaths}</h4>
                      </div>
                      <div className="cs">
                        <div></div>
                        <h4>State : {totalCases.State}</h4>
                      </div>

                      <div className="lu">
                        <div></div>
                        <h4>Last Updated : {totalCases.lastUpdatedTime}</h4>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CountryWise;
