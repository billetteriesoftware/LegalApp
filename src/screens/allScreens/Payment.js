import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import Header from '../../components/Header';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import Colors from '../../styles/Colors';
import {RadioCircleSVG} from '../../assets/svgIcons/Index';
import ImagePath from '../../constant/ImagePath';
import Button from '../../components/Button';
import AllString from '../../constant/AllString';
import NavigationString from '../../Navigations/NavigationString';

const Payment = ({navigation}) => {
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header rightClick={handleBack} arrowBack title={'Payment'} />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <TextView textSty={styles.paymentGateway}>PAYMENT GATEWAY</TextView>
            <View style={styles.paypalView}>
              <Image source={ImagePath.paypal} />
              <View style={styles.textView}>
                <TextView textSty={styles.paypalText}>Paypal</TextView>
                <RadioCircleSVG />
              </View>
            </View>
            <Button
              onClick={() => {
                // navigation.navigate(NavigationString.ApplicationSuccessScreen);
              }}
              btnName={AllString.Proceed}
              buttonColor={Colors.White}
              allButtonSty={styles.loginBtnSty}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {flex: 1, marginHorizontal: 12},
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginTop: 25,
    marginBottom: 25,
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
