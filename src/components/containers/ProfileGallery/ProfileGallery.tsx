import React, { FC, useCallback } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import * as constants from 'app/constants';
import { Separator } from 'elements/Separator';
import { useAppNavigation } from 'app/navigation';
import { styles } from './ProfileGallery.styles';
import { ProfileGalleryProps } from './ProfileGallery.types';
import { ResourceType } from 'app/services/types';
import { FastImageComponent } from 'elements/FastImageComponent';

const ProfileGallery: FC<ProfileGalleryProps> = ({ data, containerStyles }) => {
  const navigation = useAppNavigation();

  const renderImage = useCallback(
    ({ item, index }: { item: ResourceType; index: number }) => {
      const { width, height } = Image.resolveAssetSource(constants.profile);

      const isHorizontal = width > height;

      return item?.path ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('fullPhotoList', { data, currentIndex: index })
          }>
          <FastImageComponent
            style={[
              styles.galleryImage,
              isHorizontal
                ? styles.galleryImageHorizontal
                : styles.galleryImageVertical,
            ]}
            source={item.path}
          />
        </TouchableOpacity>
      ) : null;
    },
    [data, navigation],
  );
  return (
    <FlatList
      data={data}
      contentContainerStyle={[styles.gallery, containerStyles]}
      keyExtractor={item => item.path}
      renderItem={renderImage}
      ItemSeparatorComponent={() => <Separator width={10} />}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  );
};

export default ProfileGallery;
