import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { BaseLayout } from 'app/layouts/BaseLayout';
import { AppInput } from 'elements/AppInput';
import { styles } from '../RegistrationSurvey.styles';
import { blueButtonColors, globalStyles } from 'app/styles';
import { i18n } from 'app/i18n';
import { AppButton } from 'elements/AppButton';
import { Separator } from 'elements/Separator';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { useAppNavigation } from 'app/navigation';
import { resetSurvey } from 'app/store/slices/RegistrationSurveySlice';
import { updateUserProfile } from 'app/store/slices/AuthSlice/AuthSlice';
import { UIColors } from 'app/constants';
import { KeyboardAwareLayout } from 'app/layouts/KeyboardAwareLayout';

const WhatsYourQuote = () => {
  const answers = useTypedSelector(state => state.registrationSurvey);
  const profile = useTypedSelector(state => state.auth.user.profile);
  const [quote, setQuote] = useState('');
  const [error, setError] = useState('');

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const onContinuePress = () => {
    let fullNumber;
    if (answers.phone?.number) {
      fullNumber = answers.phone.code.replace('+', '');
      fullNumber = fullNumber.replace(' ', '');
      fullNumber += answers.phone.number;
    } else {
      fullNumber = profile.phone;
    }
    dispatch(
      updateUserProfile({
        profile: {
          user_name: answers.name,
          phone: fullNumber,
          quote: quote,
          gender: answers.gender,
          email: answers.email,
        },
      }),
    );

    dispatch(resetSurvey());
    navigation.reset({ index: 0, routes: [{ name: 'tabs' }] });
  };
  return (
    <BaseLayout style={styles.container} error={error}>
      <KeyboardAwareLayout contentContainerStyle={styles.inner}>
        <Text style={[globalStyles.spacingTextTitle, styles.title]}>
          {i18n.registrationSurveyScreen.quote.title}
        </Text>
        <View>
          <AppInput
            inputStyles={[styles.input, styles.textArea]}
            value={quote}
            onChangeText={text => {
              setQuote(text);
              setError('');
            }}
            multiline={true}
            returnKeyType="done"
            keyboardType="default"
            blurOnSubmit={true}
            placeholder={i18n.registrationSurveyScreen.quote.placeholder}
            placeholderTextColor={UIColors.gray}
            maxLength={180}
          />
        </View>

        <Text style={globalStyles.spacingTextDescription}>
          {i18n.registrationSurveyScreen.quote.description}
        </Text>

        <Separator flex />

        <AppButton
          title={quote ? i18n.general.continue : i18n.general.skip}
          onPress={onContinuePress}
          {...blueButtonColors}
        />
      </KeyboardAwareLayout>
    </BaseLayout>
  );
};

export default WhatsYourQuote;
