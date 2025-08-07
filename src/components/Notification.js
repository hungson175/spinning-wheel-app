import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';
import './Notification.css';

const Notification = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (duration && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <XCircle size={20} />;
      case 'warning':
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div className={`notification notification-${type}`} role="alert" aria-live="polite">
      <div className="notification-icon">{getIcon()}</div>
      <div className="notification-message">{message}</div>
      <button 
        className="notification-close" 
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Notification;