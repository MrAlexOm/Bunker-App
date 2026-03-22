import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BloodTitle = () => {
  return (
    <View style={styles.container}>
      {/* Основной текст */}
      <Text style={styles.title}>BUNKER</Text>
      
      {/* Капли крови под текстом */}
      <View style={[styles.drip, styles.drip1]} />
      <View style={[styles.drip, styles.drip2]} />
      <View style={[styles.drip, styles.drip3]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FF3B30',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textShadow: [
      { color: '#8B0000', offset: { width: 2, height: 2 }, blurRadius: 1 },
      { color: '#A52A2A', offset: { width: -1, height: -1 }, blurRadius: 0.5 },
    ],
    // Эффект "неровности" через небольшое смещение
    transform: [{ skewX: '-2deg' }],
  },
  drip: {
    position: 'absolute',
    backgroundColor: '#FF3B30',
    borderRadius: 2,
    // Эффект капли
    width: 3,
    height: 8,
    shadowColor: '#8B0000',
    shadowOpacity: 0.6,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  drip1: {
    bottom: -8,
    left: '30%',
    height: 6,
  },
  drip2: {
    bottom: -10,
    left: '50%',
    height: 10,
    width: 4,
  },
  drip3: {
    bottom: -7,
    left: '70%',
    height: 7,
  },
});

export default BloodTitle;
