import { Asset } from 'react-native-image-picker';

export type TakePhotoModalProps = {
  ref: any;
  onChange: (asset: Asset) => void;
};

export type TakePhotoModalRef = {
  close(): void;
  open(): void;
};
