import { useEffect, useCallback, useMemo } from 'react';
import { Sparkles, RotateCcw, TrendingUp, History, Settings } from 'lucide-react';
import { ITEMS, BANNERS, ACHIEVEMENTS, SELL_VALUES, STORAGE_KEY, PITY_THRESHOLD, SPARK_THRESHOLD } from './constants';
import { saveToStorage, loadFromStorage, playSound, calculateSSRCount } from './utils';
import { performGacha } from './gachaLogic';
import { useGameState } from './hooks';
import './App.css';

// Components
import StatsView  from './components/StatsView';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import ResultsScreen from './components/ResultsScreen';

function App() {
  const { state, setState, history, setHistory, ui, setUi } = useGameState();

  // Save game state
  const saveGame = useCallback((updates) => {
    setState(prev => {
      const newState = { ...prev, ...updates };
      saveToStorage({ ...newState, history });
      return newState;
    });
  }, [history, setState]);

  // Load game on mount
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
      setState(prev => ({
        ...prev,
        gems: saved.gems || 1000,
        tickets: saved.tickets || 5,
        pulls: saved.pulls || 0,
        pityCounter: saved.pityCounter || 0,
        sparkCounter: saved.sparkCounter || 0,
        collection: saved.collection || {},
        wishlist: saved.wishlist || [],
        unlockedAchievements: saved.unlockedAchievements || [],
        currentBanner: saved.currentBanner || 'standard',
        lastLogin: saved.lastLogin,
        loginStreak: saved.loginStreak || 0,
        soundEnabled: saved.soundEnabled !== false,
        skipAnimation: saved.skipAnimation || false
      }));
      setHistory(saved.history || []);

      // Handle daily login
      const today = new Date().toDateString();
      if (!saved.lastLogin) {
        const initialData = { ...saved, lastLogin: today, loginStreak: 1 };
        saveToStorage(initialData);
        setState(prev => ({ ...prev, lastLogin: today, loginStreak: 1 }));
      } else if (saved.lastLogin !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = saved.lastLogin === yesterday ? (saved.loginStreak || 0) + 1 : 1;
        const reward = {
          gems: 100 + (newStreak * 10),
          tickets: Math.floor(newStreak / 3)
        };

        const newGems = saved.gems + reward.gems;
        const newTickets = saved.tickets + reward.tickets;

        setState(prev => ({
          ...prev,
          gems: newGems,
          tickets: newTickets,
          loginStreak: newStreak,
          lastLogin: today
        }));

        setTimeout(() => {
          setUi(prev => ({ ...prev, notification: `Day ${newStreak} Login! +${reward.gems}💎 ${reward.tickets > 0 ? `+${reward.tickets}🎫` : ''}` }));
          setTimeout(() => setUi(prev => ({ ...prev, notification: null })), 3000);
        }, 500);

        saveToStorage({ ...saved, gems: newGems, tickets: newTickets, lastLogin: today, loginStreak: newStreak });
      }
    } else {
      const today = new Date().toDateString();
      const initialData = { ...state, lastLogin: today, loginStreak: 1 };
      saveToStorage(initialData);
      setState(prev => ({ ...prev, lastLogin: today, loginStreak: 1 }));
    }
  }, []);

  const showNotification = useCallback((message) => {
    setUi(prev => ({ ...prev, isInteracting: true, notification: message }));
    setTimeout(() => {
      setUi(prev => ({ ...prev, notification: null, isInteracting: false }));
    }, 3000);
  }, [setUi]);

  const checkAchievements = useCallback((newPulls, newCollection) => {
    const ssrCount = calculateSSRCount(newCollection);
    const uniqueItems = Object.keys(newCollection).length;

    ACHIEVEMENTS.forEach(ach => {
      if (state.unlockedAchievements.includes(ach.id)) return;

      let meetsReq = false;
      if (ach.type === "ssr") meetsReq = ssrCount >= ach.req;
      else if (ach.type === "unique") meetsReq = uniqueItems >= ach.req;
      else if (ach.type === "lucky") meetsReq = newPulls <= ach.req && ssrCount >= 1;
      else if (ach.type === "streak") meetsReq = state.loginStreak >= ach.req;
      else meetsReq = newPulls >= ach.req;

      if (meetsReq) {
        showNotification(`🏆 Achievement Unlocked: ${ach.name}! +${ach.reward}💎`);
        setState(prev => ({
          ...prev,
          gems: prev.gems + ach.reward,
          unlockedAchievements: [...prev.unlockedAchievements, ach.id]
        }));
      }
    });
  }, [state.unlockedAchievements, state.loginStreak, setState, showNotification]);

  const handlePull = useCallback((count, useTicket = false) => {
    const cost = count === 1 ? 100 : 900;

    if (useTicket && state.tickets < count) {
      showNotification("Not enough tickets!");
      return;
    }

    if (!useTicket && state.gems < cost) {
      showNotification("Not enough gems!");
      return;
    }

    playSound('pull', state.soundEnabled);
    setUi(prev => ({ ...prev, isPulling: true, isAnimating: true }));

    const newGems = useTicket ? state.gems : state.gems - cost;
    const newTickets = useTicket ? state.tickets - count : state.tickets;

    let newPity = state.pityCounter;
    let newSpark = state.sparkCounter + count;
    const newResults = [];

    for (let i = 0; i < count; i++) {
      newPity++;
      const isPityPull = newPity >= PITY_THRESHOLD;
      const isSparkPull = newSpark >= SPARK_THRESHOLD && i === count - 1;

      const result = performGacha(state.currentBanner, state.wishlist, isPityPull, isSparkPull);

      if (result.rarity === "SSR") {
        newPity = 0;
        playSound('ssr', state.soundEnabled);
      }
      if (isSparkPull) newSpark = 0;

      newResults.push(result);
    }

    const newCollection = { ...state.collection };
    newResults.forEach(r => {
      newCollection[r.name] = (newCollection[r.name] || 0) + 1;
    });

    const newPulls = state.pulls + count;
    const newHistory = [
      { results: newResults, timestamp: Date.now(), banner: state.currentBanner },
      ...history
    ].slice(0, 30);

    setState(prev => ({
      ...prev,
      gems: newGems,
      tickets: newTickets,
      pulls: newPulls,
      pityCounter: newPity,
      sparkCounter: newSpark,
      collection: newCollection
    }));
    setHistory(newHistory);
    saveToStorage({ ...state, gems: newGems, tickets: newTickets, pulls: newPulls, pityCounter: newPity, sparkCounter: newSpark, collection: newCollection, history: newHistory });

    checkAchievements(newPulls, newCollection);

    const delay = state.skipAnimation ? 100 : 1500;
    setTimeout(() => {
      playSound('reveal', state.soundEnabled);
      setUi(prev => ({ ...prev, isPulling: false, showResults: true, isAnimating: false, results: newResults }));
    }, delay);
  }, [state, history, setState, setHistory, setUi, showNotification, checkAchievements]);

  const toggleWishlist = useCallback((itemId) => {
    setState(prev => {
      const updated = prev.wishlist.includes(itemId)
        ? prev.wishlist.filter(id => id !== itemId)
        : [...prev.wishlist, itemId];
      saveToStorage({ ...prev, wishlist: updated, history });
      return { ...prev, wishlist: updated };
    });
  }, [history, setState]);

  const sellDuplicate = useCallback((itemName, count = 1) => {
    const item = ITEMS.find(i => i.name === itemName);
    if (!item || !state.collection[itemName] || state.collection[itemName] < count) return;

    const value = SELL_VALUES[item.rarity] * count;

    setState(prev => {
      const updated = { ...prev.collection };
      updated[itemName] -= count;
      if (updated[itemName] <= 0) delete updated[itemName];

      const newState = { ...prev, collection: updated, gems: prev.gems + value };
      saveToStorage({ ...newState, history });
      return newState;
    });

    showNotification(`Sold ${count}x ${itemName} for ${value}💎`);
  }, [state.collection, history, setState, showNotification]);

  const toggleSetting = useCallback((setting) => {
    setState(prev => {
      const newState = { ...prev, [setting]: !prev[setting] };
      saveToStorage({ ...newState, history });
      return newState;
    });
  }, [history, setState]);

  const resetGame = useCallback(() => {
    if (window.confirm('Reset all progress? This cannot be undone!')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  }, []);

  const currentBannerData = useMemo(() =>
    BANNERS.find(b => b.id === state.currentBanner),
    [state.currentBanner]
  );

  if (ui.showResults) {
    return <ResultsScreen results={ui.results} onClose={() => setUi(prev => ({ ...prev, showResults: false }))} />;
  }

  return (
    <div className="app">
      {ui.notification && <div className="notification">{ui.notification}</div>}
      {ui.showStats && <StatsView state={state} onClose={() => setUi(prev => ({ ...prev, showStats: false }))} ui={ui} onWishlistToggle={toggleWishlist} onSellDuplicate={sellDuplicate} />}
      {ui.showHistory && <HistoryView history={history} onClose={() => setUi(prev => ({ ...prev, showHistory: false }))} ui={ui} />}
      {ui.showSettings && <SettingsView state={state} onClose={() => setUi(prev => ({ ...prev, showSettings: false }))} onToggleSetting={toggleSetting} ui={ui} />}

      {ui.isPulling && (
        <div className="pulling-overlay">
          <div className="pulling-animation">
            <Sparkles className="sparkle-icon rotating" size={80} />
            <h2 className="pulling-text">Summoning...</h2>
          </div>
        </div>
      )}

      <div className="main-container">
        <div className="game-card">
          <div className="header">
            <Sparkles className="header-icon" size={40} />
            <h1>Gacha</h1>
            <p className="subtitle">Collect rare items from different banners</p>
          </div>

          <div className="banner-selector">
            {BANNERS.map(banner => (
              <button
                key={banner.id}
                className={`banner-btn ${state.currentBanner === banner.id ? 'active' : ''}`}
                onClick={() => saveGame({ currentBanner: banner.id })}
              >
                {banner.name}
              </button>
            ))}
          </div>

          <div className="currency-display">
            <div className="currency-item">
              <span className="currency-label">Gems</span>
              <span className="currency-value">💎 {state.gems}</span>
            </div>
            <div className="currency-item">
              <span className="currency-label">Tickets</span>
              <span className="currency-value">🎫 {state.tickets}</span>
            </div>
          </div>

          <div className="counters-grid">
            <div className="counter-card">
              <span className="counter-label">Total Pulls</span>
              <span className="counter-value">{state.pulls}</span>
            </div>
            <div className="counter-card">
              <span className="counter-label">Pity</span>
              <span className="counter-value pity">{state.pityCounter}/{PITY_THRESHOLD}</span>
            </div>
            <div className="counter-card">
              <span className="counter-label">Spark</span>
              <span className="counter-value spark">{state.sparkCounter}/{SPARK_THRESHOLD}</span>
            </div>
            <div className="counter-card">
              <span className="counter-label">Streak</span>
              <span className="counter-value streak">{state.loginStreak} days</span>
            </div>
          </div>

          <div className="pull-buttons">
            <button
              onClick={() => handlePull(1)}
              disabled={ui.isAnimating || state.gems < 100}
              className="pull-btn primary"
            >
              {ui.isAnimating ? 'Pulling...' : 'Pull 1x (100 💎)'}
            </button>

            <button
              onClick={() => handlePull(10)}
              disabled={ui.isAnimating || state.gems < 900}
              className="pull-btn featured"
            >
              {ui.isAnimating ? 'Pulling...' : 'Pull 10x (900 💎)'}
            </button>

            <button
              onClick={() => handlePull(1, true)}
              disabled={ui.isAnimating || state.tickets < 1}
              className="pull-btn ticket"
            >
              Use Ticket (1🎫)
            </button>
          </div>

          <div className="action-buttons">
            <button onClick={() => setUi(prev => ({ ...prev, showStats: true }))} className="action-btn">
              <TrendingUp size={18} />
              Stats
            </button>
            <button onClick={() => setUi(prev => ({ ...prev, showHistory: true }))} className="action-btn">
              <History size={18} />
              History
            </button>
            <button onClick={() => setUi(prev => ({ ...prev, showSettings: true }))} className="action-btn">
              <Settings size={18} />
              Settings
            </button>
            <button onClick={resetGame} className="action-btn danger">
              <RotateCcw size={18} />
              Reset
            </button>
          </div>

          <div className="info-section">
            <p className="info-text">Banner Rates: SSR {(currentBannerData.rates.SSR * 100).toFixed(1)}% | SR {(currentBannerData.rates.SR * 100).toFixed(1)}% | R {(currentBannerData.rates.R * 100).toFixed(1)}%</p>
            <p className="info-highlight">🎯 Guaranteed SSR at {PITY_THRESHOLD} pulls | ⚡ Wishlist item at {SPARK_THRESHOLD} pulls</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;