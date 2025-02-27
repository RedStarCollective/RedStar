// OfflineModeController.jsx
// Component to control and visualize the offline/stealth mode functionality
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Save, AlertTriangle, Clock, Database, Download, CheckCircle, Shield, Wifi, WifiOff } from 'lucide-react';

// Main controller that handles toggling between online and offline modes
export const OfflineModeController = ({ isOfflineMode, toggleOfflineMode }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [cachedResources, setCachedResources] = useState([]);
  
  // Simulate cached resources
  useEffect(() => {
    setCachedResources([
      { id: 1, name: 'Emergency Medical Protocols', type: 'document', size: '2.3 MB', lastUpdated: '2 hours ago' },
      { id: 2, name: 'Community Defense Manual', type: 'document', size: '4.1 MB', lastUpdated: '1 day ago' },
      { id: 3, name: 'Secure Communications Guide', type: 'document', size: '1.8 MB', lastUpdated: '3 days ago' },
      { id: 4, name: 'Revolutionary Theory Basics', type: 'document', size: '3.6 MB', lastUpdated: '1 week ago' },
      { id: 5, name: 'Night City Territory Map', type: 'map', size: '5.2 MB', lastUpdated: '2 weeks ago' },
    ]);
  }, []);
  
  // Handler for resource refresh
  const handleRefreshResource = (id) => {
    // Simulate refresh
    setCachedResources(resources => 
      resources.map(resource => 
        resource.id === id 
          ? { ...resource, lastUpdated: 'just now' } 
          : resource
      )
    );
  };
  
  return (
    <div className={`border ${isOfflineMode ? 'border-green-900' : 'border-red-900'} rounded-lg overflow-hidden relative`}>
      {/* Mode toggle button */}
      <button 
        onClick={toggleOfflineMode}
        className={`w-full p-3 flex justify-between items-center font-mono ${
          isOfflineMode 
            ? 'bg-green-900/20 text-green-500' 
            : 'bg-red-900/20 text-red-500'
        }`}
      >
        <div className="flex items-center">
          {isOfflineMode ? <EyeOff size={16} className="mr-2" /> : <Eye size={16} className="mr-2" />}
          <span>{isOfflineMode ? 'STEALTH MODE ACTIVE' : 'ONLINE MODE'}</span>
        </div>
        
        <div className="flex items-center">
          {isOfflineMode ? <WifiOff size={16} className="ml-2" /> : <Wifi size={16} className="ml-2" />}
        </div>
      </button>
      
      {/* Status indicator */}
      <div className={`px-3 py-2 text-xs ${
        isOfflineMode 
          ? 'bg-green-900/10 text-green-400 border-t border-green-900/30' 
          : 'bg-red-900/10 text-red-400 border-t border-red-900/30'
      }`}>
        {isOfflineMode ? (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Shield size={14} className="mr-1" />
              <span>External connections disabled</span>
            </div>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-green-500 hover:text-green-400"
            >
              {showDetails ? 'Hide Details' : 'Show Cached Resources'}
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <AlertTriangle size={14} className="mr-1" />
              <span>Connected to Red Star network</span>
            </div>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-red-500 hover:text-red-400"
            >
              {showDetails ? 'Hide Details' : 'Available Resources'}
            </button>
          </div>
        )}
      </div>
      
      {/* Cached resources list */}
      {showDetails && (
        <div className="border-t border-gray-800 max-h-64 overflow-y-auto">
          <div className="p-2 text-xs font-mono text-gray-500 bg-black">
            {isOfflineMode 
              ? 'CACHED RESOURCES - AVAILABLE OFFLINE' 
              : 'AVAILABLE RESOURCES - SELECT TO CACHE FOR OFFLINE USE'}
          </div>
          
          <div className="divide-y divide-gray-800">
            {cachedResources.map(resource => (
              <div key={resource.id} className="p-3 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-300 font-medium flex items-center">
                    {getResourceIcon(resource.type)}
                    <span className="ml-2">{resource.name}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    <span>{resource.size}</span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" />
                      Updated {resource.lastUpdated}
                    </span>
                  </div>
                </div>
                
                <div>
                  {isOfflineMode ? (
                    <button 
                      onClick={() => handleRefreshResource(resource.id)}
                      className="px-2 py-1 bg-green-900/20 border border-green-900/50 rounded text-xs text-green-500 hover:bg-green-900/40 flex items-center"
                    >
                      <CheckCircle size={12} className="mr-1" />
                      Cached
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleRefreshResource(resource.id)}
                      className="px-2 py-1 bg-red-900/20 border border-red-900/50 rounded text-xs text-red-500 hover:bg-red-900/40 flex items-center"
                    >
                      <Download size={12} className="mr-1" />
                      Cache
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get icon based on resource type
const getResourceIcon = (type) => {
  switch(type) {
    case 'document':
      return <Save size={14} className="text-blue-500" />;
    case 'map':
      return <Database size={14} className="text-yellow-500" />;
    default:
      return <Save size={14} className="text-gray-500" />;
  }
};

// StealthModeStyleProvider.jsx
// CSS changes for the entire app when in stealth mode
export const StealthModeStyleProvider = ({ isOfflineMode, children }) => {
  if (!isOfflineMode) {
    return children;
  }
  
  return (
    <div className="stealth-mode">
      {children}
      
      {/* CSS for stealth mode - reduces colors, eliminates red, adds green security indicators */}
      <style jsx global>{`
        .stealth-mode {
          /* Override colors for stealthy appearance */
          --primary-color: #1d4a3b; /* Dark green instead of red */
          --primary-highlight: #266d59;
          --text-primary: #67a895;
          --text-secondary: #566964;
          --border-color: #1d3a31;
          --bg-primary: #121212;
          --bg-secondary: #0f0f0f;
          
          /* Apply colors to common elements */
          & button, 
          & .btn, 
          & input, 
          & select {
            transition: all 0.3s ease;
          }
          
          & button:not(.exempted),
          & .btn:not(.exempted) {
            background-color: var(--primary-color) !important;
            border-color: var(--border-color) !important;
            color: var(--text-primary) !important;
          }
          
          & input:not(.exempted),
          & select:not(.exempted) {
            border-color: var(--border-color) !important;
          }
          
          & .border-red-900 {
            border-color: var(--border-color) !important;
          }
          
          & .bg-red-900 {
            background-color: var(--primary-color) !important;
          }
          
          & .text-red-500 {
            color: var(--text-primary) !important;
          }
          
          /* Reduce animation intensity */
          & .animate-pulse {
            animation-duration: 4s !important;
            opacity: 0.7 !important;
          }
          
          /* Add opacity to decorative elements */
          & svg:not(.functional-icon) {
            opacity: 0.6 !important;
          }
          
          /* Add a subtle "stealth mode" indicator */
          &::after {
            content: 'STEALTH MODE';
            position: fixed;
            bottom: 10px;
            right: 10px;
            font-size: 10px;
            color: var(--text-primary);
            opacity: 0.3;
            font-family: monospace;
          }
        }
      `}</style>
    </div>
  );
};

// StealthModeIndicator.jsx
// A small indicator showing when stealth mode is active
export const StealthModeIndicator = ({ isOfflineMode }) => {
  if (!isOfflineMode) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center bg-green-900/20 border border-green-900 px-2 py-1 rounded-full text-green-500 text-xs animate-pulse">
      <EyeOff size={12} className="mr-1" />
      <span className="font-mono">STEALTH MODE</span>
    </div>
  );
};

export default { OfflineModeController, StealthModeStyleProvider, StealthModeIndicator };