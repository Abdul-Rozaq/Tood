import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useTaskStore } from '../../store/taskStore';
import { ThemeColors } from '../../assets/themes/color';
import { SortOption } from '../../types/task';
import CancelIcon from '../icons/CancelIcon';
import SortAscIcon from '../icons/SortAscIcon';
import SortDescIcon from '../icons/SortDescIcon';
import CheckIcon from '../icons/CheckIcon';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const sortOptions: { value: SortOption; label: string; description: string }[] =
  [
    {
      value: 'name',
      label: 'Name',
      description: 'Sort alphabetically by task name',
    },
    {
      value: 'dateCreated',
      label: 'Date Created',
      description: 'Sort by when task was created',
    },
    // {
    //   value: 'dateModified',
    //   label: 'Date Modified',
    //   description: 'Sort by last modification date',
    // },
    {
      value: 'alertTime',
      label: 'Alert Time',
      description: 'Sort by due date/time',
    },
  ];

export default function SortModal({ visible, onClose }: Props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const sortBy = useTaskStore(state => state.sortBy);
  const sortOrder = useTaskStore(state => state.sortOrder);
  const setSortBy = useTaskStore(state => state.setSortBy);
  const toggleSortOrder = useTaskStore(state => state.toggleSortOrder);

  const handleSelectSort = (option: SortOption) => {
    if (sortBy === option) {
      toggleSortOrder();
    } else {
      setSortBy(option);
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Sort Tasks</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <CancelIcon color={'text'} size={'24'} />
          </Pressable>
        </View>

        {/* Sort Order Toggle */}
        <View style={styles.orderContainer}>
          <Text style={styles.orderLabel}>Sort Order</Text>
          <Pressable
            style={[styles.orderButton, { backgroundColor: colors.card }]}
            onPress={toggleSortOrder}
          >
            {sortOrder === 'asc' ? (
              <SortAscIcon color={'text'} size={'20'} />
            ) : (
              <SortDescIcon color={'text'} size={'20'} />
            )}
            <Text style={styles.orderText}>
              {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Text>
          </Pressable>
        </View>

        {/* Sort Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Sort By</Text>
          {sortOptions.map(option => (
            <Pressable
              key={option.value}
              style={[
                styles.option,
                { backgroundColor: colors.card },
                sortBy === option.value && styles.sortActive,
              ]}
              onPress={() => handleSelectSort(option.value)}
            >
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionLabel,
                    sortBy === option.value && { color: colors.primary },
                  ]}
                >
                  {option.label}
                </Text>
                <Text style={styles.optionDescription}>
                  {option.description}
                </Text>
              </View>
              {sortBy === option.value && (
                <CheckIcon color={'primary'} size={'24'} />
              )}
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    orderContainer: {
      marginTop: 24,
      marginBottom: 32,
    },
    orderLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    orderButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      padding: 16,
      borderRadius: 12,
    },
    orderText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    optionsContainer: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    optionContent: {
      flex: 1,
    },
    optionLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    optionDescription: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    sortActive: {
      borderColor: colors.primary,
      borderWidth: 1,
    },
  });
