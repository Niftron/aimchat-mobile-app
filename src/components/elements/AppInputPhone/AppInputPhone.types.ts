import { TextInputProps } from 'react-native';

export type AppInputPhoneProps = {
  code: string;
  error?: boolean;
} & TextInputProps;
