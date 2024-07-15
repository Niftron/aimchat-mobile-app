import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { getSecureStorageItem, setSecureStorageItem } from './secureStorage';
import { FCM_TOKEN } from 'app/constants';

export const phoneMask = (v: string | undefined) => {
  if (v === undefined) {
    return;
  }

  v = v.slice(0, 11);

  let r = v.replace(/\D/g, '');

  if (r.length > 9) {
    // 10+ digits. Format as 5+4.
    r = r.replace(/^(\d{0,3})(\d{3})(\d{4}).*/, '$1-$2-$3');
  } else if (r.length > 5) {
    // 6..10 digits. Format as 4+4
    r = r.replace(/^(\d{0,3})(\d{3})(\d{0,4}).*/, '$1-$2-$3');
  } else if (r.length > 2) {
    // 3..5 digits. Add (0XX..)
    r = r.replace(/^(\d{0,3})(\d{0,3})/, '$1-$2');
  } else {
    // 0..2 digits. Just add (0XX
    r = r.replace(/^(\d*)/, '$1');
  }
  return r.replace(/-$/, '');
};

export const checkFCMToken = async () => {
  const fcmToken = await messaging().getToken();

  const existToken = await getSecureStorageItem(FCM_TOKEN);

  if (fcmToken && existToken !== fcmToken) {
    setSecureStorageItem(FCM_TOKEN, fcmToken);
  }
};

export const metersToLatitudes = (m: number) => {
  const RADIUS_DIVIDER = Platform.OS === 'ios' ? 12 : 10;

  return ((m / RADIUS_DIVIDER) * 0.01) / 110.574;
};

export const isEmail = (email: string) => {
  const pattern = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(email);
};

export const getInitials = (name: string): string => {
  if (!name) {
    return '';
  }
  const fullName = name.split(' ');
  let result = fullName[0].charAt(0);
  if (fullName.length > 1) {
    result += fullName[1].charAt(0);
  }
  return result;
};
