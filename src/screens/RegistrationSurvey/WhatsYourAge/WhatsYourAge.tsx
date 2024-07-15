import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { i18n } from 'app/i18n';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { globalStyles } from 'app/styles';
import { styles } from '../RegistrationSurvey.styles';
import AppButtonWrapper from 'elements/AppButtonWrapper/AppButtonWrapper';
import { UIColors } from 'app/constants';
import { Separator } from 'elements/Separator';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProps } from 'app/navigation/Navigation.types';
import { useAppDispatch } from 'app/store';
import { setSurveyIsAdult } from 'app/store/slices/RegistrationSurveySlice';

const WhatsYourAge = () => {
  const [error, setError] = useState('');
  const [answer, setAnswer] = useState(0);

  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useAppDispatch();

  const onNoPress = () => {
    setAnswer(2);
    setError(i18n.registrationSurveyScreen.age.error);
  };

  const onYesPress = () => {
    setAnswer(1);
    setError('');
    dispatch(setSurveyIsAdult(true));
    navigation.navigate('surveyGender');
  };

  return (
    <BaseLayout style={styles.container} error={error}>
      <Text style={[globalStyles.spacingTextTitle, styles.title]}>
        {i18n.registrationSurveyScreen.age.title}
      </Text>
      <View style={styles.horizontalWrapper}>
        <AppButtonWrapper
          style={styles.button}
          color={answer === 1 ? UIColors.turquoise : UIColors.white}
          onPress={onYesPress}>
          <Text
            style={[
              styles.buttonText,
              { color: answer === 1 ? UIColors.white : UIColors.black },
            ]}>
            {i18n.general.yes}
          </Text>
        </AppButtonWrapper>

        <Separator width={20} />

        <AppButtonWrapper
          style={styles.button}
          color={answer === 2 ? UIColors.turquoise : UIColors.white}
          onPress={onNoPress}>
          <Text
            style={[
              styles.buttonText,
              { color: answer === 2 ? UIColors.white : UIColors.black },
            ]}>
            {i18n.general.no}
          </Text>
        </AppButtonWrapper>
      </View>
      <Text style={globalStyles.spacingTextDescription}>
        {i18n.registrationSurveyScreen.age.description}
      </Text>
    </BaseLayout>
  );
};

export default WhatsYourAge;
