import { UIColors, Values } from 'app/constants';
import { montserratFontBold600 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.lightGray,
    paddingHorizontal: Values.horizontalPadding,
    alignItems: 'center',
    paddingTop: 100,
  },
  noConnectionWrapper: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noConnectionText: {
    marginTop: 100,
    ...montserratFontBold600,
    color: UIColors.mediumBlue,
    textAlign: 'center',
  },
});
