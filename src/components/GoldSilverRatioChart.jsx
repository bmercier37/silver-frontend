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

export default function GoldSilverRatioChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch("https://silver-backend-real.onrender.com/api/history")
      .then((res) => res.json())
      .then((data) => {
        const labels = data.map((d) =>
          new Date(d.timestamp).toLocaleDateString()
        );


            function fillZeroWithPrevious(values) {
      let lastValid = null;
    
        return values.map((v) => {
        if (v && v > 0) {
          lastValid = v;
          return v;
        }
        return lastValid;
      });
    }

const values = fillZeroWithPrevious(data.map((d) => d.goldsilverratio));

        setChartData({
          labels,
          datasets: [
            {
              label: "Gold / Silver Ratio",
              data: values,
              borderColor: "yellow",
              backgroundColor: "yellow",
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
    return <p style={{ color: "#777" }}>Loading gold/silver ratio…</p>;
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
              callback: (value) => value.toFixed(1),
            },
          },
        },
      }}
    />
  );
}
