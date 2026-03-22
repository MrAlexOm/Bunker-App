import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TourniquetPoint {
  id: string;
  x: number;
  y: number;
  label: string;
  side: 'left' | 'right';
}

interface HumanBodyProps {
  onPointPress?: (pointId: string) => void;
  selectedPoints?: string[];
}

export const HumanBody: React.FC<HumanBodyProps> = ({ 
  onPointPress, 
  selectedPoints = [] 
}) => {
  const tourniquetPoints: TourniquetPoint[] = [
    { id: 'upper_arm_left', x: 25, y: 30, label: 'Плечо', side: 'left' },
    { id: 'upper_arm_right', x: 75, y: 30, label: 'Плечо', side: 'right' },
    { id: 'forearm_left', x: 25, y: 45, label: 'Предплечье', side: 'left' },
    { id: 'forearm_right', x: 75, y: 45, label: 'Предплечье', side: 'right' },
    { id: 'thigh_left', x: 30, y: 65, label: 'Бедро', side: 'left' },
    { id: 'thigh_right', x: 70, y: 65, label: 'Бедро', side: 'right' },
    { id: 'lower_leg_left', x: 30, y: 80, label: 'Голень', side: 'left' },
    { id: 'lower_leg_right', x: 70, y: 80, label: 'Голень', side: 'right' },
  ];

  const isPointSelected = (pointId: string) => selectedPoints.includes(pointId);

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        {/* Голова */}
        <View style={[styles.head, styles.bodyPart]} />
        
        {/* Шея */}
        <View style={[styles.neck, styles.bodyPart]} />
        
        {/* Туловище */}
        <View style={[styles.torso, styles.bodyPart]} />
        
        {/* Левая рука */}
        <View style={[styles.leftUpperArm, styles.bodyPart]} />
        <View style={[styles.leftElbow, styles.joint]} />
        <View style={[styles.leftForearm, styles.bodyPart]} />
        <View style={[styles.leftHand, styles.bodyPart]} />
        
        {/* Правая рука */}
        <View style={[styles.rightUpperArm, styles.bodyPart]} />
        <View style={[styles.rightElbow, styles.joint]} />
        <View style={[styles.rightForearm, styles.bodyPart]} />
        <View style={[styles.rightHand, styles.bodyPart]} />
        
        {/* Левая нога */}
        <View style={[styles.leftThigh, styles.bodyPart]} />
        <View style={[styles.leftKnee, styles.joint]} />
        <View style={[styles.leftLowerLeg, styles.bodyPart]} />
        <View style={[styles.leftFoot, styles.bodyPart]} />
        
        {/* Правая нога */}
        <View style={[styles.rightThigh, styles.bodyPart]} />
        <View style={[styles.rightKnee, styles.joint]} />
        <View style={[styles.rightLowerLeg, styles.bodyPart]} />
        <View style={[styles.rightFoot, styles.bodyPart]} />
        
        {/* Точки наложения жгута */}
        {tourniquetPoints.map((point) => (
          <TouchableOpacity
            key={point.id}
            style={[
              styles.tourniquetPoint,
              { left: `${point.x}%`, top: `${point.y}%` },
              isPointSelected(point.id) && styles.tourniquetPointSelected
            ]}
            onPress={() => onPointPress?.(point.id)}
          >
            <View style={styles.pointInner} />
            <Text style={styles.pointLabel}>{point.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Легенда */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Точки наложения жгута:</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendPoint, styles.tourniquetPoint]} />
          <Text style={styles.legendText}>Доступные точки</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendPoint, styles.tourniquetPointSelected]} />
          <Text style={styles.legendText}>Выбранные точки</Text>
        </View>
      </View>
    </View>
  );
};

export const TourniquetTimer: React.FC<{
  isActive: boolean;
  timeRemaining: number;
  totalTime: number;
}> = ({ isActive, timeRemaining, totalTime }) => {
  const progress = totalTime > 0 ? timeRemaining / totalTime : 0;
  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);
  
  const getTimerColor = () => {
    if (progress > 0.5) return '#4A90E2';
    if (progress > 0.25) return '#FFAA44';
    return '#FF4500';
  };

  return (
    <View style={styles.timerContainer}>
      <View style={[styles.timerRing, { borderColor: getTimerColor() }]}>
        <View style={[styles.timerProgress, { borderColor: getTimerColor() }]} />
        <Text style={[styles.timerText, { color: getTimerColor() }]}>
          {minutes}:{seconds.toString().padStart(2, '0')}
        </Text>
      </View>
      <Text style={styles.timerLabel}>
        {isActive ? 'Жгут наложен' : 'Жгут не наложен'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#000000',
  },
  bodyContainer: {
    width: 200,
    height: 300,
    position: 'relative',
    alignSelf: 'center',
    marginVertical: 20,
  },
  bodyPart: {
    backgroundColor: '#333333',
    position: 'absolute',
  },
  joint: {
    backgroundColor: '#555555',
    position: 'absolute',
    borderRadius: 4,
  },
  // Голова
  head: {
    width: 30,
    height: 30,
    left: 85,
    top: 0,
    borderRadius: 15,
  },
  // Шея
  neck: {
    width: 15,
    height: 15,
    left: 92.5,
    top: 28,
  },
  // Туловище
  torso: {
    width: 50,
    height: 80,
    left: 75,
    top: 41,
    borderRadius: 10,
  },
  // Левая рука
  leftUpperArm: {
    width: 12,
    height: 35,
    left: 63,
    top: 45,
    borderRadius: 6,
  },
  leftElbow: {
    width: 8,
    height: 8,
    left: 65,
    top: 78,
  },
  leftForearm: {
    width: 10,
    height: 30,
    left: 64,
    top: 84,
    borderRadius: 5,
  },
  leftHand: {
    width: 12,
    height: 15,
    left: 63,
    top: 112,
    borderRadius: 6,
  },
  // Правая рука
  rightUpperArm: {
    width: 12,
    height: 35,
    left: 125,
    top: 45,
    borderRadius: 6,
  },
  rightElbow: {
    width: 8,
    height: 8,
    left: 127,
    top: 78,
  },
  rightForearm: {
    width: 10,
    height: 30,
    left: 126,
    top: 84,
    borderRadius: 5,
  },
  rightHand: {
    width: 12,
    height: 15,
    left: 125,
    top: 112,
    borderRadius: 6,
  },
  // Левая нога
  leftThigh: {
    width: 15,
    height: 40,
    left: 82,
    top: 119,
    borderRadius: 7,
  },
  leftKnee: {
    width: 10,
    height: 10,
    left: 84.5,
    top: 157,
  },
  leftLowerLeg: {
    width: 12,
    height: 35,
    left: 83.5,
    top: 165,
    borderRadius: 6,
  },
  leftFoot: {
    width: 15,
    height: 20,
    left: 82,
    top: 198,
    borderRadius: 7,
  },
  // Правая нога
  rightThigh: {
    width: 15,
    height: 40,
    left: 103,
    top: 119,
    borderRadius: 7,
  },
  rightKnee: {
    width: 10,
    height: 10,
    left: 105.5,
    top: 157,
  },
  rightLowerLeg: {
    width: 12,
    height: 35,
    left: 104.5,
    top: 165,
    borderRadius: 6,
  },
  rightFoot: {
    width: 15,
    height: 20,
    left: 103,
    top: 198,
    borderRadius: 7,
  },
  // Точки наложения жгута
  tourniquetPoint: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF4500',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -10 }, { translateY: -10 }],
    zIndex: 10,
  },
  tourniquetPointSelected: {
    backgroundColor: '#FFAA44',
    borderColor: '#FF4500',
    borderWidth: 3,
  },
  pointInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  pointLabel: {
    position: 'absolute',
    top: 25,
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    width: 60,
    left: -20,
  },
  // Легенда
  legend: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#111111',
    borderRadius: 8,
  },
  legendTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    color: '#CCCCCC',
    fontSize: 14,
  },
  // Таймер жгута
  timerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#111111',
    borderRadius: 12,
    marginVertical: 10,
  },
  timerRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  timerProgress: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: [{ rotate: '-90deg' }],
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerLabel: {
    color: '#CCCCCC',
    fontSize: 12,
    marginTop: 8,
  },
});

export default HumanBody;
