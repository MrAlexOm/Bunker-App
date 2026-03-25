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

const { width: screenWidth } = Dimensions.get('window');

const DEVICE_ID = 'device_' + Math.random().toString(36).substring(2, 9);

const VIRTUAL_DEVICES = [
  'device_B',
  'device_C',
  'device_D'
];

const STORAGE_KEY = 'bunker_chat_messages';

interface Message {
  id: string;              // уникальный id (Date.now + random)
  text: string;
  senderId: string;        // уникальный id устройства
  timestamp: number;
  ttl: number;             // время жизни (например 5 пересылок)
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
  lastMessageTime: number;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [showChatList, setShowChatList] = useState(false);
  const [isChatsOpen, setIsChatsOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [nearbyDevices, setNearbyDevices] = useState<{ name: string; id: string }[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const [isBluetoothSupported, setIsBluetoothSupported] = useState(false);
  const receivedMessageIds = useRef(new Set());
  const forwardCounter = useRef(0);

  // Безопасное добавление сообщения с защитой от дубликатов и TTL логикой
  const addMessageSafe = (message: Message) => {
    console.log('📥 RECEIVE TRY:', message.id);

    // TTL логика - если время жизни закончилось, игнорируем
    if (message.ttl <= 0) {
      return;
    }

    // Если уже видели это сообщение - игнорируем
    if (receivedMessageIds.current.has(message.id)) {
      console.log('⛔ DUPLICATE BLOCKED:', message.id);
      return;
    }

    // Сохраняем ID сообщения
    receivedMessageIds.current.add(message.id);

    // Уменьшаем TTL для следующей пересылки
    const messageWithDecreasedTtl = {
      ...message,
      ttl: message.ttl - 1
    };

    // Добавляем в список сообщений
    setMessages(prev => {
      const updated = [...prev, messageWithDecreasedTtl];

      // оставляем максимум 100 сообщений
      if (updated.length > 100) {
        return updated.slice(-100);
      }

      return updated;
    });

    console.log('✅ MESSAGE ADDED:', {
      id: messageWithDecreasedTtl.id,
      sender: messageWithDecreasedTtl.senderId,
      ttl: messageWithDecreasedTtl.ttl
    });

    // Пересылаем сообщение другим устройствам
    forwardMessage(messageWithDecreasedTtl);
  };

  // Симуляция получения сообщений от виртуальных устройств (mesh-сеть)
  const simulateIncomingMessage = (originalMessage: Message) => {
    VIRTUAL_DEVICES.forEach((deviceId, index) => {
      setTimeout(() => {
        console.log('📨 SIMULATED FROM:', deviceId);

        const incomingMessage = {
          ...originalMessage,
          id: originalMessage.id + '_' + deviceId,
          senderId: deviceId,
          timestamp: Date.now(),
          ttl: originalMessage.ttl - 1,
        };

        addMessageSafe(incomingMessage);
      }, 800 * (index + 1)); // задержка как в реальной сети
    });
  };

  // Пересылка сообщений другим устройствам (store & forward)
  const forwardMessage = (message: Message) => {
    console.log('🔁 FORWARD START:', message.id, 'TTL:', message.ttl);

    // дополнительная проверка TTL
    if (message.ttl <= 1) return;

    // ограничение пересылок
    if (forwardCounter.current > 20) {
      console.log('⛔ FORWARD LIMIT');
      return;
    }

    forwardCounter.current++;

    // если ttl закончился — не пересылаем
    if (message.ttl <= 0) return;

    VIRTUAL_DEVICES.forEach((deviceId, index) => {
      // не отправляем самому себе
      if (deviceId === message.senderId) return;

      console.log('📡 FORWARD TO:', deviceId);

      setTimeout(() => {
        const forwardedMessage = {
          ...message,
          id: message.id + '_fwd_' + deviceId + '_' + Date.now(),
          senderId: deviceId,
          timestamp: Date.now(),
          ttl: message.ttl - 1,
        };

        addMessageSafe(forwardedMessage);
      }, 1000 + index * 700);
    });
  };

  // Сохранение сообщений в localStorage
  useEffect(() => {
    try {
      const lastMessages = messages.slice(-100); // лимит
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lastMessages));
    } catch (e) {
      console.log('Storage save error', e);
    }
  }, [messages]);

  // Сброс счетчика пересылок каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      forwardCounter.current = 0;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Загрузка чатов из localStorage при старте
  useEffect(() => {
    loadChatsFromStorage();
    checkBluetoothSupport();
    
    // Загрузка сообщений из localStorage
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(parsed);

        // заполнить кэш ID
        parsed.forEach((msg: Message) => {
          receivedMessageIds.current.add(msg.id);
        });
      }
    } catch (e) {
      console.log('Storage load error', e);
    }
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
      id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 5),
      text: inputText.trim(),
      senderId: DEVICE_ID,
      timestamp: Date.now(),
      ttl: 5
    };

    console.log('📤 SEND:', {
      id: newMessage.id,
      sender: newMessage.senderId,
      ttl: newMessage.ttl,
      text: newMessage.text
    });

    // Запускаем симуляцию mesh-сети
    simulateIncomingMessage(newMessage);

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
    addMessageSafe(newMessage);
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
        existingChat.messages.forEach(msg => addMessageSafe(msg));
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
    chat.messages.forEach(msg => addMessageSafe(msg));
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
      item.senderId === DEVICE_ID ? styles.myMessageRow : styles.otherMessageRow
    ]}>
      <View style={[
        styles.messageBubble,
        item.senderId === DEVICE_ID ? styles.myBubble : styles.otherBubble
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Bluetooth Чат</Text>

      <TouchableOpacity onPress={scanForDevices} style={styles.scanButton} disabled={scanning}>
        <Text style={styles.scanButtonText}>📡</Text>
      </TouchableOpacity>
    </View>

    {/* Мои чаты (раскрываемый) */}
    <View style={styles.chatsSection}>
      <TouchableOpacity 
        style={styles.chatsHeader}
        onPress={() => setIsChatsOpen(prev => !prev)}
      >
        <Text style={styles.chatsHeaderText}>📋 Мои чаты</Text>
        <Text style={styles.chatsToggleIcon}>{isChatsOpen ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {isChatsOpen && (
        <View style={styles.chatsList}>
          <ScrollView style={{ maxHeight: 250 }} showsVerticalScrollIndicator={true}>
            {sortedChats.slice(0, 5).map(chat => (
              <TouchableOpacity
                key={chat.id}
                style={styles.chatListItem}
                onPress={() => selectChat(chat)}
              >
                <View style={styles.chatListItemLeft}>
                  <Text style={styles.chatListName}>{chat.name}</Text>
                  <Text style={styles.chatListPreview}>
                    {chat.messages[chat.messages.length - 1]?.text || 'Нет сообщений'}
                  </Text>
                </View>
                <Text style={styles.chatListTime}>
                  {formatDate(chat.lastMessageTime)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>

    {/* Основной экран чата */}
    <View style={{ flex: 1 }}>
      {currentChat ? (
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isMine = item.senderId === DEVICE_ID;
            return (
              <View style={[
                styles.message,
                isMine ? styles.myMessage : styles.otherMessage
              ]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
              </View>
            );
          }}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContainer}
          onLayout={scrollToBottom}
        />
      ) : (
        <View style={styles.noChatContainer}>
          <Text style={styles.noChatText}>Выберите чат или найдите устройство</Text>
        </View>
      )}
    </View>

    {/* Нижняя панель ввода (фикс в низу) */}
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Введите сообщение..."
        placeholderTextColor="#888"
        multiline
        maxLength={500}
      />
      <TouchableOpacity 
        style={styles.sendButton} 
        onPress={sendMessage}
        disabled={!inputText.trim() || !currentChat}
      >
        <Text style={styles.sendButtonText}>➤</Text>
      </TouchableOpacity>
  </View>

  {/* Нижняя панель ввода (фикс в низу) */}
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      value={inputText}
      onChangeText={setInputText}
      placeholder="Введите сообщение..."
      placeholderTextColor="#888"
      multiline
      maxLength={500}
    />
    <TouchableOpacity 
      style={styles.sendButton} 
      onPress={sendMessage}
      disabled={!inputText.trim() || !currentChat}
    >
      <Text style={styles.sendButtonText}>➤</Text>
    </TouchableOpacity>
  </View>
</View>
);

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
  backButton: {
    padding: 8,
    borderRadius: 4,
  },
  back: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
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
  },
  messageTime: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textAlign: 'right',
  },
  chatListButton: {
    backgroundColor: '#151515',
    paddingVertical: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  chatListButtonText: {
    color: '#FFD60A',
    fontSize: 16,
    fontWeight: '600',
  },
  chatListPanel: {
    backgroundColor: '#151515',
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    maxHeight: 300,
  },
  chatListScroll: {
    maxHeight: 300,
  },
  chatListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  chatListItemLeft: {
    flex: 1,
  },
  chatListName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  chatListPreview: {
    fontSize: 12,
    color: '#888',
  },
  chatListTime: {
    fontSize: 11,
    color: '#888',
    marginLeft: 8,
  },
  noChatsText: {
    color: '#888',
    textAlign: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#151515',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
  },
  input: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#555',
  },
  sendButtonText: {
    fontSize: 22,
  },
});

export default ChatScreen;
