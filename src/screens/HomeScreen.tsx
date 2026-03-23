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
      {/* Заголовок BUNKER с иконками */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerIcon}>⛨</Text>
        <Text style={styles.headerTitle}>BUNKER</Text>
        <Text style={styles.headerIcon}>⚙️</Text>
      </View>
      <Text style={styles.headerSubtitle}>ОФЛАЙН ПРИЛОЖЕНИЕ ДЛЯ ВЫЖИВАНИЯ</Text>

      {/* Огромная кнопка SOS */}
      <TouchableOpacity style={styles.sosButton}>
        <Text style={styles.sosText}>{translations.sos}</Text>
      </TouchableOpacity>

      {/* Сетка 2×2 */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridText}>{translations.danger}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridButton}>
          <Text style={styles.gridText}>{translations.safety}</Text>
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
    backgroundColor: '#0B0B0B',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerIcon: {
    color: '#8B8B8B',
    fontSize: 32,
    marginHorizontal: 15,
    textShadowColor: '#4A4A4A',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  headerTitle: {
    color: '#C0C0C0',
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 8,
    textAlign: 'center',
    textShadowColor: '#4A4A4A',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 5,
  },
  headerSubtitle: {
    color: '#8B8B8B',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 32,
    textShadowColor: '#4A4A4A',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  gridText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 24,
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
