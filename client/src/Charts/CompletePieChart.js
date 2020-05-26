import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";

export const CompletePieChart = (props) => {
  if (props.data == undefined || props.data.length == 0) {
    return <> </>;
  }
  const data = {
    datasets: [
      {
        data: props.data || [1, 1, 1, 1],
        hoverBackgroundColor: ["#337ce9", "#49e049", "#ec3023", "#000"],
        backgroundColor: ["#809dee", "#cbf36d", "#d16e3f", "#000"],
      },
    ],
    labels: ["Confirmed ", "Recovered", "Active", "Dead"],
  };

  return (
    <div style={{ display: "inline-block" }} className="doughnut-chart">
      <Doughnut data={data} height={300} width={300} />
    </div>
  );
};
