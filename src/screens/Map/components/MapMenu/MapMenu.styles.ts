import { UIColors, dimensions } from 'app/constants';
import { montserratFontBold600, montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: dimensions.height,

    zIndex: 99,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 99,
  },
  button: {
    position: 'absolute',
    top: 54,
    right: 32,

    width: 42,
    height: 42,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 50,
    backgroundColor: UIColors.white,
  },
  menu: {
    position: 'absolute',
    top: 54,
    right: 32,
    left: 32,

    flexDirection: 'column',
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 32,

    borderRadius: 24,
    backgroundColor: UIColors.white,
  },
  menuTitle: {
    ...montserratFontBold600,

    marginBottom: 16,

    fontSize: 24,
    lineHeight: 28,
    color: UIColors.black,
  },
  menuSubtitle: {
    ...montserratFontRegular500,

    marginBottom: 8,

    fontSize: 14,
    lineHeight: 22,
    color: UIColors.gray,
  },
  feetsLabelText: {
    ...montserratFontBold600,

    fontSize: 14,
    lineHeight: 18,
    color: UIColors.black,
  },
  feets: {
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',

    alignSelf: 'center',

    borderRadius: 12,
    backgroundColor: UIColors.grayBC,
  },
});
