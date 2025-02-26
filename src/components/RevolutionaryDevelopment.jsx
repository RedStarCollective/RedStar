import React, { useState } from 'react';
import { Users, ArrowRight, BookOpen, ShieldAlert, Heart, Star, Utensils, ChevronDown, ChevronUp } from 'lucide-react';

const RevolutionaryDevelopment = () => {
  const [activeTab, setActiveTab] = useState('membership');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  
  const toggleFAQ = (id) => {
    if (expandedFAQ === id) {
      setExpandedFAQ(null);
    } else {
      setExpandedFAQ(id);
    }
  };
  
  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <Star size={16} className="mr-2" />
          REVOLUTIONARY_DEVELOPMENT
        </h3>
      </div>
      
      {/* Tabs for different sections */}
      <div className="flex border-b border-red-900 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('membership')}
          className={`px-4 py-2 whitespace-nowrap font-mono ${activeTab === 'membership' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          MEMBERSHIP_PATHWAY
        </button>
        <button 
          onClick={() => setActiveTab('education')}
          className={`px-4 py-2 whitespace-nowrap font-mono ${activeTab === 'education' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          POLITICAL_EDUCATION
        </button>
        <button 
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2 whitespace-nowrap font-mono ${activeTab === 'faq' ? 'bg-red-900/30 text-white border-b-2 border-red-500' : 'text-gray-400 hover:bg-red-900/10'}`}
        >
          COMMON_QUESTIONS
        </button>
      </div>
      
      <div className="p-4">
        {/* Membership Pathway Tab */}
        {activeTab === 'membership' && (
          <div>
            <p className="text-sm text-gray-300 mb-6">
              The Red Star Collective's revolutionary development follows a structured pathway that transforms individual consciousness through practical work and political education. This three-tier system builds both security and capacity while ensuring proper development.
            </p>
            
            <div className="relative">
              {/* Connection lines */}
              <div className="absolute left-1/2 top-24 bottom-24 w-px bg-red-700 -translate-x-1/2 z-0"></div>
              <div className="absolute left-1/2 top-24 w-4 h-4 bg-red-900 border border-red-700 rounded-full -translate-x-1/2 z-10"></div>
              <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-red-900 border border-red-700 rounded-full -translate-x-1/2 z-10"></div>
              <div className="absolute left-1/2 bottom-24 w-4 h-4 bg-red-900 border border-red-700 rounded-full -translate-x-1/2 z-10"></div>
              
              {/* Level 1: Mass Organization Member */}
              <div className="relative z-20 mb-16">
                <div className="mx-auto w-full md:w-2/3 p-4 bg-black border border-red-900 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-900/30 rounded-full flex items-center justify-center mr-3 text-red-500">
                      <Users size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-red-500">MASS ORGANIZATION MEMBER</h4>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">
                    Initial participation in People's Center programs with minimal vetting. Your interactions become part of ongoing evaluation as you learn and contribute.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs mb-3">
                    <div className="p-2 bg-red-900/10 rounded border border-red-900/30">
                      <div className="flex items-center text-red-500 mb-1">
                        <Utensils size={12} className="mr-1" />
                        <span>COMMUNITY PROGRAMS</span>
                      </div>
                      <p className="text-gray-400">Participate in meals, mutual aid, and public events</p>
                    </div>
                    <div className="p-2 bg-red-900/10 rounded border border-red-900/30">
                      <div className="flex items-center text-red-500 mb-1">
                        <BookOpen size={12} className="mr-1" />
                        <span>BASIC EDUCATION</span>
                      </div>
                      <p className="text-gray-400">Join open study groups and public workshops</p>
                    </div>
                    <div className="p-2 bg-red-900/10 rounded border border-red-900/30">
                      <div className="flex items-center text-red-500 mb-1">
                        <ShieldAlert size={12} className="mr-1" />
                        <span>SELF-DEFENSE</span>
                      </div>
                      <p className="text-gray-400">Learn fundamental self-defense in community classes</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 italic">
                    "From each according to their ability, to each according to their needs."
                  </div>
                </div>
              </div>
              
              {/* Level 2: Candidate Member */}
              <div className="relative z-20 mb-16">
                <div className="mx-auto w-full md:w-2/3 p-4 bg-black border border-red-700 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-900/50 rounded-full flex items-center justify-center mr-3 text-red-500">
                      <ArrowRight size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-red-500">CANDIDATE MEMBER</h4>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">
                    Demonstrated reliability through sustained participation leads to Candidate status. You undergo structured political education while maintaining community work.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs mb-3">
                    <div className="p-2 bg-red-900/20 rounded border border-red-800/50">
                      <div className="flex items-center text-red-400 mb-1">
                        <Users size={12} className="mr-1" />
                        <span>ORGANIZATIONAL PROCESS</span>
                      </div>
                      <p className="text-gray-400">Learn about our structure and decision-making</p>
                    </div>
                    <div className="p-2 bg-red-900/20 rounded border border-red-800/50">
                      <div className="flex items-center text-red-400 mb-1">
                        <BookOpen size={12} className="mr-1" />
                        <span>ADVANCED THEORY</span>
                      </div>
                      <p className="text-gray-400">Participate in structured theoretical development</p>
                    </div>
                    <div className="p-2 bg-red-900/20 rounded border border-red-800/50">
                      <div className="flex items-center text-red-400 mb-1">
                        <Heart size={12} className="mr-1" />
                        <span>SPECIALIZED TRAINING</span>
                      </div>
                      <p className="text-gray-400">Develop skills in your area of revolutionary interest</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 italic">
                    "Practice without theory is blind; theory without practice is sterile."
                  </div>
                </div>
              </div>
              
              {/* Level 3: Full Member */}
              <div className="relative z-20">
                <div className="mx-auto w-full md:w-2/3 p-4 bg-black border border-red-600 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-red-900/70 rounded-full flex items-center justify-center mr-3 text-red-500">
                      <Star size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-red-500">FULL MEMBER</h4>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">
                    Having completed comprehensive development, you operate under democratic centralist discipline and handle sensitive operations as part of a Work Gang.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs mb-3">
                    <div className="p-2 bg-red-900/30 rounded border border-red-700">
                      <div className="flex items-center text-red-400 mb-1">
                        <Users size={12} className="mr-1" />
                        <span>WORK GANG ASSIGNMENT</span>
                      </div>
                      <p className="text-gray-400">Operate in specialized revolutionary units</p>
                    </div>
                    <div className="p-2 bg-red-900/30 rounded border border-red-700">
                      <div className="flex items-center text-red-400 mb-1">
                        <ShieldAlert size={12} className="mr-1" />
                        <span>OPERATIONAL SECURITY</span>
                      </div>
                      <p className="text-gray-400">Maintain discipline and security protocols</p>
                    </div>
                    <div className="p-2 bg-red-900/30 rounded border border-red-700">
                      <div className="flex items-center text-red-400 mb-1">
                        <Star size={12} className="mr-1" />
                        <span>STRATEGIC DIRECTION</span>
                      </div>
                      <p className="text-gray-400">Participate in organizational decision-making</p>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 italic">
                    "Freedom of discussion, unity in action."
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button className="px-4 py-2 bg-red-900 border border-red-700 rounded hover:bg-red-800 font-mono">
                BEGIN_YOUR_JOURNEY
              </button>
            </div>
          </div>
        )}
        
        {/* Political Education Tab */}
        {activeTab === 'education' && (
          <div>
            <p className="text-sm text-gray-300 mb-6">
              The Red Star Collective's political education combines theoretical study with practical application. Our programs develop both individual consciousness and collective capability through structured learning experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-black border border-red-900 rounded-lg">
                <h4 className="text-lg font-bold text-red-500 mb-3">THEORETICAL FOUNDATIONS</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong className="text-red-400">Revolutionary Theory:</strong> Study groups on historical movements and theoretical frameworks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong className="text-red-400">Night City Analysis:</strong> Understanding local material conditions and power structures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong className="text-red-400">Strategic Thinking:</strong> Learning to analyze concrete situations and develop appropriate responses</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-black border border-red-900 rounded-lg">
                <h4 className="text-lg font-bold text-red-500 mb-3">PRACTICAL SKILLS</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong className="text-red-400">Community Organizing:</strong> Building collective power through mass work</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong className="text-red-400">Security Culture:</strong> Operating safely in hostile environments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span><strong className="text-red-400">Technical Capabilities:</strong> From medical care to digital security to urban survival</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-black border border-red-900 rounded-lg mb-6">
              <h4 className="text-lg font-bold text-red-500 mb-3">CURRENT STUDY PROGRAMS</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="p-3 bg-red-900/10 rounded border border-red-900/30">
                  <div className="text-red-500 font-bold mb-1">BEGINNERS CIRCLE</div>
                  <p className="text-xs text-gray-400 mb-2">Introduction to revolutionary concepts and Night City conditions</p>
                  <div className="text-xs text-gray-500">MEETS: Tuesdays, 1900 • LOCATION: Main Hall</div>
                </div>
                
                <div className="p-3 bg-red-900/10 rounded border border-red-900/30">
                  <div className="text-red-500 font-bold mb-1">INTERMEDIATE STUDY</div>
                  <p className="text-xs text-gray-400 mb-2">Historical revolutionary movements and their applications</p>
                  <div className="text-xs text-gray-500">MEETS: Thursdays, 1900 • LOCATION: Library</div>
                </div>
                
                <div className="p-3 bg-red-900/10 rounded border border-red-900/30">
                  <div className="text-red-500 font-bold mb-1">ADVANCED THEORY</div>
                  <p className="text-xs text-gray-400 mb-2">Dialectical analysis and strategic development</p>
                  <div className="text-xs text-gray-500">MEETS: By arrangement • LOCATION: Varies</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="px-4 py-2 bg-red-900 border border-red-700 rounded hover:bg-red-800 font-mono">
                ACCESS_READING_MATERIALS
              </button>
            </div>
          </div>
        )}
        
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div>
            <p className="text-sm text-gray-300 mb-6">
              Common questions about joining the Red Star Collective and participating in revolutionary work.
            </p>
            
            <div className="space-y-3">
              {/* FAQ Item 1 */}
              <div className="border border-red-900 rounded-lg overflow-hidden">
                <div 
                  className={`p-3 flex justify-between items-center cursor-pointer ${expandedFAQ === 1 ? 'bg-red-900/30' : 'bg-black'}`}
                  onClick={() => toggleFAQ(1)}
                >
                  <div className="font-mono text-red-500">Do I need to be a Marxist to join?</div>
                  {expandedFAQ === 1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                
                {expandedFAQ === 1 && (
                  <div className="p-3 border-t border-red-900/30 text-sm text-gray-300">
                    <p>
                      No, political alignment is not a prerequisite for initial participation in our programs. We welcome anyone who wants to build community power and meet immediate material needs. Many of our current members began without formal political education and developed their understanding through our programs.
                    </p>
                    <p className="mt-2">
                      While our organization is guided by Marxist-Leninist principles, Mass Organization Members participate based on practical solidarity rather than ideological commitment. As members develop, political education becomes a more significant component of their work.
                    </p>
                  </div>
                )}
              </div>
              
              {/* FAQ Item 2 */}
              <div className="border border-red-900 rounded-lg overflow-hidden">
                <div 
                  className={`p-3 flex justify-between items-center cursor-pointer ${expandedFAQ === 2 ? 'bg-red-900/30' : 'bg-black'}`}
                  onClick={() => toggleFAQ(2)}
                >
                  <div className="font-mono text-red-500">What kind of time commitment is required?</div>
                  {expandedFAQ === 2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                
                {expandedFAQ === 2 && (
                  <div className="p-3 border-t border-red-900/30 text-sm text-gray-300">
                    <p>
                      Initial participation as a Mass Organization Member has flexible time commitments. You might attend community meals, participate in occasional study groups, or volunteer at mutual aid events based on your availability.
                    </p>
                    <p className="mt-2">
                      As you advance to Candidate Member, you'll typically commit to weekly meetings and specific work assignments. Full Members undertake more significant responsibilities within their Work Gangs and committees.
                    </p>
                    <p className="mt-2">
                      We recognize the material realities of Night City and work to accommodate different schedules and capacities. Some of our most valuable members contribute just a few hours weekly but do so with consistency and commitment.
                    </p>
                  </div>
                )}
              </div>
              
              {/* FAQ Item 3 */}
              <div className="border border-red-900 rounded-lg overflow-hidden">
                <div 
                  className={`p-3 flex justify-between items-center cursor-pointer ${expandedFAQ === 3 ? 'bg-red-900/30' : 'bg-black'}`}
                  onClick={() => toggleFAQ(3)}
                >
                  <div className="font-mono text-red-500">Is it dangerous to join the RSC?</div>
                  {expandedFAQ === 3 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                
                {expandedFAQ === 3 && (
                  <div className="p-3 border-t border-red-900/30 text-sm text-gray-300">
                    <p>
                      Survival in Night City's Combat Zone is inherently dangerous regardless of affiliation. The RSC provides community defense networks and practical security training that can enhance your safety rather than compromise it.
                    </p>
                    <p className="mt-2">
                      Our organizational security measures protect members at all levels. Mass Organization Members participate in public programs with minimal security exposure. As members develop, they learn appropriate security protocols for their level of involvement.
                    </p>
                    <p className="mt-2">
                      We take security seriously and have successfully defended our community against corporate hit squads, gang incursions, and environmental disasters. Our collective approach to security has proven more effective than individualized protection.
                    </p>
                  </div>
                )}
              </div>
              
              {/* FAQ Item 4 */}
              <div className="border border-red-900 rounded-lg overflow-hidden">
                <div 
                  className={`p-3 flex justify-between items-center cursor-pointer ${expandedFAQ === 4 ? 'bg-red-900/30' : 'bg-black'}`}
                  onClick={() => toggleFAQ(4)}
                >
                  <div className="font-mono text-red-500">What practical support can the RSC provide?</div>
                  {expandedFAQ === 4 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
                
                {expandedFAQ === 4 && (
                  <div className="p-3 border-t border-red-900/30 text-sm text-gray-300">
                    <p>
                      Our support systems include:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Medical care through the People's Clinic (emergency treatment, radiation medicine, mental health support)</li>
                      <li>Regular community meals and food distribution through our kitchen</li>
                      <li>Practical skills training for Combat Zone survival</li>
                      <li>Community defense networks for neighborhood security</li>
                      <li>Emergency shelter during crises like Storm Ardent</li>
                      <li>Connections to employment, housing, and other resources</li>
                    </ul>
                    <p className="mt-2">
                      The nature of support evolves as you become more involved with the organization, with Full Members having access to more comprehensive resources and networks.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevolutionaryDevelopment;