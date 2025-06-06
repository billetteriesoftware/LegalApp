import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import ImagePath from '../../constant/ImagePath';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import {ApplicationSVG, TradeMarkSearchSVG} from '../../assets/svgIcons/Index';
import NavigationString from '../../Navigations/NavigationString';

const Trademark = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'Trade mark'}
        rightClick={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <TextView heading headingTextSty={styles.textHeading}>
            Trade Mark Services
          </TextView>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NavigationString.ApplicationFormScreen);
            }}
            style={styles.optionView}>
            <ApplicationSVG />
            <TextView textSty={styles.text}>New Application</TextView>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationString.TrademarkSearchScreen, {
                from: 'Trademark',
              })
            }
            style={styles.optionView}>
            <TradeMarkSearchSVG />
            <TextView textSty={styles.text}>Free Search</TextView>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trademark;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginHorizontal: 16,
  },
  textHeading: {
    color: Colors.TealBlue,
    fontSize: 15,
    lineHeight: 20.49,
    marginTop: 22,
  },
  optionView: {
    backgroundColor: Colors.LightGreen,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 12,
    padding: 14,
    marginTop: 22,
    // marginVertical: 14,
    borderRadius: 15,
  },
  text: {
    fontSize: 15,
    lineHeight: 20.49,
    fontFamily: FontFamily.Bold,
    color: Colors.White,
    left: 10,
    textTransform: 'uppercase',
  },
});
