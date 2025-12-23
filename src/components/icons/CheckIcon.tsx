import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  color?: keyof ThemeColors;
  size?: string;
}

export default function CheckIcon({ color = 'text', size = '24' }: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke={_COLORS[color]}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
