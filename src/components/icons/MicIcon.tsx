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

export default function MicIcon({ color = 'text', size = '24' }: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg
      fill={_COLORS[color]}
      width={size}
      height={size}
      viewBox="0 0 1920 1920"
    >
      <Path
        d="M425.818 709.983V943.41c0 293.551 238.946 532.497 532.497 532.497 293.55 0 532.496-238.946 532.496-532.497V709.983h96.818V943.41c0 330.707-256.438 602.668-580.9 627.471l-.006 252.301h242.044V1920H667.862v-96.818h242.043l-.004-252.3C585.438 1546.077 329 1274.116 329 943.41V709.983h96.818ZM958.315 0c240.204 0 435.679 195.475 435.679 435.68v484.087c0 240.205-195.475 435.68-435.68 435.68-240.204 0-435.679-195.475-435.679-435.68V435.68C522.635 195.475 718.11 0 958.315 0Z"
        fillRule="evenodd"
      />
    </Svg>
  );
}
