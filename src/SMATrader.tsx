import React, { useState } from "react";

type Signal = "BUY" | "SELL" | "HOLD";

interface ISMATraderProps {
  period: number; // Number of periods for calculating SMA
}

const SMATrader: React.FC<ISMATraderProps> = ({ period }) => {
  const [signals, setSignals] = useState<Signal[]>([]);

  // Generate random price data
  const generateRandomData = (num: number): number[] => {
    return Array.from(
      { length: num },
      () => Math.floor(Math.random() * 100) + 1
    );
  };

  // Calculate SMA
  const calculateSMA = (data: number[]): number => {
    const sum = data.reduce((a, b) => a + b, 0);
    return sum / data.length;
  };

  // Generate signals based on SMA
  const tradeSMA = () => {
    const priceData = generateRandomData(40); // Generate 100(40 test) random prices
    const signals: Signal[] = [];

    for (let i = period; i < priceData.length; i++) {
      const slice = priceData.slice(i - period, i);
      const currentSMA = calculateSMA(slice);
      const previousPrice = priceData[i - 1];
      const currentPrice = priceData[i];

      if (currentPrice > currentSMA && previousPrice <= currentSMA) {
        signals.push("BUY");
      } else if (currentPrice < currentSMA && previousPrice >= currentSMA) {
        signals.push("SELL");
      } else {
        signals.push("HOLD");
      }
    }

    setSignals(signals);
  };

  return (
    <div>
      <button onClick={tradeSMA}>Generate Trading Signals</button>
      <ul>
        {signals.map((signal, index) => (
          <li key={index}>{signal}</li>
        ))}
      </ul>
    </div>
  );
};

export default SMATrader;
