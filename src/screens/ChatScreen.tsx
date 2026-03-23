import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ChatScreen = () => {
  // Фейковый список устройств
  const fakeDevices = [
    { name: 'Устройство рядом', distance: '5м', type: 'device' },
    { name: 'Неизвестный', distance: '12м', type: 'unknown' },
    { name: 'Выживший', distance: '20м', type: 'survivor' },
  ];

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>ЧАТ ВЫЖИВШИЕ</Text>
      
      {/* Статус */}
      <Text style={styles.status}>🔍 Поиск устройств...</Text>
      
      {/* Список устройств */}
      <ScrollView style={styles.deviceList}>
        {fakeDevices.map((device, index) => (
          <View key={index} style={styles.deviceCard}>
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceName}>📱 {device.name}</Text>
              <Text style={styles.deviceDistance}>📡 {device.distance}</Text>
            </View>
            <TouchableOpacity style={styles.connectButton}>
              <Text style={styles.connectButtonText}>Подключиться</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      
      {/* Кнопка обновить */}
      <TouchableOpacity style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>🔄 Обновить поиск</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    paddingTop: 40,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  status: {
    color: '#CCCCCC',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  deviceList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  deviceCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  deviceDistance: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  connectButton: {
    backgroundColor: '#FF9500',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  refreshButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ChatScreen;
