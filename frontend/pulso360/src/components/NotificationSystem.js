import React, { useState, useEffect } from "react";

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = "info", duration = 4000) => {
    const id = Date.now();
    const newNotification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, newNotification]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Expor função globalmente para uso em outros componentes
  useEffect(() => {
    window.showNotification = addNotification;
    return () => {
      delete window.showNotification;
    };
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success": return "✅";
      case "error": return "❌";
      case "warning": return "⚠️";
      case "info": return "ℹ️";
      default: return "💬";
    }
  };

  const getNotificationClass = (type) => {
    switch (type) {
      case "success": return "notification-success";
      case "error": return "notification-error";
      case "warning": return "notification-warning";
      case "info": return "notification-info";
      default: return "notification-default";
    }
  };

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`notification ${getNotificationClass(notification.type)}`}
        >
          <div className="notification-content">
            <span className="notification-icon">{getNotificationIcon(notification.type)}</span>
            <span className="notification-message">{notification.message}</span>
          </div>
          <button 
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}