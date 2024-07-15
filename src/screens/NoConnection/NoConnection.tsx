import React from 'react';
import { Text } from 'react-native';
import { i18n } from 'app/i18n';

import { BaseLayout } from 'app/layouts/BaseLayout';
import { styles } from './NoConnection.styles';
import { UIColors } from 'app/constants';
import { LogoIcon } from 'app/assets/SVG';

const NoConnectionScreen = () => {
  return (
    <BaseLayout style={styles.container}>
      <LogoIcon width={130} height={110} color={UIColors.mediumBlue} />
      <Text style={styles.noConnectionText}>
        {i18n.noConnectionScreen.noConnectionText}
      </Text>
    </BaseLayout>
  );
};

export default NoConnectionScreen;
