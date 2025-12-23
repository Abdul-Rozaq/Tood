import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  size?: string;
  color?: keyof ThemeColors;
}

export default function CancelIcon({ color = 'text', size = '20' }: Props) {
  const { colors: _COLORS } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M9.01074 22.9906L16.0014 15.9999L22.9921 22.9906M22.9921 9.00928L16.0001 15.9999L9.01074 9.00928"
        stroke={_COLORS[color]}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
