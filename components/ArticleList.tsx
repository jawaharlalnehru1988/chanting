"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

interface Article {
  id: number;
  mainTopic: string;
  subTopic: string;
  article: string;
  slug: string;
  order: number;
  created_at: string;
  updated_at: string;
  language: string;
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
  const { language, t } = useLanguage();
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<'All' | string>('All');
  const [readArticles, setReadArticles] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [loading, setLoading] = useState(false);

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

  // Effect to re-fetch articles when language changes
  useEffect(() => {
    if (!mounted) return;

    const fetchArticles = async () => {
      setLoading(true);
      try {
        // Assuming API supports lang parameter
        const res = await fetch(`https://api.askharekrishna.com/api/v1/chanting/articles/?lang=${language}`);
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
          setSelectedTopic('All'); // Reset topic filter when language changes
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [language, mounted]);

  const topics = useMemo(() => {
    const uniqueTopics = Array.from(new Set(articles.map(a => a.mainTopic)));
    return ['All', ...uniqueTopics];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let filtered = articles;
    
    // Filter by topic
    if (selectedTopic !== 'All') {
      filtered = filtered.filter(article => article.mainTopic === selectedTopic);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.mainTopic.toLowerCase().includes(query) || 
        article.subTopic.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [articles, searchQuery, selectedTopic]);

  return (
    <div className="w-full relative z-20">
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in transition-colors duration-300">
          {t('spiritualArticles')}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto transition-colors duration-300">
          {t('exploreWritings')}
        </p>
      </div>

      {/* Topic Filter Selection */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex flex-nowrap gap-3 min-w-max">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border whitespace-nowrap ${
                selectedTopic === topic
                  ? 'bg-saffron-600 border-saffron-600 text-white shadow-md shadow-saffron-200 dark:shadow-none'
                  : 'bg-white dark:bg-gray-900 border-cream-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-saffron-300 dark:hover:border-saffron-700 hover:text-saffron-600 dark:hover:text-saffron-400'
              }`}
            >
              {topic === 'All' ? (language === 'ta' ? 'அனைத்தும்' : 'All') : topic}
            </button>
          ))}
        </div>
      </div>

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
            placeholder={t('filterPlaceholder')}
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
            {t('table')}
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
            {t('cards')}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-saffron-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">{t('loading')}</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="text-center bg-white dark:bg-gray-900 p-12 rounded-2xl shadow-sm border border-cream-100 dark:border-gray-800 transition-colors duration-300">
          <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">{t('noArticlesFound')}</h3>
          <p className="text-gray-500 dark:text-gray-400">
            {language === 'ta' ? `"${searchQuery}" உடன் பொருந்தும் கட்டுரைகள் எதையும் எங்களால் கண்டுபிடிக்க முடியவில்லை. பிற சொற்களை முயற்சிக்கவும்.` : `We couldn't find any articles matching "${searchQuery}". Try adjusting your search term.`}
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedTopic('All');
            }}
            className="mt-4 text-saffron-600 dark:text-saffron-400 font-medium hover:text-saffron-700 dark:hover:text-saffron-300 transition-colors"
          >
            {t('clearFilters')}
          </button>
        </div>
      ) : (
        <>
          {/* Table View */}
          {viewMode === 'table' && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-cream-100 dark:border-gray-800 overflow-hidden transition-colors duration-300 animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-cream-50 dark:bg-gray-800/50 border-b border-cream-100 dark:border-gray-800 transition-colors duration-300">
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('topic')}</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{t('title')}</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">{t('excerpt')}</th>
                      <th className="py-4 px-6 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">{t('date')}</th>
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
                              <span title={t('markedAsRead')}>
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
                            {mounted ? new Date(article.created_at).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : t('loading')}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
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
                        <span title={t('markedAsRead')} className="flex-shrink-0 mt-1">
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
                      {mounted ? new Date(article.created_at).toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : t('loading')}
                    </span>
                    <span className="text-saffron-600 dark:text-saffron-400 font-bold text-sm flex items-center group-hover:text-saffron-700 dark:group-hover:text-saffron-300 transition-colors">
                      {t('readMore')}
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
