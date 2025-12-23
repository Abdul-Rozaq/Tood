import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, colors, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.toggle, { backgroundColor: colors.card }]}
      onPress={toggleTheme}
    >
      <Text style={{ color: colors.text }}>
        {theme === 'light' ? '🌙' : '☀️'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
