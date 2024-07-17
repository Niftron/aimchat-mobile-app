import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import * as Sentry from '@sentry/react-native';
import { StatusBar, BackHandler, Platform, UIManager, Alert, PermissionsAndroid } from 'react-native';
import { store } from './store';
import { Navigation } from './navigation';
import { getSecureStorageItem } from './utils/secureStorage';
import { fetchUser, refreshToken } from './store/slices/AuthSlice/AuthSlice';
import { setHidden, setHiddenAsked } from './store/slices/GeolocationSlice';
import { useLocation, useNotifications } from './hooks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ENVIRONMENT } from './constants/config';
import { VISIBILITY_TOKEN } from './constants';
import { checkMultiple, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      if (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('All permissions granted');
      } else {
        Alert.alert('Permissions not granted', 'You need to grant all permissions to use this app.');
      }
    } catch (err) {
      console.warn(err);
    }
  } else if (Platform.OS === 'ios') {
    checkMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      PERMISSIONS.IOS.LOCATION_ALWAYS,
    ])
      .then((statuses) => {
        if (
          statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.GRANTED &&
          statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] === RESULTS.GRANTED
        ) {
          console.log('All permissions granted');
        } else {
          requestMultiple([
            PERMISSIONS.IOS.CAMERA,
            PERMISSIONS.IOS.PHOTO_LIBRARY,
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            PERMISSIONS.IOS.LOCATION_ALWAYS,
          ]).then((statuses) => {
            if (
              statuses[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED ||
              statuses[PERMISSIONS.IOS.PHOTO_LIBRARY] !== RESULTS.GRANTED ||
              statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] !== RESULTS.GRANTED ||
              statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] !== RESULTS.GRANTED
            ) {
              Alert.alert('Permissions not granted', 'You need to grant all permissions to use this app.');
            }
          });
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }
};

const Middleware = () => {
  useLocation();
  useNotifications();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Navigation />
    </GestureHandlerRootView>
  );
};

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    getSecureStorageItem(VISIBILITY_TOKEN).then((visibilityToken) => {
      if (visibilityToken) {
        store.dispatch(setHiddenAsked(true));
        store.dispatch(setHidden(!!visibilityToken.hidden));
      }
    });

    getSecureStorageItem('tokens').then((tokens) => {
      if (tokens) {
        const now = moment();
        const { exp: validTo } = jwtDecode(tokens.token) as { exp: number };

        if (moment.unix(validTo).isAfter(now)) {
          store.dispatch(fetchUser()).finally(() => SplashScreen.hide());
        } else {
          store.dispatch(refreshToken()).finally(() => SplashScreen.hide());
        }
      } else {
        setTimeout(() => {
          SplashScreen.hide();
        }, 500);
      }
    });

    setAppReady(true);
  }, []);

  useEffect(() => {
    if (appReady) {
      requestPermissions();
    }
  }, [appReady]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });
    // Crashlytics
    if (!__DEV__) {
      Sentry.init({
        dsn: 'https://abf5c0d8b04242629adf47404170bf90@uit-sentry.umbrellait.tech/91',
        tracesSampleRate: 1.0,
        environment: ENVIRONMENT,
      });
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <Middleware />
    </Provider>
  );
};

export default Sentry.wrap(App);
