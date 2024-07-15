import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import * as Sentry from '@sentry/react-native';
import { StatusBar, BackHandler, Platform, UIManager } from 'react-native';
import { store } from './store';
import { Navigation } from './navigation';
import { getSecureStorageItem } from './utils/secureStorage';
import { fetchUser, refreshToken } from './store/slices/AuthSlice/AuthSlice';
import { setHidden, setHiddenAsked } from 'app/store/slices/GeolocationSlice';
import { useLocation, useNotifications } from './hooks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ENVIRONMENT } from 'app/constants/config';
import { VISIBILITY_TOKEN } from 'app/constants';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
  useEffect(() => {
    getSecureStorageItem(VISIBILITY_TOKEN).then(visibilityToken => {
      if (visibilityToken) {
        store.dispatch(setHiddenAsked(true));
        store.dispatch(setHidden(!!visibilityToken.hidden));
      }
    });

    getSecureStorageItem('tokens').then(tokens => {
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
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true;
    });
    //Crashlytics
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
