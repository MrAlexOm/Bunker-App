import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PanicScreen = () => {
  const messages = [
    { id: '1', text: '🚨 SOS! Есть кто рядом?' },
    { id: '2', text: 'Я в укрытии, 2 человека' },
  ];

  console.log('PanicScreen render, messages:', messages);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>📡 ЧАТ ВЫЖИВШИЕ</Text>

      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((msg) => (
          <View key={msg.id} style={styles.message}>
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

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
