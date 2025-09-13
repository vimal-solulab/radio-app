declare module 'react-native-slider' {
  import { Component } from 'react';
    import { ViewStyle } from 'react-native';

  interface SliderProps {
    value?: number;
    minimumValue?: number;
    maximumValue?: number;
    onValueChange?: (value: number) => void;
    onSlidingStart?: (value: number) => void;
    onSlidingComplete?: (value: number) => void;
    minimumTrackTintColor?: string;
    maximumTrackTintColor?: string;
    thumbStyle?: ViewStyle;
    trackStyle?: ViewStyle;
    minimumTrackStyle?: ViewStyle;
    style?: ViewStyle;
    disabled?: boolean;
    animateTransitions?: boolean;
    animationType?: 'spring' | 'timing';
    orientation?: 'horizontal' | 'vertical';
    trackClickable?: boolean;
  }

  export default class Slider extends Component<SliderProps> {}
}
