"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
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
              Home
            </Link>
            <Link 
              className={`pb-1 transition-colors ${isActive('/articles') ? 'text-saffron-700 dark:text-saffron-400 font-semibold border-b-2 border-saffron-500' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
              href="/articles"
            >
              Articles
            </Link>
            <Link 
              className={`pb-1 transition-colors ${isActive('/live-chant') ? 'text-saffron-700 dark:text-saffron-400 font-semibold border-b-2 border-saffron-500' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
              href="/live-chant"
            >
              Live Chant
            </Link>
            <div className="flex items-center gap-4 pl-4 border-l border-saffron-100 dark:border-gray-700">
              <ThemeToggle />
              <button className="bg-saffron-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-saffron-700 transition-all shadow-md">
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle & Theme */}
          <div className="md:hidden flex items-center gap-4">
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
            Home
          </Link>
          <Link 
            className={`block transition-colors ${isActive('/articles') ? 'text-saffron-700 dark:text-saffron-400 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
            href="/articles"
            onClick={() => setIsOpen(false)}
          >
            Articles
          </Link>
          <Link 
            className={`block transition-colors ${isActive('/live-chant') ? 'text-saffron-700 dark:text-saffron-400 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-saffron-600 dark:hover:text-saffron-400'}`} 
            href="/live-chant"
            onClick={() => setIsOpen(false)}
          >
            Live Chant
          </Link>
          <button className="w-full bg-saffron-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-saffron-700 shadow-md">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
