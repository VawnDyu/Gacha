import { useState } from "react";

// Hooks
export const useGameState = () => {
  const [state, setState] = useState({
    gems: 1000,
    tickets: 5,
    pulls: 0,
    pityCounter: 0,
    sparkCounter: 0,
    collection: {},
    wishlist: [],
    unlockedAchievements: [],
    currentBanner: 'standard',
    lastLogin: null,
    loginStreak: 0,
    soundEnabled: true,
    skipAnimation: false
  });

  const [history, setHistory] = useState([]);
  const [ui, setUi] = useState({
    showResults: false,
    showStats: false,
    showHistory: false,
    showSettings: false,
    isAnimating: false,
    isPulling: false,
    notification: null,
    isInteracting: false,
    results: []
  });

  return { state, setState, history, setHistory, ui, setUi };
};