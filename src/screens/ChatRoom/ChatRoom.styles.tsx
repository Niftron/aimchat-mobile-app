import { StyleSheet } from 'react-native';
import { montserratFontRegular500 } from 'app/styles';
import { UIColors } from 'app/constants';

export const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: UIColors.lightGray,
  },
  sectionHeader: {
    marginBottom: 16,
    alignSelf: 'center',
  },
  sectionHeaderText: {
    ...montserratFontRegular500,
    fontSize: 9,
    color: UIColors.grayText,
  },
  chatRoomTitleWrapper: {
    alignItems: 'center',
    marginLeft: 20,
  },
  chatRoomTitle: {
    ...montserratFontRegular500,
    color: UIColors.brandBlue,
    fontSize: 17,
  },
  chatMessageWrapper: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  chatMessageAvatar: {
    height: 54,
    width: 43,
  },
  marginRight: {
    marginRight: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  myMessageWrapper: {
    alignSelf: 'flex-end',
  },
  messageItem: {
    alignSelf: 'flex-start',
    backgroundColor: UIColors.highlightBlue,
    paddingTop: 15,
    paddingBottom: 5,
    marginBottom: 16,
    borderRadius: 15,
    maxWidth: '80%',
    minWidth: 50,
  },
  messageText: {
    paddingHorizontal: 15,
    ...montserratFontRegular500,
    fontSize: 14,
    color: UIColors.white,
  },
  messageInfoContainer: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 9,
  },
  messageInfoTime: {
    ...montserratFontRegular500,
    fontSize: 8,
    lineHeight: 10,
    marginLeft: 5,
    color: UIColors.white,
  },
  myMessageItem: {
    alignSelf: 'flex-end',
    backgroundColor: UIColors.darkGray,
  },
  myMessageText: {
    color: UIColors.black,
  },
  chatHeader: {
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerBackButton: {
    position: 'absolute',
    left: 16,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatar: {
    alignSelf: 'center',
    height: 54,
    width: 43,
  },
  headerOptions: {
    height: '100%',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 25,
  },
  inputContainer: {
    width: '100%',
    height: 46,
    paddingHorizontal: 21,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: UIColors.black,
    paddingHorizontal: 10,
    flex: 1,
    height: '100%',
    backgroundColor: UIColors.white,
    borderColor: UIColors.darkGray,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  sendButton: {
    backgroundColor: UIColors.highlightBlue,
    height: '100%',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  sectionListContainer: { flexGrow: 1, justifyContent: 'flex-end' },
  hyperlink: {
    color: UIColors.blue,
  },
});
