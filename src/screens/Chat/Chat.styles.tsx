import { StyleSheet } from 'react-native';
import { montserratFontRegular500 } from 'app/styles';
import { UIColors } from 'app/constants';

export const styles = StyleSheet.create({
  chatListItem: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 0.25,
    borderColor: UIColors.gray,
    height: 80,
  },
  chatListItemAvatar: {
    width: 43,
    height: 54,
  },
  chatListItemTextContainer: {
    marginLeft: 20,
    maxWidth: '80%',
  },
  chatListItemTitle: {
    width: '100%',
    ...montserratFontRegular500,
    fontSize: 17,
    color: UIColors.highlightBlue,
  },
  chatListItemSubTitle: {
    width: '100%',
    ...montserratFontRegular500,
    fontSize: 12,
    color: UIColors.grayText,
  },
  chatListItemUnreadDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: UIColors.red,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  chatListItemUnread: {
    position: 'absolute',
    right: 0,
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: UIColors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatListItemUnreadText: {
    ...montserratFontRegular500,
    color: UIColors.white,
    fontSize: 10,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainerText: {
    ...montserratFontRegular500,
    fontSize: 18,
    color: UIColors.brandBlue,
    textAlign: 'center',
  },
  deleteChatContainer: {
    width: 71,
    height: '100%',
  },
  deleteChatButton: {
    height: '100%',
    width: '100%',
    backgroundColor: UIColors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
