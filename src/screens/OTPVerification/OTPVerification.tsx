import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Keyboard } from 'react-native';
import { i18n } from 'app/i18n';

import { BaseLayout } from 'app/layouts/BaseLayout';
import { AppInputCode } from 'elements/AppInputCode';
import { KeyboardAwareLayout } from 'app/layouts/KeyboardAwareLayout';
import { styles } from './OTPVerification.styles';
import { getTimerStringFromSeconds } from 'app/utils/datetimeHelper';
import { Values } from 'app/constants';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { useAppNavigation } from 'app/navigation';
import {
  phoneConfirmation,
  phoneRequest,
} from 'app/store/slices/AuthSlice/AuthSlice';
import { setIsConfirmationCodeInvalid } from 'app/store/slices/AuthSlice';

let interval: NodeJS.Timer | undefined;

const OTPVerification = () => {
  const [timer, setTimer] = useState(600);

  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const {
    phone,
    isAuth,
    authType,
    isConfirmationCodeInvalid,
    loading: { isConfirmationCodeLoading },
    user: { profile },
  } = useTypedSelector(state => state.auth);

  const verifyCode = useCallback(
    (code: string) => {
      Keyboard.dismiss();
      dispatch(
        phoneConfirmation({
          phone,
          code,
        }),
      );
    },
    [dispatch, phone],
  );

  const recreateTimer = useCallback(() => {
    setTimer(600);

    interval = setInterval(() => {
      setTimer(prev => {
        if (prev) {
          return prev - 1;
        } else {
          clearInterval(interval);
          interval = undefined;
          return 0;
        }
      });
    }, 1000);
  }, []);

  const onResendTextPress = useCallback(() => {
    dispatch(phoneRequest(phone));
    recreateTimer();
  }, [dispatch, phone, recreateTimer]);

  const ResendString = () => {
    const string = !timer
      ? i18n.OTPVerificationScreen.resendCode
      : i18n.OTPVerificationScreen.resendTimer;

    return (
      <Text style={styles.textUnderline}>
        <>
          <Text style={styles.text}>{string}</Text>
          {!!timer && (
            <Text style={styles.text}>{` ${getTimerStringFromSeconds(
              timer,
            )}`}</Text>
          )}
        </>
      </Text>
    );
  };

  useEffect(() => {
    recreateTimer();

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
      dispatch(setIsConfirmationCodeInvalid(false));
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) {
      const isProfileExist = !!Object.keys(profile).length;
      if (authType === 'registration') {
        navigation.reset({ index: 0, routes: [{ name: 'surveyName' }] });
      } else if (authType === 'login' && isProfileExist) {
        if (!profile.user_name) {
          navigation.reset({ index: 0, routes: [{ name: 'surveyName' }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'tabs' }] });
        }
      }
    }
  }, [authType, isAuth, navigation, profile]);

  return (
    <BaseLayout style={styles.container} isLoading={isConfirmationCodeLoading}>
      <KeyboardAwareLayout contentContainerStyle={styles.inner}>
        <View style={styles.separator} />
        <View style={styles.contentWrapper}>
          <Text style={styles.text}>{i18n.OTPVerificationScreen.title}</Text>
          <AppInputCode
            onFill={verifyCode}
            isError={isConfirmationCodeInvalid}
            length={Values.OTPCodeLength}
            onValueChange={() => dispatch(setIsConfirmationCodeInvalid(false))}
          />
          <TouchableOpacity disabled={!!timer} onPress={onResendTextPress}>
            <ResendString />
          </TouchableOpacity>
        </View>
      </KeyboardAwareLayout>
    </BaseLayout>
  );
};

export default OTPVerification;
