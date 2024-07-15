import { i18n } from 'app/i18n';
import { blueButtonColors } from 'app/styles';
import { AppButton } from 'elements/AppButton';
import React, { FC } from 'react';
import { Text, SafeAreaView, View, ScrollView } from 'react-native';

import { styles } from './Terms.styles';
import { TermsProps } from './Terms.types';
import { Separator } from 'elements/Separator';

const Terms: FC<TermsProps> = ({
  route: {
    params: { title, text },
  },
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.inner]}>
        <Text style={styles.title}>{title}</Text>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
        <View>
          <AppButton
            title={i18n.general.ok}
            {...blueButtonColors}
            onPress={navigation.goBack}
          />
          <Separator height={12} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Terms;
