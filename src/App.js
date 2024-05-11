import React, { useState } from "react";
import "./AgentFeeCalculator.css";

function AgentFeeCalculator() {
  const [finalPurchasePrice, setFinalPurchasePrice] = useState("");
  const [minimumAllowed, setMinimumAllowed] = useState("");
  const [constantAmount, setConstantAmount] = useState("");
  const [ratio, setRatio] = useState("");
  const [agentFee, setAgentFee] = useState("");

  function calculateAgentFee(
    finalPurchasePrice,
    minimumAllowed,
    constantAmount,
    ratio
  ) {
    if (finalPurchasePrice === minimumAllowed) {
      return constantAmount;
    } else if (finalPurchasePrice > minimumAllowed) {
      const difference = finalPurchasePrice - minimumAllowed;
      return constantAmount + difference * ratio;
    } else {
      return "Error: Final purchase price cannot be less than the minimum allowed.";
    }
  }

  const calculateFee = () => {
    if (!finalPurchasePrice || !minimumAllowed || !constantAmount || !ratio) {
      alert("Please fill in all fields.");
      return;
    }

    const fee = calculateAgentFee(
      parseFloat(finalPurchasePrice),
      parseFloat(minimumAllowed),
      parseFloat(constantAmount),
      parseFloat(ratio)
    );
    setAgentFee(fee);
  };

  return (
    <div className="agent-fee-calculator">
      <span>
        This calculator serves both real estate agents and clients by enabling
        fair distribution of profits. The fundamental premise is that the
        selling price alone does not necessarily equate to fair profit sharing
        for clients, as they could be experiencing losses or may have varying
        expectations. Therefore, these calculations offer a novel approach to
        determining agent commission, ensuring equitable outcomes for all
        parties involved in real estate transactions.
      </span>
      <h1>Progressive Scale Real Estate Agent Fee Calculator</h1>
      <div className="input-group">
        <label>Minimum Sales Price:</label>
        <input
          type="number"
          value={minimumAllowed}
          onChange={(e) => setMinimumAllowed(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Final Purchase Price:</label>
        <input
          type="number"
          value={finalPurchasePrice}
          onChange={(e) => setFinalPurchasePrice(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Fixed Amount Agent Gets Regardless of Sales Price:</label>
        <input
          type="number"
          value={constantAmount}
          onChange={(e) => setConstantAmount(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Progressive scale ratio (0 to 1):</label>
        <input
          type="number"
          step="0.01"
          value={ratio}
          onChange={(e) => setRatio(e.target.value)}
        />
      </div>
      <button className="calculate-button" onClick={calculateFee}>
        Calculate Commission
      </button>
      {agentFee && (
        <p className="agent-fee">Selling Agent Commission: ${agentFee}</p>
      )}
    </div>
  );
}

export default AgentFeeCalculator;
