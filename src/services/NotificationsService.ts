import { Platform } from 'react-native';
import { api } from './api';
import { CHAT_URL } from 'app/constants/config';
import { ANDROID_PLATFORM, IOS_PLATFORM } from 'app/constants';

export class NotificationsService {
  static sendFcmToken = async (token: string) => {
    return api.post(
      CHAT_URL + 'api/v1/notification/register',
      {
        token: token,
        platform: Platform.OS === 'android' ? ANDROID_PLATFORM : IOS_PLATFORM,
      },
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
  };
}
