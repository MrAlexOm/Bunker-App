import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LanguageProvider } from './src/contexts/LanguageContext';

import HomeScreen from './src/screens/HomeScreen';
import MedicalScreen from './src/screens/MedicalScreen';
import InventoryScreen from './src/screens/InventoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DangerScreen from './src/screens/DangerScreen';
import ScenariosScreen from './src/screens/ScenariosScreen';
import PanicScreen from './src/screens/PanicScreen';
import SafetyScreen from './src/screens/SafetyScreen';

// Create SOSScreen
const SOSScreen = () => (
  <View style={{ flex: 1, backgroundColor: '#0B0B0B', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <Text style={{ color: '#FF3B30', fontSize: 32, fontWeight: 'bold', marginBottom: 20 }}>🔴 SOS</Text>
    <Text style={{ color: '#FFFFFF', fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
      Экстренная сигнализация активирована
    </Text>
    <Text style={{ color: '#A1A1A1', fontSize: 16, textAlign: 'center' }}>
      Нажмите кнопку назад для возврата на главный экран
    </Text>
  </View>
);

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      presentation: 'modal',
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="SOSScreen" component={SOSScreen} />
    <Stack.Screen name="Danger" component={DangerScreen} />
    <Stack.Screen name="Safety" component={SafetyScreen} />
    <Stack.Screen name="Medical" component={MedicalScreen} />
    <Stack.Screen name="Inventory" component={InventoryScreen} />
    <Stack.Screen name="Scenarios" component={ScenariosScreen} />
    <Stack.Screen name="Panic" component={PanicScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
