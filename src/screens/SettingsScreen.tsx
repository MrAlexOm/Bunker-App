import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const SettingsScreen = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('settings')}</Text>
      <Text style={styles.subtitle}>{t('bunkerApp')}</Text>
      <Text style={styles.description}>
        {t('appDescription')}
      </Text>

      <View style={styles.languageSection}>
        <Text style={styles.sectionTitle}><Text>🌍 </Text>Language / Язык</Text>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              language === lang.code && styles.selectedLanguage
            ]}
            onPress={() => setLanguage(lang.code as any)}
          >
            <Text style={styles.languageFlag}>{lang.flag}</Text>
            <Text style={[
              styles.languageName,
              language === lang.code && styles.selectedLanguageText
            ]}>
              {lang.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}><Text>ℹ️ </Text>Информация</Text>
        <Text style={styles.infoText}>
          • Офлайн приложение для выживания
        </Text>
        <Text style={styles.infoText}>
          • Работает без подключения к интернету
        </Text>
        <Text style={styles.infoText}>
          • Поддержка 5 языков
        </Text>
        <Text style={styles.infoText}>
          • Геолокация для поиска безопасных мест
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFD60A',
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    color: '#A1A1A1',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  languageSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageButton: {
    backgroundColor: '#151515',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#A1A1A1',
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedLanguage: {
    backgroundColor: '#1E3A5F',
    borderColor: '#FF3B30',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 15,
  },
  languageName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedLanguageText: {
    color: '#FFD60A',
  },
  infoSection: {
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 20,
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoText: {
    color: '#A1A1A1',
    fontSize: 14,
    marginBottom: 8,
    paddingLeft: 10,
  },
});

export default SettingsScreen;
