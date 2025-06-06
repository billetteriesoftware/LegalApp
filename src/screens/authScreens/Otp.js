import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Colors from "../../styles/Colors";
import ImagePath from "../../constant/ImagePath";
import TextView from "../../components/TextView";
import { useNavigation } from "@react-navigation/native";
import NavigationString from "../../Navigations/NavigationString";
import { Call_PostServices } from "../../Services/Services";
import { ForgotPassword_API, OTPVerification_API } from "../../config/Url";
import Loading from "../../components/Loading";
import FlashMessage, { showMessage } from "react-native-flash-message";
import CustomAlert from "../../components/CustomAlert";
import { useSelector } from "react-redux";

const Otp = ({ route }) => {
  const { dial_code } = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); //state manage to loader

  const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
  const [alertTitle, setAlertTitle] = useState(""); //state manage to show title in alert box
  const [alertDescription, setAlertDescription] = useState(""); //state manage to show description in alert box

  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleInputChange = (text, index) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Auto-focus to the next input field
      if (text && index < otp.length - 1) {
        const nextInput = `otpInput${index + 1}`;
        inputs[nextInput]?.focus();
      } else if (!text && index > 0) {
        const prevInput = `otpInput${index - 1}`;
        inputs[prevInput]?.focus();
      }
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      const fullOtp = otp.join("");
      console.log("Full OTP entered:", fullOtp);
      callOtpApi(fullOtp);
    }
  }, [otp]);

  const callOtpApi = async (otp) => {
    const otpString = otp.toString().replace(/,/g, "");
    try {
      const payload = { id: route?.params?.userId, otp: otpString };
      const response = await Call_PostServices(OTPVerification_API, payload);
      console.log(response, "====== respones es", route?.params);
      // console.log('verify otp res====',response?.data?.token)
      if (response.success) {
        showMessage({
          message: "Success",
          description: response?.message,
          type: "success", // 'success', 'danger', 'info', 'warning'
          position: "bottom", // Move toast to the bottom
        });

        setTimeout(() => {
          navigation.navigate(NavigationString.ResetPasswordScreen, {
            token: response?.data?.token,
          });
        }, 500);
      } else {
        setAlertTitle("Alert");
        setAlertDescription(
          response.message || "Invalid OTP. Please try again."
        );
        setAlertShow(true);
      }
    } catch (error) {
      setAlertTitle("Alert");
      setAlertDescription(
        "An error occurred while verifying the OTP. Please try again."
      );
      setAlertShow(true);
    }
  };

  const inputs = {};

  const handleKeyPress = (key) => {
    const nextEmptyIndex = otp.findIndex((val) => val === ""); // Find the next empty box
    const lastFilledIndex = otp.reduce(
      (acc, val, idx) => (val ? idx : acc),
      -1
    ); // Last filled box

    if (key === "X") {
      // Handle delete
      if (lastFilledIndex !== -1) {
        const newOtp = [...otp];
        newOtp[lastFilledIndex] = ""; // Clear the last filled input
        setOtp(newOtp);
      }
    } else if (typeof key === "string" && !isNaN(key)) {
      // Handle numeric input
      if (nextEmptyIndex !== -1) {
        const newOtp = [...otp];
        newOtp[nextEmptyIndex] = key; // Fill the next empty box
        setOtp(newOtp);
      }
    }
  };

  const handleResendOTP = async () => {
    const payload = {
      dial_code: dial_code,
      phone: route.params.number,
    };
    setIsLoading(true);
    const response = await Call_PostServices(ForgotPassword_API, payload);
    // console.log(payload, "---resend otp res---", response);
    setIsLoading(false);
    if (response.success) {
      showMessage({
        message: "Success",
        // description: response?.message,
        description: "Otp sent successfully",
        type: "success", // 'success', 'danger', 'info', 'warning'
        position: "bottom", // Move toast to the bottom
      });
    } else {
      showMessage({
        message: "Alert",
        description: response?.message,
        type: "danger", // 'success', 'danger', 'info', 'warning'
        position: "bottom", // Move toast to the bottom
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            {/* Loading view */}
            <Modal animated={true} transparent={true} visible={isLoading}>
              <Loading />
            </Modal>
            <FlashMessage position="bottom" />

            <CustomAlert
              isLoading={alertShow}
              title={alertTitle}
              description={alertDescription}
              handleOkay={() => {
                setAlertTitle("");
                setAlertDescription("");
                setAlertShow(false);
              }}
            />

            <View style={styles.firstViewContainer}>
              <View style={{ flex: 0.2 }}>
                <Image source={ImagePath.leftCircle} />
              </View>
              <View
                style={{
                  alignItems: "center",
                  flex: 0.6,
                }}>
                <Image source={ImagePath.logo} />
                <TextView heading headingTextSty={styles.titleSty}>
                  Otp Verification
                </TextView>
              </View>
              <View style={{ flex: 0.2 }}>
                <Image source={ImagePath.rightCircle} />
              </View>
            </View>
            <View style={styles.viewContainer}>
              <TextView heading headingTextSty={styles.headingSty}>
                Enter your OTP
              </TextView>

              <View style={styles.otpContainer}>
                {otp.map((value, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputs[`otpInput${index}`] = ref)}
                    style={styles.otpInput}
                    keyboardType="numeric"
                    maxLength={1}
                    value={value}
                    onChangeText={(text) => {
                      handleInputChange(text, index);
                    }}
                    onFocus={() => Keyboard.dismiss()}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                  />
                ))}
              </View>

              <TouchableOpacity
                onPress={
                  () => handleResendOTP()
                  // navigation.navigate(NavigationString.ResetPasswordScreen)
                }
                style={styles.resendContainer}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>

              <View style={styles.keyboardContainer}>
                {/* Row 1 */}
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("1")}>
                    <Text style={styles.keyText}>1</Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("2")}>
                    <Text style={styles.keyText}>2</Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("3")}>
                    <Text style={styles.keyText}>3</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.horizontalLine} />

                {/* Row 2 */}
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("4")}>
                    <Text style={styles.keyText}>4</Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("5")}>
                    <Text style={styles.keyText}>5</Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("6")}>
                    <Text style={styles.keyText}>6</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.horizontalLine} />

                {/* Row 3 */}
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("7")}>
                    <Text style={styles.keyText}>7</Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("8")}>
                    <Text style={styles.keyText}>8</Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("9")}>
                    <Text style={styles.keyText}>9</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.horizontalLine} />

                {/* Row 4 */}
                <View style={styles.row}>
                  <TouchableOpacity style={styles.key} onPress={() => {}}>
                    <Text style={styles.keyText}></Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("0")}>
                    <Text style={styles.keyText}>0</Text>
                  </TouchableOpacity>
                  <View style={styles.verticalLine} />
                  <TouchableOpacity
                    style={styles.key}
                    onPress={() => handleKeyPress("X")}>
                    <Text style={styles.keyText}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.White },
  firstViewContainer: {
    flex: 0.3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    textAlign: "center",
    marginTop: 30,
    textTransform: "uppercase",
  },
  headingSty: {
    fontSize: 16,
    color: Colors.White,
    textAlign: "center",
    marginVertical: 30,
    textTransform: "uppercase",
  },
  labelSty: {
    fontSize: 15,
    color: Colors.White,
    marginTop: 30,
    textTransform: "uppercase",
  },

  loginBtnSty: {
    marginHorizontal: 0,
    paddingVertical: 15,
    marginTop: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  otpInput: {
    backgroundColor: "#FFF",
    width: 40,
    height: 50,
    textAlign: "center",
    borderRadius: 5,
    fontSize: 18,
  },
  resendContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  resendText: {
    color: "#FFF",
    textDecorationLine: "underline",
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  key: {
    width: "30%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  keyText: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
  },
  keyboardContainer: {
    width: "100%",
    marginTop: 10,
    // backgroundColor: '#00796B',
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  key: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  keyText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  verticalLine: {
    width: 1,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
});

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';

// const Otp = () => {
//   const [otp, setOtp] = useState(new Array(6).fill(''));

//   const handleInputChange = (text, index) => {
//     if (text.length <= 1) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);

//       // Auto-focus to the next input field
//       if (text && index < otp.length - 1) {
//         const nextInput = `otpInput${index + 1}`;
//         const nextField = inputs[nextInput];
//         if (nextField) {
//           nextField.focus();
//         }
//       }
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
//       const prevInput = `otpInput${index - 1}`;
//       const prevField = inputs[prevInput];
//       if (prevField) {
//         prevField.focus();
//       }
//     }
//   };

//   const inputs = {};

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <View style={styles.logoContainer}>
//         {/* Replace with your logo */}
//         <Text style={styles.logo}>LOGO</Text>
//       </View>
//       <Text style={styles.title}>OTP VERIFICATION</Text>
//       <Text style={styles.subtitle}>ENTER YOUR OTP</Text>

//       <View style={styles.otpContainer}>
//         {otp.map((value, index) => (
//           <TextInput
//             key={index}
//             ref={ref => (inputs[`otpInput${index}`] = ref)}
//             style={styles.otpInput}
//             keyboardType="numeric"
//             maxLength={1}
//             value={value}
//             onChangeText={text => handleInputChange(text, index)}
//             onKeyPress={e => handleKeyPress(e, index)}
//           />
//         ))}
//       </View>

//       <TouchableOpacity style={styles.resendContainer}>
//         <Text style={styles.resendText}>Resend OTP</Text>
//       </TouchableOpacity>

//       <View style={styles.keypad}>
//         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0].map(key => (
//           <TouchableOpacity
//             key={key}
//             style={styles.key}
//             onPress={() => {
//               const index = otp.findIndex(val => val === '');
//               if (index !== -1 && typeof key === 'number') {
//                 handleInputChange(String(key), index);
//               }
//               if (key === 'X') {
//                 const lastFilledIndex = otp.reduce(
//                   (acc, val, idx) => (val ? idx : acc),
//                   -1,
//                 );
//                 if (lastFilledIndex !== -1) {
//                   handleInputChange('', lastFilledIndex);
//                 }
//               }
//             }}>
//             <Text style={styles.keyText}>{key}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#00796B',
//     padding: 20,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   logo: {
//     fontSize: 32,
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 20,
//     color: '#FFF',
//     textAlign: 'center',
//     marginBottom: 10,
//     textTransform: 'uppercase',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#FFF',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   otpInput: {
//     backgroundColor: '#FFF',
//     width: 40,
//     height: 50,
//     textAlign: 'center',
//     borderRadius: 5,
//     fontSize: 18,
//   },
//   resendContainer: {
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   resendText: {
//     color: '#FFF',
//     textDecorationLine: 'underline',
//   },
//   keypad: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 20,
//   },
//   key: {
//     width: '30%',
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 5,
//   },
//   keyText: {
//     fontSize: 20,
//     color: '#FFF',
//     fontWeight: 'bold',
//   },
// });

// export default Otp;

// import React from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

// const CustomKeyboard = ({onKeyPress}) => {
//   const handleKeyPress = key => {
//     if (onKeyPress) {
//       onKeyPress(key);
//     }
//   };

//   return (
//     <View style={styles.keyboardContainer}>
//       {/* Row 1 */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('1')}>
//           <Text style={styles.keyText}>1</Text>
//         </TouchableOpacity>
//         <View style={styles.verticalLine} />
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('2')}>
//           <Text style={styles.keyText}>2</Text>
//         </TouchableOpacity>
//         <View style={styles.verticalLine} />
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('3')}>
//           <Text style={styles.keyText}>3</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.horizontalLine} />

//       {/* Row 2 */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('4')}>
//           <Text style={styles.keyText}>4</Text>
//         </TouchableOpacity>
//         <View style={styles.verticalLine} />
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('5')}>
//           <Text style={styles.keyText}>5</Text>
//         </TouchableOpacity>
//         <View style={styles.verticalLine} />
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('6')}>
//           <Text style={styles.keyText}>6</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.horizontalLine} />

//       {/* Row 3 */}
//       <View style={styles.row}>
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('7')}>
//           <Text style={styles.keyText}>7</Text>
//         </TouchableOpacity>
//         <View style={styles.verticalLine} />
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('8')}>
//           <Text style={styles.keyText}>8</Text>
//         </TouchableOpacity>
//         <View style={styles.verticalLine} />
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('9')}>
//           <Text style={styles.keyText}>9</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.horizontalLine} />

//       {/* Row 4 */}
//       <View style={styles.row}>
//         <TouchableOpacity style={styles.key} onPress={() => {}}>
//           <Text style={styles.keyText}></Text>
//         </TouchableOpacity>
//         <View style={styles.verticalLine} />
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('0')}>
//           <Text style={styles.keyText}>0</Text>
//         </TouchableOpacity>
//         <View style={styles.verticalLine} />
//         <TouchableOpacity
//           style={styles.key}
//           onPress={() => handleKeyPress('X')}>
//           <Text style={styles.keyText}>X</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default CustomKeyboard;

// const styles = StyleSheet.create({
//   keyboardContainer: {
//     width: '80%',
//     backgroundColor: '#00796B',
//     borderRadius: 10,
//     padding: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   key: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   keyText: {
//     fontSize: 24,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//   },
//   verticalLine: {
//     width: 1,
//     backgroundColor: '#FFFFFF',
//     height: '100%',
//   },
//   horizontalLine: {
//     height: 1,
//     backgroundColor: '#FFFFFF',
//     width: '100%',
//   },
// });
