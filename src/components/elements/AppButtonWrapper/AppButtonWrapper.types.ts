import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type AppButtonWrapperProps = {
  color: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};
