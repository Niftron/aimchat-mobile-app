import React, { FC } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { styles } from './BaseLayout.styles';

import { BaseLayoutProps } from './BaseLayout.types';
import { UIColors } from 'app/constants';

const BaseLayout: FC<BaseLayoutProps> = ({
  children,
  style,
  error,
  showBottomSafeArea = true,
  showTopSafeArea = true,
  topSafeAreaColor = 'transparent',
  bottomSafeAreaColor = 'transparent',
  isLoading = false,
}) => {
  return (
    <>
      {showTopSafeArea && (
        <SafeAreaView style={{ backgroundColor: topSafeAreaColor }} />
      )}
      <View style={[styles.container, style]}>
        {!!error && (
          <View style={styles.error}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        {children}
      </View>
      {showBottomSafeArea && (
        <SafeAreaView style={{ backgroundColor: bottomSafeAreaColor }} />
      )}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={UIColors.highlightBlue} />
        </View>
      )}
    </>
  );
};

export default BaseLayout;
