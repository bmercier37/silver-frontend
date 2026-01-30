import { useEffect, useState } from "react";
import { fetchLatest, fetchHistory } from "./api";
import "./styles.css";

export default function App() {
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetchLatest().then(setLatest);
  }, []);

  if (!latest) return <p className="loading">Loading…</p>;

  return (
    <div className="container">
      <h1>Silver market tensions</h1>

      <div className="card">
        <p><strong>Silver NY:</strong> {latest.silverNY.toFixed(2)}</p>
        <p><strong>Silver London:</strong> {latest.silverLondon.toFixed(2)}</p>
        <p><strong>Silver Shanghai:</strong> {latest.silverSHA.toFixed(2)}</p>
        <p><strong>Gold NY:</strong> {latest.goldNY.toFixed(2)}</p>
        <p><strong>Gold/Silver ratio:</strong> {latest.goldSilverRatio.toFixed(2)}</p>
        <p><strong>Shanghai spread:</strong> {latest.spreadSHA_NY.toFixed(2)}%</p>
      </div>

      <div className="recommendation">
        {latest.spreadSHA_NY > 10
          ? "⚠️ Elevated arbitrage tension between Shanghai and NY markets."
          : "✅ Markets appear relatively balanced."}
      </div>
    </div>
  );
}
