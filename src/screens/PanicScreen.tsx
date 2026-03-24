import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PanicScreen = () => {
  console.log('🔥 PanicScreen RENDER START');
  
  const [messages] = useState([
    { id: '1', text: 'Есть кто рядом?', mine: false },
    { id: '2', text: 'Я здесь', mine: true }
  ]);

  console.log('🔥 PanicScreen MESSAGES:', messages);
  console.log('🔥 PanicScreen MESSAGES LENGTH:', messages.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ЧАТ ВЫЖИВШИЕ</Text>
      
      {/* ВРЕМЕННЫЙ ТЕСТОВЫЙ ЭЛЕМЕНТ */}
      <View style={styles.testBox}>
        <Text style={styles.testText}>🔥 ТЕСТОВЫЙ БЛОК 🔥</Text>
      </View>
      
      <ScrollView style={styles.messagesContainer}>
        <Text style={styles.testText}>📱 ВНУТРИ SCROLLVIEW 📱</Text>
        
        {messages.map((message) => {
          console.log('🔥 Mapping message:', message);
          return (
            <View 
              key={message.id} 
              style={[
                styles.messageContainer,
                message.mine ? styles.myMessage : styles.otherMessage
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.testText}>🔥 МЕССЕДЖ ВИДЕН 🔥</Text>
            </View>
          );
        })}
        
        <Text style={styles.testText}>📱 КОНЕЦ SCROLLVIEW 📱</Text>
      </ScrollView>
      
      {/* ВРЕМЕННЫЙ ТЕСТОВЫЙ ЭЛЕМЕНТ */}
      <View style={styles.testBox}>
        <Text style={styles.testText}>🔥 НИЖНИЙ БЛОК 🔥</Text>
      </View>
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
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#FF0000', // ВРЕМЕННО
    borderWidth: 2,
    borderColor: '#00FF00',
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFFF00',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF3B30',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A1A1A',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 20,
  },
  testBox: {
    backgroundColor: '#FF00FF',
    padding: 20,
    margin: 10,
    alignItems: 'center',
  },
  testText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PanicScreen;
