import React, { useEffect } from 'react';
import { Text, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { LogoIcon } from 'app/assets/SVG';
import { dimensions, splashScreenBackground, UIColors } from 'app/constants';
import { AppButton } from 'elements/AppButton';
import { i18n } from 'app/i18n';
import { styles } from './Auth.styles';
import { whiteButtonColors } from 'app/styles';
import { Separator } from 'elements/Separator';
import { AppNavigationProps } from 'app/navigation/Navigation.types';
import { useTypedSelector } from 'app/store';

const opacity = new Animated.Value(0);
const scale = new Animated.Value(1);

const AuthScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const isFetchFinished = useTypedSelector(state => state.auth.isFetchFinished);
  const navigateToTerms = () => {
    navigation.navigate('terms', {
      title: i18n.terms.title,
      text: i18n.terms.text,
    });
  };

  const navigateToPrivacy = () => {
    navigation.navigate('terms', {
      title: i18n.privacy.title,
      text: i18n.privacy.text,
    });
  };

  const fadeOut = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translateY = scale.interpolate({
    inputRange: [1, 1.6],
    outputRange: [0, -110],
  });

  const goToTabs = () => {
    navigation.navigate('login');
  };

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      delay: 2000,
      useNativeDriver: true,
    }).start();

    Animated.timing(scale, {
      toValue: 1.6,
      duration: 1500,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.safeArea}>
      <View style={styles.background}>
        <Animated.Image
          style={[
            {
              width: dimensions.width,
              height: dimensions.height,
            },
            { transform: [{ scale }, { translateY }] },
          ]}
          source={splashScreenBackground}
          resizeMode="cover"
        />
      </View>
      <Animated.View style={[styles.logo, { opacity }]}>
        <LogoIcon color={UIColors.white} />
      </Animated.View>

      <View style={styles.splashScreenTextWrapper}>
        <Animated.View
          style={[styles.splashScreenTextInner, { opacity: fadeOut }]}>
          <Text style={styles.splashScreenText}>A NEW WAY TO NETWORK</Text>
        </Animated.View>
      </View>

      <Separator flex />

      {isFetchFinished ? (
        <Animated.View style={{ opacity }}>
          <View style={styles.buttonsWrapper}>
            <AppButton
              {...whiteButtonColors}
              title={i18n.general.phoneNumber}
              onPress={goToTabs}
            />
          </View>

          <View style={styles.registrationRules}>
            <Text style={styles.registrationRulesText}>
              {`${i18n.authScreen.registrationRules} `}
              <Text
                style={styles.registrationRulesTextLink}
                onPress={navigateToTerms}>
                {`${i18n.general.terms} `}
              </Text>
              {i18n.general.and}
              <Text
                style={styles.registrationRulesTextLink}
                onPress={navigateToPrivacy}>
                {` ${i18n.general.privacy}`}
              </Text>
            </Text>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default AuthScreen;
