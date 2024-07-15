import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Asset } from 'react-native-image-picker';
import BottomModal from 'react-native-raw-bottom-sheet';
import { v4 as uuidv4 } from 'uuid';

import { styles } from './Gallery.styles';
import { CrossIcon } from 'app/assets/SVG';
import { UIColors } from 'app/constants';
import { GalleryProps } from './Gallery.types';
import { ResourceType } from 'app/services/types';
import { i18n } from 'app/i18n';
import { useTypedSelector } from 'app/store';
import { TakePhotoModal } from 'components/TakePhotoModal';
import { FastImageComponent } from 'elements/FastImageComponent';

const Gallery: FC<GalleryProps> = ({ data, onChange, onDeleteImage }) => {
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<Asset[]>([]);

  const profile = useTypedSelector(state => state.auth.user.profile);
  const bottomModalRef = useRef<BottomModal>(null);

  const images = useMemo(() => {
    return data.filter(el => !deletedImages.includes(el.did));
  }, [data, deletedImages]);

  const renderImages = useCallback(
    (image: ResourceType) => {
      const onDeletePress = () => {
        setDeletedImages(prev => [...prev, image.did]);
      };
      return (
        <View style={styles.imageWrapper} key={image.did}>
          <TouchableOpacity
            style={styles.imageDeleteButton}
            onPress={onDeletePress}>
            <CrossIcon color={UIColors.gray} width={18} height={18} />
          </TouchableOpacity>

          <FastImageComponent style={styles.image} source={image.path} />

          {image?.did === profile?.avatar?.did && (
            <View style={styles.avatarLabel}>
              <Text style={styles.avatarLabelText}>
                {i18n.editProfileScreen.avatar}
              </Text>
            </View>
          )}
        </View>
      );
    },
    [profile?.avatar?.did],
  );

  const renderNewImages = useCallback((asset: Asset) => {
    const onDeletePress = () => {
      setNewImages(state => state.filter(el => el.id !== asset.id));
    };
    return (
      <View key={asset.id}>
        <TouchableOpacity
          style={styles.imageDeleteButton}
          onPress={onDeletePress}>
          <CrossIcon color={UIColors.gray} width={18} height={18} />
        </TouchableOpacity>

        <FastImageComponent style={styles.image} source={asset.uri} />
      </View>
    );
  }, []);

  const onNewImagePress = (asset: Asset) => {
    const id = uuidv4();

    setNewImages(prev => [...prev, { id, ...asset }]);
  };

  useEffect(() => {
    onChange(newImages);
  }, [newImages, onChange]);

  useEffect(() => {
    onDeleteImage(deletedImages);
  }, [deletedImages, onDeleteImage]);

  return (
    <>
      <View style={styles.container}>
        {newImages.map(renderNewImages)}
        {images.map(renderImages)}
        {images?.length + newImages?.length < 15 && (
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={() => bottomModalRef.current?.open()}>
            <CrossIcon style={styles.addIcon} color={UIColors.gray} />
          </TouchableOpacity>
        )}
        {(images.length + newImages.length) % 3 === 1 && (
          <View style={styles.image} />
        )}
      </View>

      <TakePhotoModal ref={bottomModalRef} onChange={onNewImagePress} />
    </>
  );
};

export default Gallery;
