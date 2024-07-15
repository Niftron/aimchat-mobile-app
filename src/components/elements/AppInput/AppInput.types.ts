import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export type AppInputProps = {
  error?: boolean;
  inputStyles?: StyleProp<ViewStyle>;
} & TextInputProps;
