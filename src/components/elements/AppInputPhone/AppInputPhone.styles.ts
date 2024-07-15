import { UIColors, Values } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    height: 50,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: UIColors.gray,
  },
  containerActive: {
    borderColor: UIColors.turquoise,
  },
  code: {
    flex: 1,
    maxWidth: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeText: {
    color: UIColors.turquoise,
  },
  input: {
    ...montserratFontRegular500,

    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Values.horizontalPadding,

    borderLeftWidth: 0.3,
    borderLeftColor: UIColors.gray,
    color: UIColors.black,
    fontSize: 16,
  },
});
