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
        const values = data.map((d) => d.silverny);
        const values = data.map((d) => d.silversha);
        
        setChartData({
          labels,
          datasets: [
            {
              label: "Silver – NY & SHA (USD/oz)",
              data: values,
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
              callback: (value) => `${value}$`,
            },
          },
        },
      }}
    />
  );
}
