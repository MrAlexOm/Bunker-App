import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BloodTitleProps {
  title?: string;
  subtitle?: string;
}

const BloodTitle: React.FC<BloodTitleProps> = ({ 
  title = 'BUNKER', 
  subtitle 
}) => {
  return (
    <View style={styles.container}>
      {/* Капли крови */}
      <View style={[styles.drop, styles.drop1]} />
      <View style={[styles.drop, styles.drop2]} />
      <View style={[styles.drop, styles.drop3]} />
      
      {/* Основной заголовок */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Подзаголовок */}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      
      {/* Капли крови */}
      <View style={[styles.drop, styles.drop4]} />
      <View style={[styles.drop, styles.drop5]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
    position: 'relative',
  },
  title: {
    color: '#FF3B30',
    fontSize: 42,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(139, 0, 0, 0.4)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    zIndex: 2,
  },
  subtitle: {
    color: '#FF6B60',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  drop: {
    position: 'absolute',
    width: 4,
    height: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 2,
    opacity: 0.7,
  },
  drop1: {
    top: -10,
    left: '20%',
  },
  drop2: {
    top: -5,
    left: '35%',
  },
  drop3: {
    top: -8,
    right: '25%',
  },
  drop4: {
    bottom: -6,
    right: '30%',
  },
  drop5: {
    bottom: -12,
    left: '15%',
  },
});

export default BloodTitle;
