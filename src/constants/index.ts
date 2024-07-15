import { Dimensions, StatusBar } from 'react-native';
import * as UIColors from './UIColors';
import * as Values from './Values';

const { width, height } = Dimensions.get('window');
export const statusBarHeight = StatusBar.currentHeight;

export const splashScreenBackground = require('../assets/images/splashscreen.jpg');
export const logo = require('../assets/images/logo.png');
export const defaultAvatar = require('../assets/images/default-avatar.png');
export const profileUri =
  'https://s3-alpha-sig.figma.com/img/9f58/19cd/5cf6fdef4532641cd7ef39c426207a6d?Expires=1681084800&Signature=Cgl4anuxXICqys1487MipPQSjL758PbRH44OVafOdPpz-sr8Nj1NCw933R-dUuHSSuEmLEPARwVubKS1EFIPEqevaUjJ40zqTY4zg-BoNI8s3L0MupTDmPPlS7fD7FbZN1Li2jrm0ZlThChCNgJPWHVto~dWXmgIEMNwNyPnVtzKOy7Ts7kaWnTLoJCpIU0ZDjLKZlpu-wRRUPoZo7cbrToAe4PovkYf2tXKKRi0vOW9cY3hfKONCxkHIE8Jr05oNMQuFOeg-CntHyXxGwBHiaMyd1ZLhe2awONSQQs~kGNK1Rtckl-XfYrmpXOgcShmIk1uRAIKJ~CMQygQauFJsg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';
export const profile = require('../assets/images/profile.png');
export const mapPinImage = require('../assets/images/map-pin.png');

//Storage
export const VISIBILITY_TOKEN = 'visibilityToken';

// notifications
export const FCM_TOKEN = 'fcmToken';

// PROD
export const ANDROID_PLATFORM = 'android';
export const IOS_PLATFORM = 'ios';

// DEV
// export const ANDROID_PLATFORM = 'AndroidTest';
// export const IOS_PLATFORM = 'IosTest';

export const dimensions = {
  width,
  height,
};

export { UIColors, Values };
