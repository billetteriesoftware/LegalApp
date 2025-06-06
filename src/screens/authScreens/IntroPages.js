import {StyleSheet, View, Image, Animated, SafeAreaView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import AllString from '../../constant/AllString';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import TextView from '../../components/TextView';
import Colors from '../../styles/Colors';
import Swiper from 'react-native-swiper';
// import NavigationString from '../../Navigations/NavigationString';
import ImagePath from '../../constant/ImagePath';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';

const slides = [
  {
    key: 1,
    title: AllString.introHeading1,
    text: AllString.introTitle1,
    image: ImagePath.intro,
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: AllString.introHeading2,
    text: AllString.introTitle2,
    image: ImagePath.intro2,
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: AllString.introHeading3,
    text: AllString.introTitle3,
    image: ImagePath.intro3,
    backgroundColor: '#22bcb5',
  },
];

const IntroPages = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleAnim]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        swiperRef.current.scrollBy(1);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      // swiperRef.current.scrollBy(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.skipView}>
        {currentIndex < slides.length - 1 && (
          <TextView
            onPress={() => {
              handleSkip();
            }}
            heading>
            SKIP
          </TextView>
        )}
      </View>
      <View style={styles.container}>
        <Swiper
          loop={false}
          showsButtons={false}
          showsPagination={false}
          onIndexChanged={index => setCurrentIndex(index)}
          ref={swiperRef}>
          {slides?.map(item => (
            <View key={item.key} style={styles.slide}>
              <View
                style={{
                  height: 300,
                  // transform: [{scale: scaleAnim}],
                }}>
                <Image source={item.image} />
              </View>
              <View style={{height: 200, alignItems: 'center'}}>
                <TextView heading headingTextSty={styles.title}>
                  {item.title}
                </TextView>
                <TextView textSty={styles.text}>{item.text}</TextView>
              </View>
            </View>
          ))}
        </Swiper>

        <View
          style={{
            ...styles.pagination,
            marginBottom: currentIndex < slides.length - 1 ? 70 : 70,
          }}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <View style={{paddingBottom: 30}}>
          {currentIndex < slides.length - 1 ? (
            <View style={styles.bottomContainer}>
              <View style={{width: responsiveWidth(90)}}>
                <Button
                  arrowicon
                  onClick={handleNext}
                  btnName="NEXT"
                  buttonColor={Colors.White}
                  allButtonSty={styles.nextBtnSty}
                />
              </View>
            </View>
          ) : (
            <View style={{width: responsiveWidth(90), paddingBottom: 20}}>
              <Button
                onClick={() => navigation.navigate('Login')}
                btnName={AllString.Next}
                buttonColor={Colors.White}
                allButtonSty={styles.nextBtnSty}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IntroPages;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.White, paddingHorizontal: 15},
  skipView: {
    flex: 0.05,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    width: responsiveWidth(70),
    textAlign: 'center',
    color: Colors.TealBlue,
    textTransform: 'uppercase',

    fontSize: 22,
  },
  text: {
    textAlign: 'center',
    color: Colors.LightGray,
    marginHorizontal: 20,
    width: responsiveWidth(80),
    marginTop: 20,
  },
  container: {
    flex: 0.95,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.White,
  },
  nextBtnSty: {
    paddingVertical: 15,
  },
  dotStyle: {
    backgroundColor: '#13556Daa',
    top: -110,
  },
  activeDotStyle: {
    backgroundColor: Colors.LightGray,
    top: -110,
  },
  bottomContainer: {
    paddingBottom: 20,
  },

  pagination: {
    // marginVertical: 40,

    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationDot: {
    width: 42,
    height: 6,
    backgroundColor: Colors['Tea Green'],
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.MantisGreen,
  },
});
