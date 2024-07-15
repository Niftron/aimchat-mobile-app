import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'app/navigation/Navigation.types';

export type CountryCodesProps = NativeStackScreenProps<
  RootStackParamList,
  'countryCodes'
>;
