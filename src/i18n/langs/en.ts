import { LangsType } from './langs.types';

const terms = `Aimchat Terms of Service

Our Terms of Service are designed to help you understand how Aimchat works and the rules
you agree to follow when you use our service. By using Aimchat, you agree to these terms.

What you can do with Aimchat
Aimchat is a messaging service that allows you to communicate with others through text, voice,
and video. You can use Aimchat to send messages, make voice and video calls, share photos
and videos, and more.

Your responsibilities
When you use Aimchat, you agree to follow the law, respect others' rights, and not use the
service to harm others. You are responsible for your own behavior while using Aimchat, and you
agree not to use the service for any illegal or unauthorized purpose.

Our responsibilities
We are committed to protecting your privacy and keeping your information safe. We will use
your information to provide you with the service and to improve our products and services. We
will not share your information with third parties unless required by law.

Changes to our Terms of Service
We may update our Terms of Service from time to time, so be sure to check back for any
changes. If we make any significant changes, we will notify you.

Closing your account
If you no longer wish to use Aimchat, you can delete your account at any time. When you delete
your account, your messages, contacts, and other information will be deleted from our servers.

Thank you for using Aimchat!`;

const privacy = `Aimchat Privacy Policy

We understand the importance of your privacy and are committed to protecting your personal
information. Our Privacy Policy explains how we collect, use, and share your information when
you use our service.

What information we collect
When you use Aimchat, we collect information such as your phone number, profile name, and
profile picture. We also collect information about how you use the service, such as the
messages you send and receive, the time and date of your activity, and your device information.

How we use your information
We use your information to provide you with the service and to improve our products and
services. We may also use your information to personalize your experience, such as suggesting
contacts or groups to you. We will not share your information with third parties unless required
by law.

How we protect your information
We are committed to keeping your information safe and have implemented technical and
organizational measures to protect against unauthorized access, use, or disclosure of your
information.

Your choices
You can control how we use your information by adjusting your privacy settings. You can also
choose to delete your account and information at any time.

Changes to our Privacy Policy
We may update our Privacy Policy from time to time, so be sure to check back for any changes.
If we make any significant changes, we will notify you.

Thank you for using Aimchat!`;

export const en: LangsType = {
  general: {
    facebook: 'facebook',
    phoneNumber: 'phone number',
    terms: 'Terms of Use',
    privacy: 'Privacy Policy',
    and: 'and',
    ok: 'ok',
    next: 'Next',
    back: 'Back',
    cancel: 'Cancel',
    confirm: 'Confirm',
    messageMe: 'Message me',
    blockMe: 'Block user',
    unblockMe: 'Unblock user',
    open: 'Open',
    openSettings: 'Open Settings',
    gender: 'Gender',
    visibility: 'Visibility',
    visible: 'visible',
    invisible: 'invisible',
    genders: {
      male: 'Male',
      female: 'Female',
      preferNotToSay: 'Prefer not to say',
    },
    continue: 'Continue',
    yes: 'Yes',
    no: 'No',
    skip: 'Skip',
    today: 'Today',
    yesterday: 'Yesterday',
    select: 'Select',
    delete: 'Delete',
    permissionModal: {
      title: 'Permission not granted',
      message: 'Check your permission for this action to continue',
    },
  },
  bottomTabs: {
    queue: 'New Aims',
    chat: 'Chats',
    map: 'Map',
    profile: 'Profile',
  },
  authScreen: {
    registrationRules: 'By registration you agree to our',
  },
  loginScreen: {
    yourPhone: 'Your phone',
    confirmationModal: {
      title: 'Confirmation',
      message:
        'Your verification code will be send by SMS to the following number:',
    },
  },
  OTPVerificationScreen: {
    title: 'Type 4 digit Code in the text box below when you get text message',
    resendCode: 'Resend new code',
    resendTimer: 'You can get new code in',
  },
  terms: {
    title: 'Terms',
    text: terms,
  },
  privacy: {
    title: 'Privacy policy',
    text: privacy,
  },

  mapScreen: {
    menu: {
      title: 'Filtering',
      distance: 'Distance',
      feets: 'Feet',
    },
    wasHere: 'Was here more than 5 min. ago',
    viewProfile: 'View Profile',
    requestVisibility: {
      title: 'Do you want to be visible on map?',
      message:
        'In order for other people to find you, you need to be visible on map',
    },
    messages: {
      pendingPosition: 'Getting your position',
      noAccess:
        'Without access to your location we cannot find any users around you',
    },
    locationStatusModal: {
      title: 'Open Settings',
      accessDenied:
        'Looks like access to GPS was denied, but you can change it back in application settings!',
      locationUnavailable:
        'Looks like access to geolocations was disabled for this device, but you can change it in Geolocation settings!',
    },
  },
  profileScreen: {
    quote: 'Quote',
    aboutMe: 'About me',
    email: 'Email',
    currentJob: 'Current Job',
    currentCompany: 'Current Company',
    education: 'Education',
    loadMore: 'Load more',
    hide: 'Hide',
    editProfile: 'Edit Profile',
    phone: 'Phone',
  },
  registrationSurveyScreen: {
    name: {
      title: 'What’s your name?',
      description:
        'Using your real name makes it easier for friends to recognize.',
      placeholderFirstName: 'First name',
      placeholderLastName: 'Last name',
      error: 'Name is required',
    },
    age: {
      title: 'Are You Over The Age Of 18?',
      description: 'To use the app you need to be over the age of 18',
      error: 'You need to be over the age of 18 to use this app',
    },
    gender: {
      title: 'What’s your gender?',
      description: 'You can choose who can see this from your profile.',
    },
    email: {
      title: 'What’s Your Email Address?',
      placeholder: 'Enter your email address',
      error: 'Email is required',
    },
    phone: {
      title: 'What’s Your Phone Number?',
      placeholder: 'Enter your phone number',
      error: 'Phone number is required',
    },
    jod: {
      title: 'What’s Your Job Title?',
      titlePlaceholder: 'Job title',
      companyPlaceholder: 'Company name',
      errorTitle: 'Job title is required',
      errorCompany: 'Company name is required',
    },
    quote: {
      title: 'What’s Your Favorite Quote?',
      description: 'less than 180 letters.',
      placeholder: 'Quote',
      error: 'Quote is required',
    },
  },
  messageModal: {
    title: 'Message',
    send: 'Send',
  },
  usersProfilesScreen: {
    statusModal: {
      title: 'Request already sent',
      messageBySender: 'Waiting for respond by User',
      messageByReceiver: 'User already sent request and waits for your respond',
      titleError: 'Request cannot be sent',
      ignored:
        "You can't send a message to the user because he has restricted access.",
      rejected: 'User has declined the chat request',
    },
    blockModal: {
      buttonTitle: 'Block',
      title: 'Are you sure you want to block this user?',
      message:
        'When you block this aim, you will not receive any messages from the user. Block the user now?',
    },
    unblockModal: {
      buttonTitle: 'Unblock',
      title: 'Are you sure you want to unblock this user?',
      message:
        'This action will return a conversation with this user, if this was already created. Unblock the user now?',
    },
  },
  errors: {
    invalidEmail: 'Invalid email',
    unauthorized: 'Network error occurred, please try again',
    invalid_fb_account: 'Invalid facebook account',
    invalid_phone: 'You entered a wrong phone number',
    invalid_confirmation_code:
      'You entered the wrong code from the text message',
    ban_user_already_banned: 'User already blocked',
    ban_user_not_banned: 'User already unblocked',
    uploading_file_count_range_max:
      'You cannot upload more than 10 files at a time',
    removing_file_count_range_max:
      'Number of files to be deleted at a time exceeded',
    invalid_limit_range: 'Limit in the lists exceeds the maximum value',
    empty_request_data: 'You have not selected any files to download',
    account_not_exists: 'There is no such account registered',
    conversation_request_already_sent: 'You have already created a dialogue',
    conversation_request_not_found:
      'The dialog does not exist, so you cannot accept, reject, delete, or mute a dialog ',
    only_receiver_can_accept_conversation_request:
      'Only the recipient of the request can accept it',
    only_receiver_can_reject_conversation_request:
      'Only the recipient of the request can reject it',
    only_sender_can_cancel_conversation_request:
      'Only the initiator of the request can delete it',
    conversation_too_long_message:
      "You can't send a message longer than 1024 characters",
    not_found: 'Not found',
    bad_file_error: 'The file you are trying to upload is too large',
    default_error: 'Something went wrong, please try again later',
    image_not_exists_in_gallery: 'The image is not found',
    verification_service_verification_error:
      "Couldn't authorize you using this phone number, try later or use a different number",
    verification_service_invalid_number:
      "Couldn't authorize you using this phone number, try later or use a different number",
    account_banned: 'This account has been banned',
    invalid_message_text:
      'You used invalid format data to send as chat message',
    required_gender: 'Gender is required',
  },
  queueScreen: {
    emptyRequests: 'No pending requests',
    accept: 'Aim',
    decline: 'Decline',
    pendingDescription: 'wants to add you to aims.',
    requests: 'REQUESTS',
  },
  chatScreen: {
    emptyRooms:
      'No chat rooms available right now, try to connect with other people!',
    deleteConfirmation: {
      title: 'Are you sure you want to delete the chat?',
      message:
        "All messages would be deleted, and cannot be restored. And you also can't write messages to each other before you create new connection",
    },
  },
  editProfileScreen: {
    namePlaceholder: 'Name',
    jodPlaceholder: 'Job Title',
    genderLabel: 'Gender',
    quoteLabel: 'Quote',
    galleryLabel: 'Photo album',
    galleryDescription: 'First photo will be cover',
    companyLabel: 'Current Company',
    companyPlaceHolder: 'Company',
    emailPlaceHolder: 'Email',
    educationLabel: 'Education',
    phoneLabel: 'PhoneNumber',
    phonePlaceholder: '+91 XXX XXX-XXXX',
    safeArea: 'Safe Area',
    makePrivate: 'Make them private',
    update: 'Update',
    logout: 'Logout',
    deleteAccount: 'Delete account',
    private: 'private',
    change: 'change',
    avatar: 'Avatar',
    deleteAccountModalTitle: 'Delete account?',
    deleteAccountModalMessage: 'Your account will be deleted!',
    selectGenderPlaceholder: 'Select Gender',
    mapVisibilityPlaceholder: 'Map visibility',
    errors: {
      nameRequired: 'Name is required',
      genderRequired: 'Gender is required',
    },
  },
  countryCodesScreen: {
    filterPlaceholder: 'Filter',
  },
  noConnectionScreen: {
    noConnectionText:
      'Application needs an internet connection in order to work, please check your internet connection.',
  },
};
