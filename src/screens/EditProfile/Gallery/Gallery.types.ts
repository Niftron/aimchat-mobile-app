import { ResourceType } from 'app/services/types';
import { Asset } from 'react-native-image-picker';

export type GalleryProps = {
  data: ResourceType[];
  onChange: (asset: Asset[]) => void;
  onDeleteImage: (ids: string[]) => void;
};
