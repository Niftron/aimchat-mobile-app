import { UIColors } from 'app/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingRight: 12,

    backgroundColor: UIColors.deepBlue,
  },
  headerButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonRight: {
    transform: [{ rotate: '180deg' }],
  },
  disabledArrow: {},
  headerMessageButton: {
    maxWidth: 150,
    minHeight: 35,
    height: 35,
  },
  messageMeBtn: {
    marginBottom: 10,
  },
  blockMeBtn: {
    backgroundColor: UIColors.red,
  },
});
