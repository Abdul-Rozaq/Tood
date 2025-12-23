import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import CheckboxIcon from './icons/CheckboxIcon';
import CheckedIcon from './icons/CheckboxMarkedIcon';

interface Props {
  checked: boolean;
  onPress: () => void;
}

export default function AnimatedCheckbox({ checked, onPress }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (checked) {
      // Scale animation
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      // Checkmark fade in
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      opacityAnim.setValue(0);
      scaleAnim.setValue(1);
    }
  }, [checked, scaleAnim, opacityAnim]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {checked ? (
          <Animated.View style={{ opacity: opacityAnim }}>
            <CheckedIcon color={'primary'} />
          </Animated.View>
        ) : (
          <CheckboxIcon />
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
  },
});
