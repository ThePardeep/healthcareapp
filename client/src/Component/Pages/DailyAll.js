import React, { useState, useEffect } from "react";
import DailyCases from "../Section/DailyCases";
import Axios from "axios";

export const DailyAll = () => {
  const [dailyData, setDailyData] = useState([]);
  const [dailyDataError, setDailyDataError] = useState({
    error: false,
  });
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
    <div className="page-container">
      <DailyCases data={dailyData} error={dailyDataError} showMoreBtn={false} />
    </div>
  );
};
