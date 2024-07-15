import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export type AppInputWithPropsProps = {
  label?: string;
  insideButtonLabel?: string;
  insideButtonValue?: boolean;
  error?: string;
  inputProps?: TextInputProps;
  containerStyles?: StyleProp<ViewStyle>;
  insideButtonStyle?: StyleProp<ViewStyle>;
  onInsideButtonPress?: (toggle: boolean) => void;
};
