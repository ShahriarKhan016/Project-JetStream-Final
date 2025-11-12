/**
 * Library Screen - Placeholder
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '@/theme';

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Library Screen - Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: typography.sizes.xl,
    color: colors.text.primary,
  },
});
