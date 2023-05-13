import React, { useState, useEffect } from "react";
import "./App.css";

import coin from './img/10kcoins.png';
import burger from './img/burger.png';
import salad from './img/salad.png';
import sandwich from './img/sandwich.png';
import fallenangelwing from './img/fallenangelwing.png';
import angelwing from './img/angelwing.png';
import crystalbow from './img/crystalbow.png';
import holyblade from './img/holyblade.png';
import demonhuntersword from './img/demonhuntersword.png';
import excalibur from './img/excalibur.png';

const rarities = ["SSR", "SR", "R", "N"];

const items = [
  { name: "Excalibur", rarity: rarities[0], probability: 0.01, imageUrl: excalibur },
  { name: "Demon Hunter Sword", rarity: rarities[0], probability: 0.01, imageUrl: demonhuntersword },
  { name: "Holy Blade", rarity: rarities[0], probability: 0.01, imageUrl: holyblade },
  { name: "Crystal Bow", rarity: rarities[1], probability: 0.05, imageUrl: crystalbow },
  { name: "Angel Wing", rarity: rarities[1], probability: 0.05, imageUrl: angelwing },
  { name: "Fallen Angel Wing", rarity: rarities[1], probability: 0.05, imageUrl: fallenangelwing },
  { name: "Sandwich", rarity: rarities[2], probability: 0.2, imageUrl: sandwich },
  { name: "Salad", rarity: rarities[2], probability: 0.2, imageUrl: salad },
  { name: "Burger", rarity: rarities[2], probability: 0.2, imageUrl: burger },
  { name: "10,000 Coins", rarity: rarities[3], probability: 0.74, imageUrl: coin },
];


function App() {
  const [pulls, setPulls] = useState(0);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [tenPulls, setTenPulls] = useState(false);

  useEffect(() => {
    const savedPullCount = localStorage.getItem('pulls');
    if (savedPullCount) {
      setPulls(parseInt(savedPullCount));
    }
  }, []);
  
  const handlePull = () => {
    setPulls(pulls + 1);
    localStorage.setItem('pulls', pulls + 1);
    const result = gacha();
    setResults([result]);
    setShowResults(true);
    setTenPulls(false);
  };

  const handleTenPulls = () => {
    setPulls(pulls + 10);
    localStorage.setItem('pulls', pulls + 10);
    const results = [];
    for (let i = 0; i < 10; i++) {
      const result = gacha();
      results.push(result);
    }
    setResults(results);
    setShowResults(true);
    setTenPulls(true);
  };

  const gacha = () => {
    const rand = Math.random();
    let probAcc = 0;
    for (let i = 0; i < items.length; i++) {
      probAcc += items[i].probability;
      if (rand < probAcc) {
        return items[i];
      }
    }
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="button-container">
          {!showResults && (
            <div>
              <h1>Gacha</h1>
              <p>Pulls: {pulls}</p>
              <button className="pull-button" onClick={handlePull}>Pull 1x</button>
              <button className="pull-button" style={{ marginLeft: '10px' }} onClick={handleTenPulls}>Pull 10x</button>
            </div>
          )}
        </div>
        {showResults && (
          <div className="results-container">
            {results.map((result, index) => (
              <div key={index} className="result-item">
                <img src={result.imageUrl} alt={result.name} />
                <h3>{result.name}</h3>
                <p>Rarity: {result.rarity}</p>
              </div>
            ))}
            <div>
              <button className="close-button" onClick={handleCloseResults}>Close</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;