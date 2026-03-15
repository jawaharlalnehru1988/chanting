"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./LanguageContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language, setLanguage, t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ta' : 'en';
    setLanguage(newLang);
    
    // Update URL query parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', newLang);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-saffron-100 dark:border-gray-800 shadow-sm transition-colors duration-300" data-purpose="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-saffron-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:bg-saffron-600 transition-colors">
                <span className="font-display font-bold text-xl">ॐ</span>
              </div>
              <span className="font-display text-xl font-bold tracking-wider text-saffron-700 dark:text-saffron-500 group-hover:text-saffron-800 dark:group-hover:text-saffron-400 transition-colors"> Japa</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link 
              className={`pb-1 transition-colors ${isActive('/') ? 'text-saffron-700 dark:text-saffron-400 font-semibold border-b-2 border-saffron-500' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
              href="/"
            >
              {t('home')}
            </Link>
            <Link 
              className={`pb-1 transition-colors ${isActive('/articles') ? 'text-saffron-700 dark:text-saffron-400 font-semibold border-b-2 border-saffron-500' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
              href="/articles"
            >
              {t('articles')}
            </Link>
            <Link 
              className={`pb-1 transition-colors ${isActive('/live-chant') ? 'text-saffron-700 dark:text-saffron-400 font-semibold border-b-2 border-saffron-500' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
              href="/live-chant"
            >
              {t('liveChant')}
            </Link>
            <div className="flex items-center gap-4 pl-4 border-l border-saffron-100 dark:border-gray-700">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-3 py-1 rounded-md border border-saffron-200 dark:border-gray-700 text-xs font-bold text-saffron-700 dark:text-saffron-400 hover:bg-saffron-50 dark:hover:bg-gray-800 transition-colors"
                title={language === 'en' ? 'Switch to Tamil' : 'ஆங்கிலத்திற்கு மாற்றவும்'}
              >
                <span>{language === 'en' ? 'EN' : 'தமிழ்'}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.19 15.37 3 17"></path></svg>
              </button>
              <ThemeToggle />
              <button className="bg-saffron-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-saffron-700 transition-all shadow-md">
                {t('signIn')}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle & Theme */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="text-xs font-bold text-saffron-700 dark:text-saffron-400 bg-saffron-50 dark:bg-gray-800 px-2 py-1 rounded border border-saffron-200 dark:border-gray-700"
            >
              {language === 'en' ? 'EN' : 'தமிழ்'}
            </button>
            <ThemeToggle />
            <button
              className="text-saffron-700 dark:text-saffron-500"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16m-7 6h7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Optional, added for functionality) */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-saffron-100 dark:border-gray-800 px-4 py-4 space-y-4">
          <Link 
            className={`block transition-colors ${isActive('/') ? 'text-saffron-700 dark:text-saffron-400 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
            href="/"
            onClick={() => setIsOpen(false)}
          >
            {t('home')}
          </Link>
          <Link 
            className={`block transition-colors ${isActive('/articles') ? 'text-saffron-700 dark:text-saffron-400 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
            href="/articles"
            onClick={() => setIsOpen(false)}
          >
            {t('articles')}
          </Link>
          <Link 
            className={`block transition-colors ${isActive('/live-chant') ? 'text-saffron-700 dark:text-saffron-400 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
            href="/live-chant"
            onClick={() => setIsOpen(false)}
          >
            {t('liveChant')}
          </Link>
          <button className="w-full bg-saffron-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-saffron-700 shadow-md">
            {t('signIn')}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
