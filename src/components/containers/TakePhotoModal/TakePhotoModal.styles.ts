import { StyleSheet } from 'react-native';

import { UIColors } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';

export const styles = StyleSheet.create({
  bottomModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomModalButton: {
    padding: 10,
    marginBottom: 16,
  },
  bottomModalButtonText: {
    ...montserratFontRegular500,

    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 1,

    color: UIColors.turquoise,
  },
});
