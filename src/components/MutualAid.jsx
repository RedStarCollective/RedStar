import React, { useState } from 'react';
import { Heart, Package, Send, Truck, CheckCircle, Calendar, Database, Users, AlertTriangle, MapPin } from 'lucide-react';

const MutualAid = () => {
  const [activeTab, setActiveTab] = useState('requests');
  
  // Sample data for requests and offerings
  const requests = [
    { 
      id: 1, 
      type: 'medical', 
      title: 'Radiation medication needed for family of four', 
      location: 'Watson District, Block 27', 
      urgency: 'high', 
      posted: '2 hours ago',
      status: 'active',
      details: 'Family exposed during factory leak three days ago. Children showing early symptoms. Currently sheltering in place due to NCPD activity in area.'
    },
    { 
      id: 2, 
      type: 'food', 
      title: 'Food needed for elderly residents', 
      location: 'University Cargo Bay, Container Block C', 
      urgency: 'medium', 
      posted: '5 hours ago',
      status: 'active',
      details: 'Seven elderly residents cut off from supply lines after corporate security established checkpoint. Minimal supplies remaining, need basic nonperishables.'
    },
    { 
      id: 3, 
      type: 'shelter', 
      title: 'Emergency housing needed for three', 
      location: 'South Night City', 
      urgency: 'high', 
      posted: '1 day ago',
      status: 'in-progress',
      details: 'Family evicted after rent increase. Two children ages 5 and 8. Currently sheltering in abandoned vehicle. Need temporary housing while RSC legal team challenges eviction.'
    },
    { 
      id: 4, 
      type: 'technical', 
      title: 'Power cell repair for residential block', 
      location: 'Heywood, Wellsprings district', 
      urgency: 'medium', 
      posted: '1 day ago',
      status: 'active',
      details: 'Local power cell damaged during corporate security operation. Affects approximately 120 residents. Need technical expertise and possibly replacement parts.'
    }
  ];
  
  const offerings = [
    { 
      id: 1, 
      type: 'medical', 
      title: 'Basic first aid supplies available', 
      provider: 'Dr. Minata',
      location: 'The People\'s Clinic', 
      posted: '3 hours ago',
      details: 'Trauma bandages, antibiotic ointment, basic pain relievers, and sterile dressings. Available for pickup or delivery within South Night City.'
    },
    { 
      id: 2, 
      type: 'food', 
      title: 'Fresh produce from rooftop garden', 
      provider: 'Chan-Woo',
      location: 'People\'s Center, Floor 3', 
      posted: '6 hours ago',
      details: 'Seasonal vegetables harvested from the rooftop garden project. Available to those in need, emphasis on families with children and elderly.'
    },
    { 
      id: 3, 
      type: 'transport', 
      title: 'Transport available for medical appointments', 
      provider: 'Leonard',
      location: 'South Night City - Watson route', 
      posted: '1 day ago',
      details: 'Secure transport for medical visits. Can accommodate up to three people including those with mobility issues. Available Tuesday-Thursday.'
    },
    { 
      id: 4, 
      type: 'technical', 
      title: 'Repair services for essential electronics', 
      provider: 'Tech Committee',
      location: 'People\'s Center workshop', 
      posted: '2 days ago',
      details: 'Repair services for communications devices, medical equipment, and basic household needs. Bring devices to the workshop or request field service for immobile items.'
    }
  ];
  
  // Current community needs data
  const communityNeeds = {
    medical: [
      'Radiation medication (critical)',
      'Antibiotics',
      'Trauma supplies',
      'Pain management medication',
      'Inhalers'
    ],
    food: [
      'Protein sources',
      'Purified water',
      'Nonperishable staples',
      'Infant formula',
      'Ready-to-eat meals'
    ],
    shelter: [
      'Emergency temporary housing',
      'Blankets',
      'Portable heaters',
      'Water purification',
      'Basic hygiene supplies'
    ],
    services: [
      'Medical transport',
      'Technical repair specialists',
      'Emergency child care',
      'Language translation',
      'Legal advocacy'
    ]
  };
  
  // Get badge color based on urgency
  const getUrgencyBadge = (urgency) => {
    switch(urgency) {
      case 'high':
        return <span className="bg-red-900/30 text-red-500 text-xs px-2 py-0.5 rounded flex items-center"><AlertTriangle size={12} className="mr-1" />URGENT</span>;
      case 'medium':
        return <span className="bg-yellow-900/30 text-yellow-500 text-xs px-2 py-0.5 rounded flex items-center"><AlertTriangle size={12} className="mr-1" />MEDIUM</span>;
      case 'low':
        return <span className="bg-blue-900/30 text-blue-500 text-xs px-2 py-0.5 rounded flex items-center"><AlertTriangle size={12} className="mr-1" />STANDARD</span>;
      default:
        return <span className="bg-gray-900/30 text-gray-500 text-xs px-2 py-0.5 rounded">UNKNOWN</span>;
    }
  };
  
  // Get icon based on resource type
  const getTypeIcon = (type) => {
    switch(type) {
      case 'medical':
        return <Heart size={16} className="text-red-500" />;
      case 'food':
        return <Package size={16} className="text-yellow-500" />;
      case 'shelter':
        return <MapPin size={16} className="text-blue-500" />;
      case 'transport':
        return <Truck size={16} className="text-green-500" />;
      case 'technical':
        return <Database size={16} className="text-purple-500" />;
      default:
        return <Package size={16} className="text-gray-500" />;
    }
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="bg-green-900/30 text-green-500 text-xs px-2 py-0.5 rounded flex items-center">ACTIVE</span>;
      case 'in-progress':
        return <span className="bg-blue-900/30 text-blue-500 text-xs px-2 py-0.5 rounded flex items-center">IN PROGRESS</span>;
      case 'fulfilled':
        return <span className="bg-gray-900/30 text-gray-500 text-xs px-2 py-0.5 rounded flex items-center"><CheckCircle size={12} className="mr-1" />FULFILLED</span>;
      default:
        return <span className="bg-gray-900/30 text-gray-500 text-xs px-2 py-0.5 rounded">UNKNOWN</span>;
    }
  };

  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <Heart size={16} className="mr-2" />
          MUTUAL_AID_NETWORK
        </h3>
        <div className="text-xs text-red-400 font-mono">
          FROM_EACH_ACCORDING_TO_ABILITY
        </div>
      </div>
      
      {/* Navigation tabs */}
      <div className="flex border-b border-red-900 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 whitespace-nowrap font-mono ${activeTab === 'requests' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          RESOURCE_REQUESTS
        </button>
        <button 
          onClick={() => setActiveTab('offerings')}
          className={`px-4 py-2 whitespace-nowrap font-mono ${activeTab === 'offerings' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          RESOURCE_OFFERINGS
        </button>
        <button 
          onClick={() => setActiveTab('needs')}
          className={`px-4 py-2 whitespace-nowrap font-mono ${activeTab === 'needs' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          COMMUNITY_NEEDS
        </button>
        <button 
          onClick={() => setActiveTab('distribution')}
          className={`px-4 py-2 whitespace-nowrap font-mono ${activeTab === 'distribution' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          DISTRIBUTION_NETWORK
        </button>
      </div>
      
      <div className="p-4">
        {/* Resource Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-300">
                Community members in need of resources can submit requests for assistance. All requests are reviewed by the Mutual Aid Committee and matched with available resources.
              </p>
              <button className="px-3 py-2 bg-red-900 border border-red-700 rounded text-white text-sm hover:bg-red-800 font-mono whitespace-nowrap flex-shrink-0 ml-4">
                <Send size={14} className="mr-1 inline" />
                SUBMIT_REQUEST
              </button>
            </div>
            
            <div className="space-y-4">
              {requests.map(request => (
                <div key={request.id} className="border border-red-900/50 rounded-lg overflow-hidden bg-black">
                  <div className="p-3 border-b border-red-900/30 flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {getTypeIcon(request.type)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-200 mb-1">{request.title}</h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin size={12} className="mr-1" />
                          {request.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getUrgencyBadge(request.urgency)}
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-sm text-gray-300 mb-3">{request.details}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Posted: {request.posted}</span>
                      <div className="flex space-x-2">
                        {request.status === 'active' && (
                          <button className="px-3 py-1 bg-red-900 border border-red-700 rounded text-white text-xs hover:bg-red-800 font-mono">
                            FULFILL_REQUEST
                          </button>
                        )}
                        <button className="px-3 py-1 bg-black border border-red-700 rounded text-red-500 text-xs hover:bg-red-900/20 font-mono">
                          CONTACT
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Resource Offerings Tab */}
        {activeTab === 'offerings' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-300">
                Community members can offer resources, skills, and time to support others in need. All offerings are coordinated through the Mutual Aid Committee to ensure equitable distribution.
              </p>
              <button className="px-3 py-2 bg-red-900 border border-red-700 rounded text-white text-sm hover:bg-red-800 font-mono whitespace-nowrap flex-shrink-0 ml-4">
                <Heart size={14} className="mr-1 inline" />
                OFFER_RESOURCES
              </button>
            </div>
            
            <div className="space-y-4">
              {offerings.map(offering => (
                <div key={offering.id} className="border border-red-900/50 rounded-lg overflow-hidden bg-black">
                  <div className="p-3 border-b border-red-900/30 flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        {getTypeIcon(offering.type)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-200 mb-1">{offering.title}</h4>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users size={12} className="mr-1" />
                          Provider: {offering.provider}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-sm text-gray-300 mb-3">{offering.details}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin size={12} className="mr-1" />
                        {offering.location}
                        <span className="mx-2">•</span>
                        Posted: {offering.posted}
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-red-900 border border-red-700 rounded text-white text-xs hover:bg-red-800 font-mono">
                          REQUEST_ACCESS
                        </button>
                        <button className="px-3 py-1 bg-black border border-red-700 rounded text-red-500 text-xs hover:bg-red-900/20 font-mono">
                          DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Community Needs Tab */}
        {activeTab === 'needs' && (
          <div>
            <p className="text-sm text-gray-300 mb-6">
              The Mutual Aid Committee maintains this regularly updated list of critical community needs based on resource requests and ongoing programs. Contributions in these areas have the greatest immediate impact.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black border border-red-900 rounded-lg p-4">
                <h4 className="font-bold text-red-500 mb-4 flex items-center font-mono">
                  <Heart size={18} className="mr-2" />
                  MEDICAL_NEEDS
                </h4>
                <ul className="space-y-2">
                  {communityNeeds.medical.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black border border-red-900 rounded-lg p-4">
                <h4 className="font-bold text-red-500 mb-4 flex items-center font-mono">
                  <Package size={18} className="mr-2" />
                  FOOD_&_WATER
                </h4>
                <ul className="space-y-2">
                  {communityNeeds.food.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black border border-red-900 rounded-lg p-4">
                <h4 className="font-bold text-red-500 mb-4 flex items-center font-mono">
                  <MapPin size={18} className="mr-2" />
                  SHELTER_&_SUPPLIES
                </h4>
                <ul className="space-y-2">
                  {communityNeeds.shelter.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-black border border-red-900 rounded-lg p-4">
                <h4 className="font-bold text-red-500 mb-4 flex items-center font-mono">
                  <Users size={18} className="mr-2" />
                  SERVICES_NEEDED
                </h4>
                <ul className="space-y-2">
                  {communityNeeds.services.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="px-4 py-2 bg-red-900 border border-red-700 rounded text-white hover:bg-red-800 font-mono flex items-center">
                <Heart size={16} className="mr-2" />
                CONTRIBUTE_RESOURCES
              </button>
            </div>
          </div>
        )}
        
        {/* Distribution Network Tab */}
        {activeTab === 'distribution' && (
          <div>
            <p className="text-sm text-gray-300 mb-6">
              The RSC maintains a network of distribution points throughout South Night City to ensure resources reach those who need them. Distribution is organized to avoid corporate and gang surveillance while maximizing accessibility.
            </p>
            
            <div className="border border-red-900 rounded-lg overflow-hidden mb-6">
              <div className="p-3 bg-red-900/30 border-b border-red-700 font-mono text-red-500 font-bold">
                UPCOMING_DISTRIBUTION_EVENTS
              </div>
              <div className="divide-y divide-red-900/30">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">Night Market: General Distribution</h4>
                    <span className="bg-green-900/30 text-green-500 text-xs px-2 py-0.5 rounded">CONFIRMED</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span>February 26, 22:00 - 23:30</span>
                    <span className="mx-2">•</span>
                    <MapPin size={14} className="mr-1" />
                    <span>Old Factory, 7th Street (Watson)</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Regular distribution of food, medical supplies, and general resources. Bring your own containers if possible. Security protocols in effect.
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-3 py-1 bg-red-900 border border-red-700 rounded text-white text-xs hover:bg-red-800 font-mono">
                      VOLUNTEER
                    </button>
                    <button className="px-3 py-1 bg-black border border-red-700 rounded text-red-500 text-xs hover:bg-red-900/20 font-mono">
                      DETAILS
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">Targeted Medical Distribution</h4>
                    <span className="bg-yellow-900/30 text-yellow-500 text-xs px-2 py-0.5 rounded">PLANNING</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span>February 28, 14:00 - 17:00</span>
                    <span className="mx-2">•</span>
                    <MapPin size={14} className="mr-1" />
                    <span>Eastern Watson (Multiple locations)</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Focused distribution of radiation medication and treatment supplies following recent industrial leak. Prioritizing affected families and vulnerable individuals.
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-3 py-1 bg-red-900 border border-red-700 rounded text-white text-xs hover:bg-red-800 font-mono">
                      VOLUNTEER
                    </button>
                    <button className="px-3 py-1 bg-black border border-red-700 rounded text-red-500 text-xs hover:bg-red-900/20 font-mono">
                      DETAILS
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">Community Kitchen Distribution</h4>
                    <span className="bg-green-900/30 text-green-500 text-xs px-2 py-0.5 rounded">CONFIRMED</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span>Daily, 12:00 - 13:30 & 18:00 - 19:30</span>
                    <span className="mx-2">•</span>
                    <MapPin size={14} className="mr-1" />
                    <span>People's Center, 1st Floor</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Regular meal service from the Community Kitchen. All welcome. Take-away containers available for those unable to stay or collecting for others.
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-3 py-1 bg-red-900 border border-red-700 rounded text-white text-xs hover:bg-red-800 font-mono">
                      VOLUNTEER
                    </button>
                    <button className="px-3 py-1 bg-black border border-red-700 rounded text-red-500 text-xs hover:bg-red-900/20 font-mono">
                      DETAILS
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-red-900 rounded-lg overflow-hidden">
              <div className="p-3 bg-red-900/30 border-b border-red-700 font-mono text-red-500 font-bold">
                DISTRIBUTION_PROTOCOLS
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-300 space-y-4">
                  <p>
                    The RSC uses a distributed network model for resource distribution with both fixed and mobile distribution points. This approach maximizes reach while minimizing vulnerability to disruption.
                  </p>
                  
                  <div>
                    <h5 className="text-white font-bold mb-2">Security Measures:</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Distribution locations rotate regularly or use multiple simultaneous points</li>
                      <li>Information shared through secure channels with appropriate timing</li>
                      <li>Defense Committee provides security appropriate to context</li>
                      <li>Surveillance countermeasures deployed at all distribution events</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-bold mb-2">Distribution Principles:</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Resources distributed based on need rather than ability to pay</li>
                      <li>Priority given to vulnerable community members</li>
                      <li>Equitable distribution across neighborhoods rather than first-come basis</li>
                      <li>Both immediate needs and long-term resilience are considered</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MutualAid;