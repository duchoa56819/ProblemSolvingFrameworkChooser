import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations } from './types';
import { TRANSLATIONS } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ps_language') as Language;
      if (saved === 'en' || saved === 'vi') return saved;
      // Default to Vietnamese if browser language starts with 'vi'
      if (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('vi')) {
        return 'vi';
      }
      return 'vi'; // Default to Vietnamese per user's request!
    } catch {
      return 'vi';
    }
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('ps_language', newLang);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = {
    lang,
    setLang,
    toggleLang,
    t: TRANSLATIONS[lang]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
