import React, { useEffect, useState } from "react";
import CountryWise from "./Section/CountryWise";
import StateWise from "./Section/StateWise";
import Axios from "axios";
const Main = () => {
  const [stateData, setStateData] = useState([]);
  const [stateDataError, setStateDataError] = useState({
    error: false,
  });

  useEffect(() => {
    Axios.get("/covid/get/cases/statewise")
      .then((res) => {
        if (res.data.error) {
          return;
        }
        console.log(res);
        setStateData(res.data.cases);
      })
      .catch((err) => {
        setStateDataError({
          error: true,
          msg: "Unable To Fetch Data",
        });
      });
  }, []);
  return (
    <div className="main">
      {/* First Section */}

      <CountryWise data={stateData} error={stateDataError} />
      <StateWise data={stateData} error={stateDataError} />
    </div>
  );
};

export default Main;
