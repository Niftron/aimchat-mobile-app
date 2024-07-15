import { dimensions, UIColors, Values } from 'app/constants';
import { montserratFontBold600 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: dimensions.width,
    height: dimensions.height,
    zIndex: -1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: Values.horizontalPadding,
  },
  logo: {
    marginTop: 50,
    justifyContent: 'center',
  },
  buttonsWrapper: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 12,
  },
  splashScreenTextWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    alignItems: 'center',
    justifyContent: 'center',
  },
  splashScreenTextInner: {
    width: 150,
    height: 150,
    alignItems: 'center',
    alignSelf: 'center',
  },
  splashScreenText: {
    fontSize: 18,
    textTransform: 'uppercase',
    color: UIColors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  registrationRules: {
    maxWidth: 250,
    alignSelf: 'center',
    paddingHorizontal: Values.horizontalPadding,
    justifyContent: 'center',
  },
  registrationRulesText: {
    ...montserratFontBold600,
    color: UIColors.white,
    fontSize: 12,
  },
  registrationRulesTextLink: {
    color: UIColors.turquoise,
  },
});
