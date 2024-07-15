import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { i18n } from 'app/i18n';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { blueButtonColors, globalStyles } from 'app/styles';
import AppButtonWrapper from 'elements/AppButtonWrapper/AppButtonWrapper';
import { Separator } from 'elements/Separator';
import { GenderFemaleIcon, GenderMaleIcon } from 'app/assets/SVG';
import { UIColors } from 'app/constants';
import { styles } from '../RegistrationSurvey.styles';
import { AppButton } from 'elements/AppButton';
import { useAppDispatch } from 'app/store';
import { useAppNavigation } from 'app/navigation';
import { setSurveyGender } from 'app/store/slices/RegistrationSurveySlice';

const WhatsYourGender = () => {
  const [answer, setAnswer] = useState<'m' | 'f' | 'p' | null>(null);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const onAnswerPress = (n: 'm' | 'f' | 'p') => {
    setAnswer(prev => {
      if (prev === n) {
        return null;
      } else {
        return n;
      }
    });
  };

  const onNext = () => {
    if (answer) {
      dispatch(setSurveyGender(answer));
      navigation.navigate('surveyEmail');
    }
  };

  return (
    <BaseLayout style={styles.container}>
      <Text style={[globalStyles.spacingTextTitle, styles.title]}>
        {i18n.registrationSurveyScreen.gender.title}
      </Text>

      <View style={styles.horizontalWrapper}>
        <AppButtonWrapper
          style={styles.buttonSelect}
          color={answer === 'f' ? UIColors.turquoise : UIColors.white}
          onPress={() => onAnswerPress('f')}>
          <GenderFemaleIcon
            style={styles.genderIcon}
            color={answer === 'f' ? UIColors.white : UIColors.blue}
          />
          <Text
            style={[
              styles.genderText,
              answer === 'f' ? styles.genderTextSelected : null,
            ]}>
            {i18n.general.genders.female}
          </Text>
        </AppButtonWrapper>

        <Separator width={20} />

        <AppButtonWrapper
          style={styles.buttonSelect}
          color={answer === 'm' ? UIColors.turquoise : UIColors.white}
          onPress={() => onAnswerPress('m')}>
          <GenderMaleIcon
            style={styles.genderIcon}
            color={answer === 'm' ? UIColors.white : UIColors.blue}
          />
          <Text
            style={[
              styles.genderText,
              answer === 'm' ? styles.genderTextSelected : null,
            ]}>
            {i18n.general.genders.male}
          </Text>
        </AppButtonWrapper>
      </View>

      <AppButtonWrapper
        style={styles.buttonSelectNotSure}
        color={answer === 'p' ? UIColors.turquoise : UIColors.white}
        onPress={() => onAnswerPress('p')}>
        <Text
          style={[
            styles.genderText,
            answer === 'p' ? styles.genderTextSelected : null,
          ]}>
          {i18n.general.genders.preferNotToSay}
        </Text>
      </AppButtonWrapper>

      <Separator height={20} />

      <Text style={globalStyles.spacingTextDescription}>
        {i18n.registrationSurveyScreen.gender.description}
      </Text>

      <Separator height={60} />

      <AppButton
        title={i18n.general.next}
        onPress={onNext}
        {...blueButtonColors}
        disabled={!answer}
      />
    </BaseLayout>
  );
};

export default WhatsYourGender;
