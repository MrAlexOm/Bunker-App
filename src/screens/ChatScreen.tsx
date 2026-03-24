import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
  Modal,
  Dimensions
} from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const { width: screenWidth } = Dimensions.get('window');

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: number;
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
  lastMessageTime: number;
}

const ChatScreen = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [showChatList, setShowChatList] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState<{ name: string; id: string }[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [isBluetoothSupported, setIsBluetoothSupported] = useState(false);

  // Загрузка чатов из localStorage при старте
  useEffect(() => {
    loadChatsFromStorage();
    checkBluetoothSupport();
  }, []);

  // Сохранение чатов при изменении
  useEffect(() => {
    if (chats.length > 0) {
      saveChatsToStorage();
    }
  }, [chats]);

  const checkBluetoothSupport = () => {
    // @ts-ignore - Web Bluetooth API
    if (navigator.bluetooth && navigator.bluetooth.requestDevice) {
      setIsBluetoothSupported(true);
    } else {
      Alert.alert(
        'Bluetooth не поддерживается',
        'Функция Bluetooth Mesh доступна только на Android с Chrome. На iOS используйте локальный чат.'
      );
    }
  };

  const loadChatsFromStorage = () => {
    try {
      const stored = localStorage.getItem('bunker_chats');
      if (stored) {
        const parsed = JSON.parse(stored);
        setChats(parsed);
      }
    } catch (error) {
      console.error('Ошибка загрузки чатов:', error);
    }
  };

  const saveChatsToStorage = () => {
    try {
      localStorage.setItem('bunker_chats', JSON.stringify(chats));
    } catch (error) {
      console.error('Ошибка сохранения чатов:', error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  // Отправка сообщения
  const sendMessage = () => {
    if (!inputText.trim()) return;
    if (!currentChat) {
      Alert.alert('Нет собеседника', 'Сначала выберите или найдите собеседника');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      timestamp: Date.now()
    };

    const updatedMessages = [...currentChat.messages, newMessage];
    // Ограничиваем до 200 сообщений
    const limitedMessages = updatedMessages.slice(-200);

    const updatedChat: Chat = {
      ...currentChat,
      messages: limitedMessages,
      lastMessageTime: Date.now()
    };

    const updatedChats = chats.map(chat =>
      chat.id === currentChat.id ? updatedChat : chat
    );

    setChats(updatedChats);
    setCurrentChat(updatedChat);
    setMessages(limitedMessages);
    setInputText('');
    scrollToBottom();
  };

  // Поиск Bluetooth устройств
  const scanForDevices = async () => {
    if (!isBluetoothSupported) {
      Alert.alert('Bluetooth недоступен', 'Функция доступна только на Android с Chrome');
      return;
    }

    setScanning(true);
    setNearbyDevices([]);

    try {
      // @ts-ignore
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: []
      });

      const deviceName = device.name || 'Неизвестное устройство';
      const deviceId = device.id;

      // Проверяем, существует ли уже чат с этим устройством
      const existingChat = chats.find(chat => chat.id === deviceId);
      
      if (existingChat) {
        setCurrentChat(existingChat);
        setMessages(existingChat.messages);
      } else {
        // Создаем новый чат
        const newChat: Chat = {
          id: deviceId,
          name: deviceName,
          messages: [],
          lastMessageTime: Date.now()
        };
        setChats([newChat, ...chats]);
        setCurrentChat(newChat);
        setMessages([]);
      }

      Alert.alert('Подключено', `Устройство ${deviceName} подключено`);
    } catch (error) {
      console.error('Ошибка поиска устройств:', error);
      Alert.alert('Ошибка', 'Не удалось подключиться к устройству');
    } finally {
      setScanning(false);
    }
  };

  // Выбор чата из списка
  const selectChat = (chat: Chat) => {
    setCurrentChat(chat);
    setMessages(chat.messages);
    setShowChatList(false);
    scrollToBottom();
  };

  // Сортировка чатов по дате последнего сообщения
  const sortedChats = [...chats].sort((a, b) => b.lastMessageTime - a.lastMessageTime);

  // Форматирование времени
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return formatTime(timestamp);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return `${date.getDate()}.${date.getMonth() + 1}`;
    }
  };

  // Рендер сообщения
  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageRow,
      item.sender === 'me' ? styles.myMessageRow : styles.otherMessageRow
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myBubble : styles.otherBubble
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header с поиском */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {currentChat ? currentChat.name : 'Bluetooth Чат'}
        </Text>
        <TouchableOpacity onPress={scanForDevices} style={styles.scanButton} disabled={scanning}>
          <Text style={styles.scanButtonText}>📡</Text>
        </TouchableOpacity>
      </View>

      {/* Сообщения */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        onLayout={scrollToBottom}
      />

      {/* Кнопка "Мои чаты" */}
      <TouchableOpacity
        style={styles.chatListButton}
        onPress={() => setShowChatList(!showChatList)}
      >
        <Text style={styles.chatListButtonText}>📋 Мои чаты</Text>
      </TouchableOpacity>

      {/* Список чатов (выпадающий) */}
      {showChatList && (
        <View style={styles.chatListPanel}>
          <ScrollView style={styles.chatListScroll}>
            {sortedChats.length === 0 ? (
              <Text style={styles.noChatsText}>Нет сохраненных чатов</Text>
            ) : (
              sortedChats.map(chat => (
                <TouchableOpacity
                  key={chat.id}
                  style={styles.chatListItem}
                  onPress={() => selectChat(chat)}
                >
                  <View style={styles.chatListItemLeft}>
                    <Text style={styles.chatListName}>{chat.name}</Text>
                    {chat.messages.length > 0 && (
                      <Text style={styles.chatListPreview} numberOfLines={1}>
                        {chat.messages[chat.messages.length - 1].text}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.chatListTime}>
                    {formatDate(chat.lastMessageTime)}
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
        </View>
      )}

      {/* Ввод сообщения */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder={currentChat ? "Введите сообщение..." : "Сначала найдите собеседника 📡"}
          placeholderTextColor="#888"
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, !currentChat && styles.sendButtonDisabled]}
          onPress={sendMessage}
          disabled={!currentChat}
        >
          <Text style={styles.sendButtonText}>✉️</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#151515',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scanButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 22,
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  messageRow: {
    marginBottom: 12,
  },
  myMessageRow: {
    alignItems: 'flex-end',
  },
  otherMessageRow: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: screenWidth * 0.75,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
  },
  myBubble: {
    backgroundColor: '#FF3B30',
  },
  otherBubble: {
    backgroundColor: '#2A2A2A',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 20,
  },
});

export default ChatScreen;
