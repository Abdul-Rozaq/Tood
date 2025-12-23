import { View, Pressable, StyleSheet, Text } from 'react-native';
import React, { useMemo, useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarIcon from '../icons/CalendarIcon';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  value?: Date | null;
  onChange: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  placeholder?: string;
}

export default function AppDatePicker({
  value,
  onChange,
  minimumDate,
  maximumDate,
  mode = 'datetime',
  placeholder = 'Select date',
}: Props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date>(value ?? new Date());

  useEffect(() => {
    if (value) {
      setInternalDate(value);
    }
  }, [value]);

  const formattedDate = useMemo(() => {
    if (!value) return placeholder;

    return value.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: mode !== 'date' ? '2-digit' : undefined,
      minute: mode !== 'date' ? '2-digit' : undefined,
    });
  }, [value, mode, placeholder]);

  const handleConfirm = (selected: Date) => {
    setInternalDate(selected);
    onChange(selected);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.input} onPress={() => setOpen(true)}>
        <CalendarIcon />
        <Text style={[styles.text, !value && styles.placeholderText]}>
          {formattedDate}
        </Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={open}
        mode={mode}
        date={internalDate}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        themeVariant="light"
        accentColor={colors.primary}
        textColor={colors.text}
        pickerContainerStyleIOS={{
          backgroundColor: colors.background,
        }}
        buttonTextColorIOS={colors.text}
      />
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
    input: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    text: {
      fontSize: 14,
      color: colors.text,
    },
    placeholderText: {
      color: colors.gray,
    },
  });
