import React, { FC, useState } from 'react';
import { TextInput } from 'react-native';

import { styles } from './AppInput.styles';
import { AppInputProps } from './AppInput.types';

const AppInput: FC<AppInputProps> = props => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <TextInput
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={[
        styles.input,
        isFocused && styles.inputFocus,
        props.error && styles.inputError,
        props.inputStyles,
      ]}
      {...props}
    />
  );
};

export default AppInput;
