import React from 'react';
import { View } from 'react-native';

const Separator = ({
  width,
  height,
  flex,
}: {
  width?: number;
  height?: number;
  flex?: boolean;
}) => {
  // eslint-disable-next-line react-native/no-inline-styles
  return <View style={{ width, height, flex: flex ? 1 : 0 }} />;
};

export default Separator;
