import React, { FC, useCallback, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { CountryCodesProps } from './CountryCodes.types';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { KeyboardAwareLayout } from 'app/layouts/KeyboardAwareLayout';
import { codes } from 'app/constants/countryCodes';
import { AppInput } from 'elements/AppInput';
import { AppButton } from 'elements/AppButton';
import { blueButtonColors } from 'app/styles';
import { i18n } from 'app/i18n';
import { styles } from './CountryCodes.styles';
import { Separator } from 'elements/Separator';
import { UIColors } from 'app/constants';

const CountryCodesScreen: FC<CountryCodesProps> = ({
  route: {
    params: { onChange },
  },
  navigation: { goBack },
}) => {
  // const [code, setCode] = useState<{ code: string; country: string }>();
  const [filter, setFilter] = useState('');
  const onBackPressed = () => {
    // if (code?.code) {
    //   onChange(code);
    // }

    goBack();
  };

  const onSelect = (code: { code: string; country: string }) => {
    onChange(code);
    goBack();
  };

  const renderItem = useCallback((el: { country: string; code: string }) => {
    return (
      <TouchableOpacity
        key={el.code + el.country}
        style={[styles.row]}
        onPress={() => onSelect(el)}>
        <Text style={styles.rowText}>{el.code}</Text>
        <Text style={styles.rowText}>{el.country}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <BaseLayout style={styles.container}>
      <AppInput
        onChangeText={setFilter}
        value={filter}
        placeholder={i18n.countryCodesScreen.filterPlaceholder}
        placeholderTextColor={UIColors.gray}
      />
      <Separator height={24} />
      <KeyboardAwareLayout>
        {codes
          .filter(el =>
            el.country.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
          )
          .map(renderItem)}
      </KeyboardAwareLayout>
      <Separator height={24} />
      <AppButton
        title={i18n.general.back}
        onPress={onBackPressed}
        {...blueButtonColors}
      />
    </BaseLayout>
  );
};

export default CountryCodesScreen;
