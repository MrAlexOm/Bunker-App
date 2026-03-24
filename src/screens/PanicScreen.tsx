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
    <View style={{ flex: 1, backgroundColor: '#0B0B0B' }}>
      
      {/* HEADER */}
      <View>
        <Text style={styles.title}>ЧАТ ВЫЖИВШИЕ</Text>
      </View>

      {/* CHAT CONTAINER */}
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: 20
          }}
        >
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
                <Text style={{ color: 'white' }}>{message.text}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    paddingTop: 40,
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF3B30',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#333',
  },
});

export default PanicScreen;
