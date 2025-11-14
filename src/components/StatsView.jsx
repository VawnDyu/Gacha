import { calculateSSRCount } from "../utils";
import Modal from "./Modal";
import { X, Star, Award } from "lucide-react";
import { ITEMS, ACHIEVEMENTS, PITY_THRESHOLD } from "../constants";

const StatsView = ({ state, onClose, ui, onWishlistToggle, onSellDuplicate }) => {
  const totalItems = Object.values(state.collection).reduce((a, b) => a + b, 0);
  const ssrCount = calculateSSRCount(state.collection);

  return (
    <Modal onClose={onClose} isInteracting={ui.isInteracting}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Statistics & Collection</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Pulls</span>
            <span className="stat-value">{state.pulls}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Items Collected</span>
            <span className="stat-value">{totalItems}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">SSR Obtained</span>
            <span className="stat-value stat-ssr">{ssrCount}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Pity Counter</span>
            <span className="stat-value stat-pity">{state.pityCounter}/{PITY_THRESHOLD}</span>
          </div>
        </div>

        <h3 className="section-title">Collection</h3>
        <div className="collection-list">
          {ITEMS.map(item => (
            <div key={item.id} className={`collection-item rarity-${item.rarity.toLowerCase()}`}>
              <div className="item-info">
                <span className="item-emoji">{item.emoji}</span>
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-rarity">{item.rarity}</span>
                </div>
              </div>
              <div className="item-actions">
                <span className="item-count">×{state.collection[item.name] || 0}</span>
                <button
                  className={`wishlist-btn ${state.wishlist.includes(item.id) ? 'active' : ''}`}
                  onClick={() => onWishlistToggle(item.id)}
                  title="Add to wishlist"
                >
                  <Star size={16} />
                </button>
                {state.collection[item.name] > 1 && (
                  <>
                    <button
                      className="sell-btn"
                      onClick={() => onSellDuplicate(item.name, 1)}
                      title="Sell 1 for gems"
                    >
                      Sell 1
                    </button>
                    {state.collection[item.name] > 2 && (
                      <button
                        className="sell-btn"
                        onClick={() => onSellDuplicate(item.name, state.collection[item.name] - 1)}
                        title="Sell all duplicates"
                      >
                        Sell {state.collection[item.name] - 1}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <h3 className="section-title">Achievements</h3>
        <div className="achievements-list">
          {ACHIEVEMENTS.map(ach => (
            <div key={ach.id} className={`achievement-item ${state.unlockedAchievements.includes(ach.id) ? 'unlocked' : ''}`}>
              <span className="ach-icon">{ach.icon}</span>
              <div className="ach-info">
                <span className="ach-name">{ach.name}</span>
                <span className="ach-desc">{ach.desc}</span>
              </div>
              <span className="ach-reward">+{ach.reward}💎</span>
              {state.unlockedAchievements.includes(ach.id) && (
                <Award className="ach-check" size={20} />
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default StatsView;