import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, FlatList, LayoutAnimation, Text, View } from 'react-native';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { styles } from './Chat.styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AppNavigationProps } from 'app/navigation/Navigation.types';
import { ConversationProfileType, UserProfileType } from 'app/types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import messaging from '@react-native-firebase/messaging';
import {
  getChatRooms,
  getMessagesCount,
  deleteChat,
} from 'app/store/slices/ChatSlice/ChatSlice';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { i18n } from 'app/i18n';
import ChatListItem from 'screens/Chat/ChatListItem';

const ChatScreen = () => {
  const [currentOpenedSwipeable, setCurrentOpenedSwipeable] = useState<
    number | null
  >(null);
  const swipeableRows = useRef<Swipeable[]>([]);
  const navigation = useNavigation<AppNavigationProps>();
  const dispatch = useAppDispatch();
  const { chatRooms, isLoading } = useTypedSelector(state => state.chat);

  const onMessageNotification = useCallback(() => {
    dispatch(getChatRooms());
  }, [dispatch]);

  const closeAllSwipeable = useCallback(() => {
    if (swipeableRows?.current?.length) {
      for (let i = 0; i < swipeableRows.current.length; i++) {
        const row = swipeableRows.current[i];
        row.close();
      }
    }
  }, [swipeableRows]);

  const closeRowByIndex = useCallback(
    (index: number | null) => {
      if (index && swipeableRows?.current?.length) {
        const row = swipeableRows.current[index];
        if (row) {
          row.close();
        }
      }
    },
    [swipeableRows],
  );

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [chatRooms?.length]);

  useFocusEffect(
    useCallback(() => {
      dispatch(getChatRooms());
      dispatch(getMessagesCount());
      const unsubscribe = messaging().onMessage(onMessageNotification);
      return () => {
        unsubscribe();
        closeAllSwipeable();
      };
    }, [dispatch, onMessageNotification, closeAllSwipeable]),
  );

  const onChatListItemPressed = useCallback(
    (profile: UserProfileType) => {
      navigation.navigate('chatRoom', {
        conversationProfile: profile,
      });
    },
    [navigation],
  );

  const onDeleteChat = useCallback(
    (receiver: string, index: number) => {
      closeRowByIndex(index);
      Alert.alert(
        i18n.chatScreen.deleteConfirmation.title,
        i18n.chatScreen.deleteConfirmation.message,
        [
          {
            text: i18n.general.cancel,
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: i18n.general.confirm,
            onPress: async () => {
              await dispatch(deleteChat(receiver));
              dispatch(getChatRooms());
              dispatch(getMessagesCount());
            },
          },
        ],
      );
    },
    [dispatch, closeRowByIndex],
  );

  const setRef = useCallback(
    (_swipeable: Swipeable | null, index: number) => {
      if (_swipeable) {
        swipeableRows.current[index] = _swipeable;
      }
    },
    [swipeableRows],
  );

  const onSwipeableOpen = useCallback(
    (index: number) => {
      if (currentOpenedSwipeable !== index) {
        closeRowByIndex(currentOpenedSwipeable);
        setCurrentOpenedSwipeable(index);
      }
    },
    [closeRowByIndex, currentOpenedSwipeable],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: ConversationProfileType; index: number }) => {
      return (
        <ChatListItem
          setRef={setRef}
          profile={item.profile}
          unread={item.unread}
          onPress={onChatListItemPressed}
          onDeleteChat={onDeleteChat}
          index={index}
          onSwipeableOpen={onSwipeableOpen}
        />
      );
    },
    [onChatListItemPressed, onDeleteChat, onSwipeableOpen, setRef],
  );

  return (
    <BaseLayout isLoading={isLoading}>
      {chatRooms?.length ? (
        <FlatList
          data={chatRooms}
          renderItem={renderItem}
          keyExtractor={item => `chatListItem-${item.profile.user}`}
        />
      ) : (
        <View style={styles.emptyContainer}>
          {!isLoading ? (
            <Text style={styles.emptyContainerText}>
              {i18n.chatScreen.emptyRooms}
            </Text>
          ) : null}
        </View>
      )}
    </BaseLayout>
  );
};

export default ChatScreen;
