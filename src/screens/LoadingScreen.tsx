import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingScreen = ({ onComplete }: { onComplete?: () => void }) => {
  // Массив элементов сигнала SOS - СТРОГО 9 элементов: 3 точки + 3 тире + 3 точки
  const signalElements = [
    { type: 'dot' },
    { type: 'dot' },
    { type: 'dot' },
    { type: 'dash' },
    { type: 'dash' },
    { type: 'dash' },
    { type: 'dot' },
    { type: 'dot' },
    { type: 'dot' },
  ];

  // Создаем анимированные значения для каждого элемента
  const animatedValues = useRef(
    signalElements.map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    let currentIndex = 0;

    const animateNextElement = () => {
      // Анимация текущего элемента: увеличение → уменьшение
      Animated.sequence([
        Animated.timing(animatedValues[currentIndex], {
          toValue: 1.6,
          duration: 150,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValues[currentIndex], {
          toValue: 1,
          duration: 150,
          useNativeDriver: false,
        }),
      ]).start(() => {
        // Переход к следующему элементу
        currentIndex = (currentIndex + 1) % signalElements.length;
        
        // Пауза после полного цикла
        if (currentIndex === 0) {
          setTimeout(animateNextElement, 600);
        } else {
          setTimeout(animateNextElement, 50);
        }
      });
    };

    // Запускаем анимацию
    const timer = setTimeout(() => {
      animateNextElement();
    }, 500);

    // Переход на главный экран через 3 секунды
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [animatedValues, onComplete]);

  const renderSignalElement = (element: { type: string }, index: number) => {
    const animatedStyle = {
      transform: [{ scale: animatedValues[index] }],
    };

    if (element.type === 'dot') {
      return (
        <Animated.View key={index} style={[styles.signalElement, styles.dot, animatedStyle]} />
      );
    } else {
      return (
        <Animated.View key={index} style={[styles.signalElement, styles.dash, animatedStyle]} />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.signalContainer}>
        {signalElements.map((element, index) => renderSignalElement(element, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signalElement: {
    marginHorizontal: 4,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
  dash: {
    width: 24,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FF3B30',
  },
});

export default LoadingScreen;
