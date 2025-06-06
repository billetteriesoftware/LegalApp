import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../styles/Colors';
import Header from '../../components/Header';
import {ArrowSVG, RightArrowSvg, TicketSubmitSVG} from '../../assets/svgIcons/Index';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import Button from '../../components/Button';
import NavigationString from '../../Navigations/NavigationString';

const TicketSubmitted = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        radius
        arrowBack
        rightClick={() => navigation.goBack()}
        title={'Ticket Submitted'}
      />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.Box}>
            <View style={styles.imgageView}>
              <TicketSubmitSVG />
            </View>
            <TextView heading headingTextSty={styles.heading}>
              Ticket Submitted!
            </TextView>
            <TextView textSty={styles.content}>
              Please wait, our awesome Team will be with you shortly :)
            </TextView>

            {/* ============Save Button============ */}
            <Button
              onClick={() => {
                navigation.navigate(NavigationString.MyTicketsScreen);
              }}
              btnName={'Got it, Thanks!'}
              buttonColor={Colors.White}
              allButtonSty={{
                ...styles.loginBtnSty,
                backgroundColor: Colors.MantisGreen,
              }}
            />
          </View>

          <TouchableOpacity onPress={()=> navigation.navigate(NavigationString.ProfilesScreen)} style={styles.backView}>
            <ArrowSVG color={Colors.TealBlue} />
            <TextView style={styles.back}>{`  `}Back to Home</TextView>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TicketSubmitted;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {justifyContent: 'center', padding: 16},
  Box: {
    backgroundColor: Colors.White,
    padding: 30,
    marginTop:20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.gray7,
  },
  imgageView: {
    marginVertical: 5,
  },
  heading: {
    fontFamily: FontFamily.Bold,
    fontSize: 18,
    lineHeight: 30,
    color: Colors.Black1,
    textTransform: 'uppercase',
    marginTop: 35,
  },
  content: {
    fontSize: 12,
    lineHeight: 16.39,
    textAlign: 'center',
    marginVertical: 15,
    width: 190,
  },
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginVertical: 20,
    width: '100%',
  },
  backView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  back:{
    fontFamily:FontFamily.SemiBold,
    lineHeight:16,
    lineHeight:21.86,
    color:Colors.TealBlue,
   
  }
});
