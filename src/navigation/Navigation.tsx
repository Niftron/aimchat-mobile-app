import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { QueueScreen } from 'screens/Queue';
import { ChatScreen } from 'screens/Chat';
import { ChatRoomScreen } from 'screens/ChatRoom';
import { MapScreen } from 'screens/Map';
import { ProfileScreen } from 'screens/Profile';
import {
  ChatIcon,
  PinIcon,
  ProfileIcon,
  QueueIcon,
  UnreadChatIcon,
} from 'app/assets/SVG';
import NetInfo from '@react-native-community/netinfo';
import { UIColors } from 'app/constants';
import { i18n } from 'app/i18n';
import { Terms } from 'screens/Terms';
import { AuthScreen } from 'screens/Auth';
import { LoginScreen } from 'screens/Login';
import { OTPVerification } from 'screens/OTPVerification';
import { FullPhotoListScreen } from 'screens/FullPhotoList';
import {
  WhatsYourAge,
  WhatsYourEmail,
  WhatsYourGender,
  WhatsYourName,
  WhatsYourQuote,
} from 'screens/RegistrationSurvey';
import BackButton from 'elements/BackButton/BackButton';
import {
  RootStackParamList,
  ChatStackParamList,
  RootTabParamList,
  tabType,
} from './Navigation.types';
import { UsersProfilesScreen } from 'screens/UsersProfiles';
import { Platform, SafeAreaView } from 'react-native';
import { EditProfileScreen } from 'screens/EditProfile';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { useAppNavigation } from './index';
import { CountryCodesScreen } from 'screens/CountryCodes';
import { clearUserData } from 'app/store/slices/AuthSlice/AuthSlice';
import { FriendProfileScreen } from 'screens/FriendProfile';
import { NoConnectionScreen } from 'screens/NoConnection';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();
const RootTab = createBottomTabNavigator<RootTabParamList>();

const ChatStackNavigation = () => {
  return (
    <ChatStack.Navigator
      initialRouteName="chatList"
      screenOptions={{
        headerShown: false,
      }}>
      <ChatStack.Screen
        name="chatList"
        component={ChatScreen}
        options={{
          animationTypeForReplace: 'pop',
        }}
      />
      <ChatStack.Screen name="chatRoom" component={ChatRoomScreen} />
    </ChatStack.Navigator>
  );
};

const tabs: tabType[] = [
  {
    name: 'queue',
    title: i18n.bottomTabs.queue,
    icon: QueueIcon,
    component: QueueScreen,
  },
  {
    name: 'chat',
    title: i18n.bottomTabs.chat,
    icon: ChatIcon,
    component: ChatStackNavigation,
  },
  {
    name: 'map',
    title: i18n.bottomTabs.map,
    icon: PinIcon,
    component: MapScreen,
  },
  {
    name: 'profile',
    title: i18n.bottomTabs.profile,
    icon: ProfileIcon,
    component: ProfileScreen,
  },
];

const RootTabNavigation = () => {
  const { unreadCount } = useTypedSelector(state => state.chat);
  return (
    <>
      <RootTab.Navigator
        initialRouteName="map"
        screenOptions={{
          headerShown: false,
        }}>
        {tabs.map(tab => {
          return (
            <RootTab.Screen
              key={tab.title}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarIcon: ({ color }) => {
                  let TabIcon = tab.icon;
                  if (tab.name === 'chat' && unreadCount > 0) {
                    TabIcon = UnreadChatIcon;
                  }
                  return <TabIcon name="contacts" color={color} size={26} />;
                },
                title: tab.title,
                tabBarActiveTintColor: UIColors.brandBlue,
                tabBarInactiveTintColor: UIColors.white,
                tabBarStyle: {
                  borderTopWidth: 0,
                  height: 66,
                  paddingBottom: 6,
                  paddingTop: 8,
                  backgroundColor: UIColors.deepBlue,
                },
                tabBarIconStyle: {
                  marginBottom: 5,
                },
              }}
            />
          );
        })}
      </RootTab.Navigator>
      <SafeAreaView style={{ backgroundColor: UIColors.deepBlue }} />
    </>
  );
};

const RootStackNavigation = () => {
  const { isAuth, authType, user } = useTypedSelector(state => state.auth);
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const prevIsAuth = useRef(false);
  const prevIsConnected = useRef(true);
  const [isInternetReachable, setIsInternetReachable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetReachable(!!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!prevIsConnected.current && isInternetReachable) {
      const redirectTo = Object.keys(user?.profile).length
        ? user.profile.user_name
          ? 'tabs'
          : 'surveyName'
        : 'auth';
      navigation.reset({
        routes: [{ name: redirectTo }],
        index: 0,
      });
    }
    prevIsConnected.current = isInternetReachable;
  }, [isInternetReachable, user?.profile, navigation]);

  useEffect(() => {
    if (!prevIsAuth.current && isAuth && authType === 'fetch') {
      if (user.profile.user_name) {
        navigation.reset({
          routes: [{ name: 'tabs' }],
          index: 0,
        });
      } else {
        navigation.reset({
          routes: [{ name: 'surveyName' }],
          index: 0,
        });
      }
    }
    prevIsAuth.current = isAuth;
  }, [isAuth, authType, navigation, user]);

  const goToLoginScreen = () => {
    dispatch(clearUserData());
    navigation.reset({
      routes: [{ name: 'auth' }],
      index: 0,
    });
  };

  return isInternetReachable ? (
    <RootStack.Navigator
      initialRouteName={'auth'}
      screenOptions={{
        headerShown: false,
      }}>
      {/* basic stack without headers */}
      <RootStack.Group>
        <RootStack.Screen
          name="tabs"
          component={RootTabNavigation}
          options={{
            animation: 'fade',
          }}
        />
        <RootStack.Screen name="auth" component={AuthScreen} />
        <RootStack.Screen
          name="usersProfiles"
          component={UsersProfilesScreen}
        />
        <RootStack.Screen name="editProfile" component={EditProfileScreen} />
      </RootStack.Group>

      {/* stack with headers */}
      <RootStack.Group
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: UIColors.lightGray,
          },
          title: '',
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}>
        <RootStack.Screen
          name="login"
          component={LoginScreen}
          options={{
            animation: 'fade',
          }}
        />
        <RootStack.Screen name="OTPVerification" component={OTPVerification} />
        <RootStack.Screen
          options={{
            headerShown: false,
          }}
          name="friendProfile"
          component={FriendProfileScreen}
        />
      </RootStack.Group>

      {/* RegistrationSurvey */}
      <RootStack.Group
        screenOptions={{
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: UIColors.lightGray,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackButton />,
        }}>
        <RootStack.Screen
          name="surveyName"
          component={WhatsYourName}
          options={{
            headerBackVisible: false,
            headerLeft: () => null,
            gestureEnabled: false,
          }}
        />
        <RootStack.Screen
          name="fullPhotoList"
          component={FullPhotoListScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: UIColors.black,
            },
          }}
        />
        <RootStack.Screen name="surveyAge" component={WhatsYourAge} />
        <RootStack.Screen name="surveyGender" component={WhatsYourGender} />
        <RootStack.Screen name="surveyEmail" component={WhatsYourEmail} />
        <RootStack.Screen name="surveyQuote" component={WhatsYourQuote} />
      </RootStack.Group>

      {/* stack with modal presentation */}
      <RootStack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
        }}>
        <RootStack.Screen name="terms" component={Terms} />
        <RootStack.Screen name="countryCodes" component={CountryCodesScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  ) : (
    <RootStack.Navigator
      initialRouteName="noConnection"
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="noConnection" component={NoConnectionScreen} />
    </RootStack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
