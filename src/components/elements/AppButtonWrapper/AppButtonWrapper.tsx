import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { styles } from './AppButtonWrapper.styles';
import { AppButtonWrapperProps } from './AppButtonWrapper.types';

const AppButtonWrapper: FC<AppButtonWrapperProps> = ({
  children,
  color,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }, style]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default AppButtonWrapper;
