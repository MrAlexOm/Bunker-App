import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import waterData from '../data/water.json';

const WaterScreen = () => {
  const [people, setPeople] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const dailyNeed = (waterData.consumption.normal * people).toFixed(1);
  const weeklyNeed = (waterData.consumption.normal * people * 7).toFixed(1);

  const handleMethodPress = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  const selectedMethodData = waterData.methods.find(m => m.id === selectedMethod);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}><Text>💧 </Text>Вода</Text>
        <Text style={styles.subtitle}>Нормы и способы очистки</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}><Text>📊 </Text>Суточная норма</Text>
        <Text style={styles.valueText}>{dailyNeed} литров в день</Text>
        <Text style={styles.valueTextSmall}>на {people} человек(а)</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.smallButton} onPress={() => setPeople(Math.max(1, people - 1))}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{people}</Text>
          <TouchableOpacity style={styles.smallButton} onPress={() => setPeople(people + 1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.warningBox}>
          <Text style={styles.warningText}><Text>⚠️ </Text>На 7 дней нужно: {weeklyNeed} литров</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}><Text>🧪 </Text>Способы очистки</Text>
        {waterData.methods.map(method => (
          <TouchableOpacity
            key={method.id}
            style={[styles.methodButton, selectedMethod === method.id && styles.methodButtonActive]}
            onPress={() => handleMethodPress(method.id)}
          >
            <Text style={styles.methodTitle}>{method.title}</Text>
            <Text style={styles.methodDesc}>{method.description}</Text>
            <Text style={styles.methodTime}><Text>⏱️ </Text>{method.time}</Text>
            {method.warning && (
              <Text style={styles.methodWarning}><Text>⚠️ </Text>{method.warning}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedMethodData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}><Text>📖 </Text>Инструкция</Text>
          {selectedMethodData.steps && (
            <View>
              {selectedMethodData.steps.map((step, idx) => (
                <Text key={idx} style={styles.stepText}>{idx + 1}. {step}</Text>
              ))}
            </View>
          )}
          {selectedMethodData.materials && (
            <View>
              <Text style={styles.subsectionTitle}>Материалы:</Text>
              {selectedMethodData.materials.map((material, idx) => (
                <Text key={idx} style={styles.materialText}>• {material}</Text>
              ))}
            </View>
          )}
          {selectedMethodData.dosage && (
            <Text style={styles.noteText}><Text>💊 </Text>Дозировка: {selectedMethodData.dosage}</Text>
          )}
          {selectedMethodData.note && (
            <Text style={styles.noteText}><Text>📌 </Text>Примечание: {selectedMethodData.note}</Text>
          )}
          <Text style={styles.efficiencyText}><Text>✅ </Text>{selectedMethodData.efficiency}</Text>
        </View>
      )}
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
  valueText: {
    color: '#4A90E2',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  valueTextSmall: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  smallButton: {
    backgroundColor: '#222',
    padding: 10,
    borderRadius: 8,
    width: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  counterText: {
    color: '#fff',
    fontSize: 24,
    marginHorizontal: 20,
  },
  warningBox: {
    backgroundColor: '#331a00',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ffaa44',
  },
  warningText: {
    color: '#ffaa44',
    textAlign: 'center',
  },
  methodButton: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  methodButtonActive: {
    backgroundColor: '#2a4a6a',
    borderColor: '#4A90E2',
  },
  methodTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  methodDesc: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  methodTime: {
    color: '#4A90E2',
    fontSize: 11,
    marginTop: 4,
  },
  methodWarning: {
    color: '#ffaa44',
    fontSize: 11,
    marginTop: 4,
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 4,
  },
  subsectionTitle: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  materialText: {
    color: '#fff',
    fontSize: 13,
    marginVertical: 2,
  },
  noteText: {
    color: '#ffaa44',
    fontSize: 12,
    marginTop: 10,
    fontStyle: 'italic',
  },
  efficiencyText: {
    color: '#4A90E2',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default WaterScreen;
