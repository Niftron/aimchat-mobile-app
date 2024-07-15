import { phoneMask } from 'app/utils';
import React, { FC, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from './AppInputPhone.styles';

import { AppInputPhoneProps } from './AppInputPhone.types';

const AppInputPhone: FC<AppInputPhoneProps> = props => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerActive]}>
      <View style={styles.code}>
        <Text style={styles.codeText}>{props.code}</Text>
      </View>
      <TextInput
        {...props}
        value={phoneMask(props.value)}
        onChangeText={text => {
          if (props.onChangeText) {
            props?.onChangeText(text.replace(/-/g, '').slice(0, 10));
          }
        }}
        style={[styles.input, props.style]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType="number-pad"
        returnKeyType="done"
      />
    </View>
  );
};

export default AppInputPhone;
