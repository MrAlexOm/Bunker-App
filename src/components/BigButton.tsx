import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

interface BigButtonProps {
  title: string;
  icon?: string;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'danger';
}

const BigButton: React.FC<BigButtonProps> = ({ 
  title, 
  icon, 
  onPress, 
  style, 
  variant = 'primary' 
}) => {
  const { isRTL } = useLanguage();

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        styles[variant],
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[
        styles.text,
        isRTL && styles.rtlText
      ]}>
        {icon && <Text style={[
          styles.icon,
          isRTL && styles.rtlIcon
        ]}>{icon} </Text>}
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  primary: {
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#A1A1A1',
  },
  secondary: {
    backgroundColor: '#151515',
    borderWidth: 1,
    borderColor: '#A1A1A1',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rtlText: {
    textAlign: 'center',
  },
  icon: {
    fontSize: 20,
  },
  rtlIcon: {
    // For RTL, icon should be on the right side of text
  },
});

export default BigButton;
