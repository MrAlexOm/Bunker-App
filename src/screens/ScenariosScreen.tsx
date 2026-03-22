import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ListButton from '../components/ListButton';
import StepList from '../components/StepList';
import { useLanguage } from '../contexts/LanguageContext';

const ScenariosScreen = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const { data, t } = useLanguage();

  if (selectedScenario) {
    const scenarioInfo = data.scenarios[selectedScenario as keyof typeof data.scenarios];
    return (
      <StepList
        title={scenarioInfo.title}
        steps={scenarioInfo.steps}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('scenariosTitle')}</Text>
      {Object.entries(data.scenarios).map(([key, value]) => (
        <ListButton
          key={key}
          title={value.title}
          onPress={() => setSelectedScenario(key)}
          icon="📘"
        />
      ))}
    </ScrollView>
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
});

export default ScenariosScreen;
