import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { i18n } from 'app/i18n';
import { useNavigation } from '@react-navigation/native';
import { BackArrowIcon } from 'app/assets/SVG';
import { UIColors } from 'app/constants';
import { styles } from './BackButton.styles';

const BackButton = ({ onBackPress }: { onBackPress?: () => void }) => {
  const navigation = useNavigation();

  const onPress = () => {
    if (navigation.canGoBack()) {
      onBackPress ? onBackPress() : navigation.goBack();
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
      <BackArrowIcon color={UIColors.turquoise} />
      {/*<Text style={styles.text}>{i18n.general.back}</Text>*/}
    </TouchableOpacity>
  );
};

export default BackButton;
