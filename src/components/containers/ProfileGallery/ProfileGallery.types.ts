import { StyleProp, ViewStyle } from 'react-native';
import { ResourceType } from 'app/services/types';

export type ProfileGalleryProps = {
  data: ResourceType[];
  containerStyles?: StyleProp<ViewStyle>;
};
