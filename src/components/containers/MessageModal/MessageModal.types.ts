export type MessageModalProps = {
  visible: boolean;
  onSendPress: (message: string) => void;
  onRequestClose: () => void;
};
