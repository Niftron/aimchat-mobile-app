import { UIColors } from 'app/constants';
import { montserratFontRegular300, montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: UIColors.deepBlue,
    opacity: 0.8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modal: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    maxHeight: 288,
    marginHorizontal: 12,

    borderRadius: 15,
    backgroundColor: UIColors.grayBC,
  },
  modalTitle: {
    ...montserratFontRegular300,

    marginBottom: 12,

    fontSize: 17,
    lineHeight: 22,
    color: UIColors.black,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  textArea: {
    ...montserratFontRegular500,

    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,

    textAlignVertical: 'top',
    color: UIColors.gray,
    fontSize: 16,
    lineHeight: 18,

    borderWidth: 0.5,
    borderColor: UIColors.gray,
    backgroundColor: UIColors.white,
  },
  sendButton: {
    padding: 12,
    alignSelf: 'center',
  },
  sendButtonText: {
    ...montserratFontRegular500,

    fontSize: 17,
    lineHeight: 20,
    color: UIColors.turquoise,
  },
  sendButtonDisabled: {
    color: UIColors.gray,
  },
});
