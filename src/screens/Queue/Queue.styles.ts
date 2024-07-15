import { UIColors } from 'app/constants';
import { montserratFontRegular500, montserratFontBold600 } from 'app/styles';
import { StyleSheet } from 'react-native';
import {
  brandBlue,
  darkText,
  grayBC,
  grayText,
  highlightBlue,
  lightGray,
} from 'app/constants/UIColors';

export const styles = StyleSheet.create({
  screenWrapper: {
    height: '100%',
    flex: 1,
    backgroundColor: UIColors.lightGray,
  },
  queueHeader: {
    height: 120,
  },
  queueHeaderContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  queueProfile: {
    marginHorizontal: 8,
    width: 80,
  },
  queueProfileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: UIColors.highlightBlue,
    overflow: 'hidden',
  },
  queueProfileOnlineCheck: {
    position: 'absolute',
    right: 2,
    top: 2,
    height: 3,
    width: 6,
    borderRadius: 3,
  },
  queueProfileImage: {
    height: '100%',
    width: '100%',
  },
  queueProfileImageText: {
    ...montserratFontRegular500,
    fontSize: 26,
    color: UIColors.highlightBlue,
  },
  queueProfileName: {
    color: UIColors.highlightBlue,
    ...montserratFontRegular500,
    fontSize: 10,
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
  },
  queuePendingContainer: {
    flex: 1,
  },
  queuePendingTitleContainer: {
    alignItems: 'center',
    marginLeft: 16,
    marginVertical: 15,
    flexDirection: 'row',
  },
  queuePendingTitleContainerText: {
    ...montserratFontBold600,
    fontSize: 16,
    color: UIColors.deepBlue,
  },
  queuePendingTitleContainerTextNumberContainer: {
    marginLeft: 10,
    backgroundColor: UIColors.grayBC,
    borderRadius: 4,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queuePendingTitleContainerTextNumber: {
    ...montserratFontBold600,
    fontSize: 17,
    color: UIColors.darkText,
  },
  queuePendingEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  queuePendingEmptyText: {
    ...montserratFontRegular500,
    fontSize: 18,
    color: UIColors.brandBlue,
  },
  queuePendingWrapper: {
    width: '100%',
  },
  queuePendingRequestItem: {
    width: '100%',
    padding: 16,
  },
  queuePendingRequestItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  queuePendingRequestItemButtonContainer: {
    justifyContent: 'center',
  },
  queuePendingRequestItemAvatarContainer: {
    width: '20%',
  },
  queuePendingRequestItemAvatar: {
    width: 43,
    height: 54,
  },
  queuePendingRequestItemText: {
    ...montserratFontRegular500,
    fontSize: 12,
    letterSpacing: 1,
    width: '80%',
  },
  queuePendingRequestItemName: {
    color: UIColors.highlightBlue,
  },
  queuePendingRequestItemDescription: {
    color: UIColors.grayText,
  },
  queuePendingRequestItemBtn: {
    height: 33,
    width: 119,
    borderRadius: 12,
    backgroundColor: UIColors.brandBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  queuePendingRequestItemBtnDecline: {
    backgroundColor: UIColors.grayBC,
  },
  queuePendingRequestItemBtnTitle: {
    ...montserratFontBold600,
    fontSize: 14,
    color: UIColors.white,
  },
  queuePendingRequestItemBtnTitleDecline: {
    color: UIColors.darkText,
  },
});
