"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: "Home",
    articles: "Articles",
    liveChant: "Live Chant",
    signIn: "Sign In",
    spiritualArticles: "Spiritual Articles",
    exploreWritings: "Explore profound writings and philosophical insights on the practice of mantra meditation and Krishna consciousness.",
    filterPlaceholder: "Filter articles by topic or title...",
    noArticlesFound: "No articles found",
    clearFilters: "Clear all filters",
    readMore: "Read More",
    table: "Table",
    cards: "Cards",
    topic: "Topic",
    title: "Title",
    excerpt: "Excerpt",
    date: "Date",
    markedAsRead: "Marked as Read",
    markAsRead: "Mark as Read",
    loading: "Loading...",
    backToArticles: "Back to Articles",
    previousArticle: "Previous Article",
    nextArticle: "Next Article",
    trackProgress: "Track your progress",
    shareWisdom: "Share this wisdom",
    shareOnWhatsApp: "Share on WhatsApp",
    shareOnFacebook: "Share on Facebook",
    shareOnX: "Share on X (Twitter)",
    shareText: "Read this insights on Hare Krishna Japa:"
  },
  ta: {
    home: "முகப்பு",
    articles: "கட்டுரைகள்",
    liveChant: "நேரடி ஜபம்",
    signIn: "உள்நுழை",
    spiritualArticles: "ஆன்மீக கட்டுரைகள்",
    exploreWritings: "மந்திர தியானம் மற்றும் கிருஷ்ண உணர்வு பற்றிய ஆழமான எழுத்துக்கள் மற்றும் தத்துவ நுண்ணறிவுகளை ஆராயுங்கள்.",
    filterPlaceholder: "தலைப்பு அல்லது தலைப்பு மூலம் கட்டுரைகளை வடிகட்டவும்...",
    noArticlesFound: "கட்டுரைகள் எதுவும் கிடைக்கவில்லை",
    clearFilters: "அனைத்து வடிப்பான்களையும் அப்புறப்படுத்து",
    readMore: "மேலும் படிக்க",
    table: "அட்டவணை",
    cards: "அட்டைகள்",
    topic: "தலைப்பு",
    title: "தலைப்பு",
    excerpt: "சுருக்கம்",
    date: "தேதி",
    markedAsRead: "படித்ததாகக் குறிக்கப்பட்டது",
    markAsRead: "படித்ததாகக் குறிக்கவும்",
    loading: "ஏற்றுகிறது...",
    backToArticles: "கட்டுரைகளுக்குத் திரும்பு",
    previousArticle: "முந்தைய கட்டுரை",
    nextArticle: "அடுத்த கட்டுரை",
    trackProgress: "உங்கள் முன்னேற்றத்தைக் கண்காணியுங்கள்",
    shareWisdom: "இந்த ஞானத்தைப் பகிருங்கள்",
    shareOnWhatsApp: "வாட்ஸ்அப்பில் பகிருங்கள்",
    shareOnFacebook: "பேஸ்புக்கில் பகிருங்கள்",
    shareOnX: "X (ட்விட்டரில்) பகிருங்கள்",
    shareText: "ஹரே கிருஷ்ணா ஜபம் பற்றிய இந்த நுண்ணறிவுகளைப் படியுங்கள்:"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferred_language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'ta')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred_language', lang);
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
