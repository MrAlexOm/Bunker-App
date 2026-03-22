import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  console.log("HomeScreen is rendering");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOME SCREEN WORKS!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
});

export default HomeScreen;
