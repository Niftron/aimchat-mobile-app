import React, { FC, useState } from 'react';
import {
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Slider from 'react-native-a11y-slider';

import { styles } from './MapMenu.styles';
import { CrossIcon, FilterIcon } from 'app/assets/SVG';
import { i18n } from 'app/i18n';
import { AppButton } from 'elements/AppButton';
import { blueButtonColors, grayButtonColors } from 'app/styles';
import { Separator } from 'elements/Separator';
import { UIColors } from 'app/constants';
import { MapMenuProps } from './MapMenu.types';

const MapMenu: FC<MapMenuProps> = ({
  radius,
  onRadiusChange,
  onGendersChange,
  onChange,
  onOpen,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [genders, setGenders] = useState<string[]>([]);

  const maleButtonColors = genders.includes('m')
    ? blueButtonColors
    : grayButtonColors;
  const femaleButtonColors = genders.includes('f')
    ? blueButtonColors
    : grayButtonColors;

  const setGender = (gender: string) => {
    setGenders(prev => {
      if (prev.includes(gender)) {
        return prev.filter(el => el !== gender);
      } else {
        return [...prev, gender];
      }
    });
  };

  const onMalePress = () => {
    setGender('m');
  };

  const onFemalePress = () => {
    setGender('f');
  };

  const onMenuClose = () => {
    setMenuVisible(false);
    onOpen(false);
    onGendersChange(genders);
    onRadiusChange(radius);
    onChange({ radius, genders });
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <Pressable
        style={styles.button}
        onPress={() => {
          setMenuVisible(true);
          onOpen(true);
        }}
        pointerEvents="box-only">
        <FilterIcon width={24} height={24} />
      </Pressable>

      {menuVisible && (
        <Pressable style={styles.container} onPress={onMenuClose}>
          <TouchableWithoutFeedback>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={onMenuClose}>
                <CrossIcon width={20} height={20} color={UIColors.gray} />
              </TouchableOpacity>
              <Text style={styles.menuTitle}>{i18n.mapScreen.menu.title}</Text>
              <Text style={styles.menuSubtitle}>{i18n.general.gender}</Text>
              <AppButton
                title={i18n.general.genders.male}
                onPress={onMalePress}
                {...maleButtonColors}
              />

              <Separator height={16} />

              <AppButton
                title={i18n.general.genders.female}
                onPress={onFemalePress}
                {...femaleButtonColors}
              />

              <Separator height={24} />

              <Text style={styles.menuSubtitle}>
                {i18n.mapScreen.menu.distance}
              </Text>

              <Slider
                min={150}
                max={600}
                values={[radius]}
                markerColor={UIColors.red}
                labelComponent={() => <></>}
                onChange={(value: number[]) => onRadiusChange(value[0])}
              />
              <View style={styles.feets}>
                <Text
                  style={
                    styles.feetsLabelText
                  }>{`${radius} ${i18n.mapScreen.menu.feets}`}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      )}
    </View>
  );
};

export default MapMenu;
