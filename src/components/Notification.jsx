import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

/**
 * Notification / Toast Component
 * Displays transient success and error alerts.
 */
export default function Notification({ notification, onDismiss }) {
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3500);

    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const isSuccess = notification.type !== 'error';

  return (
    <div className="toast-container" aria-live="polite">
      <div className={`toast ${isSuccess ? 'toast-success' : 'toast-error'}`}>
        <div className="toast-icon">
          {isSuccess ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
        </div>
        <div className="toast-message" style={{ flex: 1 }}>
          {notification.message}
        </div>
        <button
          onClick={onDismiss}
          className="action-icon-btn"
          aria-label="Dismiss notification"
          style={{ width: '24px', height: '24px' }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
