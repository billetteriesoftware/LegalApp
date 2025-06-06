import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../styles/Colors';
import Header from '../../components/Header';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import {useIsFocused} from '@react-navigation/native';
import {Call_GetListServices, Call_GetServices} from '../../Services/Services';
import {FAQ_API} from '../../config/Url';
import Loading from '../../components/Loading';
import RenderHTML from 'react-native-render-html';

const FAQ = ({navigation}) => {
  const isFocused = useIsFocused();
  const [getDetails, setGetDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCollapse = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (isFocused) {
      getDetail();
    }
  }, [isFocused]);

  const getDetail = async () => {
    setIsLoading(true);
    const response = await Call_GetServices(FAQ_API);
    console.log('reeer faq==', response);
    setIsLoading(false);
    if (response.success) {
      setGetDetails(response?.data[0]?.faqs);
    }
  };

  console.log('FAQ response api ---', JSON.stringify(getDetails));

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        arrowBack
        radius
        title={'FAQ'}
        rightClick={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Modal animated={true} transparent={true} visible={isLoading}>
            <Loading />
          </Modal>

          {getDetails?.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.questionContainer}
                onPress={() => toggleCollapse(index)}>
                {/* <TextView textSty={styles.questionText}>{item.question}</TextView> */}
                <RenderHTML
                  source={{html: item?.question}}
                  tagsStyles={{
                    p: {
                      fontSize: 14,
                      lineHeight: 19.12,
                      fontWeight: '600',
                      color: Colors.Black,
                      margin: 0,
                      fontFamily: FontFamily.SemiBold,
                    }, // Apply to <p>
                  }}
                />
                <TextView textSty={styles.icon}>
                  {activeIndex === index ? '-' : '+'}
                </TextView>
              </TouchableOpacity>
              {activeIndex === index && (
                <View style={styles.answerContainer}>
                  {/* <TextView textSty={styles.answerText}>{item.answer}</TextView> */}
                  <RenderHTML
                    source={{html: item?.answer}}
                    tagsStyles={{
                      p: {
                        fontSize: 14,
                        lineHeight: 20,
                        fontWeight: '400',
                        color: '#585858',
                        marginTop: 0,
                        marginBottom: 0,
                        fontFamily: FontFamily.Regular,
                      }, // Apply to <p>
                    }}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {justifyContent: 'center', padding: 16},
  faqItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  questionText: {
    fontSize: 14,
    lineHeight: 19.12,
    color: Colors.Black,
    fontFamily: FontFamily.SemiBold,
  },
  icon: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
  answerContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray7,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#585858',
  },
});
