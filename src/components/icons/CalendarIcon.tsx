import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  size?: string;
  color?: keyof ThemeColors;
}

export default function CalendarIcon({
  color = 'primary',
  size = '17',
}: Props) {
  const { colors: _COLORS } = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 17 16" fill="none">
      <Path
        d="M12.5 1.3335V2.66683M4.5 1.3335V2.66683"
        stroke={_COLORS[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.49766 8.6665H8.50364M8.49766 11.3332H8.50364M11.1613 8.6665H11.1673M5.83398 8.6665H5.83997M5.83398 11.3332H5.83997"
        stroke={_COLORS[color]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.83398 5.3335H14.1673"
        stroke={_COLORS[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.16602 8.16216C2.16602 5.25729 2.16602 3.80486 3.00076 2.90243C3.83551 2 5.17901 2 7.86602 2H9.13268C11.8197 2 13.1632 2 13.9979 2.90243C14.8327 3.80486 14.8327 5.25729 14.8327 8.16216V8.5045C14.8327 11.4094 14.8327 12.8618 13.9979 13.7642C13.1632 14.6667 11.8197 14.6667 9.13268 14.6667H7.86602C5.17901 14.6667 3.83551 14.6667 3.00076 13.7642C2.16602 12.8618 2.16602 11.4094 2.16602 8.5045V8.16216Z"
        stroke={_COLORS[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 5.3335H14.5"
        stroke={_COLORS[color]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
