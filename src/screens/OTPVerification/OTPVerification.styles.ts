import { UIColors, Values } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.lightGray,
    paddingHorizontal: Values.horizontalPadding,
  },
  inner: {
    flexGrow: 1,
    alignItems: 'center',
  },
  separator: {
    flex: 1,
    maxHeight: 69,
  },
  contentWrapper: {
    flex: 1,
    maxHeight: 280,
    justifyContent: 'space-between',
  },
  text: {
    ...montserratFontRegular500,

    maxWidth: 290,

    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 1,
    color: UIColors.gray,
    textAlign: 'center',
  },
  textUnderline: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
});
