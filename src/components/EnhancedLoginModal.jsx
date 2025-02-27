// EnhancedLoginModal.jsx - Replaces the existing login modal with more authentic revolutionary security
import React, { useState, useEffect } from 'react';
import { X, Lock, Eye, EyeOff, Shield, AlertTriangle, CheckCircle, Radio, User } from 'lucide-react';

const EnhancedLoginModal = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [trustDevice, setTrustDevice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [accessLevel, setAccessLevel] = useState('mass'); // Options: mass, candidate, full
  
  // Login sequence control
  const [loginStep, setLoginStep] = useState('initial'); // initial, verifying, challenge, success, failed
  const [progressPercent, setProgressPercent] = useState(0);
  const [securityMessage, setSecurityMessage] = useState('');
  const [logs, setLogs] = useState([]);
  
  // Simulate proxy verification messages
  const verificationSteps = [
    'Establishing secure connection...',
    'Validating client fingerprint...',
    'Routing through anonymous proxy chain...',
    'Authenticating credentials...',
    'Verifying access level...',
    'Checking operational security parameters...',
    'Connection secured. Authentication complete.'
  ];
  
  // Simulate security challenge questions (for 2nd factor)
  const securityChallenges = [
    'What is the current revolutionary phase in sector 7?',
    'Provide counter-challenge response to "Aurora"',
    'Verify cadre reference: Who stands-by the eastern gate?'
  ];

  // Add log message with timestamp
  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toTimeString().substring(0, 8);
    setLogs(prev => [...prev, { message, timestamp, type }]);
  };

  // Handle login process with simulated security steps
  const handleLogin = (e) => {
    e.preventDefault();
    
    if (loginStep === 'initial') {
      // Start verification process
      setLoginStep('verifying');
      setProgressPercent(0);
      addLog('Authentication initiated', 'info');
      addLog('Randomizing connection path', 'info');
      
      // Simulate verification steps with progress
      let step = 0;
      const interval = setInterval(() => {
        if (step < verificationSteps.length) {
          setSecurityMessage(verificationSteps[step]);
          addLog(verificationSteps[step], step === verificationSteps.length - 1 ? 'success' : 'info');
          setProgressPercent(Math.floor((step + 1) / verificationSteps.length * 100));
          step++;
        } else {
          clearInterval(interval);
          
          // Once verification complete, randomly decide if additional challenge is needed
          if (accessLevel === 'full' || Math.random() > 0.6) {
            setLoginStep('challenge');
            addLog('Additional security challenge required', 'warning');
          } else {
            completeLogin();
          }
        }
      }, 700);
    } else if (loginStep === 'challenge') {
      // Simulate challenge response verification
      addLog('Verifying challenge response...', 'info');
      
      setTimeout(() => {
        addLog('Challenge verified successfully', 'success');
        completeLogin();
      }, 1500);
    }
  };
  
  // Complete login process
  const completeLogin = () => {
    setLoginStep('success');
    addLog(`Access granted - ${accessLevel.toUpperCase()} level authorization`, 'success');
    
    // Simulate final connection
    setTimeout(() => {
      onLogin(accessLevel);
    }, 1000);
  };

  // Render different content based on login step
  const renderStepContent = () => {
    switch (loginStep) {
      case 'initial':
        return (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 font-mono text-red-500">USERNAME:</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black border-2 border-red-800 rounded pl-9 pr-3 py-2 focus:outline-none focus:border-red-500 font-mono" 
                />
                <User size={16} className="absolute left-3 top-3 text-red-600" />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1 font-mono text-red-500">PASSPHRASE:</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border-2 border-red-800 rounded pl-9 pr-10 py-2 focus:outline-none focus:border-red-500 font-mono" 
                />
                <Lock size={16} className="absolute left-3 top-3 text-red-600" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            
            <div className="flex justify-between mb-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="trust-device" 
                  checked={trustDevice}
                  onChange={(e) => setTrustDevice(e.target.checked)}
                  className="mr-2 bg-black border-2 border-red-800" 
                />
                <label htmlFor="trust-device" className="text-gray-400 text-sm font-mono">TRUST_DEVICE</label>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 font-mono">ACCESS LEVEL:</span>
                <select 
                  value={accessLevel}
                  onChange={(e) => setAccessLevel(e.target.value)}
                  className="bg-black border border-red-800 rounded py-1 px-2 text-xs font-mono text-red-500"
                >
                  <option value="mass">MASS ORGANIZATION</option>
                  <option value="candidate">CANDIDATE MEMBER</option>
                  <option value="full">FULL MEMBER</option>
                </select>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-red-900 border border-red-700 hover:bg-red-800 text-white py-2 rounded font-medium font-mono flex items-center justify-center"
            >
              <Lock size={16} className="mr-2" />
              SECURE AUTHENTICATION
            </button>
          </form>
        );
      
      case 'verifying':
        return (
          <div>
            <div className="mb-4 text-center">
              <Shield size={32} className="mx-auto mb-2 text-red-500 animate-pulse" />
              <h3 className="text-red-500 font-mono text-lg">VERIFYING IDENTITY</h3>
              <p className="text-gray-400 text-sm mt-1">Establishing secure connection...</p>
            </div>
            
            <div className="mb-4">
              <div className="h-2 bg-red-900/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-600 transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center text-xs text-red-500 font-mono">{securityMessage}</div>
            </div>
            
            <div className="bg-black border border-red-900/50 rounded-lg p-2 h-32 overflow-y-auto font-mono text-xs">
              {logs.map((log, index) => (
                <div key={index} className="flex mb-1">
                  <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
                  <span className={
                    log.type === 'success' ? 'text-green-500' : 
                    log.type === 'warning' ? 'text-yellow-500' : 
                    log.type === 'error' ? 'text-red-500' : 
                    'text-gray-300'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'challenge':
        return (
          <div>
            <div className="mb-4 text-center">
              <AlertTriangle size={32} className="mx-auto mb-2 text-yellow-500" />
              <h3 className="text-yellow-500 font-mono text-lg">ADDITIONAL VERIFICATION REQUIRED</h3>
              <p className="text-gray-400 text-sm mt-1">Please answer the security challenge:</p>
            </div>
            
            <div className="mb-4 p-3 bg-black border-2 border-yellow-600 rounded-lg">
              <p className="text-yellow-500 font-mono">
                {securityChallenges[Math.floor(Math.random() * securityChallenges.length)]}
              </p>
            </div>
            
            <div className="mb-4">
              <input 
                type="text" 
                className="w-full bg-black border-2 border-yellow-800 rounded px-3 py-2 focus:outline-none focus:border-yellow-500 font-mono" 
                placeholder="Enter your response..."
              />
            </div>
            
            <div className="bg-black border border-red-900/50 rounded-lg p-2 h-24 overflow-y-auto font-mono text-xs">
              {logs.map((log, index) => (
                <div key={index} className="flex mb-1">
                  <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
                  <span className={
                    log.type === 'success' ? 'text-green-500' : 
                    log.type === 'warning' ? 'text-yellow-500' : 
                    log.type === 'error' ? 'text-red-500' : 
                    'text-gray-300'
                  }>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleLogin}
              className="w-full mt-4 bg-yellow-900 border border-yellow-700 hover:bg-yellow-800 text-white py-2 rounded font-medium font-mono"
            >
              SUBMIT RESPONSE
            </button>
          </div>
        );
      
      case 'success':
        return (
          <div className="text-center">
            <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
            <h3 className="text-green-500 font-mono text-lg mb-2">AUTHENTICATION SUCCESSFUL</h3>
            <p className="text-gray-300 mb-4">Welcome back, comrade.</p>
            
            <div className="p-2 bg-green-900/20 border border-green-900 rounded-lg mb-4">
              <div className="text-xs text-green-500 font-mono mb-1">ACCESS LEVEL GRANTED:</div>
              <div className="text-sm font-bold">
                {accessLevel === 'mass' ? 'MASS ORGANIZATION MEMBER' : 
                 accessLevel === 'candidate' ? 'CANDIDATE MEMBER' : 
                 'FULL MEMBER'}
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              Redirecting to secure interface...
            </div>
            
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        );
        
      case 'failed':
        return (
          <div className="text-center">
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-500" />
            <h3 className="text-red-500 font-mono text-lg mb-2">AUTHENTICATION FAILED</h3>
            <p className="text-gray-300 mb-4">Security protocols prevent further attempts from this location.</p>
            
            <button 
              onClick={() => setLoginStep('initial')}
              className="w-full bg-red-900 border border-red-700 hover:bg-red-800 text-white py-2 rounded font-medium font-mono"
            >
              RESET AUTHENTICATION
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-black border-2 border-red-900 rounded-lg max-w-md w-full p-6 relative">
        {/* Close button only visible on initial step */}
        {loginStep === 'initial' && (
          <button 
            onClick={onClose} 
            className="absolute top-3 right-3 text-red-500 hover:text-red-400"
          >
            <X size={20} />
          </button>
        )}
        
        <h2 className="text-xl font-mono text-red-500 font-bold mb-6 text-center flex items-center justify-center">
          <Lock size={20} className="mr-2" />
          [ SECURE_ACCESS_PROTOCOL ]
        </h2>
        
        <div className="mb-4 font-mono text-xs text-gray-500 border border-gray-800 bg-black p-2 rounded flex justify-between">
          <div>
            <Radio size={12} className="inline mr-1 text-red-500" />
            <span>SIGNAL_STRENGTH: OPTIMAL</span>
          </div>
          <div>
            <Lock size={12} className="inline mr-1 text-green-500" />
            <span className="text-green-500">ENCRYPTED</span>
          </div>
        </div>
        
        {renderStepContent()}
        
        {loginStep === 'initial' && (
          <div className="mt-6 text-center text-xs text-red-500 font-mono">
            ALL_CONNECTIONS_MONITORED_FOR_SECURITY
          </div>
        )}
      </div>
    </div>
  );
};

// MembershipAccess.jsx - Component to display current access level
export const MembershipAccess = ({ level = 'public' }) => {
  // Define styling and text based on access level
  const config = {
    public: { 
      color: 'gray', 
      icon: <Users size={14} />, 
      text: 'PUBLIC ACCESS',
      description: 'General information available to all comrades'
    },
    mass: { 
      color: 'blue', 
      icon: <Users size={14} />, 
      text: 'MASS ORGANIZATION ACCESS',
      description: 'Resource coordination and reporting access'
    },
    candidate: { 
      color: 'yellow', 
      icon: <Shield size={14} />, 
      text: 'CANDIDATE MEMBER ACCESS',
      description: 'Direct action coordination and secure communications'
    },
    full: { 
      color: 'red', 
      icon: <Star size={14} />, 
      text: 'FULL MEMBER ACCESS',
      description: 'Unrestricted access to all revolutionary resources'
    }
  };
  
  const { color, icon, text, description } = config[level] || config.public;
  
  return (
    <div className={`p-2 bg-${color}-900/20 border border-${color}-900/50 rounded-lg flex items-center`}>
      <div className={`w-8 h-8 bg-${color}-900/50 rounded-full flex items-center justify-center text-${color}-500 mr-3`}>
        {icon}
      </div>
      <div>
        <div className={`text-${color}-500 font-mono text-sm font-bold`}>{text}</div>
        <div className="text-xs text-gray-400">{description}</div>
      </div>
    </div>
  );
};

export default EnhancedLoginModal;