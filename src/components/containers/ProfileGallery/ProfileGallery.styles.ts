import { UIColors } from 'app/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  gallery: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  galleryImage: {
    height: 130,

    borderWidth: 1,
    borderColor: UIColors.white,
  },
  galleryImageHorizontal: {
    width: 170,
  },
  galleryImageVertical: {
    width: 90,
  },
});
