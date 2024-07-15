import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from 'screens/Queue/Queue.styles';
import React, { useCallback } from 'react';
import { QueueFriendPropsType } from 'screens/Queue/Queue.types';
import { getInitials } from 'app/utils';
import { FastImageComponent } from 'elements/FastImageComponent';

const QueueFriend = ({ profile, openUserProfile }: QueueFriendPropsType) => {
  const onOpenUserProfile = useCallback(() => {
    openUserProfile(profile);
  }, [openUserProfile, profile]);

  return (
    <TouchableOpacity onPress={onOpenUserProfile} style={styles.queueProfile}>
      <View style={styles.queueProfileImageContainer}>
        {profile.avatar?.path ? (
          <FastImageComponent
            style={styles.queueProfileImage}
            source={profile.avatar.path}
          />
        ) : (
          <Text style={styles.queueProfileImageText}>
            {getInitials(profile.user_name)}
          </Text>
        )}
      </View>
      <Text
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={styles.queueProfileName}>
        {profile.user_name}
      </Text>
    </TouchableOpacity>
  );
};

export default QueueFriend;
