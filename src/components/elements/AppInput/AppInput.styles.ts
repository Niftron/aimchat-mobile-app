import { StyleSheet } from 'react-native';
import { UIColors, Values } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';

export const styles = StyleSheet.create({
  input: {
    ...montserratFontRegular500,

    maxHeight: 48,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: Values.horizontalPadding,

    color: UIColors.black,
    fontSize: 16,

    borderWidth: 1,
    borderColor: UIColors.gray,
    borderRadius: 8,
  },
  inputFocus: {
    borderColor: UIColors.turquoise,
  },
  inputError: {
    borderColor: UIColors.red,
  },
});
