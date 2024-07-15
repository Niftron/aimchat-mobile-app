import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
  FC,
} from 'react';
import {
  SectionList,
  SectionListData,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
  AppState,
} from 'react-native';
import { ImageFrame } from 'elements/ImageFrame';
import { ChevronRightIcon, SendIcon } from 'app/assets/SVG';
import { BackButton } from 'elements/BackButton';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { styles } from './ChatRoom.styles';
import {
  ChatRoomPropsType,
  ChatRoomSectionPropsType,
} from 'screens/ChatRoom/ChatRoom.types';
import { useAppDispatch, useTypedSelector } from 'app/store';
import ChatSlice from 'app/store/slices/ChatSlice/ChatSlice';
import { ChatService } from 'app/services/ChatService';
import { ChatMessagesFiltersType, ChatMessageType } from 'app/services/types';
import ChatRoomMessage from 'screens/ChatRoom/ChatRoomMessage';
import { formatDateTimeFromTimestamp } from 'app/utils/datetimeHelper';
import { useFocusEffect } from '@react-navigation/native';
import { useAppNavigation } from 'app/navigation';
import { UIColors } from 'app/constants';
import { setCurrentCompanion } from 'app/store/slices/ChatSlice';

/*
Yes, api calls outside or redux. Yes, on purpose. After scaling the chat messages it would be way much faster without constantly updating the store.
 */
let INTERVAL_ID: undefined | ReturnType<typeof setTimeout>;
const ChatRoomScreen: FC<ChatRoomPropsType> = ({
  route: {
    params: { conversationProfile },
  },
}) => {
  const [isAllMessagesLoaded, setIsAllMessagesLoaded] = useState(false);
  const [endReachedByMomentumScrolling, setEndReachedByMomentumScrolling] =
    useState(true);
  const [inputText, setInputText] = useState('');
  const sectionRef = useRef<SectionList>(null);
  const dispatch = useAppDispatch();
  const { user } = useTypedSelector(state => state.auth);
  const { isLoading } = useTypedSelector(state => state.chat);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const navigation = useAppNavigation();

  const goToUserProfile = useCallback(() => {
    navigation.navigate('friendProfile', { profile: conversationProfile });
  }, [conversationProfile, navigation]);

  const resetMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const replaceMessages = useCallback((newMessages: ChatMessageType[]) => {
    setMessages(newMessages);
  }, []);

  const addPostMessages = useCallback(
    (newMessages: ChatMessageType[]) => {
      setMessages([...messages, ...newMessages]);
    },
    [messages],
  );

  const addPreMessages = useCallback(
    (newMessages: ChatMessageType[]) => {
      setMessages([...newMessages, ...messages]);
    },
    [messages],
  );

  const sectionData = useMemo(() => {
    if (messages?.length) {
      return messages.reduce(
        (accumulator: ChatRoomSectionPropsType[], currentValue) => {
          const sectionName = formatDateTimeFromTimestamp(
            currentValue.cdate,
          ).date;
          if (accumulator?.length) {
            for (let i = 0; i < accumulator.length; i++) {
              if (accumulator[i].title === sectionName) {
                accumulator[i].data.push(currentValue);
                return accumulator;
              }
            }
            accumulator.push({
              title: sectionName,
              data: [currentValue],
            });
            return accumulator;
          } else {
            return [
              {
                title: sectionName,
                data: [currentValue],
              },
            ];
          }
        },
        [],
      );
    } else {
      return [];
    }
  }, [messages]);

  const scrollToLastMessage = useCallback(() => {
    if (sectionRef?.current && sectionData?.length) {
      sectionRef.current.scrollToLocation({
        animated: true,
        sectionIndex: 0,
        itemIndex: 0,
      });
    }
  }, [sectionRef, sectionData]);

  const getMessages = useCallback(
    async (
      filters: ChatMessagesFiltersType = { limit: 50 },
      type: 'replace' | 'addPost' | 'addPre' = 'replace',
    ) => {
      try {
        dispatch(dispatch(ChatSlice.actions.setIsLoading(true)));
        const response = await ChatService.getUserMessages(
          conversationProfile.user,
          filters,
        );
        if (response?.data?.response['Message[]']?.length) {
          const messagesRes = response.data.response['Message[]'];
          switch (type) {
            case 'replace':
              replaceMessages(messagesRes);
              break;
            case 'addPost':
              addPostMessages(messagesRes);
              break;
            case 'addPre':
              addPreMessages(messagesRes);
              break;
          }
          const ids = messagesRes.map(msg => {
            return msg.id;
          });
          ChatService.readMessages(ids);
        } else {
          setIsAllMessagesLoaded(true);
        }
        dispatch(dispatch(ChatSlice.actions.setIsLoading(false)));
      } catch (error) {
        console.error('getMessages error', error);
        dispatch(dispatch(ChatSlice.actions.setIsLoading(false)));
        resetMessages();
      }
    },
    [
      dispatch,
      conversationProfile,
      addPostMessages,
      replaceMessages,
      resetMessages,
      addPreMessages,
    ],
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentCompanion(conversationProfile.user));
      INTERVAL_ID = setInterval(() => {
        getMessages();
      }, 10000);
      return () => {
        dispatch(setCurrentCompanion(null));
        clearInterval(INTERVAL_ID);
        INTERVAL_ID = undefined;
      };
    }, [conversationProfile]),
  );

  useEffect(() => {
    getMessages();
    setInputText('');
  }, [conversationProfile]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      scrollToLastMessage();
    });
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState.match(/inactive|background/)) {
        clearInterval(INTERVAL_ID);
        INTERVAL_ID = undefined;
      }
    });

    return () => {
      showSubscription.remove();
      subscription.remove();
    };
  }, []);

  const sendChatMessage = useCallback(async () => {
    const messageText = inputText.trim();
    if (messageText !== '') {
      setInputText('');
      try {
        const response = await ChatService.sendMessage({
          userID: conversationProfile.user,
          message: messageText,
        });
        if (response?.data?.response?.Message) {
          addPreMessages([response.data.response.Message]);
          scrollToLastMessage();
        }
      } catch (error) {
        console.error('send message error', error);
      }
    }
  }, [scrollToLastMessage, inputText, conversationProfile, addPostMessages]);

  const renderMessageItem = useCallback(
    ({ item }: { item: ChatMessageType }) => {
      const myMessage = item.sender === user.profile.user;
      return (
        <ChatRoomMessage
          chatMessage={item}
          profile={myMessage ? user.profile : conversationProfile}
          isMyMessage={myMessage}
        />
      );
    },
    [user, conversationProfile],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<ChatMessageType> }) => {
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      );
    },
    [],
  );

  const momentumScrollStarted = useCallback(() => {
    setEndReachedByMomentumScrolling(false);
  }, []);

  const momentumScrollEnded = useCallback(() => {
    setEndReachedByMomentumScrolling(true);
  }, []);

  const onEndReached = useCallback(async () => {
    if (
      isAllMessagesLoaded ||
      isLoading ||
      !messages.length ||
      endReachedByMomentumScrolling
    ) {
      return;
    }
    await getMessages(
      {
        offset: messages.length,
        limit: 50,
      },
      'addPost',
    );
    momentumScrollEnded();
  }, [
    getMessages,
    messages,
    isAllMessagesLoaded,
    isLoading,
    momentumScrollEnded,
    endReachedByMomentumScrolling,
  ]);

  const onBackPress = useCallback(() => {
    //Overrided to always return to chatList, because we can navigate to this screen from different locations
    navigation.replace('chatList');
  }, [navigation]);

  const renderContent = () => {
    return (
      <>
        <View style={styles.messagesContainer}>
          <SectionList
            bounces={false}
            inverted={true}
            ref={sectionRef}
            ListFooterComponent={
              isLoading ? <ActivityIndicator size={'small'} /> : null
            }
            sections={sectionData}
            stickySectionHeadersEnabled={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `chatroom-${index}`}
            renderItem={renderMessageItem}
            renderSectionFooter={renderSectionHeader}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            onScrollBeginDrag={momentumScrollStarted}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message here"
            placeholderTextColor={UIColors.gray}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendChatMessage}>
            <SendIcon height={15} width={15} />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <BaseLayout style={styles.screenWrapper}>
      <View style={styles.chatHeader}>
        <View style={styles.headerBackButton}>
          <BackButton onBackPress={onBackPress} />
        </View>
        <TouchableOpacity
          onPress={goToUserProfile}
          style={styles.chatRoomTitleWrapper}>
          <Text
            style={styles.chatRoomTitle}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
            {conversationProfile.user_name}
          </Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 10}
          style={styles.screenWrapper}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {renderContent()}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.screenWrapper}>{renderContent()}</View>
      )}
    </BaseLayout>
  );
};

export default ChatRoomScreen;
