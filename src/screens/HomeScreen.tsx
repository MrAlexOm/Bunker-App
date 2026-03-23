import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  console.log("HomeScreen is rendering");
  
  // Адаптивные размеры
  const { width, height } = Dimensions.get('window');
  const isSmallScreen = width < 400;
  const isLargeScreen = width > 500;
  
  // Динамические стили
  const dynamicStyles = {
    dangerButtonWidth: isSmallScreen ? '45%' : '48%',
    safetyButtonWidth: isSmallScreen ? '45%' : '48%',
  };
  
  const translations = {
    sos: 'SOS',
    danger: 'Я В ОПАСНОСТИ',
    safety: 'Найти укрытие',
    medical: 'Первая помощь',
    supplies: 'Запасы',
    scenarios: 'Сценарии',
    panic: 'Я в панике'
  };

  return (
    <View style={styles.container}>
      {/* Градиентный слой для плавного перехода */}
      <View style={styles.gradientOverlay} />
      
      {/* Заголовок BUNKER */}
      <Text style={styles.headerTitle}>BUNKER</Text>

      {/* Огромная кнопка SOS */}
      <TouchableOpacity style={styles.sosButton}>
        <Text style={styles.sosText}>{translations.sos}</Text>
      </TouchableOpacity>

      {/* Сетка 2×2 */}
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.dangerButton, { width: dynamicStyles.dangerButtonWidth }]}>
          <View style={styles.iconContainer}>
            <Text style={styles.warningIcon}>⚠️</Text>
          </View>
          <Text style={styles.dangerText}>{translations.danger}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.safetyButton, { width: dynamicStyles.safetyButtonWidth }]}>
          <View style={styles.iconContainer}>
            <Text style={styles.shieldIcon}>🛡️</Text>
          </View>
          <Text style={styles.safetyText}>{translations.safety}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.dangerButton, { width: dynamicStyles.dangerButtonWidth }]}>
          <View style={styles.iconContainer}>
            <Text style={styles.medicalIcon}>🏥</Text>
          </View>
          <Text style={styles.dangerText}>{translations.medical}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.dangerButton, { width: dynamicStyles.dangerButtonWidth }]}>
          <View style={styles.iconContainer}>
            <Text style={styles.suppliesIcon}>📦</Text>
          </View>
          <Text style={styles.dangerText}>{translations.supplies}</Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка паники */}
      <TouchableOpacity style={styles.panicButton}>
        <Text style={styles.panicText}>{translations.panic}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0303',
    paddingTop: 40,
    paddingHorizontal: 24,
    position: 'relative',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A0202',
    opacity: 0.4,
  },
  headerTitle: {
    color: '#C0C0C0',
    fontSize: 42,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: '#2A2A2A',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 6,
  },
  sosButton: {
    backgroundColor: '#8B0000',
    borderRadius: 16,
    paddingVertical: 40,
    marginBottom: 22,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    borderWidth: 3,
    borderColor: '#FF0000',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 15,
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
  gridButton: {
    backgroundColor: '#1C1C1E',
    borderRadius: 16,
    width: '48%',
    paddingVertical: 32,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 120,
    borderWidth: 2,
    borderColor: '#2C2C2E',
  },
  dangerButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 11,
    minHeight: 100,
    borderWidth: 3,
    borderColor: '#444444',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  warningIcon: {
    fontSize: 40,
    color: '#FFA500',
    textShadowColor: '#FF6B00',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
  },
  medicalIcon: {
    fontSize: 40,
    color: '#FF6B6B',
    textShadowColor: '#CC0000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
  },
  suppliesIcon: {
    fontSize: 40,
    color: '#8B8B00',
    textShadowColor: '#4B4B00',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
  },
  gridText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 24,
  },
  dangerText: {
    color: '#B8B8B8',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 20,
    textShadowColor: '#000000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  safetyButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 11,
    minHeight: 100,
    borderWidth: 3,
    borderColor: '#444444',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  shieldIcon: {
    fontSize: 40,
    color: '#C0C0C0',
    textShadowColor: '#666666',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  safetyText: {
    color: '#D4D4D4',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 20,
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    letterSpacing: 1,
  },
  panicButton: {
    backgroundColor: '#FF9500',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    minHeight: 60,
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
});

export default HomeScreen;
