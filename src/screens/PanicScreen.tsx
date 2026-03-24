import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

const PanicScreen = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Есть кто рядом?", mine: false },
    { id: 2, text: "Я здесь", mine: true }
  ]);
  const [inputText, setInputText] = useState('');

  // TODO: заменить на Bluetooth mesh
  // TODO: добавить peer discovery

  // Имитация ответа на сообщение
  const simulateResponse = () => {
    setTimeout(() => {
      const responses = [
        "Я рядом, держись",
        "Тоже здесь, помогу",
        "Есть припасы, подходи",
        "Безопасное место найдено"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: randomResponse,
        mine: false
      }]);
    }, 1500 + Math.random() * 1500); // 1.5-3 секунды
  };

  // Отправка сообщения
  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      mine: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // Имитация ответа
    simulateResponse();
  };

  // SOS broadcast
  const handleSOS = () => {
    const sosMessage = {
      id: Date.now(),
      text: "🚨 SOS! Нужна помощь! Я рядом!",
      mine: true
    };

    setMessages(prev => [...prev, sosMessage]);
    
    // Имитация ответа на SOS
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Прибываю! Держись!",
        mine: false
      }]);
    }, 2000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📡 ЧАТ ВЫЖИВШИЕ</Text>
        <Text style={styles.headerSubtitle}>Поиск людей рядом...</Text>
      </View>

      {/* Сообщения */}
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageContainer,
              message.mine ? styles.myMessage : styles.otherMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input зона */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Написать сообщение..."
          placeholderTextColor="#666666"
          multiline
          maxLength={200}
        />
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSend}
          >
            <Text style={styles.sendButtonText}>Отправить</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.sosButton}
            onPress={handleSOS}
          >
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#666666',
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
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
  inputContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },
  textInput: {
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    maxHeight: 100,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  sendButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PanicScreen;
