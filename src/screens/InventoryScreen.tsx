import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

const InventoryScreen = () => {
  const [water, setWater] = useState('10');
  const [food, setFood] = useState('5000');
  const [batteries, setBatteries] = useState('200');
  const [people, setPeople] = useState('2');
  const { data, t } = useLanguage();

  const calculateDays = () => {
    const waterLiters = parseFloat(water) || 0;
    const foodCalories = parseFloat(food) || 0;
    const batteryWh = parseFloat(batteries) || 0;
    const peopleCount = parseFloat(people) || 1;

    const waterDays = waterLiters / (data.supplies.water.per_person_per_day * peopleCount);
    const foodDays = foodCalories / (data.supplies.food.per_person_per_day * peopleCount);
    const batteryDays = batteryWh / (data.supplies.batteries.per_person_per_day * peopleCount);

    return Math.floor(Math.min(waterDays, foodDays, batteryDays));
  };

  const days = calculateDays();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('inventoryTitle')}</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{data.supplies.water.name}</Text>
        <TextInput
          style={styles.input}
          value={water}
          onChangeText={setWater}
          keyboardType="numeric"
          placeholder={t('liters')}
          placeholderTextColor="#A1A1A1"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{data.supplies.food.name}</Text>
        <TextInput
          style={styles.input}
          value={food}
          onChangeText={setFood}
          keyboardType="numeric"
          placeholder={t('calories')}
          placeholderTextColor="#A1A1A1"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>{data.supplies.batteries.name}</Text>
        <TextInput
          style={styles.input}
          value={batteries}
          onChangeText={setBatteries}
          keyboardType="numeric"
          placeholder={t('wattHours')}
          placeholderTextColor="#A1A1A1"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}><Text>👥 </Text>{t('people')}</Text>
        <TextInput
          style={styles.input}
          value={people}
          onChangeText={setPeople}
          keyboardType="numeric"
          placeholder={t('count')}
          placeholderTextColor="#A1A1A1"
        />
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>{t('enoughFor')}</Text>
        <Text style={styles.resultValue}>{days}</Text>
        <Text style={styles.resultLabel}>{t('days')}</Text>
      </View>
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
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#151515',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#A1A1A1',
    color: '#FFFFFF',
    fontSize: 16,
    padding: 20,
    minHeight: 60,
  },
  resultContainer: {
    backgroundColor: '#151515',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFD60A',
    padding: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  resultLabel: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  resultValue: {
    color: '#FFD60A',
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default InventoryScreen;
