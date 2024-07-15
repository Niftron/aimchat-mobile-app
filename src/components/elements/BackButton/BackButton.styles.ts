import { UIColors } from 'app/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 6,
    color: UIColors.turquoise,
    fontSize: 18,
    lineHeight: 20,
  },
});
