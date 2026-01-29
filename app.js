const API = "https://silver-backend-652w.onrender.com";

async function loadData() {
  const latest = await fetch(`${API}/api/latest`).then(r => r.json());
  const history = await fetch(`${API}/api/history`).then(r => r.json());

  document.getElementById("values").innerHTML = `
    <p>Silver NY: ${latest.silver_ny.toFixed(2)}</p>
    <p>Silver London: ${latest.silver_london.toFixed(2)}</p>
    <p>Silver Shanghai: ${latest.silver_sha.toFixed(2)}</p>
    <p>Silver India: ${latest.silver_ind.toFixed(2)}</p>
    <p>Gold/Silver Ratio: ${latest.gold_silver_ratio.toFixed(2)}</p>
    <p>Spread SHA/NY: ${latest.spread_sha_ny.toFixed(2)}%</p>
    <p>Spread IND/NY: ${latest.spread_ind_ny.toFixed(2)}%</p>
  `;

  const labels = history.map(d => d.timestamp);

  new Chart(document.getElementById("spreadChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "SHA/NY", data: history.map(d => d.spread_sha_ny) },
        { label: "IND/NY", data: history.map(d => d.spread_ind_ny) }
      ]
    }
  });

  new Chart(document.getElementById("ratioChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        { label: "Gold/Silver Ratio", data: history.map(d => d.gold_silver_ratio) }
      ]
    }
  });
}

loadData();

