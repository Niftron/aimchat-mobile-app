export type InfoModalProps = {
  title?: string;
  message?: string;
  visible: boolean;
  actionButtonTitle?: string;
  actionTitleColor?: string;
  onRequestClose: () => void;
  onActionButtonPress?: () => void;
};
