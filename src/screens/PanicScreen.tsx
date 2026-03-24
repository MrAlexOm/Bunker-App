import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PanicScreen = () => {
  console.log('🔥🔥🔥 PanicScreen RENDER START 🔥🔥🔥');
  
  const [messages] = useState([
    { id: '1', text: 'Есть кто рядом?', mine: false },
    { id: '2', text: 'Я здесь', mine: true }
  ]);

  console.log('🔥🔥🔥 PanicScreen MESSAGES:', messages);
  console.log('🔥🔥🔥 PanicScreen RETURN JSX');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ЧАТ ВЫЖИВШИЕ</Text>
      
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => {
          console.log('🔥🔥🔥 Mapping message:', message);
          return (
            <View 
              key={message.id} 
              style={[
                styles.messageContainer,
                message.mine ? styles.myMessage : styles.otherMessage
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          );
        })}
      </ScrollView>
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
    height: 300, // ФИКСИРОВАННАЯ ВЫСОТА
    paddingHorizontal: 20,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
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
});

export default PanicScreen;
