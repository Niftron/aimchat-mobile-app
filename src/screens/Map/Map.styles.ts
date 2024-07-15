import { statusBarHeight, UIColors } from 'app/constants';
import { Platform, StyleSheet } from 'react-native';
import { montserratFontBold600, montserratFontRegular500 } from 'app/styles';
import { deepBlue } from 'app/constants/UIColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circleArea: {
    ...StyleSheet.absoluteFillObject,

    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    transform: [{ translateY: statusBarHeight ?? 0 }],
  },
  userListWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  myLocationButton: {
    position: 'absolute',
    top: 54,
    left: 32,

    height: 44,
  },
  pin: {
    transform: [{ translateY: Platform.OS === 'ios' ? -30 : 70 }],
  },
  top: {
    zIndex: 99,
  },
  deniedPermissionWrapper: {
    backgroundColor: UIColors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deniedPermissionText: {
    color: UIColors.brandBlue,
    ...montserratFontRegular500,
    fontSize: 18,
    textAlign: 'center',
  },
  deniedPermissionButton: {
    marginTop: 20,
    backgroundColor: UIColors.brandBlue,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deniedPermissionButtonTitle: {
    ...montserratFontBold600,
    fontSize: 16,
  },
});
