import { useMemo } from "react";
import { X } from "lucide-react";

const ResultsScreen = ({ results, onClose }) => {
  const stats = useMemo(() => {
    return results.reduce((acc, r) => {
      acc[r.rarity] = (acc[r.rarity] || 0) + 1;
      return acc;
    }, {});
  }, [results]);

  return (
    <div className="app">
      <div className="results-container">
        <div className="results-header">
          <div>
            <h2>Pull Results</h2>
            <div className="results-stats">
              {Object.entries(stats).map(([rarity, count]) => (
                <span key={rarity} className={`result-stat rarity-${rarity.toLowerCase()}`}>
                  {rarity}: {count}
                </span>
              ))}
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="results-grid">
          {results.map((result, idx) => (
            <div
              key={idx}
              className={`result-card rarity-${result.rarity.toLowerCase()}`}
              style={{ animationDelay: `${idx * 0.08}s` }}
            >
              <div className="result-emoji">{result.emoji}</div>
              <div className="result-name">{result.name}</div>
              <div className="result-rarity">{result.rarity}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;