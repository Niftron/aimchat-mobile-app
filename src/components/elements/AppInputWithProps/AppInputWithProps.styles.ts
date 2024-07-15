import { UIColors } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  label: {
    ...montserratFontRegular500,

    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 1,
    color: UIColors.black,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    ...montserratFontRegular500,
    flex: 1,
    height: 42,
    paddingVertical: 8,

    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 1,
    color: UIColors.black,

    borderBottomWidth: 1,
    borderBottomColor: UIColors.gray,
  },
  inputButton: {
    padding: 4,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: UIColors.gray,
    borderRadius: 8,
  },
  inputButtonActive: {
    backgroundColor: UIColors.gray,
  },
  inputButtonLabel: {
    ...montserratFontRegular500,

    fontSize: 11,
    lineHeight: 12,
    color: UIColors.gray,
  },
  inputButtonLabelActive: {
    color: UIColors.white,
  },
  error: {
    paddingTop: 5,
    ...montserratFontRegular500,
    color: UIColors.red,
    fontSize: 11,
  },
});
