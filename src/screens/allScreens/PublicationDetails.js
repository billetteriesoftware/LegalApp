import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import ImagePath from '../../constant/ImagePath';
import TextView from '../../components/TextView';
import {useIsFocused} from '@react-navigation/native';
import {Call_GetListServices, Call_GetServices} from '../../Services/Services';
import {Image_URL, PublicationDetail_API} from '../../config/Url';
import Loading from '../../components/Loading';
import RenderHTML from 'react-native-render-html';
import moment from 'moment';

const PublicationDetails = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [publicationDetails, setPublicationDetails] = useState(); //state manage show/hide password

  // handle goBack goBack
  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    if (isFocused) {
      getPublicationDetail();
    }
  }, [isFocused]);

  const getPublicationDetail = async () => {
    setIsLoading(true);
    const response = await Call_GetServices(
      PublicationDetail_API + route?.params?.id,
    );
    setIsLoading(false);
    if (response.success) {
      setPublicationDetails(response?.data);
    } else {
      console.log('---publication details res err--', response.message);
    }
  };

  const formattedDate = moment(publicationDetails?.createdAt).format('D MMM');
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header rightClick={handleBack} radius arrowBack title={'Publications'} />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Modal animated={true} transparent={true} visible={isLoading}>
            <Loading />
          </Modal>
          <View style={styles.Publicationdate}>
            <TextView textSty={styles.PublicationdateDay}>
              {formattedDate?.split(' ')[0]}
            </TextView>
            <TextView textSty={styles.PublicationdateMonth}>
              {formattedDate?.split(' ')[1]}
            </TextView>
          </View>
          <View
            style={{
              backgroundColor: Colors.White,
              //   marginBottom: 5,
              borderRadius: 12,
              marginVertical: 15,
            }}>
            <Image
              source={
                publicationDetails?.image
                  ? {uri: Image_URL + publicationDetails?.image}
                  : ImagePath.lawImage
              }
              style={{
                width: '100%',
                height: 200,
                borderRadius: 12,
                // marginVertical: 15,
              }}
            />
            <View style={{paddingHorizontal: 20}}>
              <TextView
                textSty={{
                  fontSize: 12,
                  lineHeight: 14,
                  color: Colors['Dim Gray'],
                }}>
                {/* {'\n'}Labor Law{'\n'} */}
              </TextView>

              <RenderHTML
                // contentWidth={screenWidth}
                source={{html: publicationDetails?.title}}
                tagsStyles={{
                  p: {
                    fontSize: 13,
                    lineHeight: 17,
                    fontWeight: '800',
                    color: Colors.Black,
                  }, // Apply to <p>
                }}
              />

              <RenderHTML
                // contentWidth={screenWidth}
                source={{html: publicationDetails?.description}}
                tagsStyles={{
                  p: {
                    fontSize: 13,
                    lineHeight: 17,
                    fontWeight: '400',
                    color: Colors.Black,
                    marginTop: 0,
                  }, // Apply to <p>
                }}
              />
              {/* <TextView
                heading
                headingTextSty={{
                  fontSize: 13,
                  lineHeight: 17,
                  color: Colors.Black,
                }}>
                Supreme Court Ruling on Privacy Laws{'\n'}
              </TextView> */}

              {/* <TextView
                textSty={{fontSize: 12, lineHeight: 18, color: Colors.Jet}}>
                The U.S. Supreme Court recently issued a significant decision
                reinforcing digital privacy rights, ruling that sensitive
                personal data, such as cellphone location information, requires
                a warrant before it can be accessed by law enforcement. This
                landmark ruling builds on the principle that the Fourth
                Amendment protects individuals' privacy in the digital age,
                particularly as modern technologies store vast amounts of
                personal data.{'\n\n'}
              </TextView> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublicationDetails;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {flex: 1, marginHorizontal: 12},
  Publicationdate: {
    position: 'absolute',
    width: 40,
    height: 40,
    right: 20,
    top: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00796B',
    padding: 8,
    borderRadius: 8,
    zIndex: 999,
  },
  PublicationdateDay: {
    fontSize: 10,
    lineHeight: 10,
    color: Colors.White,
  },
  PublicationdateMonth: {
    fontSize: 10,
    lineHeight: 10,
    marginTop: 5,
    color: Colors.White,
  },
});
