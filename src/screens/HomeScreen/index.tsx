import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import { useTaskStore } from '../../store/taskStore';
import { _APP_ROUTES } from '../../navigation/routes';
import TaskList from '../../components/task/TaskList';
import ThemeToggle from '../../components/ThemeToggle';
import PlusIcon from '../../components/icons/PlusIcon';
import { ThemeColors } from '../../assets/themes/color';
import { shadowStyles } from '../../assets/themes/shadow';
import SearchModal from '../../components/task/SearchModal';
import TaskActions from '../../components/task/TaskActions';
import TasksOverview from '../../components/task/TasksOverview';
import SortModal from '../../components/task/SortModal';

export default function HomeScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();

  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const tasks = useTaskStore(state => state.tasks);
  const toggleTask = useTaskStore(state => state.toggleTask);
  const getPastTasks = useTaskStore(state => state.getPastTasks);
  const getPendingTasks = useTaskStore(state => state.getPendingTasks);
  const getCompletedTasks = useTaskStore(state => state.getCompletedTasks);

  const pastTasks = useMemo(() => getPastTasks(), [tasks]);
  const pendingTasks = useMemo(() => getPendingTasks(), [tasks]);
  const completedTasks = useMemo(() => getCompletedTasks(), [tasks]);

  const handleTaskPress = (taskId: string) => {
    navigation.navigate({
      name: _APP_ROUTES.TODO_DETAILS_SCREEN,
      params: { taskId },
    } as never);
  };

  const handleToggleTask = (taskId: string) => {
    toggleTask(taskId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemeToggle />
        </View>

        {/* Task Overview */}
        <TasksOverview
          tasks={tasks}
          pendingTasks={pendingTasks}
          completedTasks={completedTasks}
        />

        {/* Actions */}
        <TaskActions
          setSearchModalVisible={setSearchModalVisible}
          setSortModalVisible={setSortModalVisible}
        />

        {/* Past Tasks */}
        <TaskList
          title="Past"
          tasks={pastTasks}
          handleTaskPress={handleTaskPress}
          handleToggleTask={handleToggleTask}
        />

        {/* Pending Tasks */}
        <TaskList
          title="Today"
          tasks={pendingTasks}
          handleTaskPress={handleTaskPress}
          handleToggleTask={handleToggleTask}
        />

        {/* Completed Tasks */}
        <TaskList
          title="Completed"
          tasks={completedTasks}
          handleTaskPress={handleTaskPress}
          handleToggleTask={handleToggleTask}
        />
      </ScrollView>

      {/* Floating Add Button */}
      <Pressable
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() =>
          navigation.navigate(_APP_ROUTES.NEW_TODO_SCREEN as never)
        }
      >
        <PlusIcon size="20" />
      </Pressable>

      {/* Search Modal */}
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onTaskPress={handleTaskPress}
      />

      {/* Sort Modal */}
      <SortModal
        visible={sortModalVisible}
        onClose={() => setSortModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
    },
    header: {
      alignItems: 'flex-end',
    },
    fab: {
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      ...shadowStyles.lg,
    },
  });
