import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch
} from 'react-native';
import devicesData from '../data/devices.json';

const HomeScreen = () => {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [people, setPeople] = useState(1);
  const [days, setDays] = useState(7);

  const toggleDevice = (deviceId: string) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const calculateConsumption = () => {
    return selectedDevices.reduce((total, deviceId) => {
      const device = devicesData.devices.find(d => d.id === deviceId);
      if (!device) return total;
      
      const dailyConsumption = device.power_wh || device.power_w || 0;
      return total + (dailyConsumption * people * days);
    }, 0);
  };

  const getCapacityRecommendation = (totalWh: number) => {
    if (totalWh < 1000) return 'Power Bank 10000-20000 mAh';
    if (totalWh < 5000) return 'Portable Station 500-1000 Wh';
    return 'Generator + Solar Panels';
  };

  const totalConsumption = calculateConsumption();
  const recommendation = getCapacityRecommendation(totalConsumption);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>⚡ Энергия</Text>
        <Text style={styles.subtitle}>Расчет потребления и автономности</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👥 Параметры</Text>
        
        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Людей:</Text>
          <View style={styles.counter}>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setPeople(Math.max(1, people - 1))}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{people}</Text>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setPeople(people + 1)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.parameterRow}>
          <Text style={styles.parameterLabel}>Дней:</Text>
          <View style={styles.counter}>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setDays(Math.max(1, days - 1))}
            >
              <Text style={styles.counterButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counterValue}>{days}</Text>
            <TouchableOpacity 
              style={styles.counterButton} 
              onPress={() => setDays(days + 1)}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱 Устройства</Text>
        {devicesData.devices.map(device => (
          <TouchableOpacity
            key={device.id}
            style={styles.deviceRow}
            onPress={() => toggleDevice(device.id)}
          >
            <View style={styles.deviceInfo}>
              <Text style={styles.deviceIcon}>{device.icon}</Text>
              <Text style={styles.deviceName}>{device.name}</Text>
            </View>
            <View style={styles.deviceRight}>
              <Text style={styles.devicePower}>
                {device.power_wh || device.power_w} Вт·ч/день
              </Text>
              <Switch
                value={selectedDevices.includes(device.id)}
                onValueChange={() => toggleDevice(device.id)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Результаты</Text>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Общее потребление:</Text>
          <Text style={styles.resultValue}>{totalConsumption.toFixed(1)} Вт·ч</Text>
        </View>
        
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>В день:</Text>
          <Text style={styles.resultValue}>
            {(totalConsumption / days).toFixed(1)} Вт·ч
          </Text>
        </View>

        <View style={styles.recommendationBox}>
          <Text style={styles.recommendationTitle}>💡 Рекомендация:</Text>
          <Text style={styles.recommendationText}>{recommendation}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚠️ Важные замечания</Text>
        <Text style={styles.warningText}>
          • Медицинские устройства (CPAP, концентратор кислорода) имеют приоритет{'\n'}
          • Зарядные устройства теряют 15-20% энергии на тепло{'\n'}
          • Солнечные панели работают в среднем 4-6 часов в день{'\n'}
          • Учтите потери при преобразовании напряжения
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#111',
    margin: 15,
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  parameterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  parameterLabel: {
    color: '#fff',
    fontSize: 16,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#222',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterValue: {
    color: '#fff',
    fontSize: 18,
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  deviceName: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  deviceRight: {
    alignItems: 'flex-end',
  },
  devicePower: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultLabel: {
    color: '#fff',
    fontSize: 16,
  },
  resultValue: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendationBox: {
    backgroundColor: '#1a2a3a',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  recommendationTitle: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  recommendationText: {
    color: '#fff',
    fontSize: 14,
  },
  warningText: {
    color: '#ffaa44',
    fontSize: 14,
    lineHeight: 20,
  },
});

export default HomeScreen;
