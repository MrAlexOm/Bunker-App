import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const HomeScreen = ({ navigation }) => {
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
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100, // Учитываем высоту табов
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    paddingVertical: 60,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280, // Огромная кнопка
    shadowColor: '#FF3B30',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#FF6B60',
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  rtlGrid: {
    flexDirection: 'row-reverse',
  },
  gridButton: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    width: '48%',
    paddingVertical: 35,
    alignItems: 'center',
    marginBottom: 20,
    minHeight: 140,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#2A2A2A',
  },
  gridIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  gridText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 22,
  },
  panicButton: {
    backgroundColor: '#FFD60A',
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: 'center',
    minHeight: 90,
    shadowColor: '#FFD60A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#FFE066',
  },
  panicText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
