import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ListButton from '../components/ListButton';
import StepList from '../components/StepList';
import { useLanguage } from '../contexts/LanguageContext';

const MedicalScreen = () => {
  const [selectedMedical, setSelectedMedical] = useState<string | null>(null);
  const { data, t } = useLanguage();

  if (selectedMedical) {
    const medicalInfo = data.medical[selectedMedical as keyof typeof data.medical];
    return (
      <StepList
        title={medicalInfo.title}
        steps={medicalInfo.steps}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('firstAidTitle')}</Text>
      {Object.entries(data.medical).map(([key, value]) => (
        <ListButton
          key={key}
          title={value.title}
          onPress={() => setSelectedMedical(key)}
          icon="🩺"
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

export default MedicalScreen;
