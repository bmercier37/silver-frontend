export default function Recommendation({ data }) {
  if (!data) return null;

  const { spreadsha_ny, goldsilverratio } = data;

  let spreadText = "";
  let ratioText = "";
  let conclusion = "";

  // Spread analysis
  if (spreadsha_ny < 5) {
    spreadText = "Physical silver markets appear balanced.";
  } else if (spreadsha_ny < 10) {
    spreadText = "Moderate physical tension is visible between Shanghai and New York.";
  } else {
    spreadText = "Strong physical tension is detected in the silver market.";
  }

  // Ratio analysis
  if (goldsilverratio < 40) {
    ratioText = "Silver is relatively expensive versus gold.";
  } else if (goldsilverratio < 60) {
    ratioText = "Gold/silver valuation is within historical norms.";
  } else {
    ratioText = "Silver appears historically undervalued relative to gold.";
  }

  // Conclusion
  if (spreadsha_ny > 10 && goldsilverratio < 40) {
    conclusion =
      "Short-term stress is high, but silver may already be priced aggressively. Risk of volatility.";
  } else if (spreadsha_ny > 10 && goldsilverratio > 60) {
    conclusion =
      "Physical stress combined with long-term undervaluation strengthens the bullish case for silver.";
  } else {
    conclusion =
      "No extreme signal detected. Market conditions remain mixed.";
  }

  return (
    <div
      style={{
        marginTop: 40,
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fafafa",
      }}
    >
      <h2>Market interpretation</h2>
      <p>{spreadText}</p>
      <p>{ratioText}</p>
      <strong>{conclusion}</strong>
    </div>
  );
}
