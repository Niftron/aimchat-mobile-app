import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface BaseLayoutProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  error?: string;
  showTopSafeArea?: boolean;
  showBottomSafeArea?: boolean;
  topSafeAreaColor?: string;
  bottomSafeAreaColor?: string;
  isLoading?: boolean;
}
