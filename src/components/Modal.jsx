
const Modal = ({ children, onClose, isInteracting }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isInteracting) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      {children}
    </div>
  );
};

export default Modal;