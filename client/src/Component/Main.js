import React, { useEffect, useState } from "react";
import CountryWise from "./Section/CountryWise";
import StateWise from "./Section/StateWise";
import Axios from "axios";
import Search from "./Layout/Search";
import DailyCases from "./Section/DailyCases";

const Main = () => {
  const [stateData, setStateData] = useState([]);
  const [stateDataError, setStateDataError] = useState({
    error: false,
  });

  const [dailyData, setDailyData] = useState([]);
  const [dailyDataError, setDailyDataError] = useState({
    error: false,
  });

  useEffect(() => {
    Axios.get("/covid/get/cases/statewise")
      .then((res) => {
        if (res.data.error) {
          return;
        }

        setStateData(res.data.cases);
      })
      .catch((err) => {
        setStateDataError({
          error: true,
          msg: "Unable To Fetch Data",
        });
      });
  }, []);

  useEffect(() => {
    Axios.get("/covid/get/daily/cases")
      .then((res) => {
        if (res.data.error) {
          setDailyDataError({
            error: true,
            msg: "Unable To Fetch Data",
          });
          return;
        }

        setDailyData(res.data.cases.reverse());
      })
      .catch((err) => {
        setDailyDataError({
          error: true,
          msg: "Unable To Fetch Data",
        });
      });
  }, []);
  return (
    <div className="main">
      {/* First Section */}

      <CountryWise data={stateData} error={stateDataError} />
      <DailyCases
        data={dailyData.slice(0, 4)}
        error={dailyDataError}
        showMoreBtn={true}
      />
      <StateWise data={stateData} error={stateDataError} />
    </div>
  );
};

export default Main;
