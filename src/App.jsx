import { useEffect, useState } from "react";
import SpreadChart from "./components/SpreadChart";
import SilverChartNY from "./components/SilverChartNY";
import GoldSilverRatioChart from "./components/GoldSilverRatioChart";
import Recommendation from "./Recommendation";

// Fonction sécurisée pour afficher des nombres
function safeFixed(value, decimals = 2) {
  return value != null ? value.toFixed(decimals) : "—";
}

function App() {
  const [error, setError] = useState(null);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    fetch("https://silver-backend-real.onrender.com/api/latest", {
      cache: "no-store"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("LATEST DATA:", data); // 👈 DEBUG IMPORTANT
        if (!data.error) {
          setLatest(data);
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        console.error("API latest error", err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Silver Market Tensions</h1>
        <p style={styles.subtitle}>
          Monitoring global silver market dislocations
        </p>
      </header>

      <main style={styles.main}>
        <section style={styles.card}>
          <h2>Latest Market Snapshot</h2>

          {error && <p style={styles.error}>Error: {error}</p>}

          {!latest && !error && (
            <p style={styles.placeholder}>Loading market data…</p>
          )}

          {latest && (
            <ul style={styles.list}>
              <li><strong>Silver NY:</strong> {safeFixed(latest.silverNY)} USD/oz</li>
              <li><strong>Silver London:</strong> {safeFixed(latest.silverLondon)} USD/oz</li>
              <li><strong>Silver Shanghai:</strong> {safeFixed(latest.silverSHA)} USD/oz</li>
              <li><strong>Gold NY:</strong> {safeFixed(latest.goldNY)} USD/oz</li>
              <li><strong>Gold/Silver Ratio:</strong> {safeFixed(latest.goldSilverRatio)}</li>
              <li><strong>Shanghai–NY Spread:</strong> {safeFixed(latest.spreadSHA_NY)} %</li>
            </ul>
          )}
        </section>

        <section style={styles.card}>
          <h2>Silver – New York</h2>
          <SilverChartNY />
        </section>

        <section style={styles.card}>
          <h2>Shanghai – New York Spread</h2>
          <SpreadChart />
        </section>

        <section style={styles.card}>
          <h2>Gold/Silver ratio</h2>
          <GoldSilverRatioChart />
        </section>

        <section style={styles.card}>
          <h2>Market Interpretation</h2>
          {latest ? (
            <Recommendation data={latest} />
          ) : (
            <p style={styles.placeholder}>Loading market analysis…</p>
          )}
        </section>
      </main>

      <footer style={styles.footer}>
        <p>
          Data source: ChinaFXTools · Last update{" "}
          {latest ? new Date(latest.timestamp).toUTCString() : "—"}
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    color: "#000",
    backgroundColor: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "2rem 1.5rem",
    borderBottom: "1px solid #eaeaea",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 600,
  },
  subtitle: {
    marginTop: "0.5rem",
    color: "#555",
  },
  main: {
    flex: 1,
    padding: "2rem 1.5rem",
    maxWidth: "900px",
    width: "100%",
    margin: "0 auto",
    display: "grid",
    gap: "1.5rem",
  },
  card: {
    border: "1px solid #eaeaea",
    borderRadius: "8px",
    padding: "1.5rem",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
    lineHeight: "1.8",
  },
  placeholder: {
    color: "#777",
  },
  error: {
    color: "red",
  },
  footer: {
    padding: "1rem 1.5rem",
    borderTop: "1px solid #eaeaea",
    fontSize: "0.85rem",
    color: "#666",
    textAlign: "center",
  },
};

export default App;
