import React, { FC } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { KeyboardAwareLayoutProps } from './keyboardAwareLayout.types.';

const KeyboardAwareLayout: FC<KeyboardAwareLayoutProps> = props => {
  return (
    <KeyboardAwareScrollView
      {...props}
      keyboardShouldPersistTaps="handled"
      style={props.style}>
      {props.children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareLayout;
