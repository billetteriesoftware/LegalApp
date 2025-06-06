import {useFormik} from 'formik';
import React, {useCallback, useState} from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  Call_InstancePutServices,
  Call_MediaUploadServices,
} from '../../Services/Services';
import {ProfileSchema} from '../../Services/Validation';
import {
  EmailSVG,
  FisrtNameICONSVG,
  LocationSVG,
  PhoneSVG,
} from '../../assets/svgIcons/Index';
import Button from '../../components/Button';
import CustomAlert from '../../components/CustomAlert';
import Header from '../../components/Header';
import InputFields from '../../components/InputFields';
import Loading from '../../components/Loading';
import TextView from '../../components/TextView';
import {
  EditProfie_API,
  Image_URL,
  UploadProfileImage_API,
} from '../../config/Url';
import ImagePath from '../../constant/ImagePath';
import {EnumForStoreImaage} from '../../constant/Label';
import {saveProfileData} from '../../store/slices/auth';
import Colors from '../../styles/Colors';
import FontFamily from '../../styles/FontFamily';

const AccountInfo = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {profileData} = useSelector(state => state.auth); // getting profile data from store
  const [editIconShow, setEditIconShow] = useState(route?.params?.editStatus); //manage to show and hide edit svg icon
  const [selectedImage, setSelectedImage] = useState(''); // state manage to update image path
  const [isLoading, setIsLoading] = useState(false); // state manage to loading

  const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
  const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
  const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box

  const handleEdit = useCallback(() => {
    setEditIconShow(true);
  }, [navigation]);

  const handleSelectTrademarkNature = useCallback(value => {
    // console.log('Selected Trademark Nature:', value);
    formik.setFieldValue('gender', value.value);
  }, []);

  const uploadImage = async imageUri => {
    // image path add in form data
    const formData = new FormData();
    formData.append('media', {
      uri: imageUri,
      type: 'image/jpeg', // Change based on image type
      name: 'uploaded_image.jpg',
    });

    formData.append('folder', EnumForStoreImaage.PROFILE);
    setIsLoading(true);
    const imgRes = await Call_MediaUploadServices(
      UploadProfileImage_API,
      formData,
    );
    setIsLoading(false);
    if (imgRes?.success) {
      setSelectedImage(imgRes?.data[0]?.shortPath);
    }
  };

  // Open Image Library
  const openGallery = () => {
    let options = {
      mediaType: 'photo',
      quality: 1, // Image quality (1 = best)
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        console.log('upload images --', imageUri);
        uploadImage(imageUri);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      dial_code: profileData?.dial_code,
      first_name: profileData?.usR_Names,
      last_name: profileData.last_name,
      email: profileData.usR_EmailAccount,
      phone: profileData.phoneNumber,
      gender: profileData.gender,
      street_address: profileData.streetAddress,
      city: profileData.streetCity,
      country: profileData.country,
      province: profileData.state,
      postal_code: profileData.postalCode,
      image: selectedImage ? selectedImage : profileData.image,
    },
    validationSchema: ProfileSchema,
    onSubmit: values => {
      console.log('Form submitted', values);
      handleEditProfilebutton(values);
      // Handle form submission
    },
  });

  // Handle successful login
  const handleEditProfilebutton = useCallback(async values => {
    console.log('before payload image path', selectedImage);
    const payload = {
      image: values.image,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      dial_code: profileData?.dial_code,
      country_code: profileData?.country_code,
      phone: values.phone,
      address: values?.street_address,
      city: values?.city,
      state: values?.province,
      pincode: values?.postal_code,
      // lat:'',
      // lng:''
      // lat: 30.704649,
      // lng: 76.717873,
    };
    setIsLoading(true);
    // here call put services from services/Services.js
    const response = await Call_InstancePutServices(EditProfie_API, payload);

    setIsLoading(false);
    if (response?.success) {
      dispatch(saveProfileData(response?.data));
      setAlertTitle('Alert');
      setAlertDescription(response?.message);
      setAlertShow(true);
    } else if (response?.data?.statusCode === 401) {
      setAlertTitle('Alert');
      setAlertDescription(response?.data?.message);
      setAlertShow(true);
    } else {
      setAlertTitle('Alert');
      setAlertDescription(response.message);
      setAlertShow(true);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      {editIconShow == false ? (
        <Header
          arrowBack
          // editProfileimg
          title={'Account Info'}
          rightClick={() => navigation.goBack()}
          clickEditProfile={handleEdit}
        />
      ) : (
        <Header
          arrowBack
          title={'Account Info'}
          rightClick={() =>
            route?.params?.editStatus === true
              ? navigation.goBack()
              : editIconShow
              ? setEditIconShow(false)
              : navigation.goBack()
          }
          clickNotification={() => {
            // navigation.goBack();
          }}
        />
      )}

      <CustomAlert
        isLoading={alertShow}
        title={alertTitle}
        description={alertDescription}
        handleOkay={() => {
          navigation.goBack();
          setAlertTitle('');
          setAlertDescription('');
          setAlertShow(false);
        }}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Modal animated={true} transparent={true} visible={isLoading}>
            <Loading />
          </Modal>

          <View style={styles.header} />
          <View style={styles.profileContainer}>
            <Image
              source={
                selectedImage
                  ? {uri: Image_URL + selectedImage}
                  : profileData?.image
                  ? {uri: Image_URL + profileData?.image}
                  : ImagePath.imageProfile
              }
              style={styles.profileImage}
            />

            {/* <TouchableOpacity
              style={styles.editIcon}
              onPress={() => {
                openGallery();
              }}>
              <CameraIconSVG />
            </TouchableOpacity> */}
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <TextView textSty={styles.labelSty}>Full Name</TextView>
              <InputFields
                editable={editIconShow}
                inputFieldIcon={<FisrtNameICONSVG />}
                profileSection
                placeholder={'Enter First Name'}
                fieldStyle={styles.inputField}
                value={formik.values.first_name}
                onChangeText={formik.handleChange('first_name')}
                maxLength={30}
              />
              {formik.touched.first_name && formik.errors.first_name ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.first_name}
                </TextView>
              ) : null}
            </View>
            {/* <View style={styles.inputBox}>
              <TextView textSty={styles.labelSty}>Last Name</TextView>
              <InputFields
                editable={editIconShow}
                inputFieldIcon={<FisrtNameICONSVG />}
                profileSection
                placeholder={'Enter Last Name'}
                fieldStyle={styles.inputField}
                value={formik.values.last_name}
                onChangeText={formik.handleChange('last_name')}
                maxLength={30}
              />
              {formik.touched.last_name && formik.errors.last_name ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.last_name}
                </TextView>
              ) : null}
            </View> */}
            <View style={styles.inputBox}>
              <TextView textSty={styles.labelSty}>Email</TextView>
              <InputFields
                editable={editIconShow}
                inputFieldIcon={<EmailSVG />}
                profileSection
                placeholder={'Enter Email'}
                fieldStyle={styles.inputField}
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                maxLength={30}
              />
            </View>
            <View style={styles.inputBox}>
              <TextView textSty={styles.labelSty}>Phone</TextView>
              <InputFields
                editable={editIconShow}
                inputFieldIcon={<PhoneSVG />}
                profileSection
                placeholder={'Enter Phone'}
                fieldStyle={styles.inputField}
                value={formik.values.phone}
                onChangeText={formik.handleChange('phone')}
                maxLength={30}
                keyboardType="phone-pad"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.phone}
                </TextView>
              ) : null}
            </View>
            {/* <View style={styles.inputBox}>
              <CustomDropdown
                genderIcon
                disabled={editIconShow == false ? true : false}
                label={'Gender'}
                placeholder="Select Gender"
                data={GenderEnums}
                values={formik.values.gender}
                onSelect={handleSelectTrademarkNature}
              />
              {formik.touched.gender && formik.errors.gender ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.gender}
                </TextView>
              ) : null}
            </View> */}
            <View style={styles.inputBox}>
              <TextView textSty={styles.labelSty}>Street Address</TextView>
              <InputFields
                inputFieldIcon={<LocationSVG />}
                profileSection
                editable={editIconShow}
                placeholder={'Enter Street Address'}
                fieldStyle={styles.inputField}
                value={formik.values.street_address}
                onChangeText={formik.handleChange('street_address')}
                maxLength={30}
              />
              {formik.touched.street_address && formik.errors.street_address ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.street_address}
                </TextView>
              ) : null}
            </View>
            <View style={styles.addView}>
              <View style={styles.addressSty}>
                <TextView textSty={styles.labelSty}>City</TextView>
                <InputFields
                  inputFieldIcon={<LocationSVG />}
                  editable={editIconShow}
                  profileSection
                  placeholder={'City'}
                  fieldStyle={styles.inputField}
                  value={formik.values.city}
                  onChangeText={formik.handleChange('city')}
                  maxLength={30}
                />
                {formik.touched.city && formik.errors.city ? (
                  <TextView textSty={styles.errorText}>
                    {formik.errors.city}
                  </TextView>
                ) : null}
              </View>
              <View style={styles.addressSty}>
                <TextView textSty={styles.labelSty}>Postal Code</TextView>
                <InputFields
                  inputFieldIcon={<LocationSVG />}
                  profileSection
                  placeholder={'Postal code'}
                  fieldStyle={styles.inputField}
                  editable={editIconShow}
                  value={formik.values.postal_code}
                  onChangeText={formik.handleChange('postal_code')}
                  maxLength={30}
                />
                {formik.touched.postal_code && formik.errors.postal_code ? (
                  <TextView textSty={styles.errorText}>
                    {formik.errors.postal_code}
                  </TextView>
                ) : null}
              </View>
            </View>
            {/* <View style={styles.addView}>
              <View style={styles.addressSty}>
                <TextView textSty={styles.labelSty}>Province</TextView>
                <InputFields
                  inputFieldIcon={<LocationSVG />}
                  profileSection
                  placeholder={'Province'}
                  fieldStyle={styles.inputField}
                  editable={editIconShow}
                  value={formik.values.province}
                  onChangeText={formik.handleChange('province')}
                  maxLength={30}
                />
                {formik.touched.province && formik.errors.province ? (
                  <TextView textSty={styles.errorText}>
                    {formik.errors.province}
                  </TextView>
                ) : null}
              </View>
              <View style={styles.addressSty}>
                <TextView textSty={styles.labelSty}>Country</TextView>
                <InputFields
                  inputFieldIcon={<LocationSVG />}
                  editable={editIconShow}
                  profileSection
                  placeholder={'Country'}
                  fieldStyle={styles.inputField}
                  value={formik.values.country}
                  onChangeText={formik.handleChange('country')}
                  maxLength={30}
                />
                {formik.touched.country && formik.errors.country ? (
                  <TextView textSty={styles.errorText}>
                    {formik.errors.country}
                  </TextView>
                ) : null}
              </View>
            </View> */}
          </View>

          {/* ============Cancel / Save Button============ */}
          {editIconShow && (
            <View style={styles.btnView}>
              <View style={styles.innerViewBtn}>
                <Button
                  onClick={() => {
                    navigation.goBack();
                  }}
                  btnName={'Cancel'}
                  buttonColor={Colors.gray}
                  allButtonSty={{
                    ...styles.loginBtnSty,
                    backgroundColor: Colors.White,
                  }}
                />
              </View>
              <View style={styles.innerViewBtn}>
                <Button
                  onClick={formik.handleSubmit}
                  btnName={'Save'}
                  buttonColor={Colors.White}
                  allButtonSty={{
                    ...styles.loginBtnSty,
                    backgroundColor: Colors.MantisGreen,
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
  },
  header: {
    borderTopWidth: 1,
    borderTopColor: Colors.lineTealBlue,
    height: 100,
    backgroundColor: Colors.TealBlue,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileContainer: {alignItems: 'center', marginTop: -80},
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 6,
    borderColor: Colors.TealBlue,
  },
  editIcon: {
    position: 'absolute',
    right: 95,
    bottom: 50,
  },
  inputContainer: {marginHorizontal: 16},

  addView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  addressSty: {
    width: '47%',
  },
  inputField: {
    width: '80%',
    maxLength: 40,
    fontFamily: FontFamily.Bold,
    fontSize: 15,
    lineHeight: 20.49,
    color: Colors.Black1,
  },
  labelSty: {
    fontSize: 14,
    lineHeight: 19.12,
    fontFamily: FontFamily.Medium,
    color: Colors.gray4,
    textTransform: 'uppercase',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 25,
  },
  innerViewBtn: {width: '45%'},
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginTop: 15,
  },
  inputBox: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: -8,
  },
});
