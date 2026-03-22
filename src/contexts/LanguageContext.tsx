import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Импортируем все JSON-файлы статически
import ruDanger from '../data/ru/danger.json';
import ruMedical from '../data/ru/medical.json';
import ruScenarios from '../data/ru/scenarios.json';
import ruSupplies from '../data/ru/supplies.json';
import ruMapPoints from '../data/ru/map_points.json';

import enDanger from '../data/en/danger.json';
import enMedical from '../data/en/medical.json';
import enScenarios from '../data/en/scenarios.json';
import enSupplies from '../data/en/supplies.json';
import enMapPoints from '../data/en/map_points.json';

import esDanger from '../data/es/danger.json';
import esMedical from '../data/es/medical.json';
import esScenarios from '../data/es/scenarios.json';
import esSupplies from '../data/es/supplies.json';
import esMapPoints from '../data/es/map_points.json';

import arDanger from '../data/ar/danger.json';
import arMedical from '../data/ar/medical.json';
import arScenarios from '../data/ar/scenarios.json';
import arSupplies from '../data/ar/supplies.json';
import arMapPoints from '../data/ar/map_points.json';

import zhDanger from '../data/zh/danger.json';
import zhMedical from '../data/zh/medical.json';
import zhScenarios from '../data/zh/scenarios.json';
import zhSupplies from '../data/zh/supplies.json';
import zhMapPoints from '../data/zh/map_points.json';

type Language = 'ru' | 'en' | 'es' | 'ar' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  data: {
    danger: any;
    medical: any;
    scenarios: any;
    supplies: any;
    mapPoints: any;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Переводы для UI-элементов (кнопки, заголовки)
const uiTranslations: Record<Language, Record<string, string>> = {
  ru: {
    sos: 'SOS',
    danger: 'Я в опасности',
    safety: 'Найти безопасность',
    medical: 'Первая помощь',
    supplies: 'Запасы',
    scenarios: 'Сценарии',
    panic: 'Я в панике',
    settings: 'Настройки',
    inventory: 'Запасы',
    days: 'Хватит на',
    people: 'человек',
    water: 'Вода (л)',
    food: 'Еда (ккал)',
    batteries: 'Батареи (Wh)',
    step: 'Шаг',
    swipe_next: 'Свайп → следующий шаг',
    all_done: 'Все шаги выполнены'
  },
  en: {
    sos: 'SOS',
    danger: 'I am in danger',
    safety: 'Find safety',
    medical: 'First aid',
    supplies: 'Supplies',
    scenarios: 'Scenarios',
    panic: 'Panic mode',
    settings: 'Settings',
    inventory: 'Supplies',
    days: 'Enough for',
    people: 'people',
    water: 'Water (L)',
    food: 'Food (kcal)',
    batteries: 'Batteries (Wh)',
    step: 'Step',
    swipe_next: 'Swipe → next step',
    all_done: 'All steps completed'
  },
  es: {
    sos: 'SOS',
    danger: 'Estoy en peligro',
    safety: 'Encontrar seguridad',
    medical: 'Primeros auxilios',
    supplies: 'Suministros',
    scenarios: 'Escenarios',
    panic: 'Modo pánico',
    settings: 'Ajustes',
    inventory: 'Suministros',
    days: 'Suficiente para',
    people: 'personas',
    water: 'Agua (L)',
    food: 'Comida (kcal)',
    batteries: 'Baterías (Wh)',
    step: 'Paso',
    swipe_next: 'Deslizar → siguiente paso',
    all_done: 'Todos los pasos completados'
  },
  ar: {
    sos: 'SOS',
    danger: 'أنا في خطر',
    safety: 'ابحث عن مكان آمن',
    medical: 'إسعافات أولية',
    supplies: 'لوازم',
    scenarios: 'سيناريوهات',
    panic: 'وضع الذعر',
    settings: 'الإعدادات',
    inventory: 'لوازم',
    days: 'يكفي لـ',
    people: 'أشخاص',
    water: 'ماء (لتر)',
    food: 'طعام (سعرات)',
    batteries: 'بطاريات (واط/ساعة)',
    step: 'خطوة',
    swipe_next: 'اسحب → الخطوة التالية',
    all_done: 'تمت جميع الخطوات'
  },
  zh: {
    sos: 'SOS',
    danger: '我处于危险中',
    safety: '寻找安全地点',
    medical: '急救',
    supplies: '物资',
    scenarios: '情景',
    panic: '恐慌模式',
    settings: '设置',
    inventory: '物资',
    days: '足够维持',
    people: '人',
    water: '水（升）',
    food: '食物（千卡）',
    batteries: '电池（瓦时）',
    step: '步骤',
    swipe_next: '滑动 → 下一步',
    all_done: '所有步骤已完成'
  }
};

// Статические данные для всех языков
const dataByLanguage: Record<Language, any> = {
  ru: {
    danger: ruDanger,
    medical: ruMedical,
    scenarios: ruScenarios,
    supplies: ruSupplies,
    mapPoints: ruMapPoints,
  },
  en: {
    danger: enDanger,
    medical: enMedical,
    scenarios: enScenarios,
    supplies: enSupplies,
    mapPoints: enMapPoints,
  },
  es: {
    danger: esDanger,
    medical: esMedical,
    scenarios: esScenarios,
    supplies: esSupplies,
    mapPoints: esMapPoints,
  },
  ar: {
    danger: arDanger,
    medical: arMedical,
    scenarios: arScenarios,
    supplies: arSupplies,
    mapPoints: arMapPoints,
  },
  zh: {
    danger: zhDanger,
    medical: zhMedical,
    scenarios: zhScenarios,
    supplies: zhSupplies,
    mapPoints: zhMapPoints,
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const saved = localStorage.getItem('bunker_language') as Language | null;
    if (saved && ['ru', 'en', 'es', 'ar', 'zh'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('bunker_language', lang);
  };

  const t = (key: string): string => {
    return uiTranslations[language][key] || key;
  };

  const data = dataByLanguage[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, data }}>
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