import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export const Districts = (props) => {
  const [confirmedCaseData, setConfirmedCaseData] = useState({
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [deceasedCaseData, setDeceasedCaseData] = useState({
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [activeCaseData, setActiveCaseData] = useState({
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [recoveredCaseData, setRecoveredCaseData] = useState({
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
    const DistrictsData = {
      Active: [],
      Confirmed: [],
      Recovered: [],
      Deceased: [],
      DistrictName: [],
    };

    props.data.forEach((item) => {
      DistrictsData.Active.push(item["Active"]);
      DistrictsData.Confirmed.push(item["Confirmed"]);
      DistrictsData.Recovered.push(item["Recovered"]);
      DistrictsData.Deceased.push(item["Deceased"]);
      DistrictsData.DistrictName.push(item["DistrictName"]);
    });
    setActiveCaseData({
      labels: DistrictsData.DistrictName,
      datasets: [
        {
          fill: false,
          data: DistrictsData.Active,
          borderWidth: 2,
          borderCapStyle: "round",
          pointBackgroundColor: "Red",
          label: "Active",
          borderColor: "Red",
          pointHoverRadius: 2,
        },
      ],
    });
    setConfirmedCaseData({
      labels: DistrictsData.DistrictName,

      datasets: [
        {
          fill: false,
          data: DistrictsData.Confirmed,
          borderWidth: 2,
          borderCapStyle: "round",
          pointBackgroundColor: "#337ce9",
          label: "Confirmed",
          borderColor: "#337ce9",
          pointHoverRadius: 2,
        },
      ],
    });
    setDeceasedCaseData({
      labels: DistrictsData.DistrictName,

      datasets: [
        {
          fill: false,
          data: DistrictsData.Deceased,
          borderWidth: 2,
          borderCapStyle: "round",
          pointBackgroundColor: "#000",
          label: "Deceased",
          borderColor: "#000",
          pointHoverRadius: 2,
        },
      ],
    });
    setRecoveredCaseData({
      labels: DistrictsData.DistrictName,

      datasets: [
        {
          fill: false,
          data: DistrictsData.Recovered,
          borderWidth: 2,
          borderCapStyle: "round",
          pointBackgroundColor: "#49e049",
          label: "Recovered",
          borderColor: "#49e049",
          pointHoverRadius: 2,
        },
      ],
    });
  }, [props]);

  if (props.data == undefined || props.data.length == 0) {
    return <> </>;
  }
  return (
    <div className="district-data-graph">
      <div className="district-data-graph-header"></div>
      <div className="district-data-graph-body">
        <div className="districtDataGraph">
          <div className="grp">
            <Line
              data={confirmedCaseData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        <div className="districtDataGraph">
          <div className="grp">
            <Line
              data={recoveredCaseData}
              options={{
                maintainAspectRatio: false,
              }}
            />
          </div>

          <div className="districtDataGraph">
            <div className="grp">
              <Line
                data={activeCaseData}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>

          <div className="districtDataGraph">
            <div className="grp">
              <Line
                data={deceasedCaseData}
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
