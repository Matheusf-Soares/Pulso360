import React from 'react';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  icon = "✅", 
  type = "success", 
  confirmText = "OK", 
  showCancel = false, 
  cancelText = "Cancelar", 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getModalClass = () => {
    switch (type) {
      case "success": return "modal-success";
      case "error": return "modal-error";
      case "warning": return "modal-warning";
      case "info": return "modal-info";
      default: return "modal-default";
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`confirmation-modal ${getModalClass()}`}>
        <div className="modal-header">
          <div className="modal-icon">
            {icon}
          </div>
          <h3 className="modal-title">{title}</h3>
        </div>
        
        <div className="modal-body">
          <p className="modal-message">{message}</p>
        </div>
        
        <div className="modal-actions">
          {showCancel && (
            <button className="btn-outline" onClick={handleCancel}>
              {cancelText}
            </button>
          )}
          <button className="btn-primary" onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;