import React, { useState } from 'react';
import { Shield, MapPin, Users, Clock, AlertTriangle, CheckCircle, MessageSquare, Eye, EyeOff, Lock, Zap, ChevronDown, ChevronUp, UserPlus, Radio } from 'lucide-react';

const DirectActionCoordination = () => {
  const [activeAction, setActiveAction] = useState(1);
  const [expandedSection, setExpandedSection] = useState('details');
  const [securityLevel, setSecurityLevel] = useState('mass'); // Options: 'mass', 'candidate', 'full'
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };
  
  // Action data - in a real implementation, this would come from a secure data source
  const actions = [
    {
      id: 1,
      title: "EVICTION DEFENSE: UNIVERSITY CARGO BAY",
      status: "active",
      securityLevel: "mass",
      timeframe: "Feb 27 - 10:00",
      location: "Container Block C7, University Cargo Bay",
      coordinator: "Leonard Turner",
      description: "Corporate enforcers are attempting to evict 12 families from Container Block C7. We need community presence to document, resist, and provide support to affected residents.",
      objectives: [
        "Establish community presence at eviction site",
        "Document corporate enforcer actions",
        "Provide immediate support to affected families",
        "Coordinate legal resistance through tenant council"
      ],
      roles: [
        { name: "On-Site Observers", required: 8, committed: 5 },
        { name: "Media Documentation", required: 3, committed: 2 },
        { name: "Family Support Team", required: 4, committed: 2 },
        { name: "Legal Coordinators", required: 2, committed: 1 }
      ],
      resources: [
        "Mobile communications", 
        "Recording devices",
        "Medical supplies", 
        "Food and water"
      ],
      updates: [
        { time: "Feb 26 - 16:32", content: "Corporate enforcers confirmed their plan with building management. Tenant council has been notified.", author: "Leonard" },
        { time: "Feb 26 - 18:45", content: "Legal team has prepared emergency injunction documents. Need more volunteers for on-site presence.", author: "Le Fou" }
      ]
    },
    {
      id: 2,
      title: "MEDICAL DISTRIBUTION: WATSON RADIATION ZONE",
      status: "planning",
      securityLevel: "candidate",
      timeframe: "Mar 01 - 09:00",
      location: "Eastern Watson, Sector 5",
      coordinator: "Dr. Minata Tindano",
      description: "Following the industrial leak at Biotechnica's Watson facility, residents are experiencing radiation sickness without access to treatment. We need to establish distribution points for medication and treatment.",
      objectives: [
        "Establish 3 secure distribution points in affected area",
        "Distribute radiation medication to minimum 50 residents",
        "Provide emergency treatment for severe cases",
        "Document corporate negligence for potential action"
      ],
      roles: [
        { name: "Medical Personnel", required: 4, committed: 2 },
        { name: "Security Team", required: 6, committed: 3 },
        { name: "Distribution Coordinators", required: 3, committed: 1 },
        { name: "Community Liaisons", required: 5, committed: 2 }
      ],
      resources: [
        "Radiation medication stockpile",
        "Mobile medical equipment",
        "Secure transport",
        "Communication equipment"
      ],
      updates: [
        { time: "Feb 25 - 14:22", content: "Medication secured through Highrider allies. Need to finalize distribution points.", author: "Minata" }
      ]
    },
    {
      id: 3,
      title: "INFRASTRUCTURE REPAIR: SOUTH NC WATER SYSTEM",
      status: "complete",
      securityLevel: "mass",
      timeframe: "Feb 23 - 14:00",
      location: "South Night City, Grid Section B3-C4",
      coordinator: "Chan-Woo Park",
      description: "Corporate neglect has left water infrastructure failing in multiple SNC neighborhoods. Community repair teams will restore clean water access to affected blocks while documenting systematic abandonment.",
      objectives: [
        "Repair main water distribution node at intersection B3-C4",
        "Restore water access to minimum 4 residential blocks",
        "Document infrastructure conditions for accountability campaign",
        "Train residents in basic water system maintenance"
      ],
      roles: [
        { name: "Technical Team", required: 5, committed: 5 },
        { name: "Supply Coordinators", required: 3, committed: 3 },
        { name: "Security Team", required: 4, committed: 4 },
        { name: "Documentation Team", required: 2, committed: 2 }
      ],
      resources: [
        "Technical equipment",
        "Replacement parts",
        "Water testing kits",
        "Power sources"
      ],
      updates: [
        { time: "Feb 23 - 15:36", content: "Main distribution node successfully repaired. Teams moving to secondary connections.", author: "Chan-Woo" },
        { time: "Feb 23 - 18:14", content: "Water restored to all targeted blocks. Quality testing shows acceptable levels for non-consumption use. Ongoing filtration needed for drinking.", author: "Leonard" },
        { time: "Feb 24 - 09:22", content: "Follow-up maintenance scheduled for next week. All objectives achieved. Documentation compiled for accountability campaign.", author: "Chan-Woo" }
      ]
    }
  ];
  
  const currentAction = actions.find(a => a.id === activeAction);
  
  // Status badge style based on action status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="bg-green-900/30 text-green-500 text-xs px-2 py-0.5 rounded flex items-center"><Zap size={12} className="mr-1" />IN_PROGRESS</span>;
      case 'planning':
        return <span className="bg-yellow-900/30 text-yellow-500 text-xs px-2 py-0.5 rounded flex items-center"><Clock size={12} className="mr-1" />PLANNING</span>;
      case 'complete':
        return <span className="bg-blue-900/30 text-blue-500 text-xs px-2 py-0.5 rounded flex items-center"><CheckCircle size={12} className="mr-1" />COMPLETED</span>;
      default:
        return <span className="bg-gray-900/30 text-gray-500 text-xs px-2 py-0.5 rounded">UNKNOWN</span>;
    }
  };
  
  // Filter actions based on security level
  const availableActions = actions.filter(action => {
    if (securityLevel === 'full') return true;
    if (securityLevel === 'candidate' && (action.securityLevel === 'candidate' || action.securityLevel === 'mass')) return true;
    if (securityLevel === 'mass' && action.securityLevel === 'mass') return true;
    return false;
  });
  
  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <Shield size={16} className="mr-2" />
          DIRECT_ACTION_COORDINATION
        </h3>
        <div className="text-xs text-red-400 font-mono flex items-center">
          {securityLevel === 'full' ? (
            <><Lock size={12} className="mr-1 text-green-500" /> FULL_MEMBER_ACCESS</>
          ) : securityLevel === 'candidate' ? (
            <><Lock size={12} className="mr-1 text-yellow-500" /> CANDIDATE_ACCESS</>
          ) : (
            <><Lock size={12} className="mr-1 text-blue-500" /> MASS_ORG_ACCESS</>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-300 mb-6">
          The direct action coordination system allows RSC members to participate in community defense, mutual aid operations, 
          and other collective actions. Actions are categorized by security level and operational status.
        </p>
        
        {/* Security level toggle and action filters */}
        <div className="flex flex-col md:flex-row gap-3 justify-between mb-6">
          {/* Security level selection - this would have actual authentication in implementation */}
          <div className="flex space-x-2">
            <button 
              onClick={() => setSecurityLevel('mass')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                securityLevel === 'mass' 
                  ? 'bg-blue-900/30 border border-blue-800 text-blue-400' 
                  : 'bg-black border border-gray-800 text-gray-400 hover:bg-gray-900/20'
              }`}
            >
              <Users size={14} className="mr-1" />
              MASS_MEMBER
            </button>
            
            <button 
              onClick={() => setSecurityLevel('candidate')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                securityLevel === 'candidate' 
                  ? 'bg-yellow-900/30 border border-yellow-800 text-yellow-400' 
                  : 'bg-black border border-gray-800 text-gray-400 hover:bg-gray-900/20'
              }`}
            >
              <UserPlus size={14} className="mr-1" />
              CANDIDATE
            </button>
            
            <button 
              onClick={() => setSecurityLevel('full')}
              className={`px-3 py-1 rounded text-xs flex items-center ${
                securityLevel === 'full' 
                  ? 'bg-green-900/30 border border-green-800 text-green-400' 
                  : 'bg-black border border-gray-800 text-gray-400 hover:bg-gray-900/20'
              }`}
            >
              <Shield size={14} className="mr-1" />
              FULL_MEMBER
            </button>
          </div>
          
          {/* Action status filters */}
          <div className="flex space-x-2">
            <span className="text-xs text-gray-500 flex items-center mr-1">
              FILTER:
            </span>
            <button className="px-3 py-1 bg-green-900/30 border border-green-800 rounded text-xs text-green-400 flex items-center">
              <Zap size={12} className="mr-1" />
              ACTIVE
            </button>
            <button className="px-3 py-1 bg-yellow-900/30 border border-yellow-800 rounded text-xs text-yellow-400 flex items-center">
              <Clock size={12} className="mr-1" />
              PLANNING
            </button>
            <button className="px-3 py-1 bg-black border border-gray-800 rounded text-xs text-gray-400 flex items-center hover:bg-gray-900/20">
              <CheckCircle size={12} className="mr-1" />
              COMPLETED
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Action List Sidebar */}
          <div className="w-full md:w-1/4">
            <div className="border border-red-900 rounded-lg overflow-hidden">
              <div className="p-2 bg-red-900/30 border-b border-red-700 font-mono text-xs text-red-500">
                AVAILABLE_ACTIONS ({availableActions.length})
              </div>
              
              <div className="divide-y divide-red-900/20 max-h-96 overflow-y-auto">
                {availableActions.map(action => (
                  <div 
                    key={action.id}
                    className={`p-3 cursor-pointer ${activeAction === action.id ? 'bg-red-900/20' : 'hover:bg-red-900/10'}`}
                    onClick={() => setActiveAction(action.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-bold text-sm ${activeAction === action.id ? 'text-white' : 'text-gray-300'}`}>
                        {action.title}
                      </h4>
                      {getStatusBadge(action.status)}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <Clock size={12} className="mr-1" />
                      {action.timeframe}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin size={12} className="mr-1" />
                      {action.location}
                    </div>
                  </div>
                ))}
                
                {availableActions.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    <AlertTriangle size={24} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No actions available at your current access level.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Action creation button */}
            <button className="w-full mt-3 p-2 bg-red-900 border border-red-700 text-white rounded flex items-center justify-center hover:bg-red-800">
              <Shield size={14} className="mr-2" />
              PROPOSE_NEW_ACTION
            </button>
          </div>
          
          {/* Action Details */}
          {currentAction && (
            <div className="w-full md:w-3/4 border border-red-900 rounded-lg bg-black">
              {/* Action header */}
              <div className="p-4 border-b border-red-900/50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-red-500">{currentAction.title}</h3>
                  {getStatusBadge(currentAction.status)}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center text-gray-400">
                    <Clock size={14} className="mr-1 text-red-500" />
                    <span className="text-gray-500">TIMEFRAME:</span>
                    <span className="ml-1">{currentAction.timeframe}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <MapPin size={14} className="mr-1 text-red-500" />
                    <span className="text-gray-500">LOCATION:</span>
                    <span className="ml-1">{currentAction.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Users size={14} className="mr-1 text-red-500" />
                    <span className="text-gray-500">COORDINATOR:</span>
                    <span className="ml-1">{currentAction.coordinator}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <Lock size={14} className="mr-1 text-red-500" />
                    <span className="text-gray-500">SECURITY:</span>
                    <span className="ml-1">
                      {currentAction.securityLevel === 'mass' ? 'Mass Organization' : 
                       currentAction.securityLevel === 'candidate' ? 'Candidate Member' : 'Full Member'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action details sections with collapsible content */}
              <div className="p-4 space-y-3">
                {/* Details section */}
                <div className="border border-red-900/50 rounded-lg overflow-hidden">
                  <div 
                    className={`p-3 flex justify-between items-center cursor-pointer ${expandedSection === 'details' ? 'bg-red-900/30' : 'hover:bg-red-900/10'}`}
                    onClick={() => toggleSection('details')}
                  >
                    <h4 className="font-mono text-red-500">ACTION_DETAILS</h4>
                    {expandedSection === 'details' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  
                  {expandedSection === 'details' && (
                    <div className="p-3 border-t border-red-900/30">
                      <p className="text-sm text-gray-300 mb-4">
                        {currentAction.description}
                      </p>
                      
                      <h5 className="text-xs font-mono text-red-500 mb-2">OBJECTIVES</h5>
                      <ul className="text-sm text-gray-300 space-y-1 mb-4">
                        {currentAction.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>{objective}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h5 className="text-xs font-mono text-red-500 mb-2">REQUIRED_RESOURCES</h5>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {currentAction.resources.map((resource, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            <span>{resource}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                {/* Roles section */}
                <div className="border border-red-900/50 rounded-lg overflow-hidden">
                  <div 
                    className={`p-3 flex justify-between items-center cursor-pointer ${expandedSection === 'roles' ? 'bg-red-900/30' : 'hover:bg-red-900/10'}`}
                    onClick={() => toggleSection('roles')}
                  >
                    <h4 className="font-mono text-red-500">PERSONNEL_NEEDS</h4>
                    {expandedSection === 'roles' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  
                  {expandedSection === 'roles' && (
                    <div className="p-3 border-t border-red-900/30">
                      <div className="space-y-3">
                        {currentAction.roles.map((role, index) => (
                          <div key={index} className="bg-red-900/10 rounded-lg p-3 border border-red-900/30">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-bold text-sm text-gray-200">{role.name}</h5>
                              <div className="text-xs">
                                <span className="text-gray-400">{role.committed}</span>
                                <span className="text-gray-500">/</span>
                                <span className="text-gray-400">{role.required}</span>
                                <span className="text-gray-500"> committed</span>
                              </div>
                            </div>
                            
                            <div className="w-full bg-gray-900 rounded-full h-2 mb-3">
                              <div 
                                className="bg-red-600 h-2 rounded-full" 
                                style={{ width: `${(role.committed / role.required) * 100}%` }}
                              ></div>
                            </div>
                            
                            {role.committed < role.required && (
                              <button className="w-full p-1.5 bg-red-900 border border-red-700 text-white rounded-lg text-xs hover:bg-red-800">
                                VOLUNTEER
                              </button>
                            )}
                            
                            {role.committed >= role.required && (
                              <button className="w-full p-1.5 bg-green-900/30 border border-green-900 text-green-500 rounded-lg text-xs" disabled>
                                FULLY_STAFFED
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Updates section */}
                <div className="border border-red-900/50 rounded-lg overflow-hidden">
                  <div 
                    className={`p-3 flex justify-between items-center cursor-pointer ${expandedSection === 'updates' ? 'bg-red-900/30' : 'hover:bg-red-900/10'}`}
                    onClick={() => toggleSection('updates')}
                  >
                    <h4 className="font-mono text-red-500">ACTION_UPDATES</h4>
                    {expandedSection === 'updates' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  
                  {expandedSection === 'updates' && (
                    <div className="p-3 border-t border-red-900/30">
                      {currentAction.updates.length > 0 ? (
                        <div className="space-y-3">
                          {currentAction.updates.map((update, index) => (
                            <div key={index} className="border border-red-900/20 rounded-lg p-3">
                              <div className="flex justify-between items-center mb-1 text-xs">
                                <span className="text-red-400 font-bold">{update.author}</span>
                                <span className="text-gray-500">{update.time}</span>
                              </div>
                              <p className="text-sm text-gray-300">{update.content}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 p-4">
                          <Radio size={24} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No updates posted yet.</p>
                        </div>
                      )}
                      
                      <div className="mt-3 flex">
                        <input 
                          type="text" 
                          placeholder="Post update to team..." 
                          className="flex-grow bg-black border border-red-900 rounded-l p-2 text-sm focus:outline-none focus:border-red-700"
                        />
                        <button className="bg-red-900 border border-red-700 border-l-0 rounded-r px-3 text-white flex items-center">
                          <MessageSquare size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  {currentAction.status === 'active' && (
                    <button className="flex-grow p-2 bg-red-900 border border-red-700 rounded text-white font-mono hover:bg-red-800 flex items-center justify-center">
                      <Zap size={16} className="mr-2" />
                      JOIN_ACTION
                    </button>
                  )}
                  
                  {currentAction.status === 'planning' && (
                    <button className="flex-grow p-2 bg-yellow-900/50 border border-yellow-700 rounded text-yellow-400 font-mono hover:bg-yellow-900/70 flex items-center justify-center">
                      <UserPlus size={16} className="mr-2" />
                      VOLUNTEER
                    </button>
                  )}
                  
                  <button className="p-2 bg-black border border-red-900 rounded text-red-500 font-mono hover:bg-red-900/20 flex items-center justify-center">
                    <Eye size={16} className="mr-2" />
                    TRACK_ACTION
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectActionCoordination;