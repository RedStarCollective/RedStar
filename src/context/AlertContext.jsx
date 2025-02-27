import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Alert Context
const AlertContext = createContext();

// Initial sample alerts
const initialAlerts = [
  { 
    id: 1, 
    type: 'danger', 
    area: 'South Night City', 
    title: 'Militech security sweep', 
    description: 'Heavy corporate presence reported on blocks 15-22. Avoid area if possible.', 
    time: new Date(Date.now() - 900000), // 15 min ago
    read: false
  },
  { 
    id: 2, 
    type: 'warning', 
    area: 'Heywood', 
    title: 'Medical supplies needed', 
    description: 'The People\'s Clinic is low on antibiotics and bandages.', 
    time: new Date(Date.now() - 3600000), // 1 hour ago
    read: false
  },
  { 
    id: 3, 
    type: 'info', 
    area: 'Watson', 
    title: 'Night Market location', 
    description: 'Tonight\'s mutual aid distribution at the old factory on 7th.', 
    time: new Date(Date.now() - 10800000), // 3 hours ago 
    read: true
  }
];

// Provider component
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  
  // Function to add new alert
  const addAlert = (alert) => {
    const newAlert = {
      id: Date.now(),
      time: new Date(),
      read: false,
      ...alert
    };
    setAlerts(prev => [newAlert, ...prev]);
  };
  
  // Function to mark alert as read
  const markAsRead = (id) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };
  
  // Function to mark all alerts as read
  const markAllAsRead = () => {
    setAlerts(prev => 
      prev.map(alert => ({ ...alert, read: true }))
    );
  };
  
  // Function to remove an alert
  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };
  
  // Function to get unread count
  const getUnreadCount = () => {
    return alerts.filter(alert => !alert.read).length;
  };
  
  // Calculate how long ago the alert was created
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
  };
  
  // Provide the context value
  const value = {
    alerts,
    addAlert,
    markAsRead,
    markAllAsRead,
    removeAlert,
    getUnreadCount,
    timeAgo
  };
  
  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

export default AlertContext;