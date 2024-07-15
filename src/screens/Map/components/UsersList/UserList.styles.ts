import { dimensions, UIColors } from 'app/constants';
import {
  merriweatherFontRegular400,
  montserratFontBold600,
  montserratFontRegular500,
} from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  list: {
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
  listContainer: {
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  listItemWrapper: {
    height: 212,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  listItem: {
    width: dimensions.width - 32,
    height: 182,
    paddingHorizontal: 16,
    paddingBottom: 8,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: UIColors.deepBlue,
    overflow: 'visible',
  },
  pin: {
    height: 160,
    width: 130,
    marginTop: -30,
  },
  inner: {
    flexDirection: 'row',
    overflow: 'visible',
  },
  textWrapper: {
    overflow: 'hidden',
    justifyContent: 'center',
    flex: 1,
  },
  titleText: {
    ...montserratFontBold600,

    fontSize: 22,
    lineHeight: 26,
    color: UIColors.white,
  },
  subtileText: {
    ...merriweatherFontRegular400,

    maxWidth: dimensions.width / 2,

    fontSize: 14,
    lineHeight: 17,
    color: UIColors.white,
  },
  lastSeenText: {
    ...montserratFontRegular500,

    position: 'absolute',
    top: 9,
    right: 16,

    fontSize: 10,
    lineHeight: 12,
    color: UIColors.white,
  },
});
