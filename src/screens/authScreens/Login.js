import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Modal,
  Linking,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import Colors from '../../styles/Colors';
import ImagePath from '../../constant/ImagePath';
import TextView from '../../components/TextView';
import InputFields from '../../components/InputFields';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import AllString from '../../constant/AllString';
import {useDispatch, useSelector} from 'react-redux';
import {handleDial_code, saveUserData} from '../../store/slices/auth';
import NavigationString from '../../Navigations/NavigationString';
import {useFormik} from 'formik';
import {LoginSchema} from '../../Services/Validation';
import {Call_PostServices} from '../../Services/Services';
import {Login_API} from '../../config/Url';
import Loading from '../../components/Loading';
import {LocalStorage} from '../../utils/LocalStorage';
import CustomAlert from '../../components/CustomAlert';
import WebView from 'react-native-webview';
// import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const dispatch = useDispatch();
  const {dial_code} = useSelector(state => state.auth);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); //state manage to handle custom loader
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); //state manage show/hide password

  const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
  const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
  const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  const handleForgotPassword = useCallback(() => {
    // dispatch(handleDial_code('27'));
    // navigation.navigate(NavigationString.ForgotScreen);
    const url = 'https://eservices.cipc.co.za/Customer_reset.aspx';
    Linking.openURL(url).catch(err => console.error("Couldn't open URL", err));
  }, []);

  // Handle successful login
  const handleLoginbutton = useCallback(
    async values => {
      const payload = {
        // dial_code: dial_code,
        // phone: values.phoneNumber,
        // password: values.password,
        // fcmToken: global.fcmToken,
        username: values.phoneNumber,
        password: values.password,
      };

      // const onsuccess = response => {
      //   console.log(payload, '-----login payload----', response);
      //   dispatch(saveUserData(response));
      //   LocalStorage.set('userInfo', JSON.stringify(response));
      //   LocalStorage.set('token', response?.token);
      // };
      // Call_PostServices2(onsuccess, () => {}, Login_API, payload);

      setIsLoading(true);
      const response = await Call_PostServices(Login_API, payload);
      setIsLoading(false);
      console.log(response, '-----login payload----', payload);
      if (response?.email) {
        dispatch(saveUserData(response));
        LocalStorage.set('userInfo', JSON.stringify(response));
        LocalStorage.set('token', response?.token);
      } else if (response?.status === 500) {
        setAlertTitle('Alert');
        setAlertDescription('Server error');
        setAlertShow(true);
      }
    },
    [dial_code],
  );

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
      // phoneNumber: 'T50228',
      // password: 'Junior2020',
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      // Call Handle login
      handleLoginbutton(values);
    },
  });

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

            <Modal animated={true} transparent={true} visible={isLoading}>
              <Loading />
            </Modal>
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
                  Sign IN to your Account
                </TextView>
              </View>
              <View style={{flex: 0.2}}>
                <Image source={ImagePath.rightCircle} />
              </View>
            </View>
            <View style={styles.viewContainer}>
              <TextView heading headingTextSty={styles.headingSty}>
                Enter Your Details
              </TextView>

              {/* Phone Number Input */}
              <TextView textSty={styles.labelSty}>
                Username/ Customer code
              </TextView>
              <InputFields
                placeholder={'Enter username'}
                value={formik.values.phoneNumber}
                onChangeText={formik.handleChange('phoneNumber')}
                // keyboardType="phone-pad"
                // maxLength={15}
                selectionColor={Colors.White}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.phoneNumber}
                </TextView>
              ) : null}

              {/* Password Input */}
              <TextView textSty={{...styles.labelSty, marginTop: 20}}>
                Password
              </TextView>
              <InputFields
                passwordField
                selectionColor={Colors.White}
                value={formik.values.password}
                maxLength={25}
                isPasswordVisible={isPasswordVisible}
                onChangeText={formik.handleChange('password')}
                togglePasswordVisibility={() => {
                  togglePasswordVisibility();
                }}
              />
              {formik.touched.password && formik.errors.password ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.password}
                </TextView>
              ) : null}

              {/* Forgot Password */}
              <TouchableOpacity onPress={() => handleForgotPassword()}>
                <TextView
                  textSty={{
                    ...styles.labelSty,
                    textAlign: 'right',
                    marginTop: 0,
                  }}>
                  Forgot password?
                </TextView>
              </TouchableOpacity>

              {/* Login Button */}
              <Button
                onClick={formik.handleSubmit}
                // onClick={() => handleLoginbutton()}
                btnName={AllString.LOGIN}
                buttonColor={Colors.White}
                allButtonSty={styles.loginBtnSty}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
