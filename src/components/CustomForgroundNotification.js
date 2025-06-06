import React, {useEffect} from 'react';
import {View, Text, Animated, StyleSheet, Image} from 'react-native';
import Colors from '../styles/Colors';
import ImagePath from '../constant/ImagePath';
import TextView from './TextView';

const CustomForgroundNotification = ({notification, setNotification}) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    if (notification) {
      // Animate the notification (Fade In)
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Hide the notification after 3 seconds
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setNotification(null));
      }, 3000);
    }
  }, [notification]);

  if (!notification) return null;

  return (
    <Animated.View style={[styles.notificationContainer, {opacity: fadeAnim}]}>
      <View style={styles.boxView}>
        <View style={{flex: 0.15}}>
          <Image source={ImagePath.logo} style={styles.imageSty} />
        </View>
        <View style={{flex: 0.85}}>
          <TextView textSty={styles.title}>{notification.title}</TextView>
          <TextView textSty={styles.body}>{notification.body}</TextView>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    zIndex: 999,
    left: 20,
    right: 20,
    width: '90%',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    color: Colors.mintBlack,
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    color: Colors.mintBlack,
    fontSize: 14,
  },
  boxView: {flexDirection: 'row', alignItems: 'center', flex: 1},
  imageSty: {width: 40, height: 40, resizeMode: 'contain'},
});

export default CustomForgroundNotification;
