"use client";

import React, { useState, useEffect } from "react";

interface JapaCounterProps {
  variant?: 'light' | 'dark';
}

const JapaCounter: React.FC<JapaCounterProps> = ({ variant = 'dark' }) => {
  const [totalCount, setTotalCount] = useState(0);
  const [isChanting, setIsChanting] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const isLight = variant === 'light';

  // Load from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem("japa_count");
    const savedRound = localStorage.getItem("japa_round");
    
    let initialTotal = 0;
    if (savedCount || savedRound) {
       const c = parseInt(savedCount || "0", 10);
       const r = parseInt(savedRound || "1", 10);
       initialTotal = ((r - 1) * 108) + c;
    }
    setTotalCount(initialTotal);
    setMounted(true);
  }, []);

  // Save to localStorage whenever totalCount changes
  useEffect(() => {
    if (mounted) {
      const currentCount = totalCount % 108;
      const currentRound = Math.floor(totalCount / 108) + 1;
      localStorage.setItem("japa_count", currentCount.toString());
      localStorage.setItem("japa_round", currentRound.toString());
    }
  }, [totalCount, mounted]);

  const toggleChanting = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!isChanting) {
      setIsChanting(true);
      setTotalCount((prev) => prev + 1);
    } else {
      setTotalCount((prev) => prev + 1);
    }
  };

  const resetCounter = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTotalCount(0);
    setIsChanting(false);
  };
  
  // Derived state for display
  const count = totalCount % 108;
  const round = Math.floor(totalCount / 108) + 1;

  // Prevent hydration mismatch by rendering a placeholder until mounted
  if (!mounted) {
    return (
      <div className="relative inline-block w-64 h-64 md:w-80 md:h-80" data-purpose="japa-counter-container-loading">
        <div className={`w-full h-full rounded-full border-[12px] flex items-center justify-center backdrop-blur-xl shadow-2xl ${isLight ? 'border-saffron-500/30 bg-white/60' : 'border-saffron-500/20 bg-white/10'}`}>
          <div className={`animate-pulse w-24 h-24 rounded-full ${isLight ? 'bg-saffron-500/10' : 'bg-saffron-500/20'}`}></div>
        </div>
      </div>
    );
  }

  // Calculate rotation for the ring (0 to 108)
  const strokeDashoffset = 1000 - (count / 108) * 1000;

  return (
    <div className="relative inline-block w-full max-w-sm rounded-[2.5rem] p-6 shadow-2xl overflow-hidden" data-purpose="japa-counter-container">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/chant banner.jpg')" }}
      />
      {/* Overlay to ensure readability */}
      <div className={`absolute inset-0 z-0 ${isLight ? 'bg-white/60 backdrop-blur-sm' : 'bg-black/70 backdrop-blur-sm'}`}></div>
      
      {/* Circular Counter Visual */}
      <div className={`w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full border-[12px] flex flex-col items-center justify-center backdrop-blur-md shadow-inner relative cursor-pointer group z-10 ${isLight ? 'border-saffron-500/40 bg-white/50' : 'border-saffron-500/40 bg-black/40'}`} onClick={toggleChanting}>
        {/* Animated Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            className="text-saffron-500 transition-all duration-500 ease-out"
            cx="50%"
            cy="50%"
            fill="transparent"
            r="48%"
            stroke="currentColor"
            strokeDasharray="1000"
            strokeDashoffset={strokeDashoffset}
            strokeWidth="12"
          ></circle>
        </svg>
        <div className="z-10 text-center transform group-active:scale-95 transition-transform duration-100">
          <div className={`inline-block px-3 py-1 backdrop-blur-sm rounded-full mb-2 ${isLight ? 'bg-white/80' : 'bg-black/60'}`}>
            <span className={`block text-xs font-bold uppercase tracking-widest leading-none ${isLight ? 'text-saffron-800' : 'text-saffron-200'}`}>Mantra Count</span>
          </div>
          <span className={`block text-7xl md:text-8xl font-display font-bold drop-shadow-md mb-2 ${isLight ? 'text-saffron-900' : 'text-white'}`} id="japa-count">
            {count}
          </span>
          <div className={`inline-block px-3 py-1 backdrop-blur-sm rounded-full ${isLight ? 'bg-white/80' : 'bg-black/60'}`}>
            <span className={`block font-bold text-xs uppercase tracking-wider leading-none ${isLight ? 'text-saffron-800' : 'text-saffron-200'}`}>Round {round} of 16</span>
          </div>
        </div>
      </div>
      
      {/* Interaction Buttons Spacer */}
      <div className="mt-8 flex justify-center gap-4 relative z-10">
        <button
          className={`font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 min-w-[200px] ${
            isChanting ? "bg-saffron-100 text-saffron-800 border-2 border-saffron-300" : "bg-white text-saffron-700 border-2 border-white/50 dark:border-white/20"
          }`}
          onClick={toggleChanting}
          id="start-chant"
        >
          {isChanting ? (
            <>
              <svg className="w-5 h-5 text-saffron-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path>
              </svg>
              Tap to Chant
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"></path>
              </svg>
              Start Chanting
            </>
          )}
        </button>
        <button
          className={`px-8 py-3 rounded-full transition-all font-medium border-2 backdrop-blur-md shadow-md hover:shadow-lg ${
            isLight ? 'bg-white/80 text-saffron-800 border-white/50 hover:bg-white' : 'bg-black/60 text-white border-white/20 hover:bg-black/80'
          }`}
          onClick={resetCounter}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default JapaCounter;
