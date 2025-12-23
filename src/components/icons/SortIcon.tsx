import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  color?: keyof ThemeColors;
  size?: string;
}

export default function SortIcon({ color = 'text', size = '24' }: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 12H21M13 8H21M13 16H21M6 7V17M6 7L3 10M6 7L9 10"
        stroke={_COLORS[color]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
