"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  mainTopic: string;
  subTopic: string;
  article: string;
  slug: string;
  order: number;
  created_at: string;
  updated_at: string;
}

interface ArticleListProps {
  initialArticles: Article[];
}

// Helper to create a simple text excerpt from markdown content
const getExcerpt = (markdown: string) => {
  // Very basic stripping of simple markdown symbols to create a readable excerpt
  const plainText = markdown.replace(/[#*`>_]/g, '').trim().split('\n').filter(line => line.trim().length > 0)[1] || markdown.replace(/[#*`>_]/g, '').trim();
  return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
};

export default function ArticleList({ initialArticles }: ArticleListProps) {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [readArticles, setReadArticles] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedReads = localStorage.getItem('read_chanting_articles');
    if (savedReads) {
      try {
        setReadArticles(JSON.parse(savedReads));
      } catch (e) {
        // ignore parse error
      }
    }
  }, []);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return initialArticles;
    
    const query = searchQuery.toLowerCase();
    return initialArticles.filter(article => 
      article.mainTopic.toLowerCase().includes(query) || 
      article.subTopic.toLowerCase().includes(query)
    );
  }, [initialArticles, searchQuery]);

  return (
    <div className="w-full relative z-20">
      {/* Controls: Search and View Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-cream-100 dark:border-gray-800 transition-colors duration-300">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-cream-200 dark:border-gray-700 rounded-xl leading-5 bg-cream-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 sm:text-sm transition-colors duration-300"
            placeholder="Filter articles by topic or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex bg-cream-50 dark:bg-gray-800 p-1 rounded-xl border border-cream-200 dark:border-gray-700 transition-colors duration-300">
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
              viewMode === 'table' 
                ? 'bg-white dark:bg-gray-700 text-saffron-700 dark:text-saffron-400 shadow-sm border border-cream-200 dark:border-gray-600' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
            Table
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
              viewMode === 'card' 
                ? 'bg-white dark:bg-gray-700 text-saffron-700 dark:text-saffron-400 shadow-sm border border-cream-200 dark:border-gray-600' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Cards
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 ? (
        <div className="text-center bg-white dark:bg-gray-900 p-12 rounded-2xl shadow-sm border border-cream-100 dark:border-gray-800 transition-colors duration-300">
          <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No articles found</h3>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn't find any articles matching "{searchQuery}". Try adjusting your search term.
          </p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-4 text-saffron-600 dark:text-saffron-400 font-medium hover:text-saffron-700 dark:hover:text-saffron-300 transition-colors"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <>
          {/* Table View */}
          {viewMode === 'table' && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-cream-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-cream-50 dark:bg-gray-800/50 border-b border-cream-100 dark:border-gray-800 transition-colors duration-300">
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Topic</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Excerpt</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-100 dark:divide-gray-800">
                    {filteredArticles.map((article) => (
                      <tr key={article.id} className="hover:bg-saffron-50/50 dark:hover:bg-gray-800/50 transition-colors duration-300 group relative">
                        <td className="py-4 px-6 align-top font-medium text-saffron-700 dark:text-saffron-400 whitespace-nowrap">
                           <Link href={`/articles/${article.slug}`} className="absolute inset-0 z-10"><span className="sr-only">Read {article.subTopic}</span></Link>
                           {article.mainTopic}
                        </td>
                        <td className="py-4 px-6 align-top">
                          <span className="font-display font-bold text-gray-900 dark:text-gray-100 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors block">
                            {article.subTopic}
                            {mounted && readArticles.includes(article.id) && (
                              <span title="Marked as Read">
                                <svg className="inline-block w-4 h-4 ml-2 text-green-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-6 align-top hidden sm:table-cell">
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 pr-8">
                            {getExcerpt(article.article)}
                          </p>
                        </td>
                        <td className="py-4 px-6 align-top text-right whitespace-nowrap">
                          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                            {new Date(article.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <div className="mt-1 flex justify-end">
                            <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-saffron-500 dark:group-hover:text-saffron-400 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Card View */}
          {viewMode === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-cream-100 dark:border-gray-800 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 flex flex-col group block"
                >
                  <div className="p-8 flex-grow">
                    <span className="inline-block px-3 py-1 bg-saffron-50 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                      {article.mainTopic}
                    </span>
                    <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors flex items-start justify-between">
                      <span className="pr-2">{article.subTopic}</span>
                      {mounted && readArticles.includes(article.id) && (
                        <span title="Marked as Read" className="flex-shrink-0 mt-1">
                          <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </span>
                      )}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-4">
                      {getExcerpt(article.article)}
                    </p>
                  </div>
                  <div className="px-8 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-cream-100 dark:border-gray-800 mt-auto flex justify-between items-center transition-colors duration-300">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider">
                      {new Date(article.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-saffron-600 dark:text-saffron-400 font-bold text-sm flex items-center group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors">
                      Read More
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
