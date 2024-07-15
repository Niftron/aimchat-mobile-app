import { BaseLayout } from 'app/layouts/BaseLayout';
import { Profile } from 'components/Profile';
import React, { FC, useEffect, useState } from 'react';
import { FriendProfileScreenProps } from './FriendProfile.types';
import { ResourceService } from 'app/services/ResourceService';
import { ResourceType } from 'app/services/types';
import { BackButton } from 'elements/BackButton';
import { View } from 'react-native';
import { UIColors } from 'app/constants';
import { styles } from './/FriendProfile.styles';

const FriendProfileScreen: FC<FriendProfileScreenProps> = ({
  route: {
    params: { profile },
  },
}) => {
  const [gallery, setGallery] = useState<ResourceType[]>([]);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);

  useEffect(() => {
    setIsGalleryLoading(true);
    ResourceService.getGalleryByUser({ userId: profile.user })
      .then(res => setGallery(res.data.response['Resource[]']))
      .finally(() => setIsGalleryLoading(false));
  }, [profile.user]);
  return (
    <BaseLayout
      topSafeAreaColor={UIColors.deepBlue}
      bottomSafeAreaColor={UIColors.deepBlue}>
      <View style={styles.header}>
        <BackButton />
      </View>
      <Profile
        profile={profile}
        galleryLoading={isGalleryLoading}
        gallery={gallery}
      />
    </BaseLayout>
  );
};

export default FriendProfileScreen;
