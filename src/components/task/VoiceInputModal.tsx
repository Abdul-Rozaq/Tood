import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useTaskStore } from '../../store/taskStore';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { ParsedTask, parseVoiceInput } from '../../services/openaiService';
import { ThemeColors } from '../../assets/themes/color';
import CancelIcon from '../icons/CancelIcon';
import CheckIcon from '../icons/CheckIcon';
import MicIcon from '../icons/MicIcon';

interface Props {
  visible: boolean;
  onClose: () => void;
  onTasksCreated: (count: number) => void;
}

export default function VoiceInputModal({
  visible,
  onClose,
  onTasksCreated,
}: Props) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const addTask = useTaskStore(state => state.addTask);

  const {
    isListening,
    transcription,
    error,
    startListening,
    stopListening,
    cancelListening,
  } = useVoiceInput();

  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedTasks, setParsedTasks] = useState<ParsedTask[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const pulseAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening, pulseAnim]);

  const handleStart = async () => {
    setParsedTasks([]);
    setShowSuccess(false);
    await startListening();
  };

  const handleStop = async () => {
    await stopListening();
    if (transcription) {
      await processTranscription();
    }
  };

  const processTranscription = async () => {
    setIsProcessing(true);
    try {
      const tasks = await parseVoiceInput(transcription);
      setParsedTasks(tasks);

      // Add tasks to store
      tasks.forEach(task => {
        addTask({
          title: task.title,
          description: task.description || '',
          date: task.dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to tomorrow
        });
      });

      setShowSuccess(true);
      onTasksCreated(tasks.length);

      // Auto close after showing success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    cancelListening();
    setParsedTasks([]);
    setShowSuccess(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Voice Input</Text>
          <Pressable onPress={handleClose}>
            <CancelIcon color={'text'} size={'24'} />
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {showSuccess ? (
            // Success State
            <View style={styles.successContainer}>
              <View
                style={[
                  styles.successIcon,
                  { backgroundColor: colors.success + '20' },
                ]}
              >
                <CheckIcon color={'success'} size={'48'} />
              </View>
              <Text style={styles.successTitle}>Tasks Created!</Text>
              <Text style={styles.successText}>
                {parsedTasks.length} task{parsedTasks.length !== 1 ? 's' : ''}{' '}
                added successfully
              </Text>
            </View>
          ) : isProcessing ? (
            // Processing State
            <View style={styles.processingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.processingText}>
                Processing your tasks...
              </Text>
            </View>
          ) : (
            // Voice Input State
            <>
              {/* Microphone Button */}
              <View style={styles.micContainer}>
                <Animated.View
                  style={[
                    styles.micButton,
                    {
                      backgroundColor: isListening
                        ? colors.error
                        : colors.primary,
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                >
                  <Pressable
                    style={styles.micButtonInner}
                    onPress={isListening ? handleStop : handleStart}
                  >
                    <MicIcon color={'light'} size={'40'} />
                  </Pressable>
                </Animated.View>
              </View>

              {/* Status Text */}
              <Text style={styles.statusText}>
                {isListening
                  ? 'Listening... Tap to stop'
                  : 'Tap the microphone to start'}
              </Text>

              {/* Transcription */}
              {transcription ? (
                <View
                  style={[
                    styles.transcriptionBox,
                    { backgroundColor: colors.card },
                  ]}
                >
                  <Text style={styles.transcriptionLabel}>You said:</Text>
                  <Text style={styles.transcriptionText}>{transcription}</Text>
                </View>
              ) : null}

              {/* Error */}
              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Instructions */}
              <View style={styles.instructions}>
                <Text style={styles.instructionTitle}>Tips:</Text>
                <Text style={styles.instructionText}>
                  • Say multiple tasks using "and", "also", or "then"
                </Text>
                <Text style={styles.instructionText}>
                  • Example: "Buy groceries and call mom"
                </Text>
                <Text style={styles.instructionText}>
                  • Mention dates for scheduling: "tomorrow" or "next Monday"
                </Text>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    micContainer: {
      marginBottom: 32,
    },
    micButton: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    micButtonInner: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 24,
    },
    transcriptionBox: {
      width: '100%',
      padding: 16,
      borderRadius: 12,
      marginBottom: 24,
    },
    transcriptionLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    transcriptionText: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
    },
    errorBox: {
      width: '100%',
      padding: 12,
      backgroundColor: colors.error + '20',
      borderRadius: 8,
      marginBottom: 16,
    },
    errorText: {
      fontSize: 14,
      color: colors.error,
      textAlign: 'center',
    },
    instructions: {
      width: '100%',
      marginTop: 'auto',
      paddingBottom: 32,
    },
    instructionTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    instructionText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 8,
      lineHeight: 20,
    },
    processingContainer: {
      alignItems: 'center',
    },
    processingText: {
      fontSize: 16,
      color: colors.text,
      marginTop: 16,
    },
    successContainer: {
      alignItems: 'center',
    },
    successIcon: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    successTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    successText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
  });
