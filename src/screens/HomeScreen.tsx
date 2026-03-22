import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  console.log("HomeScreen is rendering");
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF0000' }}>
      <Text style={{ color: 'white', fontSize: 24 }}>HOME SCREEN WORKS!</Text>
    </View>
  );
};

export default HomeScreen;
