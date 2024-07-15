import { dimensions, UIColors } from 'app/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: UIColors.black,
  },
  image: {
    width: dimensions.width,
    height: 'auto',
  },
});
