import React from 'react';
import Link from 'next/link';

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <Link href="/articles" className="group flex flex-col items-center text-center p-10 bg-white dark:bg-gray-900 rounded-3xl border border-cream-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-saffron-300 dark:hover:border-saffron-700 transition-all duration-300 relative overflow-hidden">
         <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-saffron-100/50 dark:bg-saffron-900/20 group-hover:scale-150 transition-transform duration-500 z-0"></div>
         
         <div className="relative z-10 w-20 h-20 bg-saffron-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-inner border border-cream-100 dark:border-gray-700 text-saffron-600 dark:text-saffron-500 group-hover:scale-110 transition-transform duration-300 mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
         </div>
         
         <h2 className="relative z-10 font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-saffron-700 dark:group-hover:text-saffron-400 transition-colors">
           Spiritual Articles
         </h2>
         
         <p className="relative z-10 text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
           Explore our vast collection of deep spiritual insights, philosophy, and practical guidance for your Krishna consciousness journey.
         </p>
         
         <div className="relative z-10 mt-auto flex items-center text-saffron-600 dark:text-saffron-400 font-bold group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors">
           Read Articles
           <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
           </svg>
         </div>
      </Link>
      
      <Link href="/live-chant" className="group flex flex-col items-center text-center p-10 bg-white dark:bg-gray-900 rounded-3xl border border-cream-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-saffron-300 dark:hover:border-saffron-700 transition-all duration-300 relative overflow-hidden">
         <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-saffron-100/50 dark:bg-saffron-900/20 group-hover:scale-150 transition-transform duration-500 z-0"></div>
         
         <div className="relative z-10 w-20 h-20 bg-saffron-50 dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-inner border border-cream-100 dark:border-gray-700 text-saffron-600 dark:text-saffron-500 group-hover:scale-110 transition-transform duration-300 mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </svg>
         </div>
         
         <h2 className="relative z-10 font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-saffron-700 dark:group-hover:text-saffron-400 transition-colors">
           Live Japa Counter
         </h2>
         
         <p className="relative z-10 text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
           Chant the Hare Krishna Mahamantra and track your rounds interactively with our digital bead bag and counter.
         </p>
         
         <div className="relative z-10 mt-auto flex items-center text-saffron-600 dark:text-saffron-400 font-bold group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors">
           Start Chanting
           <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
           </svg>
         </div>
      </Link>
    </div>
  );
}
