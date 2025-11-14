import Modal from "./Modal";
import { X, Volume2, VolumeX, Zap, Sparkles, } from "lucide-react";

const SettingsView = ({ state, onClose, onToggleSetting, ui }) => (
  <Modal onClose={onClose} isInteracting={ui.isInteracting}>
    <div className="modal-content small">
      <div className="modal-header">
        <h2>Settings</h2>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Sound Effects</span>
            <span className="setting-desc">Enable pull sound effects</span>
          </div>
          <button
            className={`toggle-btn ${state.soundEnabled ? 'active' : ''}`}
            onClick={() => onToggleSetting('soundEnabled')}
          >
            {state.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-name">Skip Animations</span>
            <span className="setting-desc">Show results instantly</span>
          </div>
          <button
            className={`toggle-btn ${state.skipAnimation ? 'active' : ''}`}
            onClick={() => onToggleSetting('skipAnimation')}
          >
            {state.skipAnimation ? <Zap size={20} /> : <Sparkles size={20} />}
          </button>
        </div>
      </div>
    </div>
  </Modal>
);

export default SettingsView;