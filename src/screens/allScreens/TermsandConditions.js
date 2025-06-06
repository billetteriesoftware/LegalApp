import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import Button from '../../components/Button';
import AllString from '../../constant/AllString';
import NavigationString from '../../Navigations/NavigationString';

const TermsandConditions = ({navigation}) => {
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        rightClick={handleBack}
        radius
        arrowBack
        title={'Terms and Conditions'}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View>
            <TextView heading headingTextSty={styles.headingtop}>
              {`\n`}CIPC IP E-SERVICES TERMS AND CONDITIONS{`\n`}
            </TextView>
            <TextView textSty={styles.points}>
              • "you" and "your" refers to all CIPC customers making use of the
              IP e-services offerings;{`\n`}
            </TextView>
            <TextView textSty={styles.points}>
              • "we", "us" and "our" refers to CIPC; and{`\n`}
            </TextView>
            <TextView textSty={styles.points}>
              • "Service/s" refers to the services provided by CIPC through the
              CIPC IP e-services.{`\n`}
            </TextView>
            <TextView textSty={styles.content}>
              This Agreement sets out CIPC's obligations to you, and sets out
              your obligations to CIPC while accessing and using the CIPC IP
              e-services.{`\n`}
            </TextView>
            <TextView textSty={styles.content}>
              Please read this Agreement carefully before accessing or using the
              CIPC IP e-Services. By accessing or using the IP e-Services, you
              agree to be bound by the Terms and Conditions of the Agreement.
              Violation of this Agreement will result in suspension of your CIPC
              user account.{`\n`}
            </TextView>

            <View style={styles.box}>
              <TextView textSty={styles.definition}>DEFINITIONS</TextView>

              <TextView textSty={styles.person}>
                Authorised agent/ person / representative
              </TextView>

              <TextView textSty={styles.holding}>
                Means a practicing attorney holding a valid Fidelity Fund
                Certificate, authorised in terms of the Act to represent a
                customer (Applicant).
              </TextView>
            </View>

            <View>
              <Text style={styles.about}>
                You are about to submit a new trade mark application. The
                estimated
                <Text
                  style={{
                    ...styles.about,
                    color: Colors.TealBlue,
                  }}>
                  {' '}
                  cost is 590
                </Text>
              </Text>
            </View>

            <View style={styles.btnView}>
              <View style={styles.innerViewBtn}>
                <Button
                  onClick={() => {
                    navigation.goBack();
                  }}
                  btnName={AllString.DontProceed}
                  buttonColor={Colors.White}
                  allButtonSty={{
                    ...styles.loginBtnSty,
                    backgroundColor: Colors.MantisGreen,
                  }}
                />
              </View>
              <View style={styles.innerViewBtn}>
                <Button
                  onClick={() => {
                    navigation.navigate(NavigationString.PaymentScreen);
                  }}
                  btnName={AllString.Proceed}
                  buttonColor={Colors.White}
                  allButtonSty={styles.loginBtnSty}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsandConditions;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {flex: 1, marginHorizontal: 12},
  headingtop: {
    fontSize: 16,
    lineHeight: 21.86,
    textAlign: 'center',
    color: Colors.TealBlue,
  },
  points: {
    fontFamily: FontFamily.Medium,
    fontSize: 14,
    lineHeight: 24,
    color: Colors.gray4,
    paddingHorizontal: 16,
  },
  content: {
    fontFamily: FontFamily.Medium,
    fontSize: 14,
    lineHeight: 24,
    color: Colors.gray4,
    paddingHorizontal: 5,
  },
  box: {
    borderWidth: 1,
    borderColor: Colors.gray6,
    marginVertical: 10,
    backgroundColor: Colors.linghtBlue,
    borderRadius: 5,
    marginTop: 15,
    // padding: 20,
  },
  definition: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: FontFamily.Bold,
    color: Colors.TealBlue,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray6,
    padding: 15,
  },
  person: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: FontFamily.Medium,
    color: Colors.gray4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray6,
    padding: 15,
  },
  holding: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: FontFamily.Medium,
    color: Colors.gray4,
    padding: 15,
  },
  line: {
    borderWidth: 0.8,
    borderColor: Colors.gray6,
    marginVertical: 15,
  },
  about: {
    fontSize: 15,
    lineHeight: 20,
    color: Colors.gray4,
    fontFamily: FontFamily.ExtraBold,
    textAlign: 'center',
    marginVertical: 15,
  },

  innerViewBtn: {width: '45%'},
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginTop: 15,
  },
});
