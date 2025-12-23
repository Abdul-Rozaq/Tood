import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  color?: keyof ThemeColors;
  size?: string;
}

export default function SortDescIcon({ color = 'text', size = '24' }: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 4H16M3 8H12M3 12H9M17 16V4M17 4L13 8M17 4L21 8"
        stroke={_COLORS[color]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
