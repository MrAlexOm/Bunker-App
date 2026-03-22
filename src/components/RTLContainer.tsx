import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useLanguage } from '../contexts/LanguageContext';

interface RTLContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  row?: boolean;
}

const RTLContainer: React.FC<RTLContainerProps> = ({ children, style, row = false }) => {
  const { isRTL } = useLanguage();

  const containerStyle = [
    styles.container,
    row && styles.row,
    isRTL && row && styles.rtlRow,
    isRTL && !row && styles.rtlColumn,
    style
  ];

  return (
    <View style={containerStyle}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  rtlRow: {
    flexDirection: 'row-reverse',
  },
  rtlColumn: {
    // For Arabic, we might want to align content to the right
    // but keep the main flow top-to-bottom
  },
});

export default RTLContainer;
