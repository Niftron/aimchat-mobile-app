import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';

import { UserProfileType } from 'app/types';
import { UserListProps } from './UserList.types';
import { styles } from './UserList.styles';
import { AppButton } from 'elements/AppButton';
import { i18n } from 'app/i18n';
import { mainButtonColors } from 'app/styles';
import { ImageFrame } from 'elements/ImageFrame';
import { Separator } from 'elements/Separator';
import { useAppNavigation } from 'app/navigation';
import moment from 'moment';
import { UIColors } from 'app/constants';

const UserList: FC<UserListProps> = ({ users }) => {
  const navigation = useAppNavigation();
  const listRef = useRef<FlatList>(null);

  // useEffect(() => {
  //   if (users?.length) {
  //     listRef?.current?.scrollToIndex({
  //       index: 0,
  //       animated: false,
  //       viewPosition: 1,
  //     });
  //   }
  // }, [users?.length]);

  const profiles = useMemo(() => {
    return users.map(el => el.profile);
  }, [users]);

  const renderItem = useCallback(
    ({ item, index }: { item: UserProfileType; index: number }) => {
      const date = moment.unix(users[index]?.coords?.udate).format();
      const diff = moment().diff(date, 'minutes');
      let wasHere = diff <= 5 ? '' : i18n.mapScreen.wasHere;
      // if (+diff >= 60) {
      //   const hours = Math.floor(diff / 60);
      //   wasHere = `was here ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
      // }

      const onPress = () => {
        navigation.navigate('usersProfiles', {
          profiles: profiles.slice(0, profiles.length),
          currentIndex: index,
        });
      };

      return (
        <View style={styles.listItemWrapper}>
          <View style={styles.listItem}>
            <Text style={styles.lastSeenText}>{wasHere}</Text>
            <View style={styles.inner}>
              <ImageFrame
                style={styles.pin}
                strokeColor={
                  +diff >= 60 ? UIColors.gray : UIColors.highlightBlue
                }
                userName={item.user_name}
                imagePath={item?.avatar?.path}
                imageId={item?.avatar?.sid}
              />
              <Separator width={10} />
              <View style={styles.textWrapper}>
                <Text style={styles.titleText} numberOfLines={1}>
                  {item.user_name}
                </Text>
                <Text style={styles.subtileText} numberOfLines={1}>
                  {item.job}
                </Text>
              </View>
            </View>

            <AppButton
              title={i18n.mapScreen.viewProfile}
              onPress={onPress}
              {...mainButtonColors}
            />
          </View>
        </View>
      );
    },
    [users, navigation, profiles],
  );

  return (
    <FlatList
      ref={listRef}
      style={styles.list}
      data={profiles}
      renderItem={renderItem}
      keyExtractor={item => item.user}
      contentContainerStyle={styles.listContainer}
      ItemSeparatorComponent={() => <Separator width={8} />}
      removeClippedSubviews={false}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default UserList;
