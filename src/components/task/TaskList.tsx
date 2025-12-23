import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '../../types/task';
import { useTheme } from '../../hooks/useTheme';
import { ThemeColors } from '../../assets/themes/color';
import { useTaskStore } from '../../store/taskStore';

interface Props {
  title: string;
  tasks: Task[];
  handleTaskPress: (taskId: string) => void;
  handleToggleTask: (taskId: string) => void;
}

export default function TaskList({
  title,
  tasks,
  handleTaskPress,
  handleToggleTask,
}: Props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const getSortedTasks = useTaskStore(state => state.getSortedTasks);

  if (tasks.length === 0) {
    return null;
  }

  const sortedTasks = getSortedTasks(tasks);

  return (
    <View style={styles.tasksContainer}>
      <Text style={styles.tasksHeader}>{title}</Text>
      {sortedTasks.map((task, i) => (
        <TaskCard
          key={i}
          task={task}
          onPress={() => handleTaskPress(task.id)}
          onToggle={() => handleToggleTask(task.id)}
        />
      ))}
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    tasksContainer: {
      marginTop: 32,
    },
    tasksHeader: {
      fontSize: 20,
      color: colors.text,
      fontWeight: '500',
    },
  });
