import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const HomeScreen = () => {
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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Заголовок BUNKER */}
        <Text style={styles.headerTitle}>BUNKER</Text>
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 100,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 8,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    opacity: 0.8,
    marginBottom: 32,
  },
  sosButton: {
    backgroundColor: '#FF0000',
    borderRadius: 16,
    paddingVertical: 40,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
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
