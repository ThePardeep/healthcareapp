import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export const DailyLineChart = (props) => {
  const [dailyConfirmedData, setDailyConfirmedData] = useState({
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [dailyDeceasedData, setDailyDeceasedData] = useState({
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [dailyActiveData, setDailyActiveData] = useState({
    datasets: [
      {
        data: [],
      },
    ],
  });
  useEffect(() => {
    if (props.data == undefined || props.data.length == 0) {
      return;
    }
    const lineData = {
      dailyConfirmed: [],
      date: [],
      dailyRecovered: [],
      dailyDeceased: [],
    };
    props.data.forEach((element) => {
      if (lineData.dailyConfirmed.length == 40) return;

      lineData.date.push(element["date"]);
      lineData.dailyConfirmed.push(element["dailyConfirmed"]);
      lineData.dailyRecovered.push(element["dailyRecovered"]);
      lineData.dailyDeceased.push(element["dailyDeceased"]);
    });

    setDailyConfirmedData({
      labels: lineData.date.reverse(),
      datasets: [
        {
          fill: false,
          data: lineData.dailyConfirmed.reverse(),
          borderWidth: 2,
          borderCapStyle: "round",
          pointBackgroundColor: "#337ce9",
          label: "Confirmed",
          borderColor: "#337ce9",
          pointHoverRadius: 2,
        },
      ],
    });

    setDailyActiveData({
      labels: lineData.date.reverse(),
      datasets: [
        {
          fill: false,
          data: lineData.dailyRecovered.reverse(),
          borderWidth: 2,
          borderCapStyle: "round",
          pointBackgroundColor: "#49e049",
          label: "Recovered",
          borderColor: "#49e049",
          pointHoverRadius: 2,
        },
      ],
    });

    setDailyDeceasedData({
      labels: lineData.date.reverse(),
      datasets: [
        {
          fill: false,
          data: lineData.dailyDeceased.reverse(),
          borderWidth: 2,
          borderCapStyle: "round",
          pointBackgroundColor: "#000",
          label: "Deceased",
          borderColor: "#000",
          pointHoverRadius: 2,
        },
      ],
    });
  }, [props]);

  if (props.data == undefined || props.data.length == 0) {
    return <> </>;
  }

  return (
    <div className="daily-data-graph">
      <div className="daily-data-graph-header"></div>
      <div className="daily-data-graph-body">
        <Line
          data={dailyConfirmedData}
          options={{
            maintainAspectRatio: false,
          }}
        />

        <div className="dailyDeceasedDataGraph">
          <div className="grp">
            <Line
              data={dailyActiveData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>

          <div className="dailyDeceasedDataGraph">
            <div className="grp">
              <Line
                data={dailyDeceasedData}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
