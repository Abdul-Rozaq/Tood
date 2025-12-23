import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemeColors } from '../assets/themes/color';
import { useTheme } from '../hooks/useTheme';
import { TaskProgressColors } from '../types/task';

interface Props {
  height?: number;
  progress: number;
  color?: TaskProgressColors;
}

export default function ProgressBar({
  progress = 0,
  height = 12,
  color = 'gray',
}: Props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={[styles.progressView, { height }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${progress}%`,
            // backgroundColor: getColor(progress),
          },
          // getColor(progress),
          color === 'primary' && styles.primary,
          color === 'yellow' && styles.yellow,
          color === 'warning' && styles.warning,
          color === 'error' && styles.error,
          color === 'gray' && styles.gray,
        ]}
      />
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    progressView: {
      marginTop: 5,
      borderRadius: 6,
      overflow: 'hidden',
      backgroundColor: colors.border,
    },
    progress: {
      height: '100%',
      borderRadius: 6,
    },
    error: {
      backgroundColor: colors.error,
    },
    warning: {
      backgroundColor: colors.warning,
    },
    yellow: {
      backgroundColor: colors.yellow,
    },
    primary: {
      backgroundColor: colors.primary,
    },
    gray: {
      backgroundColor: colors.gray,
    },
  });
