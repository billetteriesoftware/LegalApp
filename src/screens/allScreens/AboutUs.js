import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {Call_GetServices} from '../../Services/Services';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {CMS_API} from '../../config/Url';
import {ETypes} from '../../constant/Label';
import Colors from '../../styles/Colors';
import FontFamily from '../../styles/FontFamily';

const AboutUs = ({navigation}) => {
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
    const response = await Call_GetServices(CMS_API + ETypes.aboutus);
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
        title={'About Us'}
        rightClick={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Modal animated={true} transparent={true} visible={isLoading}>
            <Loading />
          </Modal>

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
          {/* <View>
            <Text style={styles.sectionContent}>
              {`\n`}
              we are transforming the way individuals and businesses access
              legal solutions by leveraging technology and innovation.
              Navigating legal processes can often feel overwhelming,
              time-consuming, and complex, but our platform is designed to
              simplify this journey with secure, reliable, and user-friendly
              tools. Whether you need to manage legal documents, consult
              professionals, or handle complex legal workflows, serves as your
              trusted partner every step of the way. {`\n\n`}
            </Text>

            <Text style={styles.sectionContent}>
              Driven by a team of legal experts, tech innovators, and
              customer-focused professionals, our mission is to bridge the gap
              between legal expertise and everyday users. We believe everyone
              deserves access to seamless, transparent, and affordable legal
              solutions without the usual barriers. Our platform combines
              intuitive design, cutting-edge technology, and years of industry
              knowledge to deliver services that are not only efficient but also
              highly accessible—anytime, anywhere.{`\n\n`}
            </Text>

            <Text style={styles.sectionContent}>
              With a strong focus on data security, accuracy, and ease of use,
              we ensure your legal needs are met with the utmost confidentiality
              and professionalism. Whether you’re an individual seeking advice,
              a growing business managing legal operations, or a professional
              streamlining workflows, [Your App Name] is here to empower you
              with tools that save time, reduce stress, and deliver results.
              Together, we’re redefining what it means to make legal services
              simple, accessible, and efficient for all.
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;

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
