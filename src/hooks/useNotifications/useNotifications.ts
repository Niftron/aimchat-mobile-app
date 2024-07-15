import { useEffect, useState } from 'react';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { checkFCMToken } from 'app/utils';
import {
  getSecureStorageItem,
  setSecureStorageItem,
} from 'app/utils/secureStorage';
import { FCM_TOKEN } from 'app/constants';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { NotificationsService } from 'app/services/NotificationsService';
import { getMessagesCount } from 'app/store/slices/ChatSlice/ChatSlice';

const CHANEL_ID = 'aimchat';

const useNotifications = () => {
  const isAuth = useTypedSelector(state => state.auth.isAuth);
  const { currentCompanion, unreadCount } = useTypedSelector(
    state => state.chat,
  );
  const dispatch = useAppDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const [messageReceived, setMessageReceived] =
    useState<FirebaseMessagingTypes.RemoteMessage | null>(null);

  useEffect(() => {
    if (messageReceived) {
      const message = messageReceived;
      setMessageReceived(null);
      if (
        message?.data?.type === 'event.message.received' &&
        message?.data?.sender === currentCompanion
      ) {
        return;
      } else if (!unreadCount) {
        dispatch(getMessagesCount());
      }
      notifee.displayNotification({
        title: message.notification?.title,
        body: message.data?.message,
        android: {
          channelId: CHANEL_ID,
          smallIcon: 'ic_stat_notification_icon',
        },
      });
    }
  }, [messageReceived, currentCompanion, unreadCount]);

  const requestPermission = async () => {
    const permissionStatus = await messaging().requestPermission();
    const enabled =
      permissionStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      permissionStatus === messaging.AuthorizationStatus.PROVISIONAL;

    setIsEnabled(enabled);
  };

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (isEnabled) {
      checkFCMToken().then(() => {
        notifee.createChannel({
          id: CHANEL_ID,
          name: 'Aimchat',
          importance: AndroidImportance.HIGH,
        });
      });

      const unsubscribe = messaging().onMessage(setMessageReceived);
      messaging().setBackgroundMessageHandler(async message => {
        setMessageReceived(message);
      });

      return unsubscribe;
    }
  }, [isEnabled]);

  useEffect(() => {
    if (isAuth) {
      getSecureStorageItem(FCM_TOKEN).then(token => {
        if (token) {
          NotificationsService.sendFcmToken(token).catch(err =>
            console.log(err),
          );
        } else {
          checkFCMToken();
        }
      });

      messaging().onTokenRefresh(token => {
        setSecureStorageItem(FCM_TOKEN, token);
        NotificationsService.sendFcmToken(token).catch(err => console.log(err));
      });
    }
  }, [isAuth]);
};

export default useNotifications;
