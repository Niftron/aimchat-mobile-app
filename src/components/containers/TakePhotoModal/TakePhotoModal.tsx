import React, { useImperativeHandle, useRef, useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { TakePhotoModalProps, TakePhotoModalRef } from './TakePhotoModal.types';
import BottomModal from 'react-native-raw-bottom-sheet';
import { styles } from './TakePhotoModal.styles';
import { i18n } from 'app/i18n';

const TakePhotoModal = React.forwardRef<TakePhotoModalRef, TakePhotoModalProps>(
  ({ onChange }, ref) => {
    const bottomModalRef = useRef<BottomModal>(null);
    useImperativeHandle(ref, () => ({
      close: () => bottomModalRef.current?.close(),
      open: () => bottomModalRef.current?.open(),
    }));

    const [isSelectVisible, setIsSelectVisible] = useState(true);

    const openGallery = async () => {
      try {
        setIsSelectVisible(false);
        const askedPermissions =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        request(askedPermissions).then(async permissionStatus => {
          if (
            permissionStatus === RESULTS.GRANTED ||
            permissionStatus === RESULTS.LIMITED
          ) {
            const result = await launchImageLibrary({
              mediaType: 'photo',
              presentationStyle: 'fullScreen',
              maxWidth: 1000,
              maxHeight: 1000,
            });

            if (result?.assets?.length) {
              const asset = result.assets[0];
              onChange(asset);
            }
          } else {
            Alert.alert(
              i18n.general.permissionModal.title,
              i18n.general.permissionModal.message,
            );
          }
          bottomModalRef?.current?.close();
          setIsSelectVisible(true);
        });
      } catch (err) {
        console.error('open gallery error:', err);
        bottomModalRef?.current?.close();
        setIsSelectVisible(true);
      }
    };
    const openCamera = async () => {
      try {
        setIsSelectVisible(false);
        const askedPermissions =
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA;
        request(askedPermissions).then(async permissionStatus => {
          if (
            permissionStatus === RESULTS.GRANTED ||
            permissionStatus === RESULTS.LIMITED
          ) {
            const result = await launchCamera({
              mediaType: 'photo',
              presentationStyle: 'fullScreen',
              maxWidth: 1000,
              maxHeight: 1000,
            });

            if (result?.assets?.length) {
              const asset = result.assets[0];
              onChange(asset);
            }
          } else {
            Alert.alert(
              i18n.general.permissionModal.title,
              i18n.general.permissionModal.message,
            );
          }
          bottomModalRef?.current?.close();
          setIsSelectVisible(true);
        });
      } catch (err) {
        console.error('open camera error:', err);
        bottomModalRef?.current?.close();
        setIsSelectVisible(true);
      }
    };

    return isSelectVisible ? (
      <BottomModal
        customStyles={{
          container: styles.bottomModalContainer,
        }}
        ref={bottomModalRef}>
        <TouchableOpacity
          style={styles.bottomModalButton}
          onPress={openGallery}>
          <Text style={styles.bottomModalButtonText}>Open Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomModalButton} onPress={openCamera}>
          <Text style={styles.bottomModalButtonText}>Open Camera</Text>
        </TouchableOpacity>
      </BottomModal>
    ) : null;
  },
);

export default TakePhotoModal;
