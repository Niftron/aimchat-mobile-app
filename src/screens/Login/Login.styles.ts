import { UIColors, Values } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Values.horizontalPadding,
    paddingBottom: 24,
    backgroundColor: UIColors.lightGray,
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputWrapper: {
    height: 167,
    overflow: 'visible',
  },
  title: {
    ...montserratFontRegular500,

    marginBottom: 24,

    color: UIColors.gray,
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
  },
  codeButton: {
    height: 46,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: UIColors.turquoise,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    ...montserratFontRegular500,
    paddingLeft: 20,

    textAlign: 'center',
    fontSize: 16,
    color: UIColors.turquoise,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  buttonWrapper: {
    marginBottom: 24,
  },
});
