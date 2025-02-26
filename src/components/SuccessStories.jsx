import React, { useState } from 'react';
import { Star, Shield, Heart, ChevronLeft, ChevronRight, Users, Radio, Utensils, AlertTriangle } from 'lucide-react';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  
  const stories = [
    {
      id: 1,
      title: "STORM ARDENT COLLECTIVE RESPONSE",
      date: "January 2045",
      category: "CRISIS RESPONSE",
      icon: <AlertTriangle size={20} className="text-yellow-500" />,
      image: "storm-ardent.jpg",
      summary: "When corporate relief efforts failed to reach South Night City during Storm Ardent, the RSC transformed the People's Center into a refuge for hundreds of displaced residents.",
      impact: [
        "Evacuated 347 residents from flooding zones with zero casualties",
        "Provided shelter to 203 displaced individuals for 8+ days",
        "Distributed clean water to 1,500+ residents",
        "Established decentralized medical checkpoints across 5 neighborhoods",
        "Created community-led recovery teams for rebuilding efforts"
      ],
      quotes: [
        { text: "The corps never came. But the Red Star did. That's when I knew whose side I was on.", author: "Maya Chen, South Night City resident" }
      ],
      lessons: "Storm Ardent demonstrated that working-class solidarity is not abstract theory but concrete survival strategy. Our rapid response was possible because of pre-existing organizational structures and community trust built through consistent mutual aid work."
    },
    {
      id: 2,
      title: "RADIATION MEDICINE DISTRIBUTION NETWORK",
      date: "March 2045",
      category: "MUTUAL AID",
      icon: <Heart size={20} className="text-red-500" />,
      image: "radiation-meds.jpg",
      summary: "After discovering 6th Street gang members price-gouging essential radiation medication, the RSC established a sustainable distribution network for South Night City residents.",
      impact: [
        "Secured stable supply of radiation medication for 500+ residents",
        "Reduced medication costs by 78% compared to gang-controlled prices",
        "Trained 23 community health workers in radiation sickness treatment",
        "Established 5 neighborhood distribution points with community oversight",
        "Documented 67% reduction in radiation-related deaths in affected areas"
      ],
      quotes: [
        { text: "My sister was dying. I couldn't afford the meds. Then these people I never met before handed me what she needed and asked for nothing. Nothing.", author: "Javier Reyes, Watson resident" }
      ],
      lessons: "Direct action against exploitative pricing wasn't enough - we needed to replace the broken system with a community-controlled alternative. Medicine is a right, not a commodity, and our distribution network demonstrates this principle in practice."
    },
    {
      id: 3,
      title: "UNIVERSITY CARGO BAY TENANT ORGANIZING",
      date: "August 2045",
      category: "HOUSING DEFENSE",
      icon: <Users size={20} className="text-blue-500" />,
      image: "tenant-organizing.jpg",
      summary: "When corporate developers attempted mass evictions in the University Cargo Bay container housing, RSC-trained tenant organizers successfully resisted through collective action.",
      impact: [
        "Prevented eviction of 83 families through direct action and legal resistance",
        "Established tenant council with democratic decision-making structures",
        "Negotiated 35% rent reduction and mandatory maintenance schedule",
        "Created emergency response network to block future eviction attempts",
        "Inspired formation of 3 additional tenant councils in neighboring areas"
      ],
      quotes: [
        { text: "They wanted to throw us away like trash. Together, we showed them we're not disposable.", author: "Ada Nowak, Tenant Council President" }
      ],
      lessons: "Housing is a perpetual battlefield in Night City. Our victory demonstrated that collective resistance can succeed against seemingly untouchable corporate interests when tenants move from atomized individuals to organized community."
    },
    {
      id: 4,
      title: "PEOPLE'S CLINIC RADIATION THERAPY PROGRAM",
      date: "February 2046",
      category: "HEALTHCARE",
      icon: <Heart size={20} className="text-red-500" />,
      image: "radiation-therapy.jpg",
      summary: "Developed comprehensive radiation treatment capabilities at the People's Clinic, providing care that would cost thousands through corporate providers.",
      impact: [
        "Established Night City's only donation-based radiation therapy program",
        "Treated 124 patients with advanced radiation sickness in first 3 months",
        "Achieved 86% recovery rate for moderate contamination cases",
        "Created detailed treatment protocols shared with other community clinics",
        "Trained 17 neighborhood medtechs in basic radiation treatment"
      ],
      quotes: [
        { text: "Before the People's Clinic, radiation sickness was a death sentence for those of us in the Combat Zone. Now there's hope.", author: "Dr. Tindano, Health Committee" }
      ],
      lessons: "Corporate healthcare system abandons those without means to pay. Our model proves that community-controlled clinics can deliver quality care without exploitation, laying groundwork for a truly universal healthcare system."
    },
    {
      id: 5,
      title: "GARDENERS COALITION FOOD SOVEREIGNTY PROJECT",
      date: "May 2046",
      category: "FOOD SYSTEMS",
      icon: <Utensils size={20} className="text-green-500" />,
      image: "food-sovereignty.jpg",
      summary: "Partnered with the Gardeners to establish rooftop gardens and vertical farming throughout South Night City, reducing dependence on corporate food sources.",
      impact: [
        "Created 12 community-managed growing sites producing 230+ kg of food monthly",
        "Reduced local food costs by 45% compared to corporate markets",
        "Established seed library with 60+ varieties adapted to Night City conditions",
        "Trained 42 residents in urban agriculture techniques",
        "Provided fresh produce to 300+ families through weekly distribution"
      ],
      quotes: [
        { text: "Control the food supply, control the people. That's why we grow our own.", author: "Chan-Woo Park, Community Kitchen Director" }
      ],
      lessons: "Food sovereignty is revolutionary. Every vegetable grown outside corporate control strengthens community resilience and weakens food monopolies. Our gardens are sites of both sustenance and resistance."
    }
  ];
  
  const nextStory = () => {
    setActiveStory((activeStory + 1) % stories.length);
  };
  
  const prevStory = () => {
    setActiveStory((activeStory - 1 + stories.length) % stories.length);
  };
  
  const currentStory = stories[activeStory];
  
  return (
    <div className="w-full bg-black border-2 border-red-900 rounded-lg overflow-hidden">
      <div className="p-3 bg-red-900/30 border-b border-red-700 flex justify-between items-center">
        <h3 className="font-mono text-red-500 font-bold flex items-center">
          <Star size={16} className="mr-2" />
          REVOLUTIONARY_VICTORIES
        </h3>
        <div className="text-xs text-red-400 font-mono">
          {activeStory + 1}/{stories.length}
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center p-2 bg-black border-b border-red-900/30">
        {stories.map((story, index) => (
          <button 
            key={story.id}
            onClick={() => setActiveStory(index)}
            className={`w-2 h-2 mx-1 rounded-full ${activeStory === index ? 'bg-red-500' : 'bg-red-900/30'}`}
            aria-label={`View story ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="p-4">
        {/* Main story content */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image placeholder - would be a real image in implementation */}
          <div className="w-full md:w-2/5 mb-4 md:mb-0">
            <div className="aspect-video bg-red-900/20 border border-red-900 rounded-lg overflow-hidden relative flex items-center justify-center">
              <div className="p-4 text-center text-red-500 opacity-50">
                [IMAGE: {currentStory.title}]
              </div>
              {/* This would be an actual image: <img src={currentStory.image} alt={currentStory.title} className="w-full h-full object-cover" /> */}
              
              {/* Category badge */}
              <div className="absolute top-2 left-2 bg-black/80 border border-red-900 rounded px-2 py-1 text-xs font-mono flex items-center">
                {currentStory.icon}
                <span className="ml-1 text-red-400">{currentStory.category}</span>
              </div>
              
              {/* Date badge */}
              <div className="absolute bottom-2 right-2 bg-black/80 border border-red-900 rounded px-2 py-1 text-xs font-mono text-gray-400">
                {currentStory.date}
              </div>
            </div>
            
            {/* Quote */}
            {currentStory.quotes && currentStory.quotes.length > 0 && (
              <div className="mt-4 p-3 border-l-2 border-red-900 bg-red-900/10 rounded-r-lg italic text-sm">
                "{currentStory.quotes[0].text}"
                <div className="mt-1 text-xs text-red-400">— {currentStory.quotes[0].author}</div>
              </div>
            )}
          </div>
          
          {/* Story details */}
          <div className="w-full md:w-3/5">
            <h4 className="text-lg font-bold text-red-500 mb-2">{currentStory.title}</h4>
            
            <p className="text-sm text-gray-300 mb-4">
              {currentStory.summary}
            </p>
            
            {/* Impact metrics */}
            <div className="mb-4">
              <h5 className="text-xs font-mono text-red-500 mb-2">MATERIAL_IMPACT</h5>
              <ul className="text-sm text-gray-300 space-y-1">
                {currentStory.impact.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Lessons */}
            <div className="p-3 bg-red-900/10 border border-red-900/30 rounded-lg">
              <h5 className="text-xs font-mono text-red-500 mb-2">REVOLUTIONARY_LESSONS</h5>
              <p className="text-sm text-gray-300">
                {currentStory.lessons}
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation controls */}
        <div className="flex justify-between mt-6">
          <button 
            onClick={prevStory}
            className="px-3 py-1 bg-black border border-red-900 rounded flex items-center text-sm font-mono hover:bg-red-900/20"
          >
            <ChevronLeft size={16} className="mr-1" />
            PREVIOUS
          </button>
          
          <button 
            onClick={nextStory}
            className="px-3 py-1 bg-black border border-red-900 rounded flex items-center text-sm font-mono hover:bg-red-900/20"
          >
            NEXT
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;