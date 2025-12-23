import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useTheme } from '../../hooks/useTheme';
import { useTaskStore } from '../../store/taskStore';
import AnimatedCheckbox from '../../components/AnimatedCheckbox';
import { ThemeColors } from '../../assets/themes/color';

export default function TodoDetailsScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const route = useRoute();
  const { taskId } = route.params as { taskId: string };

  const tasks = useTaskStore(state => state.tasks);
  const toggleTask = useTaskStore(state => state.toggleTask);
  const deleteTask = useTaskStore(state => state.deleteTask);

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Task not found</Text>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(taskId);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </Pressable>
          <Pressable onPress={handleDelete}>
            <Text style={styles.deleteButton}>Delete</Text>
          </Pressable>
        </View>

        {/* Task Content */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <AnimatedCheckbox
              checked={task.completed}
              onPress={() => toggleTask(taskId)}
            />
            <Text
              style={[styles.title, task.completed && styles.titleCompleted]}
            >
              {task.title}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Description</Text>
            <Text style={styles.description}>
              {task.description || 'No description'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Due Date</Text>
            <Text style={styles.dateText}>
              {format(new Date(task.date), "EEEE, MMMM d, yyyy 'at' h:mm a")}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Status</Text>
            <View
              style={[
                styles.statusBadge,
                task.completed ? styles.statusCompleted : styles.statusPending,
              ]}
            >
              <Text style={styles.statusText}>
                {task.completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    backButton: {
      color: colors.text,
      fontSize: 16,
    },
    deleteButton: {
      color: colors.error,
      fontSize: 16,
    },
    content: {
      paddingHorizontal: 16,
      marginTop: 24,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    title: {
      flex: 1,
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
    },
    titleCompleted: {
      textDecorationLine: 'line-through',
      color: colors.textSecondary,
    },
    section: {
      marginTop: 32,
    },
    sectionLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    dateText: {
      fontSize: 16,
      color: colors.text,
    },
    statusBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    statusCompleted: {
      backgroundColor: colors.success + '20',
    },
    statusPending: {
      backgroundColor: colors.warning + '20',
    },
    statusText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    errorText: {
      fontSize: 16,
      color: colors.error,
      textAlign: 'center',
      marginTop: 24,
    },
  });
