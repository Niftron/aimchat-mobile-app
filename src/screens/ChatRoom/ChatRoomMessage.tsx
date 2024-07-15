import React, { useCallback, FC } from 'react';
import { Text, View } from 'react-native';
import { ChatSentStatusIcon, ChatDeliveredStatusIcon } from 'app/assets/SVG';
import { styles } from './ChatRoom.styles';
import { ChatRoomMessagePropsType } from 'screens/ChatRoom/ChatRoom.types';
import { formatDateTimeFromTimestamp } from 'app/utils/datetimeHelper';
import Hyperlink from 'react-native-hyperlink';
import { ImageFrame } from 'elements/ImageFrame';

const ChatRoomMessage: FC<ChatRoomMessagePropsType> = ({
  chatMessage,
  profile,
  isMyMessage,
}) => {
  const renderStatus = useCallback((rdate: string) => {
    return rdate ? <ChatDeliveredStatusIcon /> : <ChatSentStatusIcon />;
  }, []);

  return (
    <View
      style={[
        styles.chatMessageWrapper,
        isMyMessage ? styles.myMessageWrapper : null,
      ]}>
      {!isMyMessage ? (
        <ImageFrame
          style={[styles.chatMessageAvatar, styles.marginRight]}
          userName={profile.user_name}
          imagePath={profile?.avatar?.path}
          imageId={profile?.avatar?.sid}
        />
      ) : null}
      <View
        style={[styles.messageItem, isMyMessage ? styles.myMessageItem : null]}>
        <Hyperlink linkDefault={true} linkStyle={styles.hyperlink}>
          <Text
            style={[
              styles.messageText,
              isMyMessage ? styles.myMessageText : null,
            ]}>
            {chatMessage.message}
          </Text>
        </Hyperlink>
        <View style={styles.messageInfoContainer}>
          {isMyMessage ? renderStatus(chatMessage.rdate) : null}
          <Text
            style={[
              styles.messageInfoTime,
              isMyMessage ? styles.myMessageText : null,
            ]}>
            {formatDateTimeFromTimestamp(chatMessage.cdate).time}
          </Text>
        </View>
      </View>
      {isMyMessage ? (
        <ImageFrame
          style={[styles.chatMessageAvatar, styles.marginLeft]}
          userName={profile.user_name}
          imagePath={profile?.avatar?.path}
          imageId={profile?.avatar?.sid}
        />
      ) : null}
    </View>
  );
};

export default ChatRoomMessage;
