import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  console.log("HomeScreen is rendering");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOME SCREEN WORKS!</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>TOUCHABLE TEST</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
