import { montserratFontBold600 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    minHeight: 48,
    maxHeight: 50,
    padding: 2,

    borderRadius: 15,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...montserratFontBold600,

    fontSize: 16,
    textTransform: 'capitalize',
  },
});
