import { UIColors } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  input: {
    position: 'absolute',
    zIndex: -999,
    width: 0,
    height: 0,
  },
  cell: {
    ...montserratFontRegular500,

    width: 40,
    height: 50,
    marginHorizontal: 5,
    paddingTop: 6,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: UIColors.gray,

    fontSize: 27,
    color: UIColors.black,
    textAlign: 'center',
  },
  cellActive: {
    borderColor: UIColors.turquoise,
  },
  cellError: {
    borderColor: UIColors.red,
  },
});
