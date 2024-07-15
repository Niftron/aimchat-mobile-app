import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  LayoutAnimation,
  Platform,
  ScrollView,
  Text,
  TextLayoutEventData,
  UIManager,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { styles } from './Profile.styles';
import * as constants from 'app/constants';

import { ProfileProps } from './Profile.types';
import { i18n } from 'app/i18n';
import { NativeEvent } from 'react-native-reanimated/lib/types/lib/reanimated2/commonTypes';
import { ProfileGallery } from 'components/ProfileGallery';
import { FastImageComponent } from 'elements/FastImageComponent';

const Profile: FC<ProfileProps> = ({
  profile,
  BottomButton,
  EditAvatarButton,
  gallery,
  galleryLoading,
}) => {
  const [aboutMeLinesCount, setAboutMeLinesCount] = useState(0);
  const [aboutMeMore, setAboutMeMore] = useState(false);

  const onTextLayout = (res: NativeEvent<TextLayoutEventData>) => {
    setAboutMeLinesCount(res.nativeEvent.lines.length);
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [gallery]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FastImageComponent
          style={styles.headerAvatar}
          source={profile.avatar?.path}
        />
        {EditAvatarButton && (
          <View style={styles.headerEditButton}>
            <EditAvatarButton />
          </View>
        )}
        <View style={styles.headerTextWrapper}>
          <Text style={styles.headerTitle} numberOfLines={4}>
            {profile.user_name}
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {profile.job}
          </Text>
        </View>
      </View>
      {!!gallery?.length && <ProfileGallery data={gallery} />}
      {galleryLoading !== false && <ActivityIndicator />}
      <View style={styles.contentWrapper}>
        {!!profile.quote && (
          <>
            <Text style={styles.quoteTitle}>{i18n.profileScreen.quote}</Text>
            <Text style={styles.quoteText}>"{profile.quote}"</Text>
          </>
        )}

        {!!profile.summary && (
          <View style={styles.textRow}>
            <Text style={styles.textRowTitle}>
              {i18n.profileScreen.aboutMe}
            </Text>

            {/* gets the number of lines in the text */}
            <Text
              style={[styles.rowText, styles.visuallyHidden]}
              onTextLayout={onTextLayout}>
              {profile.summary}
            </Text>
            {/*  */}

            <Text style={styles.rowText} numberOfLines={aboutMeMore ? 0 : 4}>
              {profile.summary}
            </Text>

            {aboutMeLinesCount > 4 && (
              <Text
                style={[styles.textRowTitle, styles.loadMore]}
                onPress={() => setAboutMeMore(prev => !prev)}>
                {aboutMeMore
                  ? i18n.profileScreen.hide
                  : i18n.profileScreen.loadMore}
              </Text>
            )}
          </View>
        )}

        {!!profile.email && !profile.email_private && (
          <View style={styles.textRow}>
            <Text style={styles.textRowTitle}>{i18n.profileScreen.email}</Text>
            <Text style={styles.rowText}>{profile.email}</Text>
          </View>
        )}

        {!!profile.job && (
          <View style={styles.textRow}>
            <Text style={styles.textRowTitle}>
              {i18n.profileScreen.currentJob}
            </Text>
            <Text style={styles.rowText}>{profile.job}</Text>
          </View>
        )}

        {!!profile.company && !profile.company_private && (
          <View style={styles.textRow}>
            <Text style={styles.textRowTitle}>
              {i18n.profileScreen.currentCompany}
            </Text>
            <Text style={styles.rowText}>{profile.company}</Text>
          </View>
        )}

        {!!profile.education && !profile.education_private && (
          <View style={styles.textRow}>
            <Text style={styles.textRowTitle}>
              {i18n.profileScreen.education}
            </Text>
            <Text style={styles.rowText}>{profile.education}</Text>
          </View>
        )}
        {!!profile.phone && !profile.phone_private && (
          <View style={styles.textRow}>
            <Text style={styles.textRowTitle}>{i18n.profileScreen.phone}</Text>
            <Text style={styles.rowText}>{profile.phone}</Text>
          </View>
        )}

        {BottomButton && <BottomButton />}
      </View>
    </ScrollView>
  );
};

export default Profile;
