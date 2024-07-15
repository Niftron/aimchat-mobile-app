import { StyleSheet } from 'react-native';

import { montserratFontRegular300, montserratFontRegular500 } from 'app/styles';
import { UIColors, Values } from 'app/constants';
import { darkText, placeholderText } from 'app/constants/UIColors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Values.horizontalPadding,
  },
  backButtonWrapper: {
    paddingHorizontal: Values.horizontalPadding,
    paddingVertical: 8,
  },
  header: {
    marginBottom: 10,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteAccountButton: {
    position: 'absolute',
    right: 16,
    bottom: 0,

    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: 16,

    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButtonText: {
    ...montserratFontRegular500,

    marginRight: 10,

    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 2,
    color: UIColors.black,
  },
  input: {
    marginBottom: 30,
  },
  label: {
    ...montserratFontRegular500,
    marginBottom: 8,

    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 1,
    color: UIColors.black,
  },
  galleryDescription: {
    ...montserratFontRegular300,

    marginBottom: 24,

    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 1,
  },
  genderSelectionWrapper: {
    marginBottom: 30,
  },
  genderSelectionContainer: {
    backgroundColor: UIColors.white,
    borderColor: UIColors.gray,
    borderWidth: 1,
    borderRadius: 6,
  },
  genderSelectionDropdown: {
    backgroundColor: UIColors.white,
    borderColor: UIColors.gray,
    borderWidth: 1,
    borderRadius: 6,
  },
  genderSelectionText: {
    ...montserratFontRegular500,
    fontSize: 14,
    letterSpacing: 2,
    color: UIColors.black,
  },
  genderSelectionPlaceholder: {
    color: UIColors.placeholderText,
  },
  genderButtonFirst: {
    borderRightWidth: 0.5,
    borderRightColor: UIColors.gray,
  },
  genderButton: {
    flexGrow: 1,
    padding: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonActive: {
    backgroundColor: UIColors.white,
  },
  genderButtonTextActive: {
    color: UIColors.turquoise,
  },
  genderButtonText: {
    ...montserratFontRegular500,

    fontSize: 19,
    lineHeight: 23,
    textTransform: 'capitalize',
    color: UIColors.gray,
  },
  textArea: {
    ...montserratFontRegular500,

    height: 100,
    padding: 10,

    fontSize: 16,
    lineHeight: 19,
    color: UIColors.black,
    textAlignVertical: 'top',

    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: UIColors.gray,
    backgroundColor: UIColors.white,
  },
  termsPrivacyWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',

    marginTop: 10,
    marginBottom: 10,
  },
  termsPrivacyText: {
    ...montserratFontRegular300,

    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 1,
    color: UIColors.darkText,
  },
  error: {
    paddingTop: 5,
    ...montserratFontRegular500,
    color: UIColors.red,
    fontSize: 11,
  },
  visibilityToggle: {
    width: 60,
  },
});
