import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

export type KeyboardAwareLayoutProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
} & KeyboardAwareScrollViewProps;
