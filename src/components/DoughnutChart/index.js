import React from "react";
import { Doughnut } from "react-chartjs-2";
import { ContainerPie } from "./style";

const PieChart = ({ inputData }) => {
  const data = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: ["pink", "rgb(49, 161, 242)", "red"],
        borderColor: "#2c405a",
        data: [65, 59, 80],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,

    legend: {
      labels: {
        fontColor: "#fff",
        fontSize: 12,
      },
    },
  };

  return (
    <ContainerPie>
      <header>
        <h2>Portifólio</h2>
      </header>

      <div>
        <Doughnut data={data} options={options} />
      </div>
    </ContainerPie>
  );
};

export default PieChart;
