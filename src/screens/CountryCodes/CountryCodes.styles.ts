import { UIColors } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 50,
    paddingTop: 30,
  },
  filter: {
    marginBottom: 24,
  },
  row: {
    height: 40,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 1,
    borderColor: UIColors.gray,
    borderRadius: 8,
  },
  rowSelect: {
    borderColor: UIColors.turquoise,
  },
  rowText: {
    ...montserratFontRegular500,

    fontSize: 14,
    color: UIColors.black,
  },
});
