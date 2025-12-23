import React, { useState, useMemo } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskCard from './TaskCard';
import { useTheme } from '../../hooks/useTheme';
import { useTaskStore } from '../../store/taskStore';
import SearchIcon from '../icons/SearchIcon';
import { ThemeColors } from '../../assets/themes/color';
import CancelIcon from '../icons/CancelIcon';

interface Props {
  visible: boolean;
  onClose: () => void;
  onTaskPress: (taskId: string) => void;
}

export default function SearchModal({ visible, onClose, onTaskPress }: Props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [searchQuery, setSearchQuery] = useState('');

  const tasks = useTaskStore(state => state.tasks);
  const toggleTask = useTaskStore(state => state.toggleTask);

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return tasks.filter(
      task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query),
    );
  }, [searchQuery, tasks]);

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  const handleTaskPress = (taskId: string) => {
    handleClose();
    onTaskPress(taskId);
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.searchInputContainer}>
              <SearchIcon color={'textSecondary'} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search tasks..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
                returnKeyType="search"
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={() => setSearchQuery('')}>
                  <CancelIcon color={'textSecondary'} size={'20'} />
                </Pressable>
              )}
            </View>
            <Pressable onPress={handleClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>

          {/* Results */}
          <View style={styles.resultsContainer}>
            {searchQuery.trim() === '' ? (
              <View style={styles.emptyState}>
                <SearchIcon color={'textSecondary'} size={'48'} />
                <Text style={styles.emptyText}>
                  Start typing to search tasks
                </Text>
              </View>
            ) : filteredTasks.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tasks found</Text>
                <Text style={styles.emptySubtext}>
                  Try a different search term
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.resultCount}>
                  {filteredTasks.length} result
                  {filteredTasks.length !== 1 ? 's' : ''}
                </Text>
                <FlatList
                  data={filteredTasks}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <TaskCard
                      task={item}
                      onPress={() => handleTaskPress(item.id)}
                      onToggle={() => toggleTask(item.id)}
                    />
                  )}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                />
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    flex: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 10,
      paddingHorizontal: 12,
      height: 44,
      gap: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    cancelButton: {
      paddingHorizontal: 8,
    },
    cancelText: {
      fontSize: 16,
      color: colors.primary,
    },
    resultsContainer: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    resultCount: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 12,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: 16,
      textAlign: 'center',
    },
    emptySubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 8,
      textAlign: 'center',
    },
  });
