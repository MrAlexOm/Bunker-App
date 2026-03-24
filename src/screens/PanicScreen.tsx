import React, { useState } from 'react';
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

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: input,
      isMine: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>📡 ЧАТ ВЫЖИВШИЕ</Text>

      <ScrollView 
        style={styles.chat}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.message,
              msg.isMine ? styles.myMessage : styles.otherMessage
            ]}
          >
            <Text style={styles.text}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Написать..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />

        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 15,
  },
  title: {
    color: '#FF3B30',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chat: {
    flex: 1,
  },
  message: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF3B30',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A1A1A',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PanicScreen;
