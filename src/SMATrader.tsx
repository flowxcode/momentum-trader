import React, { useState, useCallback } from "react";

type Signal = "BUY" | "SELL" | "HOLD";

interface ISMATraderProps {
  period: number; // Number of periods for calculating SMA
}

const SMATrader: React.FC<ISMATraderProps> = ({ period }) => {
  const [priceData, setPriceData] = useState<number[]>([]);
  const [signals, setSignals] = useState<Signal[]>([]);

  // Function to add a new period item
  const addNewPeriodItem = useCallback(() => {
    setPriceData((prevPriceData) => [
      ...prevPriceData,
      Math.floor(Math.random() * 100) + 1,
    ]);
  }, []);

  // Calculate SMA
  const calculateSMA = useCallback((data: number[]): number => {
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
  }, []);

  // Effect to generate signals based on updated priceData
  React.useEffect(() => {
    if (priceData.length >= period) {
      const newSignals: Signal[] = [];
      for (let i = period; i <= priceData.length; i++) {
        const slice = priceData.slice(i - period, i);
        const currentSMA = calculateSMA(slice);
        const previousPrice = priceData[i - 1];
        const currentPrice = priceData[i] ?? previousPrice;

        if (currentPrice > currentSMA && previousPrice <= currentSMA) {
          newSignals.push("BUY");
        } else if (currentPrice < currentSMA && previousPrice >= currentSMA) {
          newSignals.push("SELL");
        } else {
          newSignals.push("HOLD");
        }
      }

      setSignals(newSignals);
    }
  }, [priceData, period, calculateSMA]);

  return (
    <div>
      <button onClick={addNewPeriodItem}>Add New Period Item</button>
      <ul>
        {signals.map((signal, index) => (
          <li key={index}>{signal}</li>
        ))}
      </ul>
    </div>
  );
};

export default SMATrader;
