import React, { useState } from 'react';
import { Heart, AlertTriangle, Clock, Users, Map, Clipboard, Phone, Search, Info, Activity, Zap, ChevronDown, ChevronUp, Filter, CheckCircle, Download } from 'lucide-react';

const MedicalResources = () => {
  const [activeTab, setActiveTab] = useState('clinic');
  const [expandedCondition, setExpandedCondition] = useState(null);
  const [expandedProvider, setExpandedProvider] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  const toggleCondition = (id) => {
    setExpandedCondition(expandedCondition === id ? null : id);
  };
  
  const toggleProvider = (id) => {
    setExpandedProvider(expandedProvider === id ? null : id);
  };
  
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  // Medical conditions data
  const conditions = [
    {
      id: 1,
      name: "Radiation Sickness",
      severity: "critical",
      causes: "Exposure to radiation from industrial leaks, damaged power infrastructure, or contaminated water supplies.",
      symptoms: [
        "Nausea and vomiting within hours of exposure",
        "Fatigue and weakness",
        "Hair loss after high exposure",
        "Recurrent infections and bleeding",
        "Red skin and blistering in severe cases"
      ],
      treatment: "Treatment varies by severity. Mild cases require anti-nausea medication, rest, and careful monitoring. Severe cases need immediate medical attention including decontamination, anti-radiation medications, and blood transfusions. The People's Clinic provides all radiation medications at no cost.",
      prevention: "Avoid known radiation zones marked on community maps. Use radiation detection equipment when possible. Do not consume water or food from contaminated areas. If exposure is suspected, remove contaminated clothing and wash thoroughly."
    },
    {
      id: 2,
      name: "Combat Trauma",
      severity: "critical",
      causes: "Gunshot wounds, knife wounds, blunt force trauma, explosions, and other violence-related injuries common in the Combat Zone.",
      symptoms: [
        "Visible wounds, bleeding, or bruising",
        "Shock symptoms (pale skin, rapid breathing, weakness)",
        "Loss of consciousness",
        "Impaired movement or function",
        "Severe pain or numbness"
      ],
      treatment: "Immediate first aid to stop bleeding and stabilize patient. The People's Clinic provides emergency trauma care 24/7. Treatment may include surgery, wound care, pain management, and rehabilitation. Psychological support is integrated into all trauma care protocols.",
      prevention: "Avoid known conflict areas when possible. Maintain awareness of surroundings. Consider basic armored clothing if traveling through high-risk areas. De-escalation techniques can prevent some violent confrontations."
    },
    {
      id: 3,
      name: "Cyberpsychosis (Early Stages)",
      severity: "serious",
      causes: "Excessive cyberware implantation, particularly invasive neural modifications. Risk increases with low-quality implants and improper installation.",
      symptoms: [
        "Increasing dissociation from physical body",
        "Reduced empathy toward others",
        "Outbursts of uncharacteristic aggression",
        "Paranoia and suspicion",
        "Sensory processing issues"
      ],
      treatment: "The People's Clinic offers early intervention therapy using a combination of medication, psychotherapy, and targeted neural feedback. Removing non-essential cyberware may be recommended in moderate to severe cases. Our approach emphasizes humane treatment without corporate exploitation.",
      prevention: "Limit cyberware implantation to essential needs. Use only trusted technicians and quality components. Regular psychological screening for those with extensive modifications. Community support systems reduce isolation that can accelerate symptoms."
    },
    {
      id: 4,
      name: "Chemical Exposure",
      severity: "serious",
      causes: "Industrial waste, illegal dumping, combat drugs, and toxic manufacturing byproducts found throughout South Night City.",
      symptoms: [
        "Respiratory problems including coughing, wheezing",
        "Skin rashes, burns, or discoloration",
        "Eye irritation or vision changes",
        "Cognitive impairment or confusion",
        "Digestive issues including vomiting or diarrhea"
      ],
      treatment: "Identification of specific chemical agent determines treatment. General protocol includes decontamination, supportive care, and antidotes when available. The People's Clinic maintains extensive detoxification capabilities for most common Night City contaminants.",
      prevention: "Use filtration masks in industrial areas. Avoid visibly contaminated water and abandoned industrial sites. Test water and food sources when possible. Report illegal dumping to community defense networks."
    },
    {
      id: 5,
      name: "Malnutrition",
      severity: "moderate",
      causes: "Food insecurity, corporate food monopolies, contaminated supplies, and poverty throughout the Combat Zone.",
      symptoms: [
        "Unintended weight loss",
        "Fatigue and weakness",
        "Delayed wound healing",
        "Cognitive impairment in severe cases",
        "Compromised immune function"
      ],
      treatment: "Nutritional rehabilitation through our Community Kitchen program. Access to balanced meals, nutritional supplements, and monitoring. Treatment includes addressing underlying social circumstances through our mutual aid network.",
      prevention: "Community gardens and food distribution networks provide alternatives to corporate food sources. The RSC coordinates with the Gardeners to maintain several food production sites throughout South Night City."
    },
    {
      id: 6,
      name: "Housing-Related Illness",
      severity: "moderate",
      causes: "Mold, poor ventilation, extreme temperatures, and structural hazards in substandard housing throughout Night City.",
      symptoms: [
        "Respiratory issues including asthma and bronchitis",
        "Skin infections and rashes",
        "Neurological symptoms from toxic mold exposure",
        "Temperature-related conditions (hypothermia/hyperthermia)",
        "Injuries from structural failures"
      ],
      treatment: "Medical treatment of specific conditions combined with housing advocacy. The RSC coordinates with tenant organizations to address underlying housing conditions while treating symptoms.",
      prevention: "Tenant organizing and housing improvement initiatives. Basic repairs and modifications can improve conditions significantly. The RSC provides technical assistance for community-based repairs through our infrastructure team."
    }
  ];
  
  // Medical providers data
  const providers = [
    {
      id: 1,
      name: "The People's Clinic",
      type: "Primary Care",
      location: "The People's Center, 2nd Floor",
      hours: "0800-2000 daily, Emergency care available 24/7",
      services: [
        "General medical care",
        "Emergency trauma treatment",
        "Radiation sickness management",
        "Mental health services",
        "Cyberware-related care"
      ],
      providers: [
        "Dr. Iō - Medical Director, Trauma Specialist",
        "Dr. Minata Tindano - Chief Medical Officer",
        "5 trained medtechs and community health workers"
      ],
      notes: "The People's Clinic operates on a donation basis - no one is turned away for inability to pay. All services are available to community members regardless of background or status.",
      contact: "In-person at The People's Center or via emergency channel FREQ-774"
    },
    {
      id: 2,
      name: "Mobile Medical Unit",
      type: "Emergency Outreach",
      location: "Varies - check community alerts for daily location",
      hours: "Varies based on community needs",
      services: [
        "Basic medical care",
        "Radiation screening",
        "Medication distribution",
        "First aid training",
        "Health education"
      ],
      providers: [
        "Rotating medical staff from People's Clinic",
        "Community health workers",
        "Defense Committee security team"
      ],
      notes: "The Mobile Medical Unit brings care directly to neighborhoods with limited access to the People's Center. Security protocols are in place for all deployments.",
      contact: "Via community alert system or FREQ-774"
    },
    {
      id: 3,
      name: "Community Health Worker Network",
      type: "Distributed Care",
      location: "Throughout South Night City",
      hours: "Varies by neighborhood",
      services: [
        "Basic first aid",
        "Health monitoring",
        "Medication distribution",
        "Referrals to People's Clinic",
        "Preventative care education"
      ],
      providers: [
        "32 trained community health workers",
        "Each neighborhood has 2-4 assigned workers"
      ],
      notes: "Community Health Workers live in the neighborhoods they serve and provide front-line healthcare access. All workers receive ongoing training through the People's Clinic.",
      contact: "Through neighborhood coordinators or community bulletin boards"
    },
    {
      id: 4,
      name: "Mental Health Collective",
      type: "Specialized Care",
      location: "The People's Center, 2nd Floor",
      hours: "1000-1800, Monday-Saturday",
      services: [
        "Trauma therapy",
        "Group support sessions",
        "Crisis intervention",
        "Cyberpsychosis screening and early treatment",
        "Substance dependency support"
      ],
      providers: [
        "Dr. Iō - Lead Therapist",
        "3 trained counselors",
        "Peer support facilitators"
      ],
      notes: "The Mental Health Collective uses a combination of conventional therapy and innovative approaches including custom therapeutic braindance sessions and communal healing practices.",
      contact: "In-person scheduling at the People's Center"
    }
  ];
  
  // Emergency protocols
  const emergencyProtocols = [
    {
      id: 1,
      title: "TRAUMA RESPONSE",
      description: "For life-threatening injuries including gunshot wounds, severe bleeding, major trauma",
      steps: [
        "Apply direct pressure to bleeding wounds with clean cloth",
        "If victim is unconscious, ensure airway is clear and check breathing",
        "Contact emergency channel FREQ-774 immediately",
        "Provide exact location and nature of injuries",
        "If safe, move victim to nearest community safe point (marked on threat map)",
        "Defense Committee will coordinate response team deployment"
      ],
      notes: "Do not attempt to remove embedded objects from wounds. Do not move victims with potential spinal injuries unless immediate danger exists."
    },
    {
      id: 2,
      title: "RADIATION EXPOSURE",
      description: "For suspected radiation exposure from industrial accidents, leaks, or contaminated areas",
      steps: [
        "Remove affected individuals from exposure source immediately",
        "Remove and bag all contaminated clothing (handle with gloves if possible)",
        "Wash exposed skin thoroughly with clean water if available",
        "Contact emergency channel FREQ-774 for support",
        "Monitor for symptoms including nausea, vomiting, skin redness",
        "People's Clinic maintains radiation medication supplies for all community members"
      ],
      notes: "Different radiation sources require different responses. Report all suspected radiation incidents to help track corporate negligence patterns."
    },
    {
      id: 3,
      title: "MENTAL HEALTH CRISIS",
      description: "For immediate mental health emergencies including suicidal behavior, psychotic episodes, or cyberpsychosis incidents",
      steps: [
        "Maintain safe distance while establishing verbal contact",
        "Speak calmly and avoid sudden movements or loud noises",
        "Contact mental health response team via FREQ-774",
        "Clear area of bystanders and potential weapons",
        "Do not attempt restraint unless immediate life threat exists",
        "Mental Health Collective maintains 24/7 crisis response capability"
      ],
      notes: "The RSC approach emphasizes de-escalation and support rather than force. Our goal is to provide help, not punishment, for those experiencing mental health crises."
    }
  ];
  
  // Filter conditions based on search query and selected filters
  const filteredConditions = conditions.filter(condition => {
    // Filter by search query
    if (searchQuery && !condition.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by severity if filters are selected
    if (selectedFilters.length > 0 && !selectedFilters.includes(condition.severity)) {
      return false;
    }
    
    return true;
  });
  
  // Get badge color based on severity
  const getSeverityBadge = (severity) => {
    switch(severity) {
      case 'critical':
        return <span className="bg-red-900/30 text-red-500 text-xs px-2 py-0.5 rounded flex items-center"><AlertTriangle size={12} className="mr-1" />CRITICAL</span>;
      case 'serious':
        return <span className="bg-orange-900/30 text-orange-500 text-xs px-2 py-0.5 rounded flex items-center"><AlertTriangle size={12} className="mr-1" />SERIOUS</span>;
      case 'moderate':
        return <span className="bg-yellow-900/30 text-yellow-500 text-xs px-2 py-0.5 rounded flex items-center"><AlertTriangle size={12} className="mr-1" />MODERATE</span>;
      default:
        return <span className="bg-gray-900/30 text-gray-500 text-xs px-2 py-0.5 rounded">UNKNOWN</span>;
    }
  };
  
  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <Heart size={16} className="mr-2" />
          MEDICAL_RESOURCES
        </h3>
        <div className="text-xs text-red-400 font-mono">
          THE PEOPLE'S CLINIC
        </div>
      </div>
      
      {/* Navigation tabs */}
      <div className="flex border-b border-red-900 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('clinic')}
          className={`px-4 py-2 whitespace-nowrap font-mono flex items-center ${activeTab === 'clinic' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          <Heart size={16} className="mr-2" />
          CLINIC_SERVICES
        </button>
        <button 
          onClick={() => setActiveTab('conditions')}
          className={`px-4 py-2 whitespace-nowrap font-mono flex items-center ${activeTab === 'conditions' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          <AlertTriangle size={16} className="mr-2" />
          COMMON_CONDITIONS
        </button>
        <button 
          onClick={() => setActiveTab('emergency')}
          className={`px-4 py-2 whitespace-nowrap font-mono flex items-center ${activeTab === 'emergency' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          <Zap size={16} className="mr-2" />
          EMERGENCY_PROTOCOLS
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`px-4 py-2 whitespace-nowrap font-mono flex items-center ${activeTab === 'resources' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          <Clipboard size={16} className="mr-2" />
          TRAINING_MATERIALS
        </button>
      </div>
      
      <div className="p-4">
        {/* Clinic Services Tab */}
        {activeTab === 'clinic' && (
          <div>
            <p className="text-sm text-gray-300 mb-6">
              The RSC maintains a network of medical providers throughout South Night City, with the People's Clinic 
              at its center. Our healthcare system operates on principles of mutual aid and solidarity, providing care 
              based on need rather than ability to pay.
            </p>
            
            <div className="space-y-4">
              {providers.map(provider => (
                <div 
                  key={provider.id}
                  className={`border ${expandedProvider === provider.id ? 'border-red-700' : 'border-red-900/50'} rounded-lg overflow-hidden bg-black`}
                >
                  {/* Provider header - always visible */}
                  <div 
                    className={`p-4 ${expandedProvider === provider.id ? 'bg-red-900/30' : 'hover:bg-red-900/10'} flex justify-between items-start cursor-pointer`}
                    onClick={() => toggleProvider(provider.id)}
                  >
                    <div>
                      <h4 className="font-bold text-white mb-1">{provider.name}</h4>
                      <div className="text-xs text-gray-400 flex items-center">
                        <Activity size={12} className="mr-1 text-red-500" />
                        {provider.type}
                      </div>
                    </div>
                    {expandedProvider === provider.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {/* Expanded provider details */}
                  {expandedProvider === provider.id && (
                    <div className="p-4 border-t border-red-900/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-start">
                            <Map size={16} className="mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-gray-500 font-mono">LOCATION</div>
                              <div className="text-sm text-gray-300">{provider.location}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Clock size={16} className="mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-gray-500 font-mono">HOURS</div>
                              <div className="text-sm text-gray-300">{provider.hours}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <Phone size={16} className="mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                            <div>
                              <div className="text-xs text-gray-500 font-mono">CONTACT</div>
                              <div className="text-sm text-gray-300">{provider.contact}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-red-900/10 rounded-lg p-3 border border-red-900/30">
                          <div className="text-xs text-red-500 font-mono mb-2">AVAILABLE_SERVICES</div>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {provider.services.map((service, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                <span>{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-red-500 font-mono mb-1">MEDICAL_STAFF</div>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {provider.providers.map((person, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                <span>{person}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <div className="text-xs text-red-500 font-mono mb-1">NOTES</div>
                          <p className="text-sm text-gray-300">{provider.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Common Conditions Tab */}
        {activeTab === 'conditions' && (
          <div>
            <p className="text-sm text-gray-300 mb-4">
              Combat Zone residents face unique health challenges from radiation, violence, corporate negligence, 
              and environmental hazards. The People's Clinic provides information and treatment for all common conditions.
            </p>
            
            {/* Search and filter controls */}
            <div className="mb-6">
              <div className="flex mb-3">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="Search conditions..." 
                    className="w-full bg-black border border-red-900 rounded-l p-2 pl-8 text-sm focus:outline-none focus:border-red-700"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search size={16} className="absolute left-2 top-2.5 text-gray-500" />
                </div>
                
                <div className="flex">
                  <button 
                    className={`px-3 py-2 flex items-center ${selectedFilters.includes('critical') ? 'bg-red-900/50 text-red-400 border border-red-700' : 'bg-black text-gray-400 border border-red-900/30 hover:bg-red-900/10'}`}
                    onClick={() => toggleFilter('critical')}
                  >
                    <AlertTriangle size={14} className="mr-1" />
                    CRITICAL
                  </button>
                  <button 
                    className={`px-3 py-2 flex items-center ${selectedFilters.includes('serious') ? 'bg-orange-900/50 text-orange-400 border border-orange-700' : 'bg-black text-gray-400 border border-red-900/30 border-l-0 hover:bg-red-900/10'}`}
                    onClick={() => toggleFilter('serious')}
                  >
                    <AlertTriangle size={14} className="mr-1" />
                    SERIOUS
                  </button>
                  <button 
                    className={`px-3 py-2 flex items-center rounded-r ${selectedFilters.includes('moderate') ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-700' : 'bg-black text-gray-400 border border-red-900/30 border-l-0 hover:bg-red-900/10'}`}
                    onClick={() => toggleFilter('moderate')}
                  >
                    <AlertTriangle size={14} className="mr-1" />
                    MODERATE
                  </button>
                </div>
              </div>
            </div>
            
            {/* Conditions list */}
            <div className="space-y-4">
              {filteredConditions.length > 0 ? (
                filteredConditions.map(condition => (
                  <div 
                    key={condition.id}
                    className={`border ${expandedCondition === condition.id ? 'border-red-700' : 'border-red-900/50'} rounded-lg overflow-hidden bg-black`}
                  >
                    {/* Condition header - always visible */}
                    <div 
                      className={`p-4 ${expandedCondition === condition.id ? 'bg-red-900/30' : 'hover:bg-red-900/10'} flex justify-between items-start cursor-pointer`}
                      onClick={() => toggleCondition(condition.id)}
                    >
                      <div>
                        <h4 className="font-bold text-white mb-1">{condition.name}</h4>
                        <div className="text-xs text-gray-400">{condition.causes}</div>
                      </div>
                      <div className="flex items-center ml-3">
                        {getSeverityBadge(condition.severity)}
                        <div className="ml-2">
                          {expandedCondition === condition.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>
                      </div>
                    </div>
                    
                    {/* Expanded condition details */}
                    {expandedCondition === condition.id && (
                      <div className="p-4 border-t border-red-900/30">
                        <div className="mb-4">
                          <h5 className="text-xs font-mono text-red-500 mb-2">COMMON_SYMPTOMS</h5>
                          <ul className="text-sm text-gray-300 space-y-1">
                            {condition.symptoms.map((symptom, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                <span>{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="text-xs font-mono text-red-500 mb-2">TREATMENT</h5>
                          <p className="text-sm text-gray-300">{condition.treatment}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-mono text-red-500 mb-2">PREVENTION</h5>
                          <p className="text-sm text-gray-300">{condition.prevention}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center border border-red-900/50 rounded-lg">
                  <AlertTriangle size={32} className="mx-auto mb-2 text-red-500 opacity-50" />
                  <p className="text-gray-500">No conditions match your current filters.</p>
                  <button 
                    className="mt-2 px-3 py-1 bg-red-900/20 border border-red-900/50 rounded text-sm text-red-500"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedFilters([]);
                    }}
                  >
                    CLEAR_FILTERS
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Emergency Protocols Tab */}
        {activeTab === 'emergency' && (
          <div>
            <div className="bg-red-900/20 border border-red-900 rounded-lg p-4 mb-6 flex items-start">
              <AlertTriangle size={24} className="mr-3 mt-1 text-red-500 flex-shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">EMERGENCY CONTACT INFORMATION</h4>
                <p className="text-sm text-gray-300">
                  For all medical emergencies, contact the People's Clinic emergency channel at <span className="text-red-500 font-bold">FREQ-774</span>. 
                  This encrypted channel is monitored 24/7 by medical staff and the Defense Committee.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {emergencyProtocols.map(protocol => (
                <div key={protocol.id} className="border border-red-900 rounded-lg overflow-hidden bg-black">
                  <div className="p-3 bg-red-900/30 border-b border-red-700 flex items-center">
                    <Zap size={16} className="mr-2 text-red-500" />
                    <h4 className="font-mono text-red-500 font-bold">{protocol.title}</h4>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-gray-300 mb-4">{protocol.description}</p>
                    
                    <div className="mb-4">
                      <h5 className="text-xs font-mono text-red-500 mb-2">RESPONSE_PROTOCOL</h5>
                      <ol className="text-sm text-gray-300 space-y-2">
                        {protocol.steps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    {protocol.notes && (
                      <div className="p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
                        <div className="flex items-center mb-1">
                          <Info size={14} className="mr-1 text-red-500" />
                          <span className="text-xs font-mono text-red-500">IMPORTANT_NOTES</span>
                        </div>
                        <p className="text-sm text-gray-300">{protocol.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="p-4 border border-red-900 rounded-lg bg-black flex items-center justify-between">
                <div className="flex items-center">
                  <Clipboard size={20} className="mr-3 text-red-500" />
                  <div>
                    <h5 className="font-bold text-white">EMERGENCY PROTOCOLS QUICK REFERENCE</h5>
                    <p className="text-sm text-gray-400">Downloadable quick reference guide for all emergency procedures</p>
                  </div>
                </div>
                
                <button className="px-3 py-2 bg-red-900 border border-red-700 rounded text-white flex items-center hover:bg-red-800">
                  <Download size={16} className="mr-2" />
                  DOWNLOAD
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Training Materials Tab */}
        {activeTab === 'resources' && (
          <div>
            <p className="text-sm text-gray-300 mb-6">
              The RSC's medical education program develops community health workers and medtechs through 
              hands-on training and comprehensive resources. These materials are freely available to all 
              community members.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-red-900 rounded-lg p-4 bg-black">
                <div className="flex items-center mb-3">
                  <Clipboard size={20} className="mr-2 text-red-500" />
                  <h4 className="font-bold text-white">FIRST AID FUNDAMENTALS</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Comprehensive guide to basic emergency care in Combat Zone conditions. Covers wound treatment, 
                  stabilization, and triage with minimal equipment.
                </p>
                <button className="w-full p-2 bg-red-900 border border-red-700 text-white rounded flex items-center justify-center hover:bg-red-800">
                  <Download size={16} className="mr-2" />
                  DOWNLOAD_GUIDE
                </button>
              </div>
              
              <div className="border border-red-900 rounded-lg p-4 bg-black">
                <div className="flex items-center mb-3">
                  <Clipboard size={20} className="mr-2 text-red-500" />
                  <h4 className="font-bold text-white">RADIATION FIELD MANUAL</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Detection, treatment, and decontamination procedures for radiation exposure. 
                  Includes medication protocols and long-term management.
                </p>
                <button className="w-full p-2 bg-red-900 border border-red-700 text-white rounded flex items-center justify-center hover:bg-red-800">
                  <Download size={16} className="mr-2" />
                  DOWNLOAD_GUIDE
                </button>
              </div>
              
              <div className="border border-red-900 rounded-lg p-4 bg-black">
                <div className="flex items-center mb-3">
                  <Clipboard size={20} className="mr-2 text-red-500" />
                  <h4 className="font-bold text-white">COMMUNITY HEALTH ASSESSMENT</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Tools for identifying and addressing neighborhood health needs. Includes 
                  environmental hazard recognition and collective response strategies.
                </p>
                <button className="w-full p-2 bg-red-900 border border-red-700 text-white rounded flex items-center justify-center hover:bg-red-800">
                  <Download size={16} className="mr-2" />
                  DOWNLOAD_GUIDE
                </button>
              </div>
              
              <div className="border border-red-900 rounded-lg p-4 bg-black">
                <div className="flex items-center mb-3">
                  <Clipboard size={20} className="mr-2 text-red-500" />
                  <h4 className="font-bold text-white">MENTAL HEALTH SUPPORT</h4>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  Recognition and response techniques for trauma, anxiety, and other common 
                  mental health challenges in high-stress environments.
                </p>
                <button className="w-full p-2 bg-red-900 border border-red-700 text-white rounded flex items-center justify-center hover:bg-red-800">
                  <Download size={16} className="mr-2" />
                  DOWNLOAD_GUIDE
                </button>
              </div>
            </div>
            
            <div className="border border-red-900 rounded-lg p-4 bg-black mb-6">
              <div className="flex items-center mb-3">
                <Users size={20} className="mr-2 text-red-500" />
                <h4 className="font-bold text-white">COMMUNITY HEALTH WORKER TRAINING</h4>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                The RSC's Community Health Worker program trains neighborhood residents in basic medical care, 
                preventative health, and community organizing. Training sessions are held monthly at the People's Center.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 p-2 bg-red-900 border border-red-700 text-white rounded flex items-center justify-center hover:bg-red-800">
                  <CheckCircle size={16} className="mr-2" />
                  REGISTER_FOR_TRAINING
                </button>
                <button className="flex-1 p-2 bg-black border border-red-900 text-red-500 rounded flex items-center justify-center hover:bg-red-900/20">
                  <Info size={16} className="mr-2" />
                  PROGRAM_DETAILS
                </button>
              </div>
            </div>
            
            <div className="border border-red-900 rounded-lg p-4 bg-black">
              <div className="flex items-center mb-3">
                <Map size={20} className="mr-2 text-red-500" />
                <h4 className="font-bold text-white">MEDICAL FACILITY MAP</h4>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                Interactive map showing all RSC medical facilities, community health worker locations, and danger zones 
                with known health hazards throughout South Night City.
              </p>
              <button className="w-full p-2 bg-red-900 border border-red-700 text-white rounded flex items-center justify-center hover:bg-red-800">
                <Map size={16} className="mr-2" />
                VIEW_INTERACTIVE_MAP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalResources;