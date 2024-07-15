import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from 'screens/Queue/Queue.styles';
import React, { useCallback } from 'react';
import { QueuePendingRequestPropsType } from 'screens/Queue/Queue.types';
import { UIColors } from 'app/constants';
import { ImageFrame } from 'elements/ImageFrame';
import { i18n } from 'app/i18n';

const QueuePendingRequest = ({
  item,
  rejectUser,
  acceptUser,
  openUserProfile,
}: QueuePendingRequestPropsType) => {
  const onProfilePress = useCallback(() => {
    openUserProfile(item);
  }, [item, openUserProfile]);

  const onRejectUser = useCallback(() => {
    rejectUser(item);
  }, [item, rejectUser]);

  const onAcceptUser = useCallback(() => {
    acceptUser(item);
  }, [item, acceptUser]);

  return (
    <View style={styles.queuePendingRequestItem}>
      <TouchableOpacity
        style={styles.queuePendingRequestItemContainer}
        onPress={onProfilePress}>
        <View style={styles.queuePendingRequestItemAvatarContainer}>
          <ImageFrame
            style={styles.queuePendingRequestItemAvatar}
            userName={item.user_name}
            imagePath={item?.avatar?.path}
            imageId={item?.avatar?.sid}
            strokeColor={UIColors.white}
          />
        </View>
        <Text style={styles.queuePendingRequestItemText}>
          <Text style={styles.queuePendingRequestItemName}>
            {`${item.user_name} `}
          </Text>
          <Text style={styles.queuePendingRequestItemDescription}>
            {i18n.queueScreen.pendingDescription}
          </Text>
        </Text>
      </TouchableOpacity>
      <View
        style={[
          styles.queuePendingRequestItemContainer,
          styles.queuePendingRequestItemButtonContainer,
        ]}>
        <TouchableOpacity
          onPress={onRejectUser}
          style={[
            styles.queuePendingRequestItemBtn,
            styles.queuePendingRequestItemBtnDecline,
          ]}>
          <Text
            style={[
              styles.queuePendingRequestItemBtnTitle,
              styles.queuePendingRequestItemBtnTitleDecline,
            ]}>
            {i18n.queueScreen.decline}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAcceptUser}
          style={styles.queuePendingRequestItemBtn}>
          <Text style={styles.queuePendingRequestItemBtnTitle}>
            {i18n.queueScreen.accept}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QueuePendingRequest;
