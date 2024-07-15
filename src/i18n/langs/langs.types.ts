export type LangsType = {
  general: {
    facebook: string;
    phoneNumber: string;
    terms: string;
    privacy: string;
    and: string;
    ok: string;
    next: string;
    back: string;
    cancel: string;
    confirm: string;
    messageMe: string;
    blockMe: string;
    unblockMe: string;
    gender: string;
    open: string;
    openSettings: string;
    visibility: string;
    visible: string;
    invisible: string;
    genders: {
      male: string;
      female: string;
      preferNotToSay: string;
    };
    continue: string;
    yes: string;
    no: string;
    skip: string;
    today: string;
    yesterday: string;
    select: string;
    delete: string;
    permissionModal: {
      title: string;
      message: string;
    };
  };
  bottomTabs: {
    queue: string;
    chat: string;
    map: string;
    profile: string;
  };
  authScreen: {
    registrationRules: string;
  };
  loginScreen: {
    yourPhone: string;
    confirmationModal: {
      title: string;
      message: string;
    };
  };
  registrationSurveyScreen: {
    name: {
      title: string;
      description: string;
      placeholderFirstName: string;
      placeholderLastName: string;
      error: string;
    };
    age: {
      title: string;
      description: string;
      error: string;
    };
    gender: {
      title: string;
      description: string;
    };
    email: {
      title: string;
      placeholder: string;
      error: string;
    };
    phone: {
      title: string;
      placeholder: string;
      error: string;
    };
    jod: {
      title: string;
      titlePlaceholder: string;
      companyPlaceholder: string;
      errorTitle: string;
      errorCompany: string;
    };
    quote: {
      title: string;
      description: string;
      placeholder: string;
      error: string;
    };
  };
  OTPVerificationScreen: {
    title: string;
    resendCode: string;
    resendTimer: string;
  };
  terms: {
    title: string;
    text: string;
  };
  privacy: {
    title: string;
    text: string;
  };
  mapScreen: {
    menu: {
      title: string;
      distance: string;
      feets: string;
    };
    viewProfile: string;
    wasHere: string;
    requestVisibility: {
      title: string;
      message: string;
    };
    messages: {
      pendingPosition: string;
      noAccess: string;
    };
    locationStatusModal: {
      title: string;
      accessDenied: string;
      locationUnavailable: string;
    };
  };
  profileScreen: {
    quote: string;
    aboutMe: string;
    email: string;
    currentJob: string;
    currentCompany: string;
    education: string;
    loadMore: string;
    hide: string;
    editProfile: string;
    phone: string;
  };
  errors: {
    invalidEmail: string;
    unauthorized: string;
    invalid_fb_account: string;
    invalid_phone: string;
    invalid_confirmation_code: string;
    uploading_file_count_range_max: string;
    removing_file_count_range_max: string;
    invalid_limit_range: string;
    empty_request_data: string;
    account_not_exists: string;
    conversation_request_already_sent: string;
    conversation_request_not_found: string;
    only_receiver_can_accept_conversation_request: string;
    only_receiver_can_reject_conversation_request: string;
    only_sender_can_cancel_conversation_request: string;
    conversation_too_long_message: string;
    not_found: string;
    bad_file_error: string;
    default_error: string;
    image_not_exists_in_gallery: string;
    verification_service_verification_error: string;
    verification_service_invalid_number: string;
    account_banned: string;
    invalid_message_text: string;
    required_gender: string;
    ban_user_already_banned: string;
    ban_user_not_banned: string;
  };
  queueScreen: {
    emptyRequests: string;
    accept: string;
    decline: string;
    pendingDescription: string;
    requests: string;
  };
  chatScreen: {
    emptyRooms: string;
    deleteConfirmation: {
      title: string;
      message: string;
    };
  };
  messageModal: {
    title: string;
    send: string;
  };
  usersProfilesScreen: {
    statusModal: {
      title: string;
      messageBySender: string;
      messageByReceiver: string;
      titleError: string;
      ignored: string;
      rejected: string;
    };
    blockModal: {
      title: string;
      message: string;
      buttonTitle: string;
    };
    unblockModal: {
      title: string;
      message: string;
      buttonTitle: string;
    };
  };
  editProfileScreen: {
    namePlaceholder: string;
    jodPlaceholder: string;
    genderLabel: string;
    quoteLabel: string;
    galleryLabel: string;
    galleryDescription: string;
    emailPlaceHolder: string;
    companyLabel: string;
    companyPlaceHolder: string;
    educationLabel: string;
    phonePlaceholder: string;
    phoneLabel: string;
    safeArea: string;
    makePrivate: string;
    update: string;
    logout: string;
    deleteAccount: string;
    private: string;
    change: string;
    avatar: string;
    deleteAccountModalTitle: string;
    deleteAccountModalMessage: string;
    selectGenderPlaceholder: string;
    mapVisibilityPlaceholder: string;
    errors: {
      nameRequired: string;
      genderRequired: string;
    };
  };
  countryCodesScreen: {
    filterPlaceholder: string;
  };
  noConnectionScreen: {
    noConnectionText: string;
  };
};
