import React, { useState } from 'react';
import { 
  Shield, 
  Heart, 
  Utensils, 
  BookOpen, 
  Users, 
  Radio, 
  Building, 
  ArrowRight, 
  ArrowLeft,
  RefreshCw 
} from 'lucide-react';

const DualPowerStrategy = () => {
  const [activeStrategy, setActiveStrategy] = useState('healthcare');
  
  const strategies = [
    {
      id: 'healthcare',
      title: 'HEALTHCARE',
      capitalistSystem: {
        title: "CORPORATE MEDICINE",
        description: "Trauma Team and insurance-based healthcare exclude most South Night City residents. Radiation sickness, work injuries, and combat trauma go untreated while corporations profit from suffering.",
        examples: [
          "Unaffordable Trauma Team subscriptions",
          "Exploitative pricing on radiation medicine",
          "Treatment denied based on payment status"
        ],
        icon: <Heart size={32} className="text-red-500" />
      },
      revolutionaryAlternative: {
        title: "PEOPLE'S CLINIC",
        description: "Our medical facility provides comprehensive care based on need rather than ability to pay. We're building a healthcare system that serves the community while developing revolutionary consciousness.",
        examples: [
          "Donation-based treatment accessible to all",
          "Radiation medicine distribution network",
          "Community health worker training program"
        ],
        icon: <Heart size={32} className="text-red-500" />
      }
    },
    {
      id: 'food',
      title: 'FOOD SYSTEMS',
      capitalistSystem: {
        title: "CORPORATE FOOD CONTROL",
        description: "Continental Brands and Oasis monopolize food distribution, charging exploitative prices while controlling what people eat. Nutritional quality varies by economic status, enforcing class hierarchies.",
        examples: [
          "Price gouging during emergencies",
          "Nutritional inequality between zones",
          "Corporate sabotage of independent suppliers"
        ],
        icon: <Utensils size={32} className="text-red-500" />
      },
      revolutionaryAlternative: {
        title: "COMMUNITY KITCHEN",
        description: "Our kitchen provides regular community meals while training residents in food production and preparation. In partnership with the Gardeners, we're building sustainable food systems independent of corporate control.",
        examples: [
          "Twice-daily community meals",
          "Partnership with Gardeners for local production",
          "Food distribution during crises"
        ],
        icon: <Utensils size={32} className="text-red-500" />
      }
    },
    {
      id: 'security',
      title: 'SECURITY',
      capitalistSystem: {
        title: "CORPORATE SECURITY STATE",
        description: "NCPD serves corporate interests while gangs exploit power vacuums. Residents face violence from both official forces and criminal elements, with no systems prioritizing their safety.",
        examples: [
          "NCPD protection based on corporate priority",
          "Minimal response to Combat Zone issues",
          "Exploitation by gangs and private security"
        ],
        icon: <Shield size={32} className="text-red-500" />
      },
      revolutionaryAlternative: {
        title: "COMMUNITY DEFENSE",
        description: "Our defense networks combine professional security with neighborhood participation. Through the Defense Committee and local work gangs, we're building security systems that protect rather than exploit.",
        examples: [
          "Neighborhood watch networks",
          "Self-defense training programs",
          "Coordinated response to corporate incursions"
        ],
        icon: <Shield size={32} className="text-red-500" />
      }
    },
    {
      id: 'education',
      title: 'EDUCATION',
      capitalistSystem: {
        title: "CORPORATE KNOWLEDGE CONTROL",
        description: "Night City University serves elite students while Combat Zone residents receive minimal education. Access to knowledge is determined by economic status, reinforcing inequalities.",
        examples: [
          "Prohibitive tuition costs",
          "Restricted access to information",
          "Corporate control of curriculum"
        ],
        icon: <BookOpen size={32} className="text-red-500" />
      },
      revolutionaryAlternative: {
        title: "PEOPLE'S EDUCATION",
        description: "Our education programs democratize knowledge through political theory, practical skills, and revolutionary history. We're building learning systems that empower rather than exclude.",
        examples: [
          "Free study groups and workshops",
          "Technical training programs",
          "Revolutionary theory development"
        ],
        icon: <BookOpen size={32} className="text-red-500" />
      }
    },
    {
      id: 'housing',
      title: 'HOUSING',
      capitalistSystem: {
        title: "CORPORATE HOUSING CONTROL",
        description: "Corporate landlords exploit residents through extortionate rents and dangerous conditions. Evictions are common and housing insecurity endemic throughout South Night City.",
        examples: [
          "Forced evictions for development",
          "Unsafe building conditions",
          "Price gouging during emergencies"
        ],
        icon: <Building size={32} className="text-red-500" />
      },
      revolutionaryAlternative: {
        title: "HOUSING SOLIDARITY",
        description: "Our housing programs organize tenants, provide emergency shelter, and develop maintenance skills. We're building housing systems based on dignity rather than profit.",
        examples: [
          "Tenant organizing against evictions",
          "Emergency shelter during Storm Ardent",
          "Building maintenance training program"
        ],
        icon: <Building size={32} className="text-red-500" />
      }
    },
    {
      id: 'communication',
      title: 'COMMUNICATION',
      capitalistSystem: {
        title: "CORPORATE MEDIA CONTROL",
        description: "News Monopolies like Network 54 control information flow, presenting corporate propaganda as objective reporting. Alternative viewpoints are systematically excluded.",
        examples: [
          "One-sided coverage of corporate actions",
          "Demonization of community resistance",
          "Erasure of working class struggles"
        ],
        icon: <Radio size={32} className="text-red-500" />
      },
      revolutionaryAlternative: {
        title: "PEOPLE'S COMMUNICATIONS",
        description: "Our media networks distribute information through secure channels, cultural events, and community meetings. We're building communication systems that reflect community realities.",
        examples: [
          "Community bulletin boards",
          "Cultural performances with political content", 
          "Secure messaging networks"
        ],
        icon: <Radio size={32} className="text-red-500" />
      }
    }
  ];
  
  const currentStrategy = strategies.find(s => s.id === activeStrategy);
  const currentIndex = strategies.findIndex(s => s.id === activeStrategy);
  
  const nextStrategy = () => {
    const nextIndex = (currentIndex + 1) % strategies.length;
    setActiveStrategy(strategies[nextIndex].id);
  };
  
  const prevStrategy = () => {
    const prevIndex = (currentIndex - 1 + strategies.length) % strategies.length;
    setActiveStrategy(strategies[prevIndex].id);
  };
  
  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <Shield size={16} className="mr-2" />
          DUAL_POWER_STRATEGY
        </h3>
        <div className="text-xs text-red-400 font-mono">
          BUILDING_REVOLUTIONARY_ALTERNATIVES
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-6">
          <p className="text-sm text-gray-300">
            The Red Star Collective builds dual power systems - creating revolutionary alternatives while undermining capitalist institutions. Each program addresses immediate needs while developing structures that prefigure post-revolutionary society.
          </p>
        </div>
        
        {/* Strategy selector */}
        <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
          {strategies.map(strategy => (
            <button
              key={strategy.id}
              onClick={() => setActiveStrategy(strategy.id)}
              className={`px-3 py-1 whitespace-nowrap rounded-full font-mono text-xs flex items-center ${
                activeStrategy === strategy.id 
                ? 'bg-red-900 text-white' 
                : 'bg-black border border-red-700 text-red-400 hover:bg-red-900/20'
              }`}
            >
              {strategy.title}
            </button>
          ))}
        </div>
        
        {/* Main content area */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {/* Left panel: Capitalist System */}
          <div className="w-full md:w-1/2 border border-red-900 rounded-lg p-4 bg-black relative">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-900 opacity-5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
            
            <div className="mb-4 flex items-center">
              {currentStrategy.capitalistSystem.icon}
              <h4 className="ml-3 text-lg font-bold text-red-500">{currentStrategy.capitalistSystem.title}</h4>
            </div>
            
            <p className="text-sm text-gray-300 mb-4">
              {currentStrategy.capitalistSystem.description}
            </p>
            
            <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-3">
              <div className="text-xs text-red-500 mb-2 font-mono">EXAMPLES_OF_EXPLOITATION</div>
              <ul className="text-sm text-gray-300 space-y-2">
                {currentStrategy.capitalistSystem.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Center arrows for desktop */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <ArrowRight size={24} className="text-red-500 mb-2" />
            <RefreshCw size={24} className="text-red-500" />
            <ArrowLeft size={24} className="text-red-500 mt-2" />
          </div>
          
          {/* Right panel: Revolutionary Alternative */}
          <div className="w-full md:w-1/2 border border-red-900 rounded-lg p-4 bg-black relative">
            <div className="absolute bottom-0 left-0 w-2/3 h-1/3 bg-red-900 opacity-5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
            
            <div className="mb-4 flex items-center">
              {currentStrategy.revolutionaryAlternative.icon}
              <h4 className="ml-3 text-lg font-bold text-red-500">{currentStrategy.revolutionaryAlternative.title}</h4>
            </div>
            
            <p className="text-sm text-gray-300 mb-4">
              {currentStrategy.revolutionaryAlternative.description}
            </p>
            
            <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-3">
              <div className="text-xs text-red-500 mb-2 font-mono">REVOLUTIONARY_PROGRAMS</div>
              <ul className="text-sm text-gray-300 space-y-2">
                {currentStrategy.revolutionaryAlternative.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          <button 
            onClick={prevStrategy}
            className="px-3 py-1 bg-black border border-red-700 rounded hover:bg-red-900/20 text-sm flex items-center font-mono"
          >
            <ArrowLeft size={16} className="mr-1" />
            PREV
          </button>
          <button 
            onClick={nextStrategy}
            className="px-3 py-1 bg-black border border-red-700 rounded hover:bg-red-900/20 text-sm flex items-center font-mono"
          >
            NEXT
            <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DualPowerStrategy;