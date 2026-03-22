import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, LinearGradient } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';
import type { RootStackNavigationProp } from '../types/navigation';
// import BloodTitle from '../components/BloodTitle';

const HomeScreen = ({ navigation }: { navigation: RootStackNavigationProp }) => {
  const { t, language, isRTL } = useLanguage();

  // Получаем переводы для кнопок
  const translations = {
    sos: t('sos'),
    danger: t('inDanger'),
    safety: t('findSafety'),
    medical: t('firstAid'),
    supplies: t('supplies'),
    scenarios: t('scenarios'),
    panic: t('inPanic')
  };

  return (
    <LinearGradient
      colors={['#000000', '#1A1A1A', '#2D2D2D']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Заголовок BUNKER */}
        <Text style={styles.headerTitle}>BUNKER</Text>
        <Text style={styles.headerSubtitle}>ОФЛАЙН ПРИЛОЖЕНИЕ ДЛЯ ВЫЖИВАНИЯ</Text>

        {/* Огромная кнопка SOS */}
        <TouchableOpacity 
          style={styles.sosButton}
          onPress={() => navigation.navigate('SOSScreen')}
        >
          <Text style={styles.sosText}>🔴 {translations.sos}</Text>
        </TouchableOpacity>

        {/* Сетка 2×2 */}
        <View style={[
          styles.grid,
          isRTL && styles.rtlGrid
        ]}>
          <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('Danger')}>
            <Text style={styles.gridIcon}>⚠️</Text>
            <Text style={styles.gridText}>{translations.danger}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('Safety')}>
            <Text style={styles.gridIcon}>🛡️</Text>
            <Text style={styles.gridText}>{translations.safety}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('Medical')}>
            <Text style={styles.gridIcon}>🩺</Text>
            <Text style={styles.gridText}>{translations.medical}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('Inventory')}>
            <Text style={styles.gridIcon}>🎒</Text>
            <Text style={styles.gridText}>{translations.supplies}</Text>
          </TouchableOpacity>
        </View>

        {/* Кнопка паники */}
        <TouchableOpacity style={styles.panicButton} onPress={() => navigation.navigate('Panic')}>
          <Text style={styles.panicText}>😰 {translations.panic}</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 100,
  },
  sosButton: {
    backgroundColor: '#FF0000',
    borderRadius: 16,
    paddingVertical: 40,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 4,
    borderColor: '#CC0000',
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 4,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  rtlGrid: {
    flexDirection: 'row-reverse',
  },
  gridButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    width: '48%',
    paddingVertical: 32,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 160,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#2C2C2E',
  },
  gridIcon: {
    fontSize: 56,
    marginBottom: 16,
    textAlign: 'center',
  },
  gridText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  panicButton: {
    backgroundColor: '#FF9500',
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    minHeight: 80,
    shadowColor: '#FF9500',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FFB84D',
  },
  panicText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 8,
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(255,0,0,0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  headerSubtitle: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default HomeScreen;
