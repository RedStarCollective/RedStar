import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Map, 
  Bell, 
  Check, 
  X, 
  Eye, 
  Plus, 
  Radio, 
  Shield,
  MessageSquare 
} from 'lucide-react';
import { useAlerts } from './AlertContext';

const AlertsOverview = ({ maxAlerts = 3, showControls = true }) => {
  const { 
    alerts, 
    addAlert, 
    markAsRead, 
    markAllAsRead, 
    removeAlert, 
    getUnreadCount, 
    timeAgo 
  } = useAlerts();
  
  const [showAddAlertModal, setShowAddAlertModal] = useState(false);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  
  const [newAlert, setNewAlert] = useState({
    type: 'info',
    area: '',
    title: '',
    description: ''
  });
  
  // Get the appropriate display elements based on alert type
  const getAlertStyles = (type) => {
    switch(type) {
      case 'danger':
        return {
          icon: <AlertTriangle size={20} className="text-red-500" />,
          borderClass: 'border-red-700',
          bgClass: 'bg-red-900/10'
        };
      case 'warning':
        return {
          icon: <AlertTriangle size={20} className="text-yellow-500" />,
          borderClass: 'border-yellow-700',
          bgClass: 'bg-yellow-900/10'
        };
      case 'info':
      default:
        return {
          icon: <Radio size={20} className="text-blue-500" />,
          borderClass: 'border-blue-700',
          bgClass: 'bg-blue-900/10'
        };
    }
  };
  
  // Handle adding a new alert
  const handleAddAlert = () => {
    if (newAlert.title && newAlert.area) {
      addAlert(newAlert);
      setNewAlert({
        type: 'info',
        area: '',
        title: '',
        description: ''
      });
      setShowAddAlertModal(false);
    }
  };
  
  // Get alerts to display based on showAll flag
  const displayAlerts = showAllAlerts 
    ? alerts 
    : alerts.slice(0, maxAlerts);

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-mono text-red-500 font-bold flex items-center">
          <Bell size={20} className="mr-2" />
          [ COMMUNITY_ALERTS ]
          {getUnreadCount() > 0 && (
            <span className="ml-2 bg-red-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getUnreadCount()}
            </span>
          )}
        </h2>
        
        {showControls && (
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowAddAlertModal(true)}
              className="px-3 py-1 bg-red-900 border border-red-700 rounded text-white text-xs hover:bg-red-800 font-mono flex items-center"
            >
              <Plus size={14} className="mr-1" />
              REPORT
            </button>
            
            <button 
              onClick={() => setShowAllAlerts(!showAllAlerts)}
              className="px-3 py-1 bg-black border border-red-900 rounded text-red-500 text-xs hover:bg-red-900/20 font-mono flex items-center"
            >
              <Eye size={14} className="mr-1" />
              {showAllAlerts ? 'SHOW_LESS' : 'VIEW_ALL'}
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-3">
        {displayAlerts.length > 0 ? (
          displayAlerts.map(alert => {
            const styles = getAlertStyles(alert.type);
            
            return (
              <div 
                key={alert.id} 
                className={`p-4 rounded-lg border ${styles.borderClass} ${styles.bgClass} ${!alert.read ? 'border-l-4' : ''}`}
              >
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">{styles.icon}</div>
                    <div>
                      <h3 className={`font-mono font-bold ${
                        alert.type === 'danger' ? 'text-red-500' : 
                        alert.type === 'warning' ? 'text-yellow-500' : 
                        'text-blue-500'
                      }`}>{alert.title}</h3>
                      <div className="text-sm opacity-80 mb-2 font-mono flex items-center">
                        <Map size={12} className="inline mr-1" />
                        {alert.area}
                      </div>
                      <p className="text-sm text-gray-300">{alert.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end ml-2">
                    <span className="text-xs opacity-70 font-mono">{timeAgo(alert.time)}</span>
                    
                    <div className="flex mt-2 space-x-1">
                      {!alert.read && (
                        <button 
                          className="p-1 text-green-500 hover:bg-green-900/20 rounded" 
                          onClick={() => markAsRead(alert.id)}
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button 
                        className="p-1 text-red-500 hover:bg-red-900/20 rounded" 
                        onClick={() => removeAlert(alert.id)}
                        title="Dismiss alert"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-6 border border-red-900/30 rounded-lg">
            <Bell size={24} className="mx-auto mb-2 text-red-500 opacity-50" />
            <p className="text-gray-500">No current alerts</p>
          </div>
        )}
      </div>
      
      {showControls && alerts.length > 0 && (
        <div className="mt-3 text-right">
          <button 
            onClick={markAllAsRead}
            className="text-xs text-red-500 hover:text-red-400 font-mono"
          >
            <Check size={12} className="inline mr-1" />
            MARK_ALL_AS_READ
          </button>
        </div>
      )}
      
      {/* Add Alert Modal */}
      {showAddAlertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-black border-2 border-red-900 rounded-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setShowAddAlertModal(false)} 
              className="absolute top-3 right-3 text-red-500 hover:text-red-400"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-xl font-mono text-red-500 font-bold mb-4">REPORT_SITUATION</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">ALERT_TYPE</label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    className={`p-2 rounded flex flex-col items-center ${
                      newAlert.type === 'info' 
                        ? 'bg-blue-900/30 border border-blue-700' 
                        : 'bg-black border border-gray-700 hover:bg-blue-900/10'
                    }`}
                    onClick={() => setNewAlert({...newAlert, type: 'info'})}
                  >
                    <Radio size={20} className="text-blue-500 mb-1" />
                    <span className="text-xs">Information</span>
                  </button>
                  
                  <button 
                    className={`p-2 rounded flex flex-col items-center ${
                      newAlert.type === 'warning' 
                        ? 'bg-yellow-900/30 border border-yellow-700' 
                        : 'bg-black border border-gray-700 hover:bg-yellow-900/10'
                    }`}
                    onClick={() => setNewAlert({...newAlert, type: 'warning'})}
                  >
                    <Shield size={20} className="text-yellow-500 mb-1" />
                    <span className="text-xs">Warning</span>
                  </button>
                  
                  <button 
                    className={`p-2 rounded flex flex-col items-center ${
                      newAlert.type === 'danger' 
                        ? 'bg-red-900/30 border border-red-700' 
                        : 'bg-black border border-gray-700 hover:bg-red-900/10'
                    }`}
                    onClick={() => setNewAlert({...newAlert, type: 'danger'})}
                  >
                    <AlertTriangle size={20} className="text-red-500 mb-1" />
                    <span className="text-xs">Danger</span>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">TITLE</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({...newAlert, title: e.target.value})}
                  placeholder="Brief description of situation"
                />
              </div>
              
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">LOCATION</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700"
                  value={newAlert.area}
                  onChange={(e) => setNewAlert({...newAlert, area: e.target.value})}
                  placeholder="Area or specific location"
                />
              </div>
              
              <div>
                <label className="block text-xs text-red-500 font-mono mb-1">DETAILS</label>
                <textarea 
                  className="w-full bg-black border border-red-900 rounded p-2 text-sm focus:outline-none focus:border-red-700 h-24"
                  value={newAlert.description}
                  onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                  placeholder="Detailed description of the situation"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  onClick={() => setShowAddAlertModal(false)}
                  className="px-4 py-2 border border-red-900 text-red-500 rounded hover:bg-red-900/20"
                >
                  CANCEL
                </button>
                <button 
                  onClick={handleAddAlert}
                  className="px-4 py-2 bg-red-900 border border-red-700 text-white rounded hover:bg-red-800"
                  disabled={!newAlert.title || !newAlert.area}
                >
                  <Radio size={16} className="mr-1 inline" />
                  TRANSMIT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsOverview;