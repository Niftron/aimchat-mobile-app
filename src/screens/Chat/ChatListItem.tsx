import React, { LegacyRef, MutableRefObject, useCallback } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { ImageFrame } from 'elements/ImageFrame';
import { styles } from './Chat.styles';
import { ChatListItemPropsType } from 'screens/Chat/Chat.types';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { DeleteIcon } from 'app/assets/SVG';
import { UIColors } from 'app/constants';

const ChatListItem = ({
  setRef,
  profile,
  onPress,
  unread,
  onDeleteChat,
  index,
  onSwipeableOpen,
}: ChatListItemPropsType) => {
  const onChatListItemPressed = useCallback(() => {
    onPress(profile);
  }, [profile, onPress]);

  const onDelete = useCallback(() => {
    onDeleteChat(profile.user, index);
  }, [onDeleteChat, profile, index]);

  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation<number>,
      _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
    ) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [71, 0],
      });

      return (
        <Animated.View
          style={[
            styles.deleteChatContainer,
            { transform: [{ translateX: trans }] },
          ]}>
          <TouchableOpacity style={styles.deleteChatButton} onPress={onDelete}>
            <DeleteIcon color={UIColors.white} />
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [onDelete],
  );

  const setChatRef = useCallback(
    (instance: Swipeable | null) => {
      setRef(instance, index);
    },
    [index, setRef],
  );

  const onOpen = useCallback(() => {
    onSwipeableOpen(index);
  }, [onSwipeableOpen, index]);

  return (
    <Swipeable
      ref={setChatRef}
      friction={2}
      renderRightActions={renderRightActions}
      onSwipeableOpen={onOpen}>
      <TouchableOpacity
        style={styles.chatListItem}
        onPress={onChatListItemPressed}>
        <ImageFrame
          style={styles.chatListItemAvatar}
          userName={profile.user_name}
          imagePath={profile?.avatar?.path}
          imageId={profile?.avatar?.sid}>
          {unread ? <View style={styles.chatListItemUnreadDot} /> : null}
        </ImageFrame>
        <View style={styles.chatListItemTextContainer}>
          <Text
            style={styles.chatListItemTitle}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {profile.user_name}
          </Text>
          <Text
            style={styles.chatListItemSubTitle}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {profile.job}
          </Text>
        </View>
        {/*{unread ? (*/}
        {/*  <View style={styles.chatListItemUnread}>*/}
        {/*    <Text style={styles.chatListItemUnreadText}>*/}
        {/*      {unread > 99 ? '99+' : `${unread}`}*/}
        {/*    </Text>*/}
        {/*  </View>*/}
        {/*) : null}*/}
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ChatListItem;
