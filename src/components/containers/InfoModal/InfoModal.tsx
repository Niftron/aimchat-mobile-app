import { i18n } from 'app/i18n';
import React, { FC } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { styles } from './InfoModal.styles';
import { InfoModalProps } from './InfoModal.types';
import { Separator } from 'elements/Separator';

const InfoModal: FC<InfoModalProps> = ({
  visible,
  title,
  message,
  actionButtonTitle = '',
  actionTitleColor,
  onRequestClose,
  onActionButtonPress,
}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.modal}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={styles.buttonsWrapper}>
            {onActionButtonPress && (
              <>
                <Separator width={10} />
                <View style={styles.buttonWrapper}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={onActionButtonPress}>
                    <Text
                      style={[
                        styles.modalButtonText,
                        !!actionTitleColor && { color: actionTitleColor },
                      ]}>
                      {actionButtonTitle}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={onRequestClose}>
                <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                  {i18n.general.cancel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;
