import { StyleProp, ViewStyle } from 'react-native';
import React from 'react';

export type ImageFrameProps = {
  strokeColor?: string;
  fillColor?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  userName: string;
  imagePath?: string;
  imageId?: string;
};
