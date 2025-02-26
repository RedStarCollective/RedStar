import React, { useState } from 'react';
import { Users, Heart, ShieldAlert, BookOpen, Utensils, Terminal, Hammer, Star } from 'lucide-react';

const PersonnelProfiles = () => {
  const [activeProfile, setActiveProfile] = useState('io');
  
  const personnel = [
    {
      id: 'io',
      name: 'IŌ',
      role: 'Co-Chair, Revolutionary Committee',
      specialty: 'Medical Director & Martial Arts Training',
      image: "/src/assets/io.png", // Would need to be added to your project
      background: "Kōru Singh learned what revolution meant at age seven, when his parents died helping birth the Highrider nation. His journey from orbital medical student to revolutionary leader began when searching for his grandfather in Night City led to establishing the Comrade Clinic, which eventually evolved into the Red Star Collective.",
      quote: "The struggle isn't about individuals - it's about building systems that enable collective survival and dignity.",
      committee: "Revolutionary Committee",
      icon: <Star />
    },
    {
      id: 'lefou',
      name: 'LE FOU',
      role: 'Co-Chair, Revolutionary Committee',
      specialty: 'Strategic Planning & Cultural Development',
      image: "/src/assets/lefou.png", // Would need to be added to your project
      background: "Former NCU theater professor who transformed their academic knowledge and extensive street connections into revolutionary praxis. Their partnership with Iō created the foundation for the RSC's coordinated approach to political organizing.",
      quote: "Revolution isn't just about breaking chains - it's about building something worth fighting for.",
      committee: "Revolutionary Committee & Cultural Committee",
      icon: <Star />
    },
    {
      id: 'sorry',
      name: 'SORRY',
      role: 'Head of Security',
      specialty: 'Combat Training & Tactical Defense',
      image: "/src/assets/sorry.png", // Would need to be added to your project
      background: "Recognized by the flower pinned above her eye and masterwork swords at her hip, Sorry runs the Wuguan with a focus on practical combat skills. Her direct approach and minimal words are balanced by her dedication to teaching combat zone survival tactics.",
      quote: "Talk less, train more. The streets don't care about your theories.",
      committee: "Defense Committee",
      icon: <ShieldAlert />
    },
    {
      id: 'minata',
      name: 'MINATA TINDANO',
      role: 'Chief Medical Officer',
      specialty: 'Comprehensive Healthcare & Medtech Training',
      image: "/src/assets/minata.png", // Would need to be added to your project
      background: "Started at Savage Docs in South Night City at sixteen after family tragedy. Her journey from self-taught medtech to one of the People's Center's primary physicians demonstrates her commitment to accessible healthcare.",
      quote: "Healthcare isn't charity - it's a fundamental right we build together.",
      committee: "Health Committee",
      icon: <Heart />
    },
    {
      id: 'chanwoo',
      name: 'CHAN-WOO PARK',
      role: 'Kitchen Director',
      specialty: 'Food Production & Resource Management',
      image: "/src/assets/chanwoo.png", // Would need to be added to your project
      background: "Former street racer whose father's addiction treatment at the Comrade Clinic brought him into revolutionary work. Now runs the People's Center kitchen, transforming limited supplies into meals that sustain both bodies and spirits.",
      quote: "Revolution begins with feeding people. Everything else comes after.",
      committee: "Logistics Committee",
      icon: <Utensils />
    },
    {
      id: 'daiyu',
      name: 'DAI-YU WU',
      role: 'Education Director',
      specialty: 'Political Education & Theoretical Development',
      image: "/src/assets/daiyu.png", // Would need to be added to your project
      background: "Daughter of Beijing party officials who came to Night City University to study organizing in failed capitalist states. Personal tragedy transformed her theoretical understanding into practical revolutionary work.",
      quote: "Theory without practice is empty; practice without theory is blind.",
      committee: "Education Committee",
      icon: <BookOpen />
    },
    {
      id: 'leonard',
      name: 'LEONARD TURNER',
      role: 'Technical Specialist',
      specialty: 'Construction & Infrastructure',
      image: "/src/assets/leonard.png", // Would need to be added to your project
      background: "Former construction foreman whose attempts to organize workers led to blacklisting. His knowledge of buildings and infrastructure now serves community needs through practical workshops and support for Combat Zone residents.",
      quote: "We're not just fixing broken buildings - we're building something new.",
      committee: "Logistics Committee",
      icon: <Hammer />
    },
    {
      id: 'nomar',
      name: 'NOMAR OTERO',
      role: 'Community Liaison',
      specialty: 'Outreach & Street Intelligence',
      image: "/src/assets/nomar.png", // Would need to be added to your project
      background: "Grew up navigating Heywood's complex social landscape, learning how to talk to anyone. His partnership with Iō began through shared work in high-end clubs and evolved into revolutionary organizing.",
      quote: "Revolution isn't about the loudest voice - it's about bringing everyone to the table.",
      committee: "Education Committee",
      icon: <Users />
    }
  ];
  
  const activePersonnel = personnel.find(p => p.id === activeProfile);

  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <Users size={16} className="mr-2" />
          RSC_CORE_CADRE
        </h3>
        <div className="text-xs text-red-400 font-mono">
          SECURITY_CLEARANCE: REQUIRED
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Sidebar with personnel list */}
        <div className="w-full md:w-1/4 border-r border-red-900">
          <div className="p-2 border-b border-red-900 text-xs font-mono text-red-500">
            SELECT_PERSONNEL
          </div>
          <div className="overflow-y-auto max-h-96">
            {personnel.map(person => (
              <div 
                key={person.id}
                className={`p-3 border-b border-red-900/30 cursor-pointer flex items-center ${activeProfile === person.id ? 'bg-red-900/30 text-white' : 'hover:bg-red-900/10 text-gray-400'}`}
                onClick={() => setActiveProfile(person.id)}
              >
                <div className="mr-2 text-red-500">
                  {person.icon}
                </div>
                <div>
                  <div className="font-bold">{person.name}</div>
                  <div className="text-xs opacity-80">{person.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main profile display */}
        <div className="w-full md:w-3/4 p-4">
          {activePersonnel && (
            <div className="flex flex-col md:flex-row">
              {/* Profile image placeholder - would be an actual image in implementation */}
              <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4">
                <div className="w-full aspect-square bg-red-900/20 border border-red-700 rounded-lg flex items-center justify-center">
                  <div className="text-6xl text-red-500">✪</div>
                </div>
                
                <div className="mt-4 p-3 bg-red-900/10 border border-red-900 rounded-lg">
                  <div className="text-sm font-mono mb-2 text-red-500">OPERATIONAL_DATA</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">COMMITTEE:</span>
                      <span className="text-gray-300">{activePersonnel.committee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">SPECIALTY:</span>
                      <span className="text-gray-300">{activePersonnel.specialty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">STATUS:</span>
                      <span className="text-green-500">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile information */}
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-mono text-red-500 font-bold mb-2 flex items-center">
                  {activePersonnel.name}
                </h2>
                <div className="text-sm text-gray-400 mb-4">{activePersonnel.role}</div>
                
                <div className="mb-4 p-4 bg-black border border-red-900 rounded-lg text-gray-300">
                  <p className="text-sm">{activePersonnel.background}</p>
                </div>
                
                <div className="p-3 font-italic text-sm text-red-400 border-l-2 border-red-900">
                  "{activePersonnel.quote}"
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-red-900 border border-red-700 rounded hover:bg-red-800 text-xs font-mono">
                    CONTACT
                  </button>
                  <button className="px-3 py-1 bg-black border border-red-700 rounded hover:bg-red-900/30 text-xs font-mono">
                    TRAINING_SCHEDULE
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

export default PersonnelProfiles;