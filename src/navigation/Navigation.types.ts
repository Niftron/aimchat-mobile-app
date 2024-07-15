import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { UserProfileType } from 'app/types';
import { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { ResourceType } from 'app/services/types';

export type SvgElementPropsType = {
  name: string;
  color: string;
  size: number;
};

export type tabType = {
  name: keyof RootTabParamList;
  title: string;
  icon: FC<SvgProps | SvgElementPropsType>;
  component: FC;
};

export type RootTabParamList = {
  queue: undefined;
  chat: NavigatorScreenParams<ChatStackParamList>;
  map: undefined;
  profile: undefined;
};

export type ChatStackParamList = {
  chatList: undefined;
  chatRoom: { conversationProfile: UserProfileType };
};

type TabNavigatorParams<T extends RootTabParamList> = {
  [K in keyof T]: T[K] extends undefined
    ? { screen: K }
    : { screen: K; params: T[K] };
}[keyof T];

export type RootStackParamList = {
  tabs: undefined | TabNavigatorParams<RootTabParamList>;
  auth: any;
  login: undefined;
  OTPVerification: undefined;
  terms: {
    title: string;
    text: string;
  };
  surveyName: undefined;
  surveyAge: undefined;
  surveyGender: undefined;
  surveyEmail: undefined;
  surveyQuote: undefined;
  fullPhotoList: { currentIndex: number; data: ResourceType[] };
  usersProfiles: { profiles: UserProfileType[]; currentIndex?: number };
  editProfile: undefined;
  countryCodes: {
    onChange: (code: { code: string; country: string }) => void;
  };
  friendProfile: { profile: UserProfileType };
  noConnection: undefined;
};

export type AppRouteType = keyof RootStackParamList;

export type AppNavigationProps = NativeStackNavigationProp<
  RootStackParamList & RootTabParamList & ChatStackParamList
>;
