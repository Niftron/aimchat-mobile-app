import React, { FC, useEffect, useRef, useState } from 'react';
import { TextInput, Text, Pressable } from 'react-native';
import { styles } from './AppInputCode.styles';
import { AppInputCodeProps } from './AppInputCode.types';

const AppInputCode: FC<AppInputCodeProps> = ({
  value,
  isError,
  length = 4,
  onValueChange,
  onFill,
}) => {
  const [code, setCode] = useState(value ?? '');
  const [isFocus, setIsFocus] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const onPress = () => {
    inputRef.current?.focus();
  };

  const onChangeText = (text: string) => {
    const pattern = /\D\S*/gm;

    if (pattern.test(text)) {
      return;
    }

    if (onValueChange) {
      onValueChange(text);
    }
    setCode(text);
  };

  useEffect(() => {
    if (onFill && code.length === length) {
      onFill(code);
      setCode('');
    }
  }, [code, length, onFill]);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        maxLength={length}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={code}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        returnKeyType="done"
      />

      {Array(length)
        .fill('')
        .map((_, i) => (
          <Text
            key={i}
            style={[
              styles.cell,
              isFocus && styles.cellActive,
              isError && styles.cellError,
            ]}>
            {code.split('')[i]}
          </Text>
        ))}
    </Pressable>
  );
};

export default AppInputCode;
