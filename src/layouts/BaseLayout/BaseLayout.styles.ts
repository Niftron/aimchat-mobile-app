import { dimensions, UIColors } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: dimensions.width,
  },
  error: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,

    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UIColors.errorRed,
  },
  errorText: {
    ...montserratFontRegular500,

    maxWidth: 250,

    fontSize: 16,
    lineHeight: 18,
    color: UIColors.white,
    textAlign: 'center',
  },
  loadingContainer: {
    backgroundColor: UIColors.fadedBlack,
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
