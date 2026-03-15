import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleList from "@/components/ArticleList";

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

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch('https://api.askharekrishna.com/api/v1/chanting/articles/', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      console.error('Failed to fetch articles');
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="bg-cream-50 dark:bg-gray-950 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <ArticleList initialArticles={articles} />
      </main>
      <Footer />
    </div>
  );
}
