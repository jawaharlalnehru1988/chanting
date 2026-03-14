"use client";

import React, { useState, useEffect } from 'react';

interface ArticleActionsProps {
  articleId: number;
  articleTitle: string;
}

export default function ArticleActions({ articleId, articleTitle }: ArticleActionsProps) {
  const [isRead, setIsRead] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Safety check for browser environment
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      
      const savedReads = localStorage.getItem('read_chanting_articles');
      if (savedReads) {
        try {
          const readsArray: number[] = JSON.parse(savedReads);
          setIsRead(readsArray.includes(articleId));
        } catch (e) {
          console.error('Failed to parse read articles from localStorage', e);
        }
      }
      setMounted(true);
    }
  }, [articleId]);

  const toggleReadStatus = () => {
    setIsRead(prev => {
      const nextState = !prev;
      
      const savedReads = localStorage.getItem('read_chanting_articles');
      let readsArray: number[] = [];
      
      if (savedReads) {
        try {
          readsArray = JSON.parse(savedReads);
        } catch (e) {
          // ignore parsing error, start fresh
        }
      }

      if (nextState) {
        // Add to read list if not already present
        if (!readsArray.includes(articleId)) {
          readsArray.push(articleId);
        }
      } else {
        // Remove from read list
        readsArray = readsArray.filter(id => id !== articleId);
      }

      localStorage.setItem('read_chanting_articles', JSON.stringify(readsArray));
      
      return nextState;
    });
  };

  const shareText = encodeURIComponent(`Read this insights on Hare Krishna Japa: ${articleTitle}`);
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`
  };

  if (!mounted) {
    // Prevent SSR hydration mismatch for local storage state
    return <div className="mt-16 pt-8 border-t border-cream-100 dark:border-gray-800 animate-pulse h-24" aria-hidden="true" />;
  }

  return (
    <div className="mt-16 pt-8 border-t border-cream-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left transition-colors duration-300">
      <div>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">Track your progress</p>
        <div className="flex gap-4 justify-center sm:justify-start">
          <button 
            onClick={toggleReadStatus}
            className={`px-5 py-2.5 font-medium rounded-xl transition-all border flex items-center gap-2 ${
              isRead 
              ? 'bg-saffron-50 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-400 border-saffron-200 dark:border-saffron-800 shadow-inner' 
              : 'bg-white dark:bg-gray-800 hover:bg-cream-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border-cream-200 dark:border-gray-700 hover:shadow-sm'
            }`}
          >
            {isRead ? (
              <>
                <svg className="w-5 h-5 text-saffron-600 dark:text-saffron-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Marked as Read
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Mark as Read
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-8 sm:mt-0">
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-3">Share this wisdom</p>
        <div className="flex gap-3 justify-center">
          {/* WhatsApp */}
          <a 
            href={shareLinks.whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            title="Share on WhatsApp"
            className="w-12 h-12 rounded-full bg-cream-50 dark:bg-gray-800 flex items-center justify-center text-green-600 dark:text-green-500 hover:bg-green-500 hover:text-white dark:hover:bg-green-600 transition-all border border-cream-200 dark:border-gray-700 shadow-sm"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.5 14.3c-.1-.2-.5-.3-1.1-.6-.6-.3-3.4-1.7-3.9-1.9-.5-.2-.9-.3-1.2.1-.3.4-1.5 1.9-1.8 2.3-.3.4-.6.4-1.2.1-1.3-.6-2.5-1.4-3.4-2.5-.5-.6-1-1.3-1.4-2-.2-.3-.1-.5.1-.6.2-.2.4-.4.5-.6.2-.2.3-.4.4-.7s0-.5-.1-.7c-.1-.2-.9-2.2-1.2-3-.3-.8-.7-.7-1-.6h-.8c-.3 0-.8.1-1.2.5-.4.5-1.6 1.6-1.6 3.9 0 2.3 1.7 4.5 1.9 4.8.2.3 3.3 5 8 7 1.1.5 2 1 2.7 1.3 1.1.3 2.1.3 2.9.2 1-.1 3.4-1.4 3.9-2.7.5-1.3.5-2.4.3-2.6zM12 21.8c-1.6 0-3.2-.4-4.6-1.2l-.3-.2-3.4.9.9-3.3-.2-.3C3.5 16.3 3 14.2 3 12c0-5 4-9 9-9s9 4 9 9-4 9-9 9zm8-16.7C17.9 2.9 15 1.5 12 1.5c-5.8 0-10.5 4.7-10.5 10.5 0 1.9.5 3.7 1.4 5.3l-1.5 5.5 5.6-1.5c1.5.8 3.3 1.3 5 1.3 5.8 0 10.5-4.7 10.5-10.5.1-2.9-1-5.7-3-7.8z"/></svg>
          </a>
          
          {/* Facebook */}
          <a 
            href={shareLinks.facebook} 
            target="_blank" 
            rel="noopener noreferrer"
            title="Share on Facebook"
            className="w-12 h-12 rounded-full bg-cream-50 dark:bg-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-all border border-cream-200 dark:border-gray-700 shadow-sm"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>

          {/* Twitter / X */}
          <a 
            href={shareLinks.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            title="Share on X (Twitter)"
            className="w-12 h-12 rounded-full bg-cream-50 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-all border border-cream-200 dark:border-gray-700 shadow-sm"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
