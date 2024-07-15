import { StyleProp, ViewStyle } from 'react-native';

export type AppButtonProps = {
  title: string;
  titleColor: string;
  color: string;
  containerStyles?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress: () => void;
};
