import React, { FC, useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import { UIColors } from 'app/constants';
import { styles } from './FullPhotoList.styles';
import { FullPhotoListProps } from './FullPhotoList.types';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { ResourceType } from 'app/services/types';
import { FastImageComponent } from 'elements/FastImageComponent';

const FullPhotoListScreen: FC<FullPhotoListProps> = ({
  route: {
    params: { currentIndex, data },
  },
}) => {
  const listRef = useRef<FlatList>(null);

  const renderPhoto = useCallback(
    ({ item, index }: { item: ResourceType; index: number }) => {
      return item?.path ? (
        <FastImageComponent
          style={styles.image}
          key={index}
          source={item.path}
          resizeMode="contain"
        />
      ) : null;
    },
    [],
  );

  return (
    <BaseLayout showBottomSafeArea bottomSafeAreaColor={UIColors.black}>
      <FlatList
        initialScrollIndex={currentIndex}
        initialNumToRender={data.length}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          listRef.current?.scrollToOffset({
            offset: index * averageItemLength,
            animated: false,
          });
        }}
        ref={listRef}
        style={styles.container}
        data={data}
        renderItem={renderPhoto}
        horizontal
        pagingEnabled={true}
      />
    </BaseLayout>
  );
};

export default FullPhotoListScreen;
