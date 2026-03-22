import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const PanicScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { data, t } = useLanguage();
  
  // Use crowd panic steps as default for panic mode
  const panicSteps = data.danger.crowd.steps;

  const handleSwipe = () => {
    setCurrentStep((prev) => {
      if (prev < panicSteps.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: handleSwipe,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.stepNumber}>{t('step')} {currentStep + 1}</Text>
      <Text style={styles.stepText}>{panicSteps[currentStep]}</Text>
      {currentStep < panicSteps.length - 1 && (
        <Text style={styles.hint}>{t('swipeNext')}</Text>
      )}
      {currentStep === panicSteps.length - 1 && (
        <Text style={styles.complete}>{t('allStepsComplete')}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  stepNumber: {
    color: '#FFD60A',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  stepText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 60,
  },
  hint: {
    color: '#A1A1A1',
    fontSize: 16,
    fontStyle: 'italic',
  },
  complete: {
    color: '#00FF00',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default PanicScreen;
