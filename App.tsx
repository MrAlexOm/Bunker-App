import React, { useState } from 'react';
import { View, Text } from 'react-native';
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
import SOSScreen from './src/screens/SOSScreen';
import LoadingScreen from './src/screens/LoadingScreen';

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
  console.log("App is rendering");
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LanguageProvider>
        <LoadingScreen onFinish={handleLoadingComplete} />
      </LanguageProvider>
    );
  }
  
  return (
    <LanguageProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </LanguageProvider>
  );
}
