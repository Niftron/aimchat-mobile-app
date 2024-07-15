import { UIColors } from 'app/constants';
import { StyleSheet, TextStyle } from 'react-native';
import { brandBlue } from 'app/constants/UIColors';

// buttons
export const faceBookButtonColors = {
  color: UIColors.facebookBlue,
  titleColor: UIColors.white,
};

export const whiteButtonColors = {
  color: UIColors.white,
  titleColor: UIColors.black,
};

export const blueButtonColors = {
  color: UIColors.turquoise,
  titleColor: UIColors.white,
};
export const grayButtonColors = {
  color: UIColors.grayBC,
  titleColor: UIColors.gray,
};

export const mainButtonColors = {
  color: UIColors.brandBlue,
  titleColor: UIColors.white,
};

// fonts
export const montserratFontBold600: object & TextStyle = {
  fontFamily: 'Montserrat-SemiBold',
  fontWeight: '600',
};

export const montserratFontRegular500: object & TextStyle = {
  fontFamily: 'Montserrat-Regular',
  fontWeight: '500',
};

export const montserratFontRegular300: object & TextStyle = {
  fontFamily: 'Montserrat-Regular',
  fontWeight: '300',
};

export const merriweatherFontRegular400: object & TextStyle = {
  fontFamily: 'Merriweather-Regular',
  fontWeight: '400',
};
export const globalStyles = StyleSheet.create({
  spacingTextTitle: {
    ...montserratFontBold600,

    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 1,
    textAlign: 'center',
    color: UIColors.black,
  },
  spacingTextDescription: {
    ...montserratFontRegular500,

    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 1,
    textAlign: 'center',
    color: UIColors.gray,
  },
});
