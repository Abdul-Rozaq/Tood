import React from 'react';
import Svg, {
  ClipPath,
  Defs,
  FeBlend,
  FeColorMatrix,
  FeFlood,
  FeGaussianBlur,
  FeOffset,
  Filter,
  G,
  Rect,
} from 'react-native-svg';
import { ThemeColors } from '../../assets/themes/color';
import { useTheme } from '../../hooks/useTheme';

interface Props {
  size?: string;
  color?: keyof ThemeColors;
}

export default function CheckboxIcon({
  color = 'primary',
  size = '20',
}: Props) {
  const { colors: _COLORS } = useTheme();

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G>
        <Rect x="2" y="2" width="16" height="16" rx="4" fill={_COLORS[color]} />
        <G>
          <Rect x="3.5" y="3.5" width="13" height="13" rx="2.6" fill="white" />
        </G>
      </G>
      <Defs>
        <Filter
          id="filter0_d_572_4329"
          x="1.5"
          y="3.5"
          width="17"
          height="17"
          filterUnits="userSpaceOnUse"
          // colorInterpolationFilters="sRGB"
        >
          <FeFlood floodOpacity="0" result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <FeOffset dy="2" />
          <FeGaussianBlur stdDeviation="1" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0.105882 0 0 0 0 0.109804 0 0 0 0 0.113725 0 0 0 0.12 0"
          />
          <FeBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_572_4329"
          />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_572_4329"
            result="shape"
          />
        </Filter>
        <ClipPath id="clip0_572_4329">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
