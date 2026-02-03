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

export default function SilverChartNY() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("https://silver-backend-real.onrender.com/api/history")
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((d) =>
          new Date(d.timestamp).toLocaleDateString()
        );

        const silverNY = data.map((d) => d.silverny);
        const silverSHA = data.map((d) => d.silversha);
        const silverIN = data.map((d) => d.silverin);
        const silverDE = data.map((d) => d.silverde);

        setChartData({
          labels,
          datasets: [
            {
              label: "Silver NY (USD/oz)",
              data: silverNY,
              borderColor: "blue",
              backgroundColor: "blue",
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 2,
            },
            {
              label: "Silver DE (USD/oz)",
              data: silverDE,
              borderColor: "black",
              backgroundColor: "black",
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 2,
            },
             {
              label: "Silver IN (USD/oz)",
              data: silverIN,
              borderColor: "orange",
              backgroundColor: "orange",
              borderWidth: 2,
              tension: 0.3,
              pointRadius: 2,
            },
            {
              label: "Silver Shanghai (USD/oz)",
              data: silverSHA,
              borderColor: "red",
              backgroundColor: "red",
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
    return <p style={{ color: "#777" }}>Loading silver chart…</p>;
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
              callback: (value) => `${value}$`,
            },
          },
        },
      }}
    />
  );
}
