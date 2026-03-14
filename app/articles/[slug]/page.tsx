import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

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

import ArticleActions from "@/components/ArticleActions";

// Ensure dynamic rendering works or fetch at build time
async function getArticleData(slug: string): Promise<{
  current: Article | null;
  prev: Article | null;
  next: Article | null;
}> {
  try {
    const res = await fetch('https://api.askharekrishna.com/api/v1/chanting/articles/', {
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      return { current: null, prev: null, next: null };
    }
    
    const articles: Article[] = await res.json();
    const currentIndex = articles.findIndex(article => article.slug === slug);
    
    if (currentIndex === -1) {
      return { current: null, prev: null, next: null };
    }
    
    return {
      current: articles[currentIndex],
      prev: currentIndex > 0 ? articles[currentIndex - 1] : null,
      next: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { current: null, prev: null, next: null };
  }
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { current: article, prev, next } = await getArticleData(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-cream-50 dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      
      {/* Hero Header for Article */}
      <div className="bg-gradient-to-br from-saffron-500 to-saffron-700 dark:from-gray-900 dark:to-gray-800 w-full py-16 px-4 relative overflow-hidden transition-colors duration-300">
        {/* Subtle pattern or overlay could go here */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Link href="/articles" className="inline-flex items-center text-saffron-50 dark:text-gray-300 hover:text-white dark:hover:text-white mb-8 transition-colors font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Articles
          </Link>
          <div className="mb-4">
            <span className="px-4 py-1.5 bg-white/20 dark:bg-black/30 backdrop-blur-sm text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
              {article.mainTopic}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            {article.subTopic}
          </h1>
          <p className="text-saffron-50 dark:text-gray-300 font-medium tracking-wide">
            {new Date(article.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <article className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-3xl shadow-xl border border-cream-100 dark:border-gray-800 -mt-24 relative z-20 transition-colors duration-300">
          
          {/* Custom styled markdown container without external plugins */}
          <div className="max-w-none text-gray-700 dark:text-gray-300 font-body text-lg transition-colors duration-300
            [&>h1]:font-display [&>h1]:font-bold [&>h1]:text-gray-900 dark:[&>h1]:text-white [&>h1]:text-3xl [&>h1]:mb-6 [&>h1]:text-center [&>h1]:border-b [&>h1]:pb-4 [&>h1]:border-cream-100 dark:[&>h1]:border-gray-800
            [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-2xl [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-saffron-700 dark:[&>h2]:text-saffron-400
            [&>h3]:font-display [&>h3]:font-bold [&>h3]:text-gray-900 dark:[&>h3]:text-white [&>h3]:text-xl [&>h3]:mt-8 [&>h3]:mb-3
            [&>p]:leading-relaxed [&>p]:mb-6
            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2
            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol>li]:mb-2
            [&_a]:text-saffron-600 dark:[&_a]:text-saffron-400 [&_a]:font-[600] hover:[&_a]:text-saffron-700 dark:hover:[&_a]:text-saffron-300
            [&>blockquote]:border-l-4 [&>blockquote]:border-saffron-500 [&>blockquote]:bg-saffron-50 dark:[&>blockquote]:bg-gray-800 dark:[&>blockquote]:border-saffron-600 [&>blockquote]:py-4 [&>blockquote]:px-6 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>blockquote]:my-8 [&>blockquote]:text-gray-800 dark:[&>blockquote]:text-gray-300
            [&_strong]:text-gray-900 dark:[&_strong]:text-white [&_strong]:font-bold
          ">
            <ReactMarkdown>
              {article.article}
            </ReactMarkdown>
          </div>
          
          {/* Article Footer & Actions */}
          <ArticleActions articleId={article.id} articleTitle={article.subTopic} />
        </article>

        {/* Previous and Next Navigation */}
        {(prev || next) && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {prev ? (
              <Link 
                href={`/articles/${prev.slug}`}
                className="group flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl border border-cream-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 hover:border-saffron-300 dark:hover:border-saffron-700 transition-all duration-300"
              >
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                  <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  Previous Article
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-saffron-700 dark:group-hover:text-saffron-300 line-clamp-2 transition-colors">
                  {prev.subTopic}
                </h3>
              </Link>
            ) : <div />}

            {next && (
              <Link 
                href={`/articles/${next.slug}`}
                className="group flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl border border-cream-200 dark:border-gray-800 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 hover:border-saffron-300 dark:hover:border-saffron-700 transition-all duration-300 text-right md:col-start-2"
              >
                <div className="flex items-center justify-end text-gray-500 dark:text-gray-400 text-sm font-medium mb-2 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                  Next Article
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-saffron-700 dark:group-hover:text-saffron-300 line-clamp-2 transition-colors">
                  {next.subTopic}
                </h3>
              </Link>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
