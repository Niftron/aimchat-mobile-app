import React, { useState } from 'react';
import { Text } from 'react-native';

import { BaseLayout } from 'app/layouts/BaseLayout';
import { AppInput } from 'elements/AppInput';
import { styles } from '../RegistrationSurvey.styles';
import { blueButtonColors, globalStyles } from 'app/styles';
import { i18n } from 'app/i18n';
import { AppButton } from 'elements/AppButton';
import { Separator } from 'elements/Separator';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProps } from 'app/navigation/Navigation.types';
import { useAppDispatch } from 'app/store';
import { setSurveyEmail } from 'app/store/slices/RegistrationSurveySlice';
import { isEmail } from 'app/utils';
import { UIColors } from 'app/constants';
import { KeyboardAwareLayout } from 'app/layouts/KeyboardAwareLayout';

const WhatsYourEmail = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useAppDispatch();

  const onContinuePress = () => {
    if (!email) {
      navigation.navigate('surveyQuote');
    } else {
      if (isEmail(email)) {
        dispatch(setSurveyEmail(email.toLowerCase().trim()));
        navigation.navigate('surveyQuote');
      } else {
        setError(i18n.errors.invalidEmail);
      }
    }
  };
  return (
    <BaseLayout style={styles.container} error={error}>
      <KeyboardAwareLayout contentContainerStyle={styles.inner}>
        <Text style={[globalStyles.spacingTextTitle, styles.title]}>
          {i18n.registrationSurveyScreen.email.title}
        </Text>

        <AppInput
          inputStyles={styles.input}
          value={email}
          onChangeText={text => {
            setEmail(text);
            setError('');
          }}
          placeholder={i18n.registrationSurveyScreen.email.placeholder}
          placeholderTextColor={UIColors.gray}
          returnKeyType="done"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Separator flex />

        <AppButton
          title={email ? i18n.general.continue : i18n.general.skip}
          onPress={onContinuePress}
          {...blueButtonColors}
        />
      </KeyboardAwareLayout>
    </BaseLayout>
  );
};

export default WhatsYourEmail;
