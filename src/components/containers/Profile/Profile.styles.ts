import { dimensions, UIColors } from 'app/constants';
import { montserratFontRegular300, montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: dimensions.width,
    backgroundColor: UIColors.deepBlue,
  },
  header: {
    marginBottom: 24,
  },
  headerAvatar: {
    width: dimensions.width,
    height: 237,

    resizeMode: 'cover',
  },
  headerEditButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 99,
  },
  headerTextWrapper: {
    backgroundColor: UIColors.fadedBlack,
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 34,
    paddingBottom: 22,
    paddingTop: 10,
    left: 0,
    bottom: 0,
  },
  headerTitle: {
    ...montserratFontRegular500,

    marginBottom: 8,

    fontSize: 22,
    lineHeight: 30,
    letterSpacing: 2,

    color: UIColors.white,
  },
  headerSubtitle: {
    ...montserratFontRegular300,

    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 2,

    color: UIColors.white,
  },
  contentWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  quoteTitle: {
    ...montserratFontRegular500,

    marginBottom: 8,

    fontSize: 17,
    lineHeight: 20,
    letterSpacing: 2,
    color: UIColors.turquoise,
  },
  quoteText: {
    ...montserratFontRegular500,

    marginBottom: 24,

    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 2,
    color: UIColors.white,
  },
  textRow: {
    marginBottom: 24,
  },
  textRowTitle: {
    ...montserratFontRegular300,

    marginBottom: 8,

    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 2,
    color: UIColors.turquoise,
  },
  rowText: {
    ...montserratFontRegular500,

    fontSize: 15,
    lineHeight: 18,
    letterSpacing: 2,
    color: UIColors.white,
  },
  loadMore: {
    alignSelf: 'flex-end',
    marginTop: 7,

    fontStyle: 'italic',
  },
  visuallyHidden: {
    position: 'absolute',
    zIndex: -999,
    opacity: 0,
  },
});
