import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import Svg, { Path, Image, Defs, ClipPath, Text } from 'react-native-svg';
import { styles } from './ImageFrame.styles';
import { UIColors } from 'app/constants';
import { ImageFrameProps } from './ImageFrame.types';
import { getInitials } from 'app/utils';
import { getImageByIdAndUri } from 'app/utils/cachingImageService';

const ImageFrame: FC<ImageFrameProps> = ({
  userName,
  imagePath,
  imageId,
  fillColor = '#FFF',
  strokeColor = '#FFF',
  style,
  children,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  // In order to dinamically create appropriate images we need to wrap avatars in svg container. The size of the avatar would be relative to the parent size and can be customized via style property.
  // Second path is needed for the stroke, because clipPath doesnt support strokes, and we need clipPath to put image clearly inside svg.
  useEffect(() => {
    if (imagePath && imageId) {
      getImageByIdAndUri({
        id: imageId,
        uri: imagePath,
      }).then(setImageUri);
    } else {
      setImageUri(null);
    }
  }, [imagePath, imageId]);

  return (
    <View style={[styles.container, style]}>
      <Svg width="100%" height="100%" viewBox={'0 0 46 59'}>
        <Defs>
          <ClipPath id="clip">
            <Path d="M44.6504 23C44.6504 11.1153 35.0351 1.5 23.1504 1.5C11.2657 1.5 1.65039 11.1153 1.65039 23C1.65039 33.959 9.8622 43.0069 20.4629 44.3208V48.5014V56.116L25.8379 50.741L38.6782 37.9007C42.3809 34.0188 44.6504 28.7632 44.6504 23Z" />
          </ClipPath>
        </Defs>
        <Path
          d="M44.6504 23C44.6504 11.1153 35.0351 1.5 23.1504 1.5C11.2657 1.5 1.65039 11.1153 1.65039 23C1.65039 33.959 9.8622 43.0069 20.4629 44.3208V48.5014V56.116L25.8379 50.741L38.6782 37.9007C42.3809 34.0188 44.6504 28.7632 44.6504 23Z"
          stroke={strokeColor}
          fill={fillColor}
          strokeWidth={2}
        />
        {imageUri ? (
          <Image
            width="46"
            height="59"
            preserveAspectRatio="xMidYMid slice"
            href={imageUri}
            clipPath="url(#clip)"
          />
        ) : (
          <Text
            fill={UIColors.highlightBlue}
            fontFamily={'Montserrat-Regular'}
            fontSize="20"
            fontWeight="bold"
            x="23"
            y="30"
            textAnchor="middle">
            {getInitials(userName)}
          </Text>
        )}
      </Svg>
      {children}
    </View>
  );
};

export default ImageFrame;
