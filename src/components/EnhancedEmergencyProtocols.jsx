// EnhancedEmergencyProtocols.jsx
// Adds activation workflow and evacuation route visualization
import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, Shield, Users, MapPin, Radio, Clock, 
  Check, CheckCircle, X, Heart, Zap, Lock, User, Database,
  Download, Eye, EyeOff, ArrowRight, Phone, Map, Home, 
  LogOut, Monitor, Layers, Crosshair, MessageSquare, Loader
} from 'lucide-react';

// Protocol Activation component - simulates the multi-step activation process
export const ProtocolActivation = ({ protocol, isActive, onCancel, onComplete }) => {
  const [activationStep, setActivationStep] = useState('verification');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [verificationStatus, setVerificationStatus] = useState('Initiating security checks...');
  const [authCode, setAuthCode] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [logs, setLogs] = useState([]);
  
  // Add log entry with timestamp 
  const addLog = (message, level = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, message, level }]);
  };
  
  // Initialize activation sequence
  useEffect(() => {
    if (isActive && activationStep === 'verification') {
      addLog('Protocol activation sequence initiated', 'warning');
      addLog(`Protocol: ${protocol.name}`, 'info');
      
      // Simulate verification process
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setVerificationProgress(progress);
        
        // Update status messages at different stages
        if (progress === 20) {
          setVerificationStatus('Verifying authorization credentials...');
          addLog('Security check: Initiated', 'info');
        } else if (progress === 40) {
          setVerificationStatus('Scanning for surveillance...');
          addLog('Surveillance scan: Clear', 'success');
        } else if (progress === 60) {
          setVerificationStatus('Preparing encrypted channels...');
          addLog('Encrypted channels: Ready', 'success');
        } else if (progress === 80) {
          setVerificationStatus('Confirming protocol availability...');
          addLog('Protocol status: Available', 'success');
        } else if (progress >= 100) {
          clearInterval(interval);
          setVerificationStatus('Verification complete. Authorization required.');
          addLog('Verification complete - Awaiting authorization', 'warning');
          setActivationStep('authorization');
        }
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isActive, protocol, activationStep]);
  
  // Handle countdown for final confirmation
  useEffect(() => {
    if (activationStep === 'confirmation' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [activationStep, countdown]);
  
  // Handle authorization code submission
  const handleAuthorization = () => {
    addLog('Authorization code submitted', 'info');
    addLog('Validating authorization...', 'info');
    
    // Simulate authorization check (always succeeds in demo)
    setTimeout(() => {
      addLog('Authorization successful', 'success');
      setActivationStep('confirmation');
    }, 1500);
  };
  
  // Handle final confirmation
  const handleConfirmation = () => {
    addLog('Final confirmation received', 'warning');
    addLog('PROTOCOL ACTIVATION IN PROGRESS', 'alert');
    
    // Simulate activation process
    setTimeout(() => {
      addLog('PROTOCOL ACTIVATED', 'alert');
      onComplete();
    }, 1500);
  };
  
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-red-900 rounded-lg w-full max-w-lg">
        {/* Protocol header */}
        <div className="p-4 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
          <div className="flex items-center">
            <AlertTriangle size={20} className="text-red-500 mr-2" />
            <h3 className="font-mono text-red-500 font-bold">PROTOCOL ACTIVATION</h3>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs text-red-500 font-mono animate-pulse mr-2">
              {activationStep === 'confirmation' ? 'FINAL CONFIRMATION' : 
              activationStep === 'authorization' ? 'AUTHORIZATION REQUIRED' : 
              'VERIFICATION IN PROGRESS'}
            </span>
            <button 
              onClick={onCancel}
              className="p-1 rounded hover:bg-red-900/30 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Protocol information summary */}
          <div className="mb-4 p-3 border border-red-900/50 bg-black rounded-lg">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                {protocol.category === 'security' ? <Shield size={24} className="text-red-500" /> :
                 protocol.category === 'health' ? <Heart size={24} className="text-green-500" /> :
                 protocol.category === 'logistics' ? <Database size={24} className="text-yellow-500" /> :
                 <Radio size={24} className="text-blue-500" />}
              </div>
              <div>
                <h4 className="font-bold text-red-500 mb-1">{protocol.name}</h4>
                <p className="text-sm text-gray-300 mb-1">{protocol.description}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  <span>Last tested: {new Date(protocol.lastTested).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step content based on current activation step */}
          {activationStep === 'verification' && (
            <div>
              <div className="text-center mb-4">
                <Loader size={32} className="mx-auto mb-2 text-red-500 animate-spin" />
                <h4 className="font-mono text-red-500 mb-1">SECURITY VERIFICATION</h4>
                <p className="text-sm text-gray-400">{verificationStatus}</p>
              </div>
              
              {/* Progress bar */}
              <div className="mb-4">
                <div className="h-2 bg-red-900/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600 transition-all duration-300"
                    style={{ width: `${verificationProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          {activationStep === 'authorization' && (
            <div>
              <div className="text-center mb-4">
                <Lock size={32} className="mx-auto mb-2 text-yellow-500" />
                <h4 className="font-mono text-yellow-500 mb-1">AUTHORIZATION REQUIRED</h4>
                <p className="text-sm text-gray-400">Enter authorization code to proceed</p>
              </div>
              
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="AUTHORIZATION CODE"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  className="w-full bg-black border-2 border-yellow-900 rounded p-2 text-center text-yellow-500 font-mono focus:outline-none focus:border-yellow-700"
                />
              </div>
              
              <div className="mb-4 flex space-x-2">
                <button
                  onClick={handleAuthorization}
                  disabled={!authCode}
                  className={`flex-1 p-2 rounded border ${authCode ? 'bg-yellow-900/30 border-yellow-700 text-yellow-500 hover:bg-yellow-900/50' : 'bg-gray-900/30 border-gray-700 text-gray-500'} flex items-center justify-center font-mono`}
                >
                  <Lock size={16} className="mr-2" />
                  SUBMIT AUTHORIZATION
                </button>
              </div>
            </div>
          )}
          
          {activationStep === 'confirmation' && (
            <div>
              <div className="text-center mb-4">
                <AlertTriangle size={48} className="mx-auto mb-2 text-red-500 animate-pulse" />
                <h4 className="font-mono text-red-500 mb-1 text-lg">FINAL CONFIRMATION</h4>
                <p className="text-sm text-gray-300 mb-3">
                  This will immediately activate <span className="font-bold">{protocol.name}</span> across all RSC operations.
                </p>
                <div className="p-2 bg-red-900/20 border border-red-900 rounded-lg text-white text-sm">
                  Confirm activation to initiate emergency response protocols
                </div>
              </div>
              
              <div className="mb-4 flex space-x-2">
                <button
                  onClick={onCancel}
                  className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded text-gray-400 hover:bg-gray-800 flex items-center justify-center font-mono"
                >
                  <X size={16} className="mr-2" />
                  CANCEL
                </button>
                
                <button
                  onClick={handleConfirmation}
                  className="flex-1 p-2 bg-red-900 border border-red-700 rounded text-white hover:bg-red-800 flex items-center justify-center font-mono"
                >
                  <Zap size={16} className="mr-2" />
                  CONFIRM ACTIVATION{countdown > 0 ? ` (${countdown})` : ''}
                </button>
              </div>
            </div>
          )}
          
          {/* Activity log */}
          <div>
            <div className="text-xs text-gray-500 mb-1 font-mono">ACTIVATION_LOG:</div>
            <div className="h-32 overflow-y-auto p-2 bg-black border border-red-900/30 rounded-lg text-xs font-mono">
              {logs.map((log, index) => (
                <div key={index} className="mb-1">
                  <span className="text-gray-500">[{log.time}]</span>
                  <span className={`ml-2 ${
                    log.level === 'success' ? 'text-green-500' : 
                    log.level === 'warning' ? 'text-yellow-500' : 
                    log.level === 'alert' ? 'text-red-500 font-bold' : 
                    'text-gray-300'
                  }`}>
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// EvacuationRouteMap - Component to visualize evacuation routes
export const EvacuationRouteMap = ({ protocol }) => {
  const [showMap, setShowMap] = useState(false);
  
  if (!protocol) return null;
  
  return (
    <div className="mb-4">
      <button
        onClick={() => setShowMap(!showMap)}
        className="w-full p-2 bg-red-900/20 border border-red-900/50 rounded flex items-center justify-center text-red-500 hover:bg-red-900/30 mb-2"
      >
        <Map size={16} className="mr-2" />
        {showMap ? 'HIDE EVACUATION ROUTES' : 'VIEW EVACUATION ROUTES'}
      </button>
      
      {showMap && (
        <div className="border border-red-900 rounded-lg overflow-hidden">
          <div className="p-2 bg-red-900/30 border-b border-red-700 font-mono text-xs text-red-500">
            EVACUATION ROUTES: {protocol.name}
          </div>
          
          <div className="p-4 bg-black relative h-64">
            {/* Background map - simplified Night City grid */}
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 text-gray-800">
              {/* Grid pattern */}
              <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.2" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid-pattern)" />
              
              {/* Main roads */}
              <path d="M 0 30 L 100 30" stroke="#444" strokeWidth="1" />
              <path d="M 0 50 L 100 50" stroke="#444" strokeWidth="1" />
              <path d="M 0 70 L 100 70" stroke="#444" strokeWidth="1" />
              <path d="M 30 0 L 30 100" stroke="#444" strokeWidth="1" />
              <path d="M 50 0 L 50 100" stroke="#444" strokeWidth="1" />
              <path d="M 70 0 L 70 100" stroke="#444" strokeWidth="1" />
              
              {/* Major landmarks */}
              <rect x="45" y="45" width="10" height="10" fill="#331a1a" stroke="#662222" strokeWidth="0.5" />
              <text x="50" y="52" textAnchor="middle" fill="#aa3333" fontSize="3">RSC HQ</text>
              
              {/* Protocol-specific map features */}
              {protocol.category === 'security' && (
                <>
                  {/* Security checkpoints */}
                  <circle cx="30" cy="30" r="2" fill="#882222" />
                  <circle cx="30" cy="70" r="2" fill="#882222" />
                  <circle cx="70" cy="30" r="2" fill="#882222" />
                  <circle cx="70" cy="70" r="2" fill="#882222" />
                </>
              )}
              
              {protocol.category === 'health' && (
                <>
                  {/* Medical stations */}
                  <rect x="25" y="25" width="5" height="5" fill="#224422" stroke="#448822" strokeWidth="0.5" />
                  <text x="27.5" y="28" textAnchor="middle" fill="#66aa66" fontSize="2">Med1</text>
                  <rect x="70" y="25" width="5" height="5" fill="#224422" stroke="#448822" strokeWidth="0.5" />
                  <text x="72.5" y="28" textAnchor="middle" fill="#66aa66" fontSize="2">Med2</text>
                  <rect x="25" y="70" width="5" height="5" fill="#224422" stroke="#448822" strokeWidth="0.5" />
                  <text x="27.5" y="73" textAnchor="middle" fill="#66aa66" fontSize="2">Med3</text>
                </>
              )}
              
              {/* Evacuation routes */}
              <path 
                d="M 50 50 L 30 50 L 30 10" 
                stroke="#cc3333" 
                strokeWidth="1" 
                strokeDasharray="2,1"
                className="animate-pulse" 
              />
              <text x="25" y="8" fill="#cc3333" fontSize="2">ROUTE A</text>
              
              <path 
                d="M 50 50 L 70 50 L 70 10" 
                stroke="#cc3333" 
                strokeWidth="1" 
                strokeDasharray="2,1"
                className="animate-pulse"  
              />
              <text x="75" y="8" fill="#cc3333" fontSize="2">ROUTE B</text>
              
              <path 
                d="M 50 50 L 50 90" 
                stroke="#cc3333" 
                strokeWidth="1" 
                strokeDasharray="2,1"
                className="animate-pulse"  
              />
              <text x="50" y="95" fill="#cc3333" fontSize="2" textAnchor="middle">ROUTE C</text>
              
              {/* Safe points */}
              <circle cx="30" cy="10" r="2" fill="none" stroke="#cc3333" strokeWidth="0.5" />
              <text x="30" y="7" textAnchor="middle" fill="#cc3333" fontSize="2">SAFE POINT 1</text>
              
              <circle cx="70" cy="10" r="2" fill="none" stroke="#cc3333" strokeWidth="0.5" />
              <text x="70" y="7" textAnchor="middle" fill="#cc3333" fontSize="2">SAFE POINT 2</text>
              
              <circle cx="50" cy="90" r="2" fill="none" stroke="#cc3333" strokeWidth="0.5" />
              <text x="50" y="87" textAnchor="middle" fill="#cc3333" fontSize="2">SAFE POINT 3</text>
            </svg>
            
            {/* Map controls */}
            <div className="absolute top-2 right-2 flex flex-col space-y-1">
              <button className="p-1 bg-black/70 rounded hover:bg-gray-900">
                <Plus size={16} className="text-gray-400" />
              </button>
              <button className="p-1 bg-black/70 rounded hover:bg-gray-900">
                <Minus size={16} className="text-gray-400" />
              </button>
              <button className="p-1 bg-black/70 rounded hover:bg-gray-900">
                <Layers size={16} className="text-gray-400" />
              </button>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-2 left-2 bg-black/70 p-2 rounded text-xs">
              <div className="flex items-center mb-1">
                <div className="w-3 h-1 bg-red-600 mr-2"></div>
                <span className="text-gray-300">Evacuation Route</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-2 h-2 rounded-full border border-red-600 mr-2"></div>
                <span className="text-gray-300">Safe Point</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-900 mr-2"></div>
                <span className="text-gray-300">RSC HQ</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Plus icon for map controls
const Plus = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

// Minus icon for map controls
const Minus = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
  </svg>
);

// Enhanced Emergency Protocols Component
const EnhancedEmergencyProtocols = () => {
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [protocolFilter, setProtocolFilter] = useState('all');
  const [isActivating, setIsActivating] = useState(false);
  const [activatedProtocol, setActivatedProtocol] = useState(null);
  const [activationStep, setActivationStep] = useState(null);
  const [alertVisible, setAlertVisible] = useState(false);
  
  // Emergency protocols data
  const protocols = [
    {
      id: 1,
      name: 'CORPORATE_RAID',
      category: 'security',
      status: 'ready',
      lastTested: '2046-02-15',
      authorizedBy: ['Iō', 'Le Fou'],
      description: 'Immediate response to corporate or state raid on RSC facilities. Focuses on personnel safety, data protection, and organizational continuity.',
      activationCriteria: [
        'Confirmed hostile entry into RSC facilities',
        'Credible intelligence of imminent raid (60%+ confidence)',
        'Multiple arrests of RSC leadership'
      ],
      steps: [
        {
          phase: 'IMMEDIATE',
          actions: [
            'Activate emergency alert system (FREQ-991)',
            'Initiate data purge on all non-essential systems',
            'All personnel evacuate via designated routes',
            'Defense Committee deploys countermeasures to delay entry'
          ]
        },
        {
          phase: 'SECONDARY',
          actions: [
            'Personnel report to pre-assigned safe houses',
            'Communications blackout for 12 hours minimum',
            'Only designated emergency channels active',
            'Security cells activate to monitor corp/NCPD movements'
          ]
        },
        {
          phase: 'RECOVERY',
          actions: [
            'Committee verification of secure status (72hr max)',
            'Assessment of compromised resources and personnel',
            'Secure channel reestablishment via backup protocols',
            'Resource redistribution from secure caches'
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'MEDICAL_EMERGENCY',
      category: 'health',
      status: 'ready',
      lastTested: '2046-01-22',
      authorizedBy: ['Iō', 'Minata Tindano'],
      description: 'Coordinated response to major medical crisis affecting multiple RSC members or South Night City communities. Designed for radiation events, outbreaks, or mass casualties.',
      activationCriteria: [
        'Mass casualty event (10+ severe casualties)',
        'Epidemic outbreak with community spread',
        'Major radiation leak or exposure event',
        'Corporate denial of medical services to large population'
      ],
      steps: [
        {
          phase: 'IMMEDIATE',
          actions: [
            'People\'s Clinic switches to emergency operation mode',
            'All medical personnel recalled to primary or secondary stations',
            'Mobile medical units deployed to affected areas',
            'Triage protocols activated based on crisis type'
          ]
        },
        {
          phase: 'SECONDARY',
          actions: [
            'Supply chains activated for critical medical resources',
            'Secure corridors established for patient transport',
            'Community shelters prepared for overflow or quarantine',
            'Secondary care sites activated in major neighborhoods'
          ]
        },
        {
          phase: 'RECOVERY',
          actions: [
            'Ongoing care transition to sustainable model',
            'Resource replenishment from reserve networks',
            'Documentation of corp responsibility (if applicable)',
            'Community health monitoring and follow-up care'
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'EVACUATION_ALPHA',
      category: 'security',
      status: 'ready',
      lastTested: '2045-11-18',
      authorizedBy: ['Iō', 'Le Fou', 'Sorry'],
      description: 'Full evacuation of The People\'s Center due to imminent threat. Ensures all personnel, patients, and sensitive data can be rapidly relocated while preserving operational security.',
      activationCriteria: [
        'Direct threat to physical safety of The People\'s Center',
        'Imminent military/police action against the facility',
        'Environmental hazard making the building unsafe',
        'Strategic necessity to abandon the location'
      ],
      steps: [
        {
          phase: 'IMMEDIATE',
          actions: [
            'Emergency alert system activation (CODE: ALPHA-EVAC)',
            'Patient evacuation prioritized (Clinic staff lead)',
            'Secure data evacuation protocol initiated (Tech Committee lead)',
            'Defense Committee establishes security perimeter and routes'
          ]
        },
        {
          phase: 'SECONDARY',
          actions: [
            'All personnel evacuate to pre-designated rally points by zone',
            'Essential equipment evacuation per priority lists',
            'Critical documentation secured or destroyed',
            'Building security measures activated for maximum delay'
          ]
        },
        {
          phase: 'RECOVERY',
          actions: [
            'Personnel accountability check at all rally points',
            'Secondary facilities activation for essential services',
            'Communications restoration via backup channels',
            'Strategic assessment for return or permanent relocation'
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'SUPPLY_CHAIN_BREAK',
      category: 'logistics',
      status: 'ready',
      lastTested: '2046-02-01',
      authorizedBy: ['Iō', 'Chan-Woo Park'],
      description: 'Response to critical supply chain disruption affecting food, medicine, or essential resources. Activates alternative distribution networks and emergency reserves.',
      activationCriteria: [
        'Corporate blockade of South Night City supply routes',
        'Major infrastructure failure affecting resource distribution',
        'Targeted disruption of RSC supply networks',
        'City-wide emergency affecting basic necessities'
      ],
      steps: [
        {
          phase: 'IMMEDIATE',
          actions: [
            'Emergency inventory assessment of all cached supplies',
            'Rationing protocols activated for critical resources',
            'Alternative supply route network activation',
            'Community Kitchen switches to emergency menus and scheduling'
          ]
        },
        {
          phase: 'SECONDARY',
          actions: [
            'Distributed cache system activation across neighborhoods',
            'Mutual aid coordination with aligned organizations',
            'Production capacity increased at local food/medicine sites',
            'Resource sharing protocols activated within community'
          ]
        },
        {
          phase: 'RECOVERY',
          actions: [
            'Supply chain rebuilding through alternative networks',
            'Resource cache replenishment prioritization',
            'Long-term sustainability assessment and adaptation',
            'Community resilience reinforcement through expanded production'
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'INFORMATION_BLACKOUT',
      category: 'communications',
      status: 'ready',
      lastTested: '2045-12-05',
      authorizedBy: ['Le Fou', 'Sorry'],
      description: 'Protocol for operating during complete communication blackout or severe NET disruption. Establishes analog communication networks and ensures organizational function without digital infrastructure.',
      activationCriteria: [
        'City-wide NET collapse or severe disruption',
        'Targeted corporate jamming of RSC communications',
        'Evidence of comprehensive surveillance of digital channels',
        'EMP event or other technology-disabling scenario'
      ],
      steps: [
        {
          phase: 'IMMEDIATE',
          actions: [
            'Switch to analog communication networks (AM/FM secure channels)',
            'Physical courier system activation for essential communications',
            'Predefined check-in schedules implemented at dead drops',
            'All digital systems isolated and secured where possible'
          ]
        },
        {
          phase: 'SECONDARY',
          actions: [
            'Community radio stations activated with coded messaging',
            'Local neighborhood coordination via Wuguan network',
            'Visual signaling systems deployed in strategic locations',
            'Regular physical meetings per security cell structure'
          ]
        },
        {
          phase: 'RECOVERY',
          actions: [
            'Incremental communications testing on secure channels',
            'Technical assessment of safe digital infrastructure',
            'Establishment of new secure channels if needed',
            'Return to digital operations with enhanced security'
          ]
        }
      ]
    }
  ];
  
  // Get filtered protocols based on category
  const filteredProtocols = protocolFilter === 'all' 
    ? protocols 
    : protocols.filter(protocol => protocol.category === protocolFilter);
  
  // Get color and icon based on category
  const getCategoryInfo = (category) => {
    switch(category) {
      case 'security':
        return { color: 'red', icon: <Shield size={16} className="text-red-500" /> };
      case 'health':
        return { color: 'green', icon: <Heart size={16} className="text-green-500" /> };
      case 'logistics':
        return { color: 'yellow', icon: <Database size={16} className="text-yellow-500" /> };
      case 'communications':
        return { color: 'blue', icon: <Radio size={16} className="text-blue-500" /> };
      default:
        return { color: 'gray', icon: <AlertTriangle size={16} className="text-gray-500" /> };
    }
  };
  
  // Handle protocol activation
  const handleActivateProtocol = (id) => {
    const protocol = protocols.find(p => p.id === id);
    if (!protocol) return;
    
    setIsActivating(true);
    setActivationStep('verification');
  };
  
  // Handle protocol activation cancel
  const handleActivationCancel = () => {
    setIsActivating(false);
    setActivationStep(null);
  };
  
  // Handle protocol activation complete
  const handleActivationComplete = () => {
    setIsActivating(false);
    setActivationStep(null);
    setActivatedProtocol(activeProtocol);
    setAlertVisible(true);
    
    // Auto-hide alert after 5 seconds
    setTimeout(() => {
      setAlertVisible(false);
    }, 5000);
  };

  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <AlertTriangle size={16} className="mr-2" />
          EMERGENCY_PROTOCOLS
        </h3>
        <div className="text-xs text-red-400 font-mono flex items-center">
          <Lock size={12} className="mr-1" />
          COMMITTEE_ACCESS_REQUIRED
        </div>
      </div>
      
      <div className="p-4">
        {/* Active protocol alert */}
        {alertVisible && activatedProtocol && (
          <div className="mb-6 p-3 bg-red-900/20 border-2 border-red-600 rounded-lg flex items-center text-white animate-pulse">
            <AlertTriangle size={24} className="text-red-500 mr-3 flex-shrink-0" />
            <div>
              <div className="font-bold">ACTIVE PROTOCOL: {protocols.find(p => p.id === activatedProtocol)?.name}</div>
              <div className="text-sm opacity-80">Protocol activated. All RSC personnel are required to follow protocol procedures immediately.</div>
            </div>
          </div>
        )}
        
        {/* Warning banner */}
        <div className="mb-6 p-3 border border-yellow-600 bg-yellow-900/20 rounded-lg flex items-start">
          <AlertTriangle size={20} className="text-yellow-500 mr-3 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-yellow-500 font-bold mb-1">AUTHORIZED PERSONNEL ONLY</h4>
            <p className="text-sm text-gray-300">
              These protocols are restricted to Revolutionary Committee members and designated emergency officers. 
              Activation of any protocol requires committee authorization and should only be done in genuine emergency situations.
            </p>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex overflow-x-auto space-x-2 mb-6">
          <button
            onClick={() => setProtocolFilter('all')}
            className={`px-3 py-1 whitespace-nowrap rounded flex items-center text-xs font-mono ${
              protocolFilter === 'all' 
                ? 'bg-red-900 text-white border border-red-700' 
                : 'bg-black border border-red-900/50 text-gray-400 hover:bg-red-900/20'
            }`}
          >
            <AlertTriangle size={12} className="mr-1" />
            ALL_PROTOCOLS
          </button>
          <button
            onClick={() => setProtocolFilter('security')}
            className={`px-3 py-1 whitespace-nowrap rounded flex items-center text-xs font-mono ${
              protocolFilter === 'security' 
                ? 'bg-red-900 text-white border border-red-700' 
                : 'bg-black border border-red-900/50 text-gray-400 hover:bg-red-900/20'
            }`}
          >
            <Shield size={12} className="mr-1" />
            SECURITY
          </button>
          <button
            onClick={() => setProtocolFilter('health')}
            className={`px-3 py-1 whitespace-nowrap rounded flex items-center text-xs font-mono ${
              protocolFilter === 'health' 
                ? 'bg-green-900 text-white border border-green-700' 
                : 'bg-black border border-red-900/50 text-gray-400 hover:bg-red-900/20'
            }`}
          >
            <Heart size={12} className="mr-1" />
            HEALTH
          </button>
          <button
            onClick={() => setProtocolFilter('logistics')}
            className={`px-3 py-1 whitespace-nowrap rounded flex items-center text-xs font-mono ${
              protocolFilter === 'logistics' 
                ? 'bg-yellow-900 text-white border border-yellow-700' 
                : 'bg-black border border-red-900/50 text-gray-400 hover:bg-red-900/20'
            }`}
          >
            <Database size={12} className="mr-1" />
            LOGISTICS
          </button>
          <button
            onClick={() => setProtocolFilter('communications')}
            className={`px-3 py-1 whitespace-nowrap rounded flex items-center text-xs font-mono ${
              protocolFilter === 'communications' 
                ? 'bg-blue-900 text-white border border-blue-700' 
                : 'bg-black border border-red-900/50 text-gray-400 hover:bg-red-900/20'
            }`}
          >
            <Radio size={12} className="mr-1" />
            COMMUNICATIONS
          </button>
        </div>
        
        {/* Protocol activation modal */}
        {isActivating && activeProtocol && (
          <ProtocolActivation 
            protocol={protocols.find(p => p.id === activeProtocol)}
            isActive={isActivating}
            onCancel={handleActivationCancel}
            onComplete={handleActivationComplete}
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredProtocols.map(protocol => {
            const categoryInfo = getCategoryInfo(protocol.category);
            const isActive = activeProtocol === protocol.id;
            
            return (
              <div 
                key={protocol.id} 
                className={`border ${isActive ? `border-${categoryInfo.color}-600` : `border-${categoryInfo.color}-900/50`} rounded-lg overflow-hidden bg-black cursor-pointer hover:border-${categoryInfo.color}-700`}
                onClick={() => setActiveProtocol(isActive ? null : protocol.id)}
              >
                <div className={`p-3 bg-${categoryInfo.color}-900/10 border-b border-${categoryInfo.color}-900/30 flex justify-between items-center`}>
                  <div className="flex items-center">
                    {categoryInfo.icon}
                    <h4 className={`ml-2 font-bold text-${categoryInfo.color}-500 font-mono`}>{protocol.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full bg-green-900/30 text-green-500 flex items-center`}>
                      <CheckCircle size={10} className="mr-1" />
                      READY
                    </span>
                  </div>
                </div>
                
                <div className="p-3">
                  <p className="text-sm text-gray-300 mb-3">{protocol.description}</p>
                  
                  {isActive && (
                    <div className="mt-4 border-t border-gray-800 pt-4">
                      <div className="mb-3">
                        <h5 className="text-xs font-mono text-red-500 mb-2">ACTIVATION_CRITERIA</h5>
                        <ul className="text-sm text-gray-300 space-y-1">
                          {protocol.activationCriteria.map((criteria, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Evacuation route visualization */}
                      <EvacuationRouteMap protocol={protocol} />
                      
                      <div className="mb-3">
                        <h5 className="text-xs font-mono text-red-500 mb-2">RESPONSE_PHASES</h5>
                        <div className="space-y-3">
                          {protocol.steps.map((step, phaseIndex) => (
                            <div key={phaseIndex} className="border border-gray-800 rounded p-2">
                              <h6 className="text-xs font-mono text-white mb-1">{step.phase}</h6>
                              <ul className="text-sm text-gray-300 space-y-1">
                                {step.actions.map((action, actionIndex) => (
                                  <li key={actionIndex} className="flex items-start">
                                    <span className="text-red-500 mr-2">→</span>
                                    <span>{action}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-xs font-mono text-red-500 mb-2">AUTHORIZATION</h5>
                        <div className="flex flex-wrap gap-2">
                          {protocol.authorizedBy.map((person, index) => (
                            <div key={index} className="px-2 py-1 bg-red-900/10 border border-red-900/30 rounded-full text-xs flex items-center">
                              <User size={12} className="mr-1 text-red-500" />
                              {person}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2 mt-4">
                        <button 
                          className="flex-1 p-2 bg-red-900 border border-red-700 text-white rounded flex items-center justify-center hover:bg-red-800 font-mono"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActivateProtocol(protocol.id);
                          }}
                        >
                          <Zap size={16} className="mr-2" />
                          ACTIVATE_PROTOCOL
                        </button>
                        <button 
                          className="flex-1 p-2 bg-black border border-red-900 text-red-500 rounded flex items-center justify-center hover:bg-red-900/20 font-mono"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={16} className="mr-2" />
                          OFFLINE_COPY
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {!isActive && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={12} className="mr-1" />
                        <span>Last tested: {new Date(protocol.lastTested).toLocaleDateString()}</span>
                      </div>
                      <button 
                        className="px-3 py-1 text-xs text-red-500 hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProtocol(protocol.id);
                        }}
                      >
                        VIEW_DETAILS
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-4 bg-black border border-red-900 rounded-lg">
          <h4 className="font-bold text-red-500 mb-3 flex items-center font-mono">
            <Eye size={16} className="mr-2" />
            PROTOCOL_REVISION_HISTORY
          </h4>
          <div className="text-sm text-gray-300 space-y-1">
            <div className="flex justify-between items-center py-1 border-b border-gray-800">
              <div>CORPORATE_RAID protocol updated with new evacuation routes</div>
              <div className="text-xs text-gray-500">2046-02-15</div>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-800">
              <div>INFORMATION_BLACKOUT tested during quarterly security drill</div>
              <div className="text-xs text-gray-500">2045-12-05</div>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-800">
              <div>All protocols reviewed following Storm Ardent response</div>
              <div className="text-xs text-gray-500">2045-11-10</div>
            </div>
            <div className="flex justify-between items-center py-1">
              <div>MEDICAL_EMERGENCY protocol established</div>
              <div className="text-xs text-gray-500">2045-09-22</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedEmergencyProtocols;