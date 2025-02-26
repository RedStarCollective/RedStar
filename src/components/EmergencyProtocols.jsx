import React, { useState } from 'react';
import { 
  AlertTriangle, Shield, Users, MapPin, Radio, Clock, 
  Check, CheckCircle, X, Heart, Zap, Lock, User, Database,
  Download, Eye, EyeOff
} from 'lucide-react';

const EmergencyProtocols = () => {
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [activationConfirm, setActivationConfirm] = useState(false);
  const [protocolFilter, setProtocolFilter] = useState('all');
  
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
  
  // Handle protocol activation (simulated)
  const handleActivateProtocol = (id) => {
    // In a real implementation, this would involve authorization checks
    // and trigger actual emergency systems
    setActivationConfirm(true);
    
    // Auto-close the confirmation after 3 seconds
    setTimeout(() => {
      setActivationConfirm(false);
    }, 3000);
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
        
        {/* Activation confirmation overlay */}
        {activationConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4">
            <div className="bg-black border-2 border-red-500 rounded-lg max-w-md w-full p-6 relative animate-pulse">
              <div className="flex justify-center mb-4">
                <AlertTriangle size={48} className="text-red-500" />
              </div>
              <h2 className="text-xl font-mono text-red-500 font-bold mb-4 text-center">PROTOCOL ACTIVATION</h2>
              <p className="text-center text-white mb-6">
                Verification in progress. Biometric and authorization confirmation required.
              </p>
              <div className="flex justify-center space-x-3">
                <button className="px-4 py-2 bg-red-900 border border-red-700 rounded text-white font-mono">
                  <X size={16} className="mr-2 inline" />
                  CANCEL
                </button>
                <button className="px-4 py-2 bg-green-900 border border-green-700 rounded text-white font-mono">
                  <Check size={16} className="mr-2 inline" />
                  CONFIRM
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredProtocols.map(protocol => {
            const categoryInfo = getCategoryInfo(protocol.category);
            
            return (
              <div 
                key={protocol.id} 
                className={`border border-${categoryInfo.color}-900/50 rounded-lg overflow-hidden bg-black cursor-pointer hover:border-${categoryInfo.color}-700`}
                onClick={() => setActiveProtocol(activeProtocol === protocol.id ? null : protocol.id)}
              >
                <div className={`p-3 bg-${categoryInfo.color}-900/10 border-b border-${categoryInfo.color}-900/30 flex justify-between items-center`}>
                  <div className="flex items-center">
                    {categoryInfo.icon}
                    <h4 className="ml-2 font-bold font-mono">{protocol.name}</h4>
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
                  
                  {activeProtocol === protocol.id && (
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
                  
                  {activeProtocol !== protocol.id && (
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

export default EmergencyProtocols;