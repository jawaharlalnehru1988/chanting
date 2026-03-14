import React from 'react';

interface OtherSite {
  id: number;
  webUrl: string;
  purpose: string;
  featuresAvailable: string;
  created_at: string;
  updated_at: string;
}

async function fetchOtherSites(): Promise<OtherSite[]> {
  try {
    const res = await fetch('https://api.askharekrishna.com/api/ourOtherSites/', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!res.ok) {
      console.error('Failed to fetch other sites');
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching other sites:', error);
    return [];
  }
}

export default async function OurOtherSites() {
  const sites = await fetchOtherSites();

  if (!sites || sites.length === 0) {
    return null; // Don't render the section if fetching fails or is empty
  }

  return (
    <section className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-saffron-600 dark:text-saffron-500 font-bold tracking-widest uppercase text-sm mb-4 block">
            Explore More
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Other Platforms
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
            Discover our comprehensive ecosystem of Krishna consciousness resources tailored for your spiritual growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sites.map((site) => {
            // Parse features string into an array, split by semicolon or comma and trim whitespace
            const featuresList = site.featuresAvailable
              ? site.featuresAvailable.split(/;|,(?![^()]*\))/).map(f => f.trim()).filter(f => f.length > 0)
              : [];
              
            // Strip protocol for cleaner display
            const displayUrl = site.webUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

            return (
              <a 
                key={site.id} 
                href={site.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-cream-50 dark:bg-gray-900 rounded-3xl p-8 border border-cream-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-saffron-300 dark:hover:border-saffron-700 transition-all duration-300 relative overflow-hidden"
              >
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-saffron-100/50 dark:bg-saffron-900/20 group-hover:scale-150 transition-transform duration-500 z-0"></div>
                
                <div className="relative z-10 flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm border border-cream-200 dark:border-gray-700 text-saffron-600 dark:text-saffron-500 group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                      </svg>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-saffron-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-saffron-700 dark:group-hover:text-saffron-400 transition-colors">
                    {displayUrl}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    {site.purpose}
                  </p>
                </div>
                
                <div className="relative z-10 mt-auto pt-6 border-t border-cream-200 dark:border-gray-800">
                  <div className="flex flex-wrap gap-2">
                    {featuresList.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="inline-block px-3 py-1 bg-white dark:bg-gray-800 border border-saffron-100 dark:border-gray-700 text-saffron-700 dark:text-saffron-400 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                        {feature.length > 30 ? feature.substring(0, 30) + '...' : feature}
                      </span>
                    ))}
                    {featuresList.length > 3 && (
                      <span className="inline-block px-3 py-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                        +{featuresList.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
