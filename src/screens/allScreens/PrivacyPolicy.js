import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../styles/Colors';
import Header from '../../components/Header';
import {useIsFocused} from '@react-navigation/native';
import {Call_GetListServices, Call_GetServices} from '../../Services/Services';
import {CMS_API} from '../../config/Url';
import {ETypes} from '../../constant/Label';
import RenderHTML from 'react-native-render-html';
import Loading from '../../components/Loading';
import FontFamily from '../../styles/FontFamily';

const PrivacyPolicy = ({navigation}) => {
  const isFocused = useIsFocused();
  const [getDetails, setGetDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      getDetail();
    }
  }, [isFocused]);

  const getDetail = async () => {
    setIsLoading(true);
    const response = await Call_GetServices(CMS_API + ETypes.privacypolicy);
    setIsLoading(false);
    if (response.success) {
      setGetDetails(response?.data);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        arrowBack
        radius
        title={'Privacy Policy'}
        rightClick={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Modal animated={true} transparent={true} visible={isLoading}>
            <Loading />
          </Modal>
          {/* <View>
            <Text style={styles.sectionTitle}>Introduction</Text>
            <Text style={styles.sectionContent}>
              Welcome to. By accessing or using our platform, you acknowledge
              and agree to be bound by these terms and conditions. These terms
              govern your use of our app, services, and any content provided
              therein. If you disagree with any part of these terms, you must
              discontinue use immediately.
            </Text>

            <Text style={styles.sectionTitle}>User Eligibility</Text>
            <Text style={styles.sectionContent}>
              To use, you must be at least 18 years old and capable of entering
              into a legally binding agreement. By creating an account, you
              confirm that all information provided is accurate and that you
              agree to abide by these terms at all times.
            </Text>

            <Text style={styles.sectionTitle}>
              Account Registration And Security
            </Text>
            <Text style={styles.sectionContent}>
              You are responsible for maintaining the confidentiality of your
              login credentials and ensuring that any activity on your account
              complies with these terms. Unauthorized access or sharing of your
              account information may result in account suspension or
              termination.
            </Text>

            <Text style={styles.sectionTitle}>Payments And Refunds</Text>
            <Text style={styles.sectionContent}>
              Payments for premium features or legal consultations are processed
              securely through third-party gateways. Refund requests must adhere
              to our refund policy, which outlines eligibility and procedures.
              Charges are non-transferable and non-refundable unless stated
              otherwise in the policy.
            </Text>
          </View> */}
          <View>
            <RenderHTML
              source={{html: getDetails?.title}}
              tagsStyles={{
                p: {
                  fontSize: 14,
                  lineHeight: 24,
                  fontWeight: '800',
                  color: Colors.Black,
                  fontFamily: FontFamily.Bold,
                }, // Apply to <p>
              }}
            />
            <RenderHTML
              source={{html: getDetails?.description}}
              tagsStyles={{
                p: {
                  fontSize: 13,
                  lineHeight: 17,
                  fontWeight: '400',
                  color: Colors.Black,
                  marginTop: 0,
                  fontFamily: FontFamily.Regular,
                }, // Apply to <p>
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {justifyContent: 'center', padding: 16},
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});
