import { i18n } from 'app/i18n';
import { AppInput } from 'elements/AppInput';
import React, { FC, useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { styles } from './MessageModal.styles';
import { MessageModalProps } from './MessageModal.types';

const MessageModal: FC<MessageModalProps> = ({
  visible,
  onSendPress,
  onRequestClose,
}) => {
  const [message, setMessage] = useState('');

  const onSendButtonPress = () => {
    onSendPress(message);
    setMessage('');
  };
  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          onPress={onRequestClose}
          activeOpacity={0.8}
        />
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>{i18n.messageModal.title}</Text>
          <AppInput
            style={styles.textArea}
            value={message}
            onChangeText={setMessage}
            returnKeyType="done"
            blurOnSubmit={true}
            multiline={true}
          />
          <TouchableOpacity
            disabled={!message}
            style={styles.sendButton}
            onPress={onSendButtonPress}>
            <Text
              style={[
                styles.sendButtonText,
                !message && styles.sendButtonDisabled,
              ]}>
              {i18n.messageModal.send}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MessageModal;
