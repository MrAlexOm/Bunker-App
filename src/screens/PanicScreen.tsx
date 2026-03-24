import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PanicScreen = () => {
  const messages = [
    { id: '1', text: '🚨 SOS! Есть кто рядом?' },
    { id: '2', text: 'Я в укрытии, 2 человека' },
  ];

  console.log('PanicScreen render, messages:', messages);

  return (
  <View style={{ flex: 1, backgroundColor: '#0B0B0B', padding: 20 }}>
    
    <Text style={{ color: 'red', fontSize: 20 }}>
      📡 ЧАТ ВЫЖИВШИЕ
    </Text>

    <Text style={{ color: 'white', marginTop: 20 }}>
      TEST MESSAGE 1
    </Text>

    <Text style={{ color: 'white', marginTop: 10 }}>
      TEST MESSAGE 2
    </Text>

  </View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 20,
  },
  title: {
    color: '#FF3B30',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1, // 🔥 ВАЖНО
  },
  chatContent: {
    paddingBottom: 20,
  },
  message: {
    backgroundColor: '#1A1A1A',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default PanicScreen;
