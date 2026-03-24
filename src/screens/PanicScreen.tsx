import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PanicScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Есть кто рядом?', mine: false },
    { id: '2', text: 'Я здесь', mine: true }
  ]);

  // Отладочная информация
  console.log('PanicScreen render - messages:', messages);
  console.log('PanicScreen render - messages.length:', messages.length);

  return (
    <View style={styles.container}>
      {/* Заголовок */}
      <Text style={styles.title}>ЧАТ ВЫЖИВШИЕ</Text>
      
      {/* Отладочная информация */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>🐛 DEBUG INFO:</Text>
        <Text style={styles.debugText}>Messages count: {messages.length}</Text>
        <Text style={styles.debugText}>Screen: PanicScreen</Text>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.debugText}>
            Msg{index}: "{msg.text}" ({msg.mine ? 'mine' : 'other'})
          </Text>
        ))}
      </View>
      
      {/* Сообщения */}
      <View style={styles.messagesWrapper}>
        <ScrollView style={styles.messagesContainer}>
          {messages.length === 0 ? (
            <Text style={styles.emptyText}>❌ Сообщений нет</Text>
          ) : (
            messages.map((message) => (
              <View 
                key={message.id} 
                style={[
                  styles.messageContainer,
                  message.mine ? styles.myMessage : styles.otherMessage
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))
          )}
        </ScrollView>
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
  debugContainer: {
    backgroundColor: '#1A1A1A',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  debugText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginBottom: 2,
  },
  messagesWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContainer: {
    flex: 1,
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
  emptyText: {
    color: '#FF6B6B',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default PanicScreen;
