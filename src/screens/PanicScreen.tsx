import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const PanicScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: '🚨 SOS! Есть кто рядом?', isMine: false },
    { id: '2', text: 'Я в укрытии, 2 человека', isMine: true },
  ]);

  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      isMine: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📡 ЧАТ ВЫЖИВШИЕ</Text>

        {/* Bluetooth кнопка (пока заглушка) */}
        <TouchableOpacity style={styles.bluetoothBtn}>
          <Text style={styles.bluetoothText}>🔵</Text>
        </TouchableOpacity>
      </View>

      {/* CHAT */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.isMine ? styles.myMessage : styles.otherMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Сообщение..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PanicScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
  },

  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: 'bold',
  },

  bluetoothBtn: {
    padding: 8,
  },

  bluetoothText: {
    fontSize: 18,
  },

  chat: {
    flex: 1,
    paddingHorizontal: 10,
  },

  chatContent: {
    paddingBottom: 20,
  },

  message: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
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
    fontSize: 15,
  },

  inputRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#1A1A1A',
  },

  input: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 10,
  },

  sendText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
