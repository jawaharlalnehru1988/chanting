"use client";

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JapaCounter from "@/components/JapaCounter";
import { useTheme } from 'next-themes';

export default function LiveChantPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center relative py-16 overflow-hidden min-h-[max(80vh,600px)]">
        {/* Decorative Background Elements */}
        
        {/* Default Light background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-100 to-saffron-50/50 z-0 dark:opacity-0 transition-opacity duration-300"></div>
        
        {/* Dark Mode background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0 opacity-0 dark:opacity-100 transition-opacity duration-300"></div>
        
        {/* Background Mandala SVG */}
        <div className={`absolute top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-300 opacity-5 dark:opacity-10`} 
             style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23d35400\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center mt-6 md:mt-0">
          <div className="mb-10 text-center max-w-2xl">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 drop-shadow-sm text-gray-900 dark:text-white transition-colors duration-300">
              Digital Japa Beadbag
            </h1>
            <p className="text-lg md:text-xl font-body italic leading-relaxed text-gray-600 dark:text-gray-300 transition-colors duration-300">
              &quot;Chanting the holy name is the chief means of attaining love of Godhead. This chanting or devotional service does not depend on any paraphernalia, nor on one&apos;s having taken birth in a good family.&quot;
            </p>
            <p className="font-bold mt-4 text-sm uppercase tracking-widest hidden sm:block text-saffron-600 dark:text-saffron-400 transition-colors duration-300">
              Your counting progress is saved locally
            </p>
          </div>

          {/* Elevated Container for the Counter */}
          <div className="p-1 rounded-[3rem] shadow-2xl relative transform transition-all hover:scale-[1.01] duration-500 bg-gradient-to-b from-saffron-500 to-saffron-600 dark:from-saffron-600 dark:to-saffron-800">
            <div className="absolute -inset-1 rounded-[3rem] opacity-30 blur animate-pulse-soft pointer-events-none bg-gradient-to-r from-saffron-400 to-amber-300 dark:from-saffron-600 dark:to-amber-500"></div>
            <div className="rounded-[2.8rem] p-8 md:p-12 relative overflow-hidden flex items-center justify-center shadow-inner transition-colors duration-500 bg-saffron-50 dark:bg-gray-800">
               {mounted && <JapaCounter variant={isDark ? 'dark' : 'light'} />}
               {!mounted && <div className="w-64 h-64 md:w-80 md:h-80 opacity-0" />}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
