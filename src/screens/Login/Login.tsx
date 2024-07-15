import React, { useState } from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';

import { i18n } from 'app/i18n';
import { AppInputPhone } from 'elements/AppInputPhone';
import { styles } from './Login.styles';
import { KeyboardAwareLayout } from 'app/layouts/KeyboardAwareLayout';
import { useAppDispatch } from 'app/store';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProps } from 'app/navigation/Navigation.types';
import { AppButton } from 'elements/AppButton';
import { blueButtonColors } from 'app/styles';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { phoneMask } from 'app/utils';
import { setSurveyPhone } from 'app/store/slices/RegistrationSurveySlice';
import { phoneRequest } from 'app/store/slices/AuthSlice/AuthSlice';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState<{ code: string; country: string }>();
  const [isPhoneInvalid] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<AppNavigationProps>();

  const onSelectCodePress = () => {
    navigation.navigate('countryCodes', { onChange: setCode });
  };

  const onNextPress = () => {
    const message = `${i18n.loginScreen.confirmationModal.message} 
    ${code?.code} ${phoneMask(phone)}`;
    Alert.alert(i18n.loginScreen.confirmationModal.title, message, [
      {
        text: i18n.general.cancel,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: i18n.general.confirm,
        onPress: () => {
          dispatch(
            setSurveyPhone({
              code: code?.code ?? '',
              number: phone,
            }),
          );
          dispatch(
            phoneRequest(code?.code.replace(' ', '').replace('+', '') + phone),
          );
          navigation.navigate('OTPVerification');
        },
      },
    ]);
  };

  return (
    <BaseLayout style={styles.container}>
      <KeyboardAwareLayout contentContainerStyle={styles.inner}>
        <View style={styles.inputWrapper}>
          <Text style={styles.title}>{i18n.loginScreen.yourPhone}</Text>
          <TouchableOpacity
            style={[styles.codeButton]}
            onPress={onSelectCodePress}>
            <Text style={styles.selectedTextStyle}>
              {code?.country ? code.country : 'Select country code'}
            </Text>
          </TouchableOpacity>
          <AppInputPhone
            value={phone}
            onChangeText={setPhone}
            code={code?.code ?? ''}
            error={isPhoneInvalid}
            maxLength={12}
          />
        </View>
      </KeyboardAwareLayout>

      <AppButton
        disabled={!phone || !code}
        title={i18n.general.next}
        onPress={onNextPress}
        {...blueButtonColors}
      />
    </BaseLayout>
  );
};

export default LoginScreen;
