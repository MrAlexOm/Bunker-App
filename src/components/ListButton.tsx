import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ListButtonProps {
  title: string;
  onPress: () => void;
  icon?: string;
}

const ListButton: React.FC<ListButtonProps> = ({ title, onPress, icon }) => {
  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>
        {icon && <Text style={styles.icon}>{icon} </Text>}
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#A1A1A1',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 18,
  },
});

export default ListButton;
