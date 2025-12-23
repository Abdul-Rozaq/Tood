import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  color?: keyof ThemeColors;
  size?: string;
}

export default function SortAscIcon({ color = 'text', size = '24' }: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 4H16M3 8H12M3 12H12M17 8V20M17 20L13 16M17 20L21 16"
        stroke={_COLORS[color]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
