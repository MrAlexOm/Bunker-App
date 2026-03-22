import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface StepListProps {
  title: string;
  steps: string[];
}

const StepList: React.FC<StepListProps> = ({ title, steps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.scrollView}>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    padding: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    color: '#FFD60A',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 15,
    minWidth: 30,
  },
  stepText: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
});

export default StepList;
