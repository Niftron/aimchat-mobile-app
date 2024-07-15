import React, { useRef, useState } from 'react';

import { Profile } from 'components/Profile';
import { AppButton } from 'elements/AppButton';
import { mainButtonColors } from 'app/styles';
import { i18n } from 'app/i18n';
import { useAppNavigation } from 'app/navigation';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { TouchableOpacity } from 'react-native';
import { EditIcon } from 'app/assets/SVG';
import { UIColors } from 'app/constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TakePhotoModal } from 'components/TakePhotoModal';
import { TakePhotoModalRef } from 'components/TakePhotoModal/TakePhotoModal.types';
import { Asset } from 'react-native-image-picker';
import { updateUserAvatar } from 'app/store/slices/AuthSlice/AuthSlice';
import { BaseLayout } from 'app/layouts/BaseLayout';

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const { gallery, profile } = useTypedSelector(state => state.auth.user);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();

  const bottomModalRef = useRef<TakePhotoModalRef>(null);

  const onEditProfilePress = () => {
    navigation.navigate('editProfile');
  };

  const onEditAvatarPress = () => {
    bottomModalRef.current?.open();
  };

  const onAvatarChange = (asset: Asset) => {
    setLoading(true);
    dispatch(updateUserAvatar(asset)).finally(() => setLoading(false));
  };

  return (
    <BaseLayout showTopSafeArea={false} isLoading={loading}>
      <Profile
        profile={profile}
        gallery={gallery}
        galleryLoading={false}
        BottomButton={() => (
          <AppButton
            title={i18n.profileScreen.editProfile}
            onPress={onEditProfilePress}
            {...mainButtonColors}
          />
        )}
        EditAvatarButton={() => (
          <SafeAreaView>
            <TouchableOpacity onPress={onEditAvatarPress}>
              <EditIcon width={30} height={30} color={UIColors.gray} />
            </TouchableOpacity>
          </SafeAreaView>
        )}
      />
      <TakePhotoModal ref={bottomModalRef} onChange={onAvatarChange} />
    </BaseLayout>
  );
};

export default ProfileScreen;
