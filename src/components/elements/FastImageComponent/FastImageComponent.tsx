import React, { FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ImageRequireSource, StyleProp } from 'react-native';
import FastImage, {
  ImageStyle,
  ResizeMode,
  Source,
} from 'react-native-fast-image';
import { defaultAvatar, UIColors } from 'app/constants';
import { styles } from './FastImageComponent.styles';

const FastImageComponent: FC<{
  source?: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
}> = ({ source, style = null, resizeMode = 'cover' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageSource, setImageSource] = useState<Source | ImageRequireSource>({
    uri: source,
  });

  const loadStarted = useCallback(() => {
    setIsLoading(true);
  }, []);
  const loadFinished = useCallback(() => {
    setIsLoading(false);
  }, []);
  const loadError = useCallback(() => {
    setImageSource(defaultAvatar);
  }, []);
  useEffect(() => {
    if (source) {
      setImageSource({ uri: source });
    } else {
      setImageSource(defaultAvatar);
    }
  }, [source]);
  return (
    <FastImage
      resizeMode={resizeMode}
      source={imageSource}
      style={[styles.fastImageContainer, style]}
      onLoadStart={loadStarted}
      onLoadEnd={loadFinished}
      onError={loadError}>
      {isLoading ? (
        <ActivityIndicator size="small" color={UIColors.highlightBlue} />
      ) : null}
    </FastImage>
  );
};

export default FastImageComponent;
