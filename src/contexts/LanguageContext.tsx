import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// UI translations - moved to top to avoid circular dependencies
const uiTranslations = {
  ru: {
    sos: 'SOS',
    inDanger: 'Я в опасности',
    findSafety: 'Найти безопасность',
    medical: 'Первая помощь',
    supplies: 'Запасы',
    scenarios: 'Сценарии',
    inPanic: 'Я в панике',
    home: 'Главная',
    inventory: 'Запасы',
    settings: 'Настройки',
    water: 'Вода',
    food: 'Еда',
    batteries: 'Батареи',
    people: 'Люди',
    days: 'дней',
    enoughFor: 'Хватит на',
    dangerousSituations: 'Опасные ситуации',
    firstAidTitle: 'Первая помощь',
    inventoryTitle: 'Запасы',
    scenariosTitle: 'Сценарии',
    safePlaces: 'Безопасные места',
    bunkerApp: 'Bunker v2.0',
    appDescription: 'Приложение для выживания в кризисных ситуациях',
    step: 'Шаг',
    swipeNext: 'Свайп → следующий шаг',
    allStepsComplete: '✅ Все шаги выполнены',
    liters: 'Литры',
    calories: 'Калории',
    wattHours: 'Ватт-часы',
    count: 'Количество человек'
  },
  en: {
    sos: 'SOS',
    inDanger: 'I\'m in danger',
    findSafety: 'Find safety',
    medical: 'First aid',
    supplies: 'Supplies',
    scenarios: 'Scenarios',
    inPanic: 'I\'m in panic',
    home: 'Home',
    inventory: 'Inventory',
    settings: 'Settings',
    water: 'Water',
    food: 'Food',
    batteries: 'Batteries',
    people: 'People',
    days: 'days',
    enoughFor: 'Enough for',
    dangerousSituations: 'Dangerous situations',
    firstAidTitle: 'First aid',
    inventoryTitle: 'Inventory',
    scenariosTitle: 'Scenarios',
    safePlaces: 'Safe places',
    bunkerApp: 'Bunker v2.0',
    appDescription: 'Survival app for crisis situations',
    step: 'Step',
    swipeNext: 'Swipe → next step',
    allStepsComplete: '✅ All steps complete',
    liters: 'Liters',
    calories: 'Calories',
    wattHours: 'Watt-hours',
    count: 'Number of people'
  },
  es: {
    sos: 'SOS',
    inDanger: 'Estoy en peligro',
    findSafety: 'Encontrar seguridad',
    medical: 'Primeros auxilios',
    supplies: 'Suministros',
    scenarios: 'Escenarios',
    inPanic: 'Estoy en pánico',
    home: 'Inicio',
    inventory: 'Inventario',
    settings: 'Configuración',
    water: 'Agua',
    food: 'Comida',
    batteries: 'Baterías',
    people: 'Personas',
    days: 'días',
    enoughFor: 'Suficiente para',
    dangerousSituations: 'Situaciones peligrosas',
    firstAidTitle: 'Primeros auxilios',
    inventoryTitle: 'Inventario',
    scenariosTitle: 'Escenarios',
    safePlaces: 'Lugares seguros',
    bunkerApp: 'Bunker v2.0',
    appDescription: 'Aplicación de supervivencia para crisis',
    step: 'Paso',
    swipeNext: 'Desliza → siguiente paso',
    allStepsComplete: '✅ Todos los pasos completos',
    liters: 'Litros',
    calories: 'Calorías',
    wattHours: 'Vatios-hora',
    count: 'Número de personas'
  },
  ar: {
    sos: 'SOS',
    inDanger: 'أنا في خطر',
    findSafety: 'ابحث عن الأمان',
    medical: 'الإسعاف الأولي',
    supplies: 'الإمدادات',
    scenarios: 'سيناريوهات',
    inPanic: 'أنا في حالة ذعر',
    home: 'الرئيسية',
    inventory: 'المخزون',
    settings: 'الإعدادات',
    water: 'ماء',
    food: 'طعام',
    batteries: 'بطاريات',
    people: 'أشخاص',
    days: 'أيام',
    enoughFor: 'يكفي لـ',
    dangerousSituations: 'مواقف خطرة',
    firstAidTitle: 'الإسعاف الأولي',
    inventoryTitle: 'المخزون',
    scenariosTitle: 'سيناريوهات',
    safePlaces: 'أماكن آمنة',
    bunkerApp: 'Bunker v2.0',
    appDescription: 'تطبيق البقاء للأزمات',
    step: 'خطوة',
    swipeNext: 'اسحب → الخطوة التالية',
    allStepsComplete: '✅ جميع الخطوات مكتملة',
    liters: 'لتر',
    calories: 'سعرة حرارية',
    wattHours: 'وات-ساعة',
    count: 'عدد الأشخاص'
  },
  zh: {
    sos: 'SOS',
    inDanger: '我处于危险中',
    findSafety: '寻找安全',
    medical: '急救',
    supplies: '物资',
    scenarios: '情景',
    inPanic: '我恐慌',
    home: '主页',
    inventory: '库存',
    settings: '设置',
    water: '水',
    food: '食物',
    batteries: '电池',
    people: '人员',
    days: '天',
    enoughFor: '足够',
    dangerousSituations: '危险情况',
    firstAidTitle: '急救',
    inventoryTitle: '库存',
    scenariosTitle: '情景',
    safePlaces: '安全地点',
    bunkerApp: 'Bunker v2.0',
    appDescription: '危机生存应用',
    step: '步骤',
    swipeNext: '滑动 → 下一步',
    allStepsComplete: '✅ 所有步骤完成',
    liters: '升',
    calories: '千卡',
    wattHours: '瓦时',
    count: '人数'
  }
};

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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ru');

  // Load saved language from localStorage (web only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLanguage = localStorage.getItem('bunker-language') as Language;
        if (savedLanguage && ['ru', 'en', 'es', 'ar', 'zh'].includes(savedLanguage)) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.warn('LocalStorage unavailable');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('bunker-language', lang);
      } catch (error) {
        // Silent fail for mobile
      }
    }
  };

  const t = (key: string) => {
    const translations = uiTranslations[language] || uiTranslations.ru;
    return (translations as any)[key] || key;
  };

  // Simple fallback data - no dynamic imports to avoid circular dependencies
  const data = {
    danger: [],
    medical: [],
    scenarios: [],
    supplies: [],
    mapPoints: []
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, data }}>
      {children}
    </LanguageContext.Provider>
  );
};
