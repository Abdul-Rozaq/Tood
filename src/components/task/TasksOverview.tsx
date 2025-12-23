import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import ProgressBar from '../ProgressBar';
import { Task, TaskProgressColors } from '../../types/task';
import { useTheme } from '../../hooks/useTheme';
import { ThemeColors } from '../../assets/themes/color';

interface Props {
  pendingTasks: Task[];
  completedTasks: Task[];
  tasks: Task[];
}

export default function TasksOverview({
  pendingTasks,
  completedTasks,
  tasks,
}: Props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const { progress, color } = useMemo(() => {
    const total = tasks.length;
    const completed = completedTasks.length;

    const totalProgress = total > 0 ? Math.round((completed / total) * 100) : 0;
    const progressColor: TaskProgressColors =
      totalProgress >= 50 ? 'primary' : 'error';

    return {
      color: progressColor,
      progress: totalProgress,
    };
  }, [tasks, completedTasks]);

  return (
    <View style={styles.progressWrapper}>
      <Text style={styles.tasksOverviewText}>
        {pendingTasks.length} task{pendingTasks.length !== 1 ? 's' : ''} left
        for today
      </Text>

      <View style={styles.progressView}>
        <View style={styles.progressBar}>
          <ProgressBar progress={progress} color={color} />
        </View>
        <Text style={styles.progress}>
          {completedTasks.length} / {tasks.length}
        </Text>
      </View>
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    tasksOverviewText: {
      fontSize: 28,
      textAlign: 'center',
      marginBottom: 10,
      color: colors.text,
    },
    progressView: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    progressBar: {
      flex: 1,
    },
    progressWrapper: {
      maxWidth: '75%',
      marginHorizontal: 'auto',
      marginTop: 32,
    },
    progress: {
      color: colors.text,
    },
  });
