import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import BloodTitle from '../components/BloodTitle';
import type { RootStackNavigationProp } from '../types/navigation';

const { height: screenHeight } = Dimensions.get('window');

const DangerScreen = ({ navigation }: { navigation: RootStackNavigationProp }) => {

  const dangerItems = [
    { id: 1, title: 'Обстрел', icon: '💥' },
    { id: 2, title: 'Завал', icon: '🧱' },
    { id: 3, title: 'Блокпост', icon: '🚧' },
    { id: 4, title: 'Толпа', icon: '👥' },
    { id: 5, title: 'Нет воды/еды', icon: '🚫' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <BloodTitle />
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backText}>Назад</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Я в опасности</Text>
        <Text style={styles.headerSubtitle}>Выберите тип угрозы</Text>
      </View>

      <View style={styles.dangerList}>
        {dangerItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={styles.dangerItem}
            onPress={() => {
              console.log(`Выбрано: ${item.title}`);
            }}
          >
            <View style={styles.dangerIcon}>
              <Text style={styles.dangerIconText}>{item.icon}</Text>
            </View>
            <Text style={styles.dangerTitle}>{item.title}</Text>
            <Text style={styles.dangerArrow}>-></Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity 
        style={styles.sosButton}
        onPress={() => navigation.navigate('SOSScreen')}
      >
        <View style={styles.sosContent}>
          <Text style={styles.sosIcon}>🆘</Text>
          <Text style={styles.sosText}>SOS</Text>
        </View>
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
    padding: 12,
    paddingBottom: 20,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  backIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 8,
  },
  backText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF3B30',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#A1A1A1',
  },
  dangerList: {
    paddingHorizontal: 12,
  },
  dangerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  dangerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dangerIconText: {
    fontSize: 20,
  },
  dangerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dangerArrow: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A1A1A1',
  },
  sosButton: {
    height: screenHeight * 0.28,
    backgroundColor: '#FF3B30',
    borderRadius: 16,
    marginHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B91C1C',
  },
  sosContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosIcon: {
    fontSize: 32,
    marginBottom: 6,
    color: '#FFFFFF',
  },
  sosText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});

export default DangerScreen;
