import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import { BaseLayout } from 'app/layouts/BaseLayout';
import { AppInput } from 'elements/AppInput';
import { styles } from '../RegistrationSurvey.styles';
import { blueButtonColors, globalStyles } from 'app/styles';
import { i18n } from 'app/i18n';
import { AppButton } from 'elements/AppButton';
import { Separator } from 'elements/Separator';
import { useAppDispatch } from 'app/store';
import { setSurveyName } from 'app/store/slices/RegistrationSurveySlice';
import { useAppNavigation } from 'app/navigation';
import { UIColors } from 'app/constants';
import { KeyboardAwareLayout } from 'app/layouts/KeyboardAwareLayout';

const WhatsYourName = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const onContinuePress = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError(i18n.registrationSurveyScreen.name.error);
    } else {
      dispatch(setSurveyName(`${firstName.trim()} ${lastName.trim()}`));
      navigation.navigate('surveyAge');
    }
  };

  const onChangeFirstName = useCallback((text: string) => {
    setFirstName(text);
    setError('');
  }, []);

  const onChangeLastName = useCallback((text: string) => {
    setLastName(text);
    setError('');
  }, []);

  return (
    <BaseLayout style={styles.container} error={error}>
      <KeyboardAwareLayout contentContainerStyle={styles.inner}>
        <Text style={[globalStyles.spacingTextTitle, styles.title]}>
          {i18n.registrationSurveyScreen.name.title}
        </Text>

        <View style={styles.registrationNameContainer}>
          <AppInput
            inputStyles={[styles.input, styles.nameInput]}
            value={firstName}
            onChangeText={onChangeFirstName}
            returnKeyType="done"
            placeholder={
              i18n.registrationSurveyScreen.name.placeholderFirstName
            }
            placeholderTextColor={UIColors.placeholderText}
            autoCapitalize="sentences"
            autoCorrect={false}
          />
          <AppInput
            inputStyles={[styles.input, styles.nameInput]}
            value={lastName}
            onChangeText={onChangeLastName}
            returnKeyType="done"
            placeholder={i18n.registrationSurveyScreen.name.placeholderLastName}
            placeholderTextColor={UIColors.placeholderText}
            autoCapitalize="sentences"
            autoCorrect={false}
          />
        </View>

        <Text style={globalStyles.spacingTextDescription}>
          {i18n.registrationSurveyScreen.name.description}
        </Text>

        <Separator height={80} />

        <AppButton
          disabled={!firstName.trim() || !lastName.trim()}
          title={i18n.general.continue}
          onPress={onContinuePress}
          {...blueButtonColors}
        />
      </KeyboardAwareLayout>
    </BaseLayout>
  );
};

export default WhatsYourName;
