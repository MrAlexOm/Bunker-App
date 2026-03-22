import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';

const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  // Массив элементов: ● ● ● — — — ● ● ● (СТРОГО 9 элементов)
  const elements = ['●', '●', '●', '—', '—', '—', '●', '●', '●'];

  // Создаем анимированные значения для каждого элемента
  const animations = useRef(
    Array(9).fill(0).map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    const animateSequence = () => {
      elements.forEach((_, index) => {
        setTimeout(() => {
          Animated.sequence([
            Animated.timing(animations[index], {
              toValue: 1.6,
              duration: 200,
              useNativeDriver: false,
            }),
            Animated.timing(animations[index], {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start();
        }, index * 250);
      });
    };

    // Запускаем первую анимацию сразу
    animateSequence();

    // Повторяем анимацию каждые 3.5 секунды
    const interval = setInterval(animateSequence, 3500);

    // Переходим на главный экран через 3 секунды
    const timeout = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sosContainer}>
        {elements.map((element, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.element,
              element === '—' ? styles.dash : styles.dot,
              {
                transform: [{ scale: animations[index] }],
              },
            ]}
          >
            {element}
          </Animated.Text>
        ))}
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
  sosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  element: {
    color: '#FF3B30',
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  dot: {
    fontSize: 14,
    lineHeight: 14,
  },
  dash: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: '900',
  },
});

export default LoadingScreen;
