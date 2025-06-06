// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   View,
//   KeyboardAvoidingView,
//   Modal,
// } from 'react-native';
// import React, {useState, useCallback} from 'react';
// import Colors from '../../styles/Colors';
// import ImagePath from '../../constant/ImagePath';
// import TextView from '../../components/TextView';
// import InputFields from '../../components/InputFields';
// import Button from '../../components/Button';
// import {useNavigation} from '@react-navigation/native';
// import AllString from '../../constant/AllString';
// import NavigationString from '../../Navigations/NavigationString';
// import {useFormik} from 'formik';
// import {ForgotSchema} from '../../Services/Validation';
// import {Call_PostServices} from '../../Services/Services';
// import {ForgotPassword_API} from '../../config/Url';
// import Loading from '../../components/Loading';
// import CustomAlert from '../../components/CustomAlert';
// import {useSelector} from 'react-redux';

// const Forgotpassword = () => {
//   const navigation = useNavigation();
//   const {dial_code} = useSelector(state => state.auth);

//   const [isLoading, setIsLoading] = useState(false); //state manage to loader

//   const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
//   const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
//   const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box

//   // handle forgot button
//   const handleForgotbutton = useCallback(
//     async values => {
//       const payload = {
//         dial_code: dial_code,
//         phone: values.phoneNumber,
//       };
//       setIsLoading(true);
//       const response = await Call_PostServices(ForgotPassword_API, payload);
//       setIsLoading(false);
//       console.log(response.data, '====== respones es', payload);
//       if (response.success) {
//         navigation.navigate(NavigationString.OTPScreen, {
//           userId: response?.data?.user_id,
//           number: values.phoneNumber,
//         });
//       } else if (response?.data?.statusCode === 404) {
//         setAlertTitle('Alert');
//         setAlertDescription(response?.data?.message);
//         setAlertShow(true);
//       } else {
//         console.log('err==', response.message);
//       }
//     },
//     [dial_code],
//   );

//   const formik = useFormik({
//     initialValues: {
//       phoneNumber: '',
//     },
//     validationSchema: ForgotSchema,
//     onSubmit: values => {
//       // Call Handle forgot
//       handleForgotbutton(values);
//     },
//   });

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <ScrollView
//           contentContainerStyle={{flexGrow: 1}}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}>
//           <View style={{flex: 1}}>
//             {/* Loading view */}
//             <Modal animated={true} transparent={true} visible={isLoading}>
//               <Loading />
//             </Modal>

//             <CustomAlert
//               isLoading={alertShow}
//               title={alertTitle}
//               description={alertDescription}
//               handleOkay={() => {
//                 setAlertTitle('');
//                 setAlertDescription('');
//                 setAlertShow(false);
//               }}
//             />

//             <View style={styles.firstViewContainer}>
//               <View style={{flex: 0.2}}>
//                 <Image source={ImagePath.leftCircle} />
//               </View>
//               <View
//                 style={{
//                   alignItems: 'center',
//                   flex: 0.6,
//                 }}>
//                 <Image source={ImagePath.logo} />
//                 <TextView heading headingTextSty={styles.titleSty}>
//                   Forgot password
//                 </TextView>
//               </View>
//               <View style={{flex: 0.2}}>
//                 <Image source={ImagePath.rightCircle} />
//               </View>
//             </View>
//             <View style={styles.viewContainer}>
//               <TextView heading headingTextSty={styles.headingSty}>
//                 Enter Your Phone Number
//               </TextView>

//               {/* Phone Number Input */}
//               <TextView textSty={styles.labelSty}>Phone</TextView>
//               <InputFields
//                 value={formik.values.phoneNumber}
//                 onChangeText={formik.handleChange('phoneNumber')}
//                 keyboardType="phone-pad"
//                 maxLength={15}
//                 selectionColor={Colors.White}
//               />
//               {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
//                 <TextView textSty={styles.errorText}>
//                   {formik.errors.phoneNumber}
//                 </TextView>
//               ) : null}

//               {/* Send OTP Button */}
//               <Button
//                 onClick={formik.handleSubmit}
//                 btnName={AllString['Send OTP']}
//                 buttonColor={Colors.White}
//                 allButtonSty={styles.loginBtnSty}
//               />
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default Forgotpassword;

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: Colors.White},
//   firstViewContainer: {
//     flex: 0.3,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   viewContainer: {
//     flex: 0.7,
//     backgroundColor: Colors.TealBlue,
//     borderTopLeftRadius: 27,
//     borderTopRightRadius: 27,
//     paddingHorizontal: 15,
//     paddingBottom: 20, // Add padding for better scrolling
//   },
//   titleSty: {
//     fontSize: 22,
//     textAlign: 'center',
//     marginTop: 30,
//     textTransform: 'uppercase',
//   },
//   headingSty: {
//     fontSize: 16,
//     color: Colors.White,
//     textAlign: 'center',
//     marginTop: 30,
//     textTransform: 'uppercase',
//   },
//   labelSty: {
//     fontSize: 15,
//     color: Colors.White,
//     marginTop: 30,
//     textTransform: 'uppercase',
//   },

//   loginBtnSty: {
//     marginHorizontal: 0,
//     paddingVertical: 15,
//     marginTop: 40,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 10,
//     lineHeight: 12,
//     top: -8,
//   },
// });

import {StyleSheet, Text, Linking} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const Forgotpassword = () => {
  return (
    <WebView
      source={{uri: 'https://eservices.cipc.co.za/Customer_reset.aspx'}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

export default Forgotpassword;

const styles = StyleSheet.create({});
