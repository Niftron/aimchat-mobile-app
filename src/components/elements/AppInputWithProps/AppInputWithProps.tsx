import React, { FC, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { AppInputWithPropsProps } from './AppInputWithProps.types';
import { styles } from './AppInputWithProps.styles';
import { UIColors } from 'app/constants';

const AppInputWithProps: FC<AppInputWithPropsProps> = ({
  label,
  insideButtonLabel,
  insideButtonValue = false,
  insideButtonStyle,
  error,
  inputProps,
  containerStyles,
  onInsideButtonPress = () => {},
}) => {
  const [toggle, setToggle] = useState(insideButtonValue);

  const onButtonPress = () => {
    onInsideButtonPress(!toggle);
    setToggle(!toggle);
  };
  return (
    <View style={[styles.container, containerStyles]}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          {...inputProps}
          caretHidden={false}
          placeholderTextColor={UIColors.gray}
        />
        {!!insideButtonLabel && (
          <TouchableOpacity
            style={[
              styles.inputButton,
              toggle && styles.inputButtonActive,
              insideButtonStyle,
            ]}
            onPress={onButtonPress}>
            <Text
              style={[
                styles.inputButtonLabel,
                toggle && styles.inputButtonLabelActive,
              ]}>
              {insideButtonLabel}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default AppInputWithProps;
