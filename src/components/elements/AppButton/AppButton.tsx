import React, { FC } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './AppButton.styles';
import { AppButtonProps } from './AppButton.types';

const AppButton: FC<AppButtonProps> = ({
  title,
  color,
  titleColor,
  containerStyles,
  disabled,
  onPress,
}) => {
  return (
    <>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          { backgroundColor: color },
          disabled && styles.disabled,
          containerStyles,
        ]}
        onPress={onPress}>
        <Text style={[styles.text, { color: titleColor }]}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default AppButton;
