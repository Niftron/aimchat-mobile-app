import { UIColors, Values } from 'app/constants';
import { montserratFontBold600, montserratFontRegular300 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UIColors.lightGray,
  },
  inner: {
    paddingVertical: 24,
    marginBottom: 24,
    paddingHorizontal: Values.horizontalPadding,
  },
  scrollView: {
    marginBottom: 24,
  },
  title: {
    ...montserratFontBold600,

    marginBottom: 24,

    textAlign: 'center',
    fontSize: 32,
    color: UIColors.black,
  },
  text: {
    ...montserratFontRegular300,

    color: UIColors.black,
    fontSize: 14,
  },
});
