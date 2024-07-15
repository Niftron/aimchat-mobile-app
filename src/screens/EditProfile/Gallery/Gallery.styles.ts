import { UIColors, dimensions } from 'app/constants';
import { montserratFontRegular500 } from 'app/styles';
import { StyleSheet } from 'react-native';

const IMAGE_SIZE = (dimensions.width - 80) / 3;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 16,
    backgroundColor: UIColors.white,

    borderWidth: 0.5,
    borderRadius: 6,
    borderColor: UIColors.gray,
  },
  imageWrapper: { alignItems: 'center' },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginBottom: 8,
  },
  imageDeleteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 99,

    alignItems: 'center',
    justifyContent: 'center',

    padding: 4,

    borderRadius: 50,
    backgroundColor: UIColors.white,
  },
  addImageButton: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginBottom: 8,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: UIColors.lightGray,
  },
  addIcon: {
    transform: [{ rotate: '45deg' }],
  },
  avatarLabel: {
    position: 'absolute',
    bottom: 12,
    zIndex: 99,

    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UIColors.white,
    borderRadius: 8,
  },
  avatarLabelText: {
    ...montserratFontRegular500,

    color: UIColors.darkText,
  },
});
