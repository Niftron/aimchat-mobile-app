import React, { FC, useEffect, useMemo, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Asset } from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';
import { SelectList } from 'react-native-dropdown-select-list';
import { BaseLayout } from 'app/layouts/BaseLayout';
import { BinIcon, LogoIcon, LogoutIcon } from 'app/assets/SVG';
import { UIColors } from 'app/constants';
import { EditProfileProps } from './EditProfile.types';
import { styles } from './EditProfile.styles';
import { AppInputWithProps } from 'elements/AppInputWithProps';
import { i18n } from 'app/i18n';
import { AppButton } from 'elements/AppButton';
import { mainButtonColors } from 'app/styles';
import { BackButton } from 'elements/BackButton';
import Gallery from './Gallery/Gallery';
import { useAppDispatch, useTypedSelector } from 'app/store';
import { Separator } from 'elements/Separator';
import { UserProfileType } from 'app/types';
import {
  updateUserProfile,
  clearUserData,
} from 'app/store/slices/AuthSlice/AuthSlice';
import { useAppNavigation } from 'app/navigation';
import { KeyboardAwareLayout } from 'app/layouts/KeyboardAwareLayout';
import { InfoModal } from 'components/InfoModal';
import { ProfileService } from 'app/services/ProfileService';
import { changeVisibility } from 'app/store/slices/GeolocationSlice/GeolocationSlice';

const EditProfileScreen: FC<EditProfileProps> = () => {
  const {
    user: { gallery, profile },
    loading: { isProfileUpdating },
  } = useTypedSelector(state => state.auth);

  const { hidden } = useTypedSelector(state => state.geolocation);

  const genders = useMemo(
    () => [
      { key: 'm', value: i18n.general.genders.male },
      { key: 'f', value: i18n.general.genders.female },
      { key: 'p', value: i18n.general.genders.preferNotToSay },
    ],
    [],
  );

  const navigation = useAppNavigation();

  const [isVisible, setIsVisible] = useState(!hidden);

  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [newImages, setNewImages] = useState<Asset[]>([]);
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [defaultGender, setDefaultGender] = useState<
    | {
        key: string;
        value: string;
      }
    | undefined
  >(undefined);
  const [privateFields, setPrivateFields] = useState({
    company: profile.company_private,
    phone: profile.phone_private,
    email: profile.email_private,
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (profile.gender) {
      const defGender = genders.find(gender => {
        return gender.key === profile.gender;
      });
      if (defGender) {
        setDefaultGender(defGender);
      }
    }
  }, [profile, genders]);

  const initialValues = profile;
  const editProfileSchema = Yup.object().shape({
    user_name: Yup.string().required(
      i18n.editProfileScreen.errors.nameRequired,
    ),
    email: Yup.string().email().nullable(),
    phone: Yup.string().required(),
    gender: Yup.string().required(i18n.editProfileScreen.errors.genderRequired),
  });

  const closeDeleteAccountModal = () => {
    setDeleteAccountModalVisible(false);
  };

  const openDeleteAccountModal = () => {
    setDeleteAccountModalVisible(true);
  };

  const onSubmit = (values: UserProfileType) => {
    const newProfile = {
      ...values,
      phone_private: privateFields.phone,
      email_private: privateFields.email,
      company_private: privateFields.company,
    };

    dispatch(
      updateUserProfile({
        profile: newProfile,
        newImages,
        deletedImagesIds: deletedImages,
      }),
    ).finally(() => {
      dispatch(changeVisibility(isVisible));
      navigation.goBack();
    });
  };

  const navigateToTerms = () => {
    navigation.navigate('terms', {
      title: i18n.terms.title,
      text: i18n.terms.text,
    });
  };

  const navigateToPrivacy = () => {
    navigation.navigate('terms', {
      title: i18n.privacy.title,
      text: i18n.privacy.text,
    });
  };

  const onLogoutPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'auth' }],
    });
    dispatch(clearUserData());
    messaging().deleteToken();
  };

  const deleteAccount = () => {
    setDeleteAccountModalVisible(false);
    setTimeout(async () => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'auth' }],
      });
      await ProfileService.deleteAccount();
      dispatch(clearUserData());
      messaging().deleteToken();
    }, 200);
  };

  return (
    <BaseLayout
      style={{ backgroundColor: UIColors.lightGray }}
      topSafeAreaColor={UIColors.lightGray}
      bottomSafeAreaColor={UIColors.lightGray}
      isLoading={isProfileUpdating}>
      <KeyboardAwareLayout>
        <View style={styles.backButtonWrapper}>
          <BackButton />
        </View>
        <View style={styles.header}>
          <LogoIcon width={130} height={110} color={UIColors.black} />
          <TouchableOpacity style={styles.logoutButton} onPress={onLogoutPress}>
            <Text style={styles.logoutButtonText}>
              {i18n.editProfileScreen.logout}
            </Text>
            <LogoutIcon color={UIColors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteAccountButton}
            onPress={openDeleteAccountModal}>
            <Text style={styles.logoutButtonText}>
              {i18n.editProfileScreen.deleteAccount}
            </Text>
            <BinIcon width={25} height={25} color={UIColors.black} />
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={editProfileSchema}>
          {({ errors, touched, values, handleChange, handleSubmit }) => {
            return (
              <View style={styles.container}>
                <AppInputWithProps
                  containerStyles={styles.input}
                  inputProps={{
                    value: values.user_name,
                    onChangeText: handleChange('user_name'),
                    placeholder: i18n.editProfileScreen.namePlaceholder,
                    maxLength: 128,
                  }}
                  error={
                    errors.user_name && touched.user_name
                      ? errors.user_name
                      : ''
                  }
                />
                <AppInputWithProps
                  containerStyles={styles.input}
                  inputProps={{
                    value: values.job,
                    onChangeText: handleChange('job'),
                    placeholder: i18n.editProfileScreen.jodPlaceholder,
                    maxLength: 128,
                  }}
                />

                <View>
                  <Text style={styles.label}>
                    {i18n.editProfileScreen.genderLabel}
                  </Text>
                  <View style={styles.genderSelectionWrapper}>
                    <SelectList
                      inputStyles={[
                        styles.genderSelectionText,
                        !values.gender
                          ? styles.genderSelectionPlaceholder
                          : null,
                      ]}
                      boxStyles={styles.genderSelectionContainer}
                      dropdownStyles={styles.genderSelectionDropdown}
                      dropdownTextStyles={styles.genderSelectionText}
                      setSelected={handleChange('gender')}
                      placeholder={
                        i18n.editProfileScreen.selectGenderPlaceholder
                      }
                      data={genders}
                      search={false}
                      defaultOption={defaultGender}
                    />
                    {errors.gender ? (
                      <Text style={styles.error}>{errors.gender}</Text>
                    ) : null}
                  </View>
                </View>

                <View>
                  <Text style={styles.label}>
                    {i18n.editProfileScreen.quoteLabel}
                  </Text>
                  <TextInput
                    style={styles.textArea}
                    multiline={true}
                    value={values.quote}
                    onChangeText={handleChange('quote')}
                    maxLength={180}
                  />
                </View>

                <Separator height={30} />

                <View>
                  <Text style={styles.label}>
                    {i18n.editProfileScreen.galleryLabel}
                  </Text>
                  <Gallery
                    data={gallery}
                    onChange={setNewImages}
                    onDeleteImage={setDeletedImages}
                  />
                </View>

                <Separator height={30} />

                <AppInputWithProps
                  containerStyles={styles.input}
                  inputProps={{
                    value: values.email,
                    onChangeText: handleChange('email'),
                    placeholder: i18n.editProfileScreen.emailPlaceHolder,
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    maxLength: 128,
                  }}
                  insideButtonValue={privateFields.email}
                  insideButtonLabel={i18n.editProfileScreen.private}
                  error={errors.email && touched.email ? errors.email : ''}
                  onInsideButtonPress={value =>
                    setPrivateFields(prev => ({ ...prev, email: value }))
                  }
                />
                <AppInputWithProps
                  containerStyles={styles.input}
                  label={i18n.editProfileScreen.companyLabel}
                  inputProps={{
                    value: values.company,
                    onChangeText: handleChange('company'),
                    placeholder: i18n.editProfileScreen.companyPlaceHolder,
                    maxLength: 128,
                  }}
                  onInsideButtonPress={value =>
                    setPrivateFields(prev => ({ ...prev, company: value }))
                  }
                />
                <AppInputWithProps
                  containerStyles={styles.input}
                  label={i18n.editProfileScreen.educationLabel}
                  inputProps={{
                    value: values.education,
                    onChangeText: handleChange('education'),
                    placeholder: i18n.editProfileScreen.educationLabel,
                    maxLength: 128,
                  }}
                  onInsideButtonPress={value =>
                    setPrivateFields(prev => ({ ...prev, company: value }))
                  }
                />
                <AppInputWithProps
                  containerStyles={styles.input}
                  label={i18n.editProfileScreen.phoneLabel}
                  error={errors.phone && touched.phone ? errors.phone : ''}
                  inputProps={{
                    value: values.phone,
                    onChangeText: handleChange('phone'),
                    placeholder: i18n.editProfileScreen.phonePlaceholder,
                    keyboardType: 'phone-pad',
                    editable: false,
                    maxLength: 128,
                  }}
                  insideButtonValue={values.phone_private}
                  insideButtonLabel={i18n.editProfileScreen.private}
                  onInsideButtonPress={value =>
                    setPrivateFields(prev => ({ ...prev, phone: value }))
                  }
                />
                <AppInputWithProps
                  containerStyles={styles.input}
                  label={i18n.general.visibility}
                  inputProps={{
                    value: '',
                    placeholder:
                      i18n.editProfileScreen.mapVisibilityPlaceholder,
                    editable: false,
                  }}
                  insideButtonStyle={styles.visibilityToggle}
                  insideButtonValue={isVisible}
                  insideButtonLabel={
                    isVisible ? i18n.general.visible : i18n.general.invisible
                  }
                  onInsideButtonPress={setIsVisible}
                />
                <AppButton
                  title={i18n.editProfileScreen.update}
                  onPress={handleSubmit}
                  {...mainButtonColors}
                />
                <View style={styles.termsPrivacyWrapper}>
                  <TouchableOpacity onPress={navigateToPrivacy}>
                    <Text style={styles.termsPrivacyText}>
                      {i18n.general.privacy}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.termsPrivacyText}> & </Text>
                  <TouchableOpacity onPress={navigateToTerms}>
                    <Text style={styles.termsPrivacyText}>
                      {i18n.general.terms}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareLayout>
      <InfoModal
        visible={deleteAccountModalVisible}
        title={i18n.editProfileScreen.deleteAccountModalTitle}
        message={i18n.editProfileScreen.deleteAccountModalMessage}
        actionButtonTitle={i18n.general.delete}
        actionTitleColor={UIColors.red}
        onRequestClose={closeDeleteAccountModal}
        onActionButtonPress={deleteAccount}
      />
    </BaseLayout>
  );
};

export default EditProfileScreen;
