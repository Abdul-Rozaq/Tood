import { useState, useEffect } from 'react';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';
import { Platform, PermissionsAndroid, Alert } from 'react-native';

export const useVoiceInput = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
    setError(null);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (event: SpeechResultsEvent) => {
    if (event.value && event.value[0]) {
      setTranscription(event.value[0]);
    }
  };

  const onSpeechError = (event: SpeechErrorEvent) => {
    console.error('Speech error:', event.error);
    setError(event.error?.message || 'Speech recognition error');
    setIsListening(false);
  };

  const requestMicrophonePermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message:
              'This app needs access to your microphone to create tasks by voice.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Microphone permission is required to use voice input.',
        );
        return;
      }

      setTranscription('');
      setError(null);
      await Voice.start('en-US');
    } catch (err) {
      console.error('Start listening error:', err);
      setError('Failed to start voice recognition');
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (err) {
      console.error('Stop listening error:', err);
    }
  };

  const cancelListening = async () => {
    try {
      await Voice.cancel();
      setIsListening(false);
      setTranscription('');
    } catch (err) {
      console.error('Cancel listening error:', err);
    }
  };

  return {
    isListening,
    transcription,
    error,
    startListening,
    stopListening,
    cancelListening,
  };
};
