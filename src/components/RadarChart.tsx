// src/components/RadarChart.tsx

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData } from "chart.js";
import { Radar } from "react-chartjs-2";
import { attributeLabels } from "./chart.config";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  data: number[];
}

export default function RadarChart({ data }: RadarChartProps) {
  const chartData: ChartData<"radar"> = {
    labels: attributeLabels,
    datasets: [
      {
        label: "Fingerprint Score",
        data: data,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(255, 255, 255)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.2)" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
        pointLabels: { color: "#A0A0A0", font: { size: 12 } },
        ticks: { color: "#111111", backdropColor: "#111111", stepSize: 2 },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: { display: false },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return <Radar data={chartData} options={options} />;
}
