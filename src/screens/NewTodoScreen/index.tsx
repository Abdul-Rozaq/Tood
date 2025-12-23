import {
  Text,
  View,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../../hooks/useTheme';
import { useTaskStore } from '../../store/taskStore';
import { ThemeColors } from '../../assets/themes/color';
import AppDatePicker from '../../components/form/AppDatePicker';

export default function AddTaskScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const addTask = useTaskStore(state => state.addTask);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (title.trim() && date) {
      addTask({
        title: title.trim(),
        description: description.trim(),
        date,
      });
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </Pressable>
            <Text style={styles.headerTitle}>New Task</Text>
            <Pressable onPress={handleSave}>
              <Text
                style={[
                  styles.saveButton,
                  (!title.trim() || date === null) && styles.saveButtonDisabled,
                ]}
              >
                Save
              </Text>
            </Pressable>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <TextInput
              style={styles.titleInput}
              placeholder="Task title"
              placeholderTextColor={colors.textSecondary}
              value={title}
              onChangeText={setTitle}
            />

            <TextInput
              style={styles.descriptionInput}
              placeholder="Description"
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <AppDatePicker
              mode="datetime"
              value={date}
              onChange={setDate}
              placeholder="Add Time"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    cancelButton: {
      color: colors.text,
      fontSize: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    saveButton: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    saveButtonDisabled: {
      opacity: 0.5,
    },
    form: {
      paddingHorizontal: 16,
      marginTop: 24,
    },
    titleInput: {
      fontSize: 24,
      fontWeight: '600',
      color: colors.text,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    descriptionInput: {
      fontSize: 16,
      color: colors.text,
      paddingVertical: 12,
      marginTop: 16,
      minHeight: 100,
      textAlignVertical: 'top',
    },
    dateButton: {
      marginTop: 24,
      padding: 16,
      backgroundColor: colors.card,
      borderRadius: 8,
    },
    dateLabel: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
    },
    dateValue: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
    },
  });
