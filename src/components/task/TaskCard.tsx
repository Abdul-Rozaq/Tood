import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { format } from 'date-fns';
import { Task } from '../../types/task';
import { useTheme } from '../../hooks/useTheme';
import AnimatedCheckbox from '../AnimatedCheckbox';
import { ThemeColors } from '../../assets/themes/color';

interface Props {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
}

export default function TaskCard({ task, onPress, onToggle }: Props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <Pressable
      style={[styles.task, task.completed && styles.taskCompleted]}
      onPress={onPress}
    >
      <AnimatedCheckbox checked={task.completed} onPress={onToggle} />

      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskTitle,
            task.completed && styles.taskTitleCompleted,
          ]}
        >
          {task.title}
        </Text>
        <Text style={styles.taskDescription} numberOfLines={1}>
          {task.description}
        </Text>
        <Text style={styles.taskDate}>
          {format(new Date(task.date), 'EEE, MMM d yyyy, HH:mm')}
        </Text>
      </View>
    </Pressable>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    task: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 16,
      marginTop: 16,
      backgroundColor: colors.light,
      padding: 10,
      borderRadius: 8,
    },
    taskCompleted: {
      opacity: 0.6,
    },
    taskContent: {
      flex: 1,
    },
    taskTitle: {
      fontSize: 16,
      color: colors.text,
    },
    taskTitleCompleted: {
      textDecorationLine: 'line-through',
      color: colors.textSecondary,
    },
    taskDescription: {
      fontSize: 14,
      marginTop: 2,
      color: colors.textSecondary,
    },
    taskDate: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 8,
    },
  });
