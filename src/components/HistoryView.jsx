import Modal from "./Modal";
import { X } from "lucide-react";
import { BANNERS } from "../constants";

const HistoryView = ({ history, onClose, ui }) => (
  <Modal onClose={onClose} isInteracting={ui.isInteracting}>
    <div className="modal-content">
      <div className="modal-header">
        <h2>Pull History</h2>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {history.length === 0 ? (
        <p className="empty-message">No pull history yet</p>
      ) : (
        <div className="history-list">
          {history.map((pull, idx) => (
            <div key={idx} className="history-item">
              <div className="history-header">
                <span className="history-time">{new Date(pull.timestamp).toLocaleString()}</span>
                <span className="history-banner">{BANNERS.find(b => b.id === pull.banner)?.name}</span>
              </div>
              <div className="history-results">
                {pull.results.map((result, i) => (
                  <div key={i} className={`history-result rarity-${result.rarity.toLowerCase()}`}>
                    <span className="result-emoji">{result.emoji}</span>
                    <span className="result-rarity">{result.rarity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </Modal>
);

export default HistoryView;