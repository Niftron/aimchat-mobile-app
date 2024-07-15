import React, { FC, useEffect, useRef, useState, useCallback } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
  LogBox,
  Alert,
} from 'react-native';

import { UserProfileType } from 'app/types';
import { Profile } from 'components/Profile';
import { UsersProfilesProps } from './UsersProfiles.types';
import { AppButton } from 'elements/AppButton';
import { mainButtonColors } from 'app/styles';
import { i18n } from 'app/i18n';
import { BackArrowIcon, CrossIcon } from 'app/assets/SVG';
import { dimensions, UIColors } from 'app/constants';
import { styles } from './UsersProfiles.styles';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { Separator } from 'elements/Separator';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { ChatService } from 'app/services/ChatService';
import { MessageModal } from 'components/MessageModal';
import { InfoModal } from 'components/InfoModal';
import { setBlockStatus } from 'app/store/slices/AuthSlice/AuthSlice';
import { ResourceService } from 'app/services/ResourceService';
import { ResourceType } from 'app/services/types';
import { getUsersAround } from 'app/store/slices/GeolocationSlice/GeolocationSlice';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const UsersProfilesScreen: FC<UsersProfilesProps> = ({
  navigation,
  route: {
    params: { profiles, currentIndex },
  },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [statusModalContent, setStatusModalContent] = useState({
    title: i18n.usersProfilesScreen.statusModal.title,
    message: i18n.usersProfilesScreen.statusModal.messageBySender,
  });
  const [slideIndex, setSlideIndex] = useState(currentIndex ?? 0);
  const [galleries, setGalleries] = useState<{
    [key: number]: { gallery?: ResourceType[]; loading?: boolean };
  }>({});

  const { coords } = useTypedSelector(state => state.geolocation);
  const userProfile = useTypedSelector(state => state.auth.user.profile);

  const dispatch = useAppDispatch();
  const listRef = useRef<ScrollView>(null);

  const renderProfile = (profile: UserProfileType, index: number) => {
    return (
      <View key={`userProfile-${profile.user}`}>
        <Profile
          profile={profile}
          gallery={galleries[index]?.gallery}
          galleryLoading={galleries[index]?.loading}
          BottomButton={() => (
            <>
              {!profile.banned_by_me ? (
                <AppButton
                  containerStyles={styles.messageMeBtn}
                  title={i18n.general.messageMe}
                  onPress={onMessageMePress}
                  {...mainButtonColors}
                />
              ) : null}
              <AppButton
                containerStyles={styles.blockMeBtn}
                title={
                  profile.banned_by_me
                    ? i18n.general.unblockMe
                    : i18n.general.blockMe
                }
                onPress={showBlockModal}
                {...mainButtonColors}
              />
            </>
          )}
        />
      </View>
    );
  };

  const showBlockModal = useCallback(() => {
    setBlockModalVisible(true);
  }, []);

  const onMessageMePress = async () => {
    const conversationProfile: UserProfileType = profiles[slideIndex];
    const receiverID = conversationProfile.user;
    const {
      data: {
        response: { Conversation },
      },
    } = await ChatService.checkRequestFromUser(receiverID);
    if (!Conversation?.status) {
      //MAKE NEW REQUEST
      setMessageModalVisible(!messageModalVisible);
    } else if (Conversation?.status === 1) {
      //ALREADY GOT REQUEST
      if (userProfile.user === Conversation.sender) {
        setStatusModalContent({
          title: i18n.usersProfilesScreen.statusModal.title,
          message: i18n.usersProfilesScreen.statusModal.messageBySender,
        });
      } else {
        setStatusModalContent({
          title: i18n.usersProfilesScreen.statusModal.title,
          message: i18n.usersProfilesScreen.statusModal.messageByReceiver,
        });
      }
      setStatusModalVisible(true);
    } else if (Conversation?.status === 2) {
      //FRIENDS
      navigation.navigate('tabs', {
        screen: 'chat',
        params: {
          screen: 'chatRoom',
          params: {
            conversationProfile,
          },
        },
      });
    } else if (Conversation?.status === 64) {
      //Banned
      setStatusModalContent({
        title: i18n.usersProfilesScreen.statusModal.titleError,
        message: i18n.usersProfilesScreen.statusModal.ignored,
      });
      setStatusModalVisible(true);
    } else {
      //Rejected or something close
      setStatusModalContent({
        title: i18n.usersProfilesScreen.statusModal.titleError,
        message: i18n.usersProfilesScreen.statusModal.rejected,
      });
      setStatusModalVisible(true);
    }
  };

  const blockUserFromProfile = async () => {
    setBlockModalVisible(false);
    setIsLoading(true);
    const receiver = profiles[slideIndex].user;
    const status = profiles[slideIndex].banned_by_me ? 'disable' : 'enable';
    await dispatch(setBlockStatus({ receiver, status }));
    await dispatch(getUsersAround());
    setIsLoading(false);
    navigation.goBack();
  };

  const onMessageSendPress = (message: string) => {
    setMessageModalVisible(false);
    const receiverID = profiles[slideIndex].user;
    ChatService.sendChatRequest({
      receiverID,
      message,
      lat: coords.latitude,
      lng: coords.longitude,
    });
  };

  const onRightArrowPress = () => {
    if (slideIndex < profiles.length - 1) {
      listRef.current?.scrollTo({
        x: (slideIndex + 1) * dimensions.width,
        animated: true,
      });
      setSlideIndex(slideIndex + 1);
    }
  };

  const onLeftArrowPress = () => {
    if (slideIndex > 0) {
      listRef.current?.scrollTo({
        x: (slideIndex - 1) * dimensions.width,
        animated: true,
      });
      setSlideIndex(slideIndex - 1);
    }
  };

  const onHandleScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    setSlideIndex(Math.round(nativeEvent.contentOffset.x / dimensions.width));
  };

  useEffect(() => {
    if (currentIndex) {
      setTimeout(() => {
        listRef.current?.scrollTo({
          x: currentIndex * dimensions.width,
          animated: false,
        });
      }, 200);
    }
  }, [currentIndex, dispatch]);

  useEffect(() => {
    if (slideIndex?.toString() && !galleries[slideIndex]) {
      ResourceService.getGalleryByUser({
        userId: profiles[slideIndex].user,
      })
        .then(res => {
          const newGalleries = {
            ...galleries,
            [slideIndex]: {
              gallery: res?.data?.response['Resource[]'],
              loading: false,
            },
          };
          setGalleries(newGalleries);
        })
        .finally(() =>
          setGalleries(prev => {
            const newGalleries = {
              ...galleries,
              [slideIndex]: {
                ...prev[slideIndex],
                loading: false,
              },
            };

            return newGalleries;
          }),
        );
    }
  }, [slideIndex, galleries, profiles]);

  return (
    <BaseLayout
      showTopSafeArea
      showBottomSafeArea
      topSafeAreaColor={UIColors.deepBlue}
      isLoading={isLoading}
      bottomSafeAreaColor={UIColors.deepBlue}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={styles.headerButton}>
          <CrossIcon color={UIColors.white} />
        </TouchableOpacity>
        {profiles.length > 1 ? (
          <TouchableOpacity
            onPress={onLeftArrowPress}
            disabled={!(slideIndex > 0)}
            style={[styles.headerButton]}>
            <BackArrowIcon
              color={slideIndex > 0 ? UIColors.white : UIColors.gray}
            />
          </TouchableOpacity>
        ) : null}
        {profiles.length > 1 ? (
          <TouchableOpacity
            onPress={onRightArrowPress}
            disabled={!(slideIndex < profiles.length - 1)}
            style={[styles.headerButton, styles.headerButtonRight]}>
            <BackArrowIcon
              color={
                slideIndex < profiles.length - 1
                  ? UIColors.white
                  : UIColors.gray
              }
            />
          </TouchableOpacity>
        ) : null}
        <Separator flex />
        {/*<AppButton*/}
        {/*  containerStyles={styles.headerMessageButton}*/}
        {/*  onPress={onMessageMePress}*/}
        {/*  title={i18n.general.messageMe}*/}
        {/*  {...mainButtonColors}*/}
        {/*/>*/}
      </View>
      <ScrollView
        ref={listRef}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onHandleScroll}
        horizontal={true}
        pagingEnabled={true}>
        {profiles.map(renderProfile)}
      </ScrollView>

      <MessageModal
        visible={messageModalVisible}
        onSendPress={onMessageSendPress}
        onRequestClose={() => setMessageModalVisible(false)}
      />
      <InfoModal
        visible={statusModalVisible}
        onRequestClose={() => setStatusModalVisible(false)}
        title={statusModalContent.title}
        message={statusModalContent.message}
      />
      <InfoModal
        visible={blockModalVisible}
        onActionButtonPress={blockUserFromProfile}
        onRequestClose={() => setBlockModalVisible(false)}
        message={
          profiles[slideIndex].banned_by_me
            ? i18n.usersProfilesScreen.unblockModal.message
            : i18n.usersProfilesScreen.blockModal.message
        }
        actionButtonTitle={
          profiles[slideIndex].banned_by_me
            ? i18n.usersProfilesScreen.unblockModal.buttonTitle
            : i18n.usersProfilesScreen.blockModal.buttonTitle
        }
        actionTitleColor={UIColors.errorRed}
      />
    </BaseLayout>
  );
};

export default UsersProfilesScreen;
