import Snackbar from 'react-native-snackbar';
import { UIColors } from 'app/constants';
import { i18n } from 'app/i18n';
import { ApiError } from 'app/types';
import { errorIgnoredCodes } from 'app/constants/errorCodes';
import * as Sentry from '@sentry/react-native';
import { store } from 'app/store';
import { refreshToken } from 'app/store/slices/AuthSlice/AuthSlice';

export function errorHandler(error: ApiError) {
  Sentry.captureException(
    JSON.stringify(
      error?.response?.data
        ? {
            error: error?.response?.data?.error,
            url: error?.response?.config?.url,
          }
        : error,
    ),
  );
  const errorType = error?.response?.data?.error;
  let textMessage = '';
  if (!errorType) {
    return;
  } else if (errorIgnoredCodes.indexOf(errorType) > -1) {
    return;
  } else {
    if (Object.keys(i18n.errors).indexOf(errorType) > -1) {
      textMessage = i18n.errors[errorType];
      if (errorType === 'unauthorized') {
        //This may be called multiple times during refreshing, so it's better not to show anything to not bother users.
        //If this error comes from refresh token, need to stop refreshing.
        if (error?.response?.config?.url?.indexOf('token/refresh') === -1) {
          store.dispatch(refreshToken());
        }
        return;
      }
    } else {
      textMessage = i18n.errors.default_error;
    }
  }
  Snackbar.show({
    fontFamily: 'Montserrat-Regular',
    text: textMessage,
    textColor: 'white',
    backgroundColor: UIColors.red,
    duration: 5000,
  });
}
