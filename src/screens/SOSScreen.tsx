import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const SOSScreen = ({ navigation }) => {
  const { t } = useLanguage();

  const sosChecklist = [
    { id: 1, text: 'Оцените обстановку и угрозы', completed: false },
    { id: 2, text: 'Найдите безопасное укрытие', completed: false },
    { id: 3, text: 'Свяжитесь с экстренными службами', completed: false },
    { id: 4, text: 'Проверьте наличие раненых', completed: false },
    { id: 5, text: 'Соберите необходимые припасы', completed: false },
    { id: 6, text: 'Следуйте плану эвакуации', completed: false }
  ];

  const handleEmergencyCall = () => {
    Alert.alert(
      'Экстренный вызов',
      'Позвонить в экстренные службы?',
      [
        { text: 'Отмена', style: 'cancel' },
        { text: 'Позвонить 112', onPress: () => console.log('Calling 112') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sosTitle}>🔴 SOS</Text>
        <Text style={styles.subtitle}>Экстренная сигнализация</Text>
      </View>

      <View style={styles.alertBox}>
        <Text style={styles.alertText}>
          АКТИВИРОВАНА ЭКСТРЕННАЯ СИТУАЦИЯ
        </Text>
        <Text style={styles.alertSubtext}>
          Следуйте инструкциям ниже
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Чек-лист действий:</Text>
        {sosChecklist.map((item) => (
          <TouchableOpacity key={item.id} style={styles.checklistItem}>
            <View style={styles.checkbox} />
            <Text style={styles.checklistText}>{item.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
        <Text style={styles.emergencyButtonText}>📞 Экстренный вызов 112</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Вернуться</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#FF3B30',
  },
  sosTitle: {
    color: '#FF3B30',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
  },
  alertBox: {
    backgroundColor: '#FF3B30',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  alertText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  alertSubtext: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.8,
  },
  section: {
    margin: 20,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FF3B30',
    borderRadius: 4,
    marginRight: 15,
  },
  checklistText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
  },
  emergencyButton: {
    backgroundColor: '#00FF00',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#151515',
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#A1A1A1',
    fontSize: 16,
  },
});

export default SOSScreen;
