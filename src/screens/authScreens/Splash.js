import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import ImagePath from '../../constant/ImagePath';
import {useNavigation} from '@react-navigation/native';
import NavigationString from '../../Navigations/NavigationString';
import { LocalStorage } from '../../utils/LocalStorage';

const Splash = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity animation for fading in
  const translateAnim = useRef(new Animated.Value(0)).current; //  Opacity animation for fading in
  const logoAnim = useRef(new Animated.Value(0)).current;

    const user = LocalStorage.getString("token");

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.timing(logoAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),

      Animated.timing(translateAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      if(user){
        navigation.replace(NavigationString.HomeScreen);
        return
      }
      navigation.replace(NavigationString.IntroScreen);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[styles.topRight, {transform: [{scale: fadeAnim}]}]}>
        <Image source={ImagePath.splashTopRight} />
      </Animated.View>
      <Animated.View
        style={[styles.centerImg, {transform: [{scale: logoAnim}]}]}>
        <Image source={ImagePath.splash} />
      </Animated.View>
      <Animated.View
        style={[styles.bottomLeft, {transform: [{scale: translateAnim}]}]}>
        <Image source={ImagePath.splashBottomLeft} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRight: {flex: 0.3, alignItems: 'flex-end'},
  centerImg: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLeft: {flex: 0.3, justifyContent: 'flex-end'},
});




// import React, { useEffect, useRef, useState } from "react";
// import { View, Image, StyleSheet, Animated } from "react-native";
// import NavigationString from "../../Navigations/NavigationString";

// const SplashScreen = ({ navigation }) => {
//   const animation1 = useRef(new Animated.Value(0)).current;
//   const animation2 = useRef(new Animated.Value(0)).current;
//   const animation3 = useRef(new Animated.Value(0)).current;
//   const [showSecondImage, setShowSecondImage] = useState(true);

//   useEffect(() => {
//     let timer = setTimeout(() => {
//       navigation.replace(NavigationString.IntroScreen);
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   useEffect(() => {
//     Animated.sequence([
//       Animated.timing(animation1, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.delay(500), // Delay of 2 seconds
//       Animated.timing(animation2, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.delay(500), // Delay of 1 second
//       Animated.timing(animation3, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true,
//       }),
//     ]).start();

//     const showThirdImageTimer = setTimeout(() => {
//       setShowSecondImage(false);
//     }, 4000); // Adjust the timing as needed

//     return () => clearTimeout(showThirdImageTimer);
//   }, [animation1, animation2, animation3]);

//   const animatedStyle1 = {
//     transform: [
//       {
//         translateY: animation1.interpolate({
//           inputRange: [0, 1],
//           outputRange: [500, 0], // Move from top to center
//         }),
//       },
//     ],
//   };

//   const animatedStyle2 = {
//     opacity: animation2.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1], // Start with opacity 0 and go to opacity 1
//     }),
//     transform: [
//       {
//         translateY: animation2.interpolate({
//           inputRange: [0, 1],
//           outputRange: [250, 0], // Move from top to center
//         }),
//       },
//     ],
//   };

//   const animatedStyle3 = {
//     opacity: animation3.interpolate({
//       inputRange: [0, 1],
//       outputRange: [0, 1], // Start with opacity 0 and go to opacity 1
//     }),
//     transform: [
//       {
//         translateY: animation3.interpolate({
//           inputRange: [0, 1],
//           outputRange: [50, 0], // Move from top to center
//         }),
//       },
//     ],
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <Animated.Image
//           source={require("../../Assets/Images/SplashScreenImages/propertyImage/splashProperty.png")}
//           style={[styles.image, animatedStyle1]}
//           resizeMode="contain"
//         />
//       </View>

//       {showSecondImage ? (
//         <Animated.Image
//           source={require("../../Assets/Images/SplashScreenImages/logo/appLogo.png")}
//           style={[{ marginTop: "-50%" }, animatedStyle2]}
//         />
//       ) : (
//         <Animated.Image
//           source={require("../../Assets/Images/SplashScreenImages/logoName/appNameLogo.png")}
//           style={[{ marginTop: "-50%" }, animatedStyle3]}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   imageContainer: {
//     width: "100%",
//     height: 400,
//     position: "absolute",
//     bottom: -18,
//   },
//   image: {
//     width: "100%",
//     height: 500,
//   },
// });

// export default SplashScreen;

