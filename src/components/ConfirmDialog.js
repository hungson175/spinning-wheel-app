import React from 'react';
import './ConfirmDialog.css';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Xác nhận', cancelText = 'Hủy' }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-overlay" onClick={onCancel} role="dialog" aria-modal="true" aria-labelledby="dialog-title">
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h2 id="dialog-title" className="confirm-title">{title}</h2>
        <p className="confirm-message">{message}</p>
        <div className="confirm-buttons">
          <button 
            className="confirm-button confirm-button-cancel" 
            onClick={onCancel}
            aria-label={cancelText}
          >
            {cancelText}
          </button>
          <button 
            className="confirm-button confirm-button-confirm" 
            onClick={onConfirm}
            aria-label={confirmText}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;