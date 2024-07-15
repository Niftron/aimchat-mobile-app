import { useNavigation } from '@react-navigation/native';
import Navigation from './Navigation';
import { AppNavigationProps } from './Navigation.types';

export const useAppNavigation = () => useNavigation<AppNavigationProps>();

export { Navigation };
