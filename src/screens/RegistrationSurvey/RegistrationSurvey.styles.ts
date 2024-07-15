import { UIColors } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40,

    backgroundColor: UIColors.lightGray,
  },
  inner: {
    flexGrow: 1,
  },
  registrationNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    maxWidth: 136,
  },
  buttonSelect: {
    height: 100,
    width: 100,
  },
  buttonSelectNotSure: {
    width: 220,
    alignSelf: 'center',
  },
  genderText: {
    ...montserratFontRegular500,
    fontSize: 12,
    color: UIColors.black,
    letterSpacing: 2,
  },
  genderTextSelected: {
    color: UIColors.white,
  },
  genderIcon: {
    marginBottom: 5,
  },
  buttonText: {
    ...montserratFontRegular500,

    fontSize: 16,
  },
  title: {
    marginBottom: 24,
  },
  input: {
    ...montserratFontRegular500,

    marginBottom: 24,

    fontSize: 16,
    color: UIColors.black,
  },
  nameInput: {
    width: '45%',
    borderRadius: 6,
    backgroundColor: UIColors.white,
    borderWidth: 0,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
});
