import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  size?: string;
  color?: keyof ThemeColors;
}

export default function CheckboxMarkedIcon({
  color = 'primary',
  size = '20',
}: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Rect x="2" y="2" width="16" height="16" rx="4" fill={_COLORS[color]} />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5303 8.03039L9 13.5607L5.46967 10.0304L6.53033 8.96973L9 11.4394L13.4697 6.96973L14.5303 8.03039Z"
        fill="white"
      />
    </Svg>
  );
}
