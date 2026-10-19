
import React, { useState } from "react";
import "./GoldCalculator.css";

function GoldCalculator() {
  const [rates, setRates] = useState({
    "24K": 14766,
    "22K": 13535,
    "18K": 11075,
  });

  const [purity, setPurity] = useState("22K");
  const [weight, setWeight] = useState(7);
  const [making, setMaking] = useState(5);
  const [wastage, setWastage] = useState(0);
  const [gst, setGst] = useState(3);
  const [other, setOther] = useState(0);

  const rate = Number(rates[purity]) || 0;
  const goldValue = (Number(weight) || 0) * rate;
  const wastageCost = goldValue * (Number(wastage) || 0) / 100;
  const makingCost = goldValue * (Number(making) || 0) / 100;
  const subtotal = goldValue + wastageCost + makingCost;
  const gstCost = subtotal * (Number(gst) || 0) / 100;
  const total = subtotal + gstCost + (Number(other) || 0);

  const money = (amount) =>
    Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const updateRate = (key, value) => {
    setRates((prev) => ({ ...prev, [key]: value }));
  };

  const resetCalculator = () => {
    setPurity("22K");
    setWeight(7);
    setMaking(5);
    setWastage(0);
    setGst(3);
    setOther(0);
  };

  const copyEstimate = async () => {
    const receipt = `GOLD RATE CALCULATOR
Purity: ${purity}
Rate per gram: Rs. ${rate}
Weight: ${weight} g
Gold value: Rs. ${money(goldValue)}
Making charges: Rs. ${money(makingCost)}
Wastage: Rs. ${money(wastageCost)}
GST: Rs. ${money(gstCost)}
Other charges: Rs. ${money(Number(other) || 0)}
Total: Rs. ${money(total)}`;

    try {
      await navigator.clipboard.writeText(receipt);
      alert("Estimate copied!");
    } catch {
      alert(receipt);
    }
  };

  return (
    <div className="gold-app">
      <div className="gold-container">
        <header className="gold-header">
          <div className="header-content">
            <span className="brand-tag">PREMIUM GOLD CALCULATOR</span>
            <h1>Gold Rate Calculator</h1>
            <p>
              Calculate your gold value and jewellery price
              with ease.
            </p>
            <div className="location-tag">
              <span>✦</span> Kerala, India · INR (₹)
            </div>
          </div>

          <div className="header-image">
            <img
              src="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=85"
              alt="Gold bars and gold jewellery"
            />
          </div>
          <div className="header-decoration">Au</div>
        </header>

        <main className="calculator-layout">
          <section className="calculator-card">
            <div className="section-heading">
              <div>
                <span className="eyebrow">STEP 01</span>
                <h2>Today's Gold Rate</h2>
              </div>
              <span className="gold-icon">₹</span>
            </div>

            <p className="muted">
              Enter the current rates from your jewellery shop.
            </p>

            <div className="rate-grid">
              {["24K", "22K", "18K"].map((key) => (
                <div className="rate-field" key={key}>
                  <label>{key} Rate (₹/g)</label>
                  <input
                    type="number"
                    min="0"
                    value={rates[key]}
                    onChange={(e) =>
                      updateRate(key, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="section-heading second-heading">
              <div>
                <span className="eyebrow">STEP 02</span>
                <h2>Jewellery Details</h2>
              </div>
            </div>

            <label className="field-label">Gold Purity</label>
            <div className="purity-options">
              {["24K", "22K", "18K"].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={
                    purity === item
                      ? "purity-button active"
                      : "purity-button"
                  }
                  onClick={() => setPurity(item)}
                >
                  <strong>{item}</strong>
                  <span>
                    {item === "24K"
                      ? "99.9% Pure"
                      : item === "22K"
                      ? "91.6% Pure"
                      : "75% Pure"}
                  </span>
                </button>
              ))}
            </div>

            <div className="current-rate">
              <span>Selected rate per gram</span>
              <strong>₹{money(rate)}</strong>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label>Weight (grams)</label>
                <input
                  type="number"
                  min="0"
                  step="0.001"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Making Charges (%)</label>
                <input
                  type="number"
                  min="0"
                  value={making}
                  onChange={(e) => setMaking(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>Wastage (%)</label>
                <input
                  type="number"
                  min="0"
                  value={wastage}
                  onChange={(e) => setWastage(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label>GST (%)</label>
                <input
                  type="number"
                  min="0"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                />
              </div>

              <div className="form-field full-width">
                <label>Other Charges (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                />
              </div>
            </div>

            <div className="action-buttons">
              <button
                className="calculate-button"
                onClick={() =>
                  document.getElementById("gold-result")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Calculate Price ↗
              </button>
              <button
                className="reset-button"
                onClick={resetCalculator}
              >
                Reset
              </button>
            </div>
          </section>

          <aside className="result-card" id="gold-result">
            <span className="eyebrow">YOUR ESTIMATE</span>
            <h2>Estimated Jewellery Price</h2>
            <div className="total-price">
              <span>₹</span>{money(total)}
            </div>
            <p className="result-caption">
              Based on {weight || 0} grams of {purity} gold
            </p>

            <div className="result-divider" />

            <div className="result-row">
              <span>Gold Value</span>
              <strong>₹{money(goldValue)}</strong>
            </div>
            <div className="result-row">
              <span>Wastage Charges</span>
              <strong>₹{money(wastageCost)}</strong>
            </div>
            <div className="result-row">
              <span>Making Charges</span>
              <strong>₹{money(makingCost)}</strong>
            </div>
            <div className="result-row">
              <span>GST ({gst || 0}%)</span>
              <strong>₹{money(gstCost)}</strong>
            </div>
            <div className="result-row">
              <span>Other Charges</span>
              <strong>₹{money(Number(other) || 0)}</strong>
            </div>

            <div className="result-divider" />

            <div className="result-row final-row">
              <span>Total Amount</span>
              <strong>₹{money(total)}</strong>
            </div>

            <button
              className="copy-button"
              onClick={copyEstimate}
            >
              ▣ Copy Price Estimate
            </button>

            <p className="disclaimer">
              This is an estimate. Actual jewellery prices may vary
              by shop and applicable charges.
            </p>
          </aside>
        </main>

        <footer className="gold-footer">
          <span>✦</span> GOLD RATE CALCULATOR
          <span> · Made for Kerala</span>
        </footer>
      </div>
    </div>
  );
}

export default GoldCalculator;
