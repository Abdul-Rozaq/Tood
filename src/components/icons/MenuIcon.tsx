import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { ThemeColors } from '../../assets/themes/color';

interface Props {
  size?: string;
  width?: string;
  height?: string;
  color?: keyof ThemeColors;
}

export default function MenuIcon({ color = 'text', size = '24' }: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 6H20M4 12H20M4 18H20"
        stroke={_COLORS[color]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
