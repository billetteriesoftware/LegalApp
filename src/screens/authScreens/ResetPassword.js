import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Colors from '../../styles/Colors';
import ImagePath from '../../constant/ImagePath';
import TextView from '../../components/TextView';
import InputFields from '../../components/InputFields';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import AllString from '../../constant/AllString';
import {ArrowSVG} from '../../assets/svgIcons/Index';
import {useFormik} from 'formik';
import {ResetSchema} from '../../Services/Validation';
import Loading from '../../components/Loading';
import {Call_ResetPassServices} from '../../Services/Services';
import {ResetPassword_API} from '../../config/Url';
import CustomAlert from '../../components/CustomAlert';

const ResetPassword = ({route}) => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //state manage show/hide password
  const [isLoading, setIsLoading] = useState(false);

  const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
  const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
  const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false); //state manage show/hide password

  const togglePasswordVisibility = useCallback(value => {
    if (value == '1') {
      setIsPasswordVisible(prevState => !prevState);
    } else {
      setIsConfirmPasswordVisible(prevState => !prevState);
    }
  }, []);

  const handleForgotPassword = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetSchema,
    onSubmit: values => {
      // Call Handle forgot
      handleResetPassbutton(values);
    },
  });

  // Handle handle Reset Passbutton
  const handleResetPassbutton = useCallback(async values => {
    const payload = {
      new_password: values.password,
      confirm_password: values.confirmPassword,
      token: route?.params?.token,
    };
    setIsLoading(true);
    const response = await Call_ResetPassServices(ResetPassword_API, payload);

    setIsLoading(false);
    if (response?.success) {
      // dispatch(saveUserData(response.data));

      setAlertTitle('Success');
      setAlertDescription(response.message);
      setAlertShow(true);

      formik.resetForm(); // Reset form on button click
    } else if (response?.data?.statusCode === 401) {
      setAlertTitle('Alert');
      setAlertDescription(response?.data?.message);
      setAlertShow(true);
    } else {
      setAlertTitle('Alert');
      setAlertDescription(response?.message);
      setAlertShow(true);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <Modal animated={true} transparent={true} visible={isLoading}>
              <Loading />
            </Modal>

            <CustomAlert
              isLoading={alertShow}
              title={alertTitle}
              description={alertDescription}
              handleOkay={() => {
                setAlertTitle('');
                setAlertDescription('');
                setAlertShow(false);
              }}
            />

            <View style={styles.firstViewContainer}>
              <View style={{flex: 0.2}}>
                <Image source={ImagePath.leftCircle} />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flex: 0.6,
                }}>
                <Image source={ImagePath.logo} />
                <TextView heading headingTextSty={styles.titleSty}>
                  Change Password
                </TextView>
              </View>
              <View style={{flex: 0.2}}>
                <Image source={ImagePath.rightCircle} />
              </View>
            </View>
            <View style={styles.viewContainer}>
              <TextView heading headingTextSty={styles.headingSty}>
                Set new Password
              </TextView>

              {/* Password input fields */}
              <TextView textSty={styles.labelSty}>Password</TextView>
              <InputFields
                passwordField
                isPasswordVisible={isPasswordVisible}
                value={formik.values.password}
                maxLength={25}
                onChangeText={formik.handleChange('password')}
                togglePasswordVisibility={() => {
                  togglePasswordVisibility('1');
                }}
                selectionColor={Colors.White}
              />
              {formik.touched.password && formik.errors.password ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.password}
                </TextView>
              ) : null}

              {/* Confirm Password Input Field */}
              <TextView textSty={{...styles.labelSty, marginTop: 20}}>
                Confirm Password
              </TextView>
              <InputFields
                passwordField
                isPasswordVisible={isConfirmPasswordVisible}
                value={formik.values.confirmPassword}
                maxLength={25}
                onChangeText={formik.handleChange('confirmPassword')}
                togglePasswordVisibility={() => {
                  togglePasswordVisibility('2');
                }}
                selectionColor={Colors.White}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.confirmPassword}
                </TextView>
              ) : null}

              {/* Reset Password Button */}
              <Button
                onClick={formik.handleSubmit}
                btnName={AllString['Set Password']}
                buttonColor={Colors.White}
                allButtonSty={styles.loginBtnSty}
              />

              {/* Back to Login Button */}
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 25,
                }}
                onPress={() => handleForgotPassword()}>
                <ArrowSVG />
                <TextView
                  textSty={{
                    ...styles.labelSty,
                    textAlign: 'center',
                    marginTop: 0,
                    left: 10,
                  }}>
                  Back to Login
                </TextView>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.White},
  firstViewContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewContainer: {
    flex: 0.7,
    backgroundColor: Colors.TealBlue,
    borderTopLeftRadius: 27,
    borderTopRightRadius: 27,
    paddingHorizontal: 15,
    paddingBottom: 20, // Add padding for better scrolling
  },
  titleSty: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 30,
    textTransform: 'uppercase',
  },
  headingSty: {
    fontSize: 16,
    color: Colors.White,
    textAlign: 'center',
    marginTop: 30,
    textTransform: 'uppercase',
  },
  labelSty: {
    fontSize: 15,
    color: Colors.White,
    marginTop: 30,
    textTransform: 'uppercase',
  },

  loginBtnSty: {
    marginHorizontal: 0,
    paddingVertical: 15,
    marginTop: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: -8,
  },
});
