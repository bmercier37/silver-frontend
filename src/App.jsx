function App() {
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
          <p style={styles.placeholder}>
            Live data will appear here shortly.
          </p>
        </section>

        <section style={styles.card}>
          <h2>Market Indicators</h2>
          <p style={styles.placeholder}>
            Charts coming next 📈
          </p>
        </section>

        <section style={styles.card}>
          <h2>Market Interpretation</h2>
          <p style={styles.placeholder}>
            Analytical insights and recommendations will be displayed here.
          </p>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>Data source: ChinaFXTools · Updated automatically</p>
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
  placeholder: {
    color: "#777",
    marginTop: "0.5rem",
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
