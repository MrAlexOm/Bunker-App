import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  console.log("HomeScreen is rendering");
  
  const translations = {
    sos: 'SOS',
    danger: 'В опасности',
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
        <TouchableOpacity style={styles.dangerButton}>
          <View style={styles.iconContainer}>
            <Text style={styles.warningIcon}>⚠️</Text>
          </View>
          <Text style={styles.dangerText}>{translations.danger}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.safetyButton}>
          <View style={styles.safetyIconContainer}>
            <Text style={styles.shieldIcon}>🛡️</Text>
          </View>
          <Text style={styles.safetyText}>{translations.safety}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridText}>{translations.medical}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridText}>{translations.supplies}</Text>
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
    backgroundColor: '#1A0505',
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
    backgroundColor: 'transparent',
    opacity: 0.3,
    background: 'linear-gradient(to bottom, #2A0808 0%, #0D0303 50%, #000000 100%)',
  },
  headerTitle: {
    color: '#C0C0C0',
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 8,
    textAlign: 'center',
    marginBottom: 32,
    textShadowColor: '#4A4A4A',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  sosButton: {
    backgroundColor: '#8B0000',
    borderRadius: 16,
    paddingVertical: 40,
    marginBottom: 32,
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
    width: '48%',
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 120,
    borderWidth: 3,
    borderColor: '#444444',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  iconContainer: {
    marginBottom: 8,
  },
  warningIcon: {
    fontSize: 32,
    color: '#FFA500',
    textShadowColor: '#FF6B00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
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
  safetyButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    width: '48%',
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 16,
    minHeight: 120,
    borderWidth: 3,
    borderColor: '#444444',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 8,
  },
  safetyIconContainer: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  shieldIcon: {
    fontSize: 28,
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
    paddingVertical: 24,
    alignItems: 'center',
    minHeight: 80,
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
