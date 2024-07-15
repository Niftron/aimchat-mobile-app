import { UIColors } from 'app/constants';
import { montserratFontBold600, montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';
import { darkText } from 'app/constants/UIColors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: UIColors.deepBlue,
    opacity: 0.8,
  },
  modal: {
    minWidth: 260,
    marginHorizontal: 16,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
    alignSelf: 'center',

    borderRadius: 14,
    backgroundColor: UIColors.grayBC,
  },

  title: {
    ...montserratFontBold600,

    marginBottom: 18,

    fontSize: 16,
    lineHeight: 18,
    color: UIColors.darkText,
    textAlign: 'center',
  },
  message: {
    ...montserratFontBold600,

    marginBottom: 12,

    fontSize: 14,
    lineHeight: 17,
    color: UIColors.darkText,
    textAlign: 'center',
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonWrapper: {
    marginHorizontal: 15,
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 32,
    alignSelf: 'center',
  },
  cancelButton: {
    borderRadius: 12,
    backgroundColor: UIColors.brandBlue,
  },
  modalButtonText: {
    ...montserratFontBold600,
    fontSize: 15,
    lineHeight: 17,
    color: UIColors.turquoise,
  },
  cancelButtonText: {
    color: UIColors.white,
  },
});
