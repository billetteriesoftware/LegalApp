import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Header from '../../components/Header';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import Colors from '../../styles/Colors';
import {RadioCircleSVG, SuccessIcon_SVG} from '../../assets/svgIcons/Index';
import ImagePath from '../../constant/ImagePath';
import Button from '../../components/Button';
import AllString from '../../constant/AllString';
import NavigationString from '../../Navigations/NavigationString';

const ApplicationSuccess = ({navigation}) => {
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true, // prevent default back action
    );

    return () => backHandler.remove(); // cleanup
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        rightClick={handleBack}
        arrowBack
        title={'Application Successfully'}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <SuccessIcon_SVG />
            <TextView
              textSty={{
                fontFamily: FontFamily.SemiBold,
                fontSize: 16,
                lineHeight: 21.86,
                textAlign: 'center',
                color: Colors.TealBlue,
                marginVertical: 20,
              }}>
              Application Successfully {`\n`} Submitted
            </TextView>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextView
                textSty={{
                  fontFamily: FontFamily.SemiBold,
                  fontSize: 24,
                  lineHeight: 32.78,
                  textAlign: 'center',
                }}>
                THANK YOU
              </TextView>
              {/* <Image
                source={ImagePath.EmojiImage}
                resizeMode="contain"
                style={{ left: 11 }}
              /> */}
            </View>

            <Button
              onClick={() => {
                navigation.navigate(NavigationString.ApplicationScreen);
              }}
              btnName={'Go to My Applications'}
              buttonColor={Colors.White}
              allButtonSty={{...styles.loginBtnSty, marginTop: 45}}
            />

            <Button
              onClick={() => {
                navigation.navigate(NavigationString.HomeScreen);
              }}
              btnName={'Back to Home'}
              buttonColor={Colors.White}
              allButtonSty={{
                ...styles.loginBtnSty,
                backgroundColor: Colors.MantisGreen,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationSuccess;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {flex: 1, marginHorizontal: 12},
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginTop: 25,
    width: '65%',
    // marginBottom: 25,
  },
  cardContainer: {
    backgroundColor: Colors.White,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginVertical: 25,
  },
  paymentGateway: {
    fontFamily: FontFamily.SemiBold,
    fontSize: 16,
    lineHeight: 21.86,
    color: Colors.gray8,
    marginTop: 15,
  },
  paypalView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.White,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    marginTop: 25,
  },
  textView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
  },
  paypalText: {
    fontSize: 12,
    lineHeight: 16.39,
    fontFamily: FontFamily.Medium,
  },
});
