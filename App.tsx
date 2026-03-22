import React, { useState, useEffect } from 'react';
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
// import LoadingScreen from './src/screens/LoadingScreen';

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
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("App useEffect - checking for errors");
    
    // Try to detect any initialization errors
    try {
      // Test if we can access basic features
      const testStorage = typeof localStorage !== 'undefined';
      const testFetch = typeof fetch !== 'undefined';
      console.log("Environment check:", { testStorage, testFetch });
    } catch (e) {
      console.error("Environment check failed:", e);
      setError(e);
    }
  }, []);

  if (error) {
    console.log("Showing error screen:", error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0B0B', padding: 20 }}>
        <Text style={{ color: '#FF3B30', fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
          ERROR: {error?.toString()}
        </Text>
        <Text style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'center', marginBottom: 10 }}>
          Type: {error?.constructor?.name || 'Unknown'}
        </Text>
        <Text style={{ color: '#CCCCCC', fontSize: 12, textAlign: 'center' }}>
          Message: {error?.message || 'No message'}
        </Text>
        <Text style={{ color: '#CCCCCC', fontSize: 12, textAlign: 'center', marginTop: 10 }}>
          Stack: {error?.stack?.split('\n')[0] || 'No stack'}
        </Text>
      </View>
    );
  }
  
  return (
    <LanguageProvider>
      <NavigationContainer>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B0B0B' }}>
          <Text style={{ color: 'white', fontSize: 24 }}>TEST OK</Text>
        </View>
      </NavigationContainer>
    </LanguageProvider>
  );
}
