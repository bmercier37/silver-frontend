import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

export default function SpreadChart() {
  const [chartData, setChartData] = useState(null);


  useEffect(() => {
    fetch("https://silver-backend-real.onrender.com/api/history")
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((d) =>
          new Date(d.timestamp).toLocaleDateString()
        );
        const spreadsha = data.map((d) => d.spreadsha_ny);
        const spreadde = data.map((d) => d.spreadde_ny);

        setChartData({
          labels,
          datasets: [
            {
              label: "Shanghai – NY Spread (%)",
              data: spreadsha,
              borderColor: "red",
              backgroundColor: "red",
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 2,
            },
            {
              label: "DE – NY Spread (%)",
              data: spreadde,
              borderColor: "black",
              backgroundColor: "black",
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 2,
            },
          ],
        });
      })
      .catch((err) => console.error("Chart fetch error", err));
  }, []);

  if (!chartData) {
    return <p style={{ color: "#777" }}>Loading spread chart…</p>;
  }

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `${value}%`,
            },
          },
        },
      }}
    />
  );
}
