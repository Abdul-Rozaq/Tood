import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  size?: string;
  color?: keyof ThemeColors;
}

export default function PlusIcon({ color = 'light', size = '10' }: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.00065 1.14587C5.2883 1.14587 5.52148 1.37906 5.52148 1.66671L5.52148 4.47921L8.33398 4.47921C8.62163 4.47921 8.85482 4.71239 8.85482 5.00004C8.85482 5.28769 8.62163 5.52087 8.33398 5.52087L5.52148 5.52087L5.52148 8.33337C5.52148 8.62102 5.2883 8.85421 5.00065 8.85421C4.713 8.85421 4.47982 8.62102 4.47982 8.33337L4.47982 5.52087L1.66732 5.52087C1.37967 5.52087 1.14648 5.28769 1.14648 5.00004C1.14648 4.71239 1.37967 4.47921 1.66732 4.47921L4.47982 4.47921L4.47982 1.66671C4.47982 1.37906 4.713 1.14587 5.00065 1.14587Z"
        fill={_COLORS[color]}
      />
    </Svg>
  );
}
