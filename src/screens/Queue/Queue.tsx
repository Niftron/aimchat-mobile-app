import React, { useCallback, useEffect } from 'react';
import {
  FlatList,
  LayoutAnimation,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { i18n } from 'app/i18n';
import { styles } from './Queue.styles';
import { useAppDispatch, useTypedSelector } from 'app/store';
import {
  acceptRequest,
  getFriends,
  getPendingRequest,
  rejectRequest,
} from 'app/store/slices/QueueSlice/QueueSlice';
import type { UserProfileType } from 'app/types';
import QueuePendingRequest from 'screens/Queue/QueuePendingRequest';
import { UIColors } from 'app/constants';
import { useFocusEffect } from '@react-navigation/native';
import { useAppNavigation } from 'app/navigation';
import QueueFriend from 'screens/Queue/QueueFriend';
import { getMessagesCount } from 'app/store/slices/ChatSlice/ChatSlice';

const QueueScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const { friends, pendingRequests, isLoading } = useTypedSelector(
    state => state.queue,
  );

  const updateData = useCallback(
    (isFullUpdate: boolean = false) => {
      if (isFullUpdate) {
        dispatch(getFriends());
        dispatch(getPendingRequest());
        dispatch(getMessagesCount());
      } else {
        dispatch(getPendingRequest());
      }
    },
    [dispatch],
  );

  useFocusEffect(
    useCallback(() => {
      updateData(true);
    }, [updateData]),
  );

  const openUserProfile = useCallback(
    (profile: UserProfileType) => {
      navigation.navigate('usersProfiles', {
        profiles: [profile],
        currentIndex: 0,
      });
    },
    [navigation],
  );

  const renderProfiles = useCallback(
    (profile: UserProfileType) => {
      return (
        <QueueFriend
          profile={profile}
          openUserProfile={openUserProfile}
          key={`queueProfile-${profile.user}`}
        />
      );
    },
    [openUserProfile],
  );

  const rejectUser = useCallback(
    async (profile: UserProfileType) => {
      await dispatch(rejectRequest(profile.user));
      updateData(false);
    },
    [dispatch, updateData],
  );

  const acceptUser = useCallback(
    async (profile: UserProfileType) => {
      await dispatch(acceptRequest(profile.user));
      updateData(true);
    },
    [dispatch, updateData],
  );

  const renderPending = useCallback(
    ({ item }: { item: UserProfileType }) => {
      return (
        <QueuePendingRequest
          item={item}
          openUserProfile={openUserProfile}
          rejectUser={rejectUser}
          acceptUser={acceptUser}
        />
      );
    },
    [rejectUser, acceptUser, openUserProfile],
  );

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [friends?.length, pendingRequests?.length]);

  return (
    <BaseLayout
      topSafeAreaColor={UIColors.lightGray}
      style={styles.screenWrapper}
      isLoading={isLoading}>
      {friends.length ? (
        <View style={styles.queueHeader}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.queueHeaderContainer}>
            {friends.map(renderProfiles)}
          </ScrollView>
        </View>
      ) : null}
      <View style={styles.queuePendingContainer}>
        {pendingRequests?.length ? (
          <>
            <View style={styles.queuePendingTitleContainer}>
              <Text style={styles.queuePendingTitleContainerText}>
                {i18n.queueScreen.requests}
              </Text>
              <View
                style={styles.queuePendingTitleContainerTextNumberContainer}>
                <Text style={styles.queuePendingTitleContainerTextNumber}>
                  {`${pendingRequests.length}`}
                </Text>
              </View>
            </View>
            <FlatList
              style={styles.queuePendingWrapper}
              data={pendingRequests}
              renderItem={renderPending}
              keyExtractor={item => `queueListItem-${item.user}`}
            />
          </>
        ) : (
          <View style={styles.queuePendingEmpty}>
            {!isLoading ? (
              <Text style={styles.queuePendingEmptyText}>
                {i18n.queueScreen.emptyRequests}
              </Text>
            ) : null}
          </View>
        )}
      </View>
    </BaseLayout>
  );
};

export default QueueScreen;
