import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {
  ArrowSVG,
  EditIconSVG,
  HeaderNotificationIconSVG,
  LocationIconSVG,
  SideMenuIconSVG,
} from '../assets/svgIcons/Index';
import TextView from './TextView';
import FontFamily from '../styles/FontFamily';
import Colors from '../styles/Colors';
import {emitUnreadCount, fetchAddress} from '../utils/CommonMethod';
import {Call_GetListServices, Call_GetServices} from '../Services/Services';
import {NotificationCount_API} from '../config/Url';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {location_display} from '../store/slices/auth';
import {setupSocketConnection} from '../screens/SocketServices/Socket';

const Header = ({
  arrowBack,
  title,
  notify,
  radius,
  onPress,
  clickNotification,
  rightClick,
  clickEditProfile,
  editProfileimg,
  location,
  hideArrow,
  // notificationCount,
  types,
}) => {
  useEffect(() => {
    // if (Array.isArray(location?.coordinates)) {
    //   findAddress(location);
    // }
    findAddress();
  }, []);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const [currentAddres, setCurrentAddress] = useState(null);

  const [notificationCount, setnotificationCount] = useState(0);

  const findAddress = async val => {
    // const addRes = await fetchAddress(val?.coordinates[0], val?.coordinates[1]);

    const addRes = await fetchAddress();
    dispatch(location_display(addRes?.display_name));
    // console.log('903485834085addRes-------------', addRes);

    setCurrentAddress(addRes);
  };

  useEffect(() => {
    if (isFocused) {
      getNotificationCount();
    }
  }, [isFocused]);

  const getNotificationCount = useCallback(async () => {
    const res = await Call_GetServices(NotificationCount_API);

    if (res.success) {
      setnotificationCount(res?.data?.count);
    }
  }, []);

  return (
    <View
      style={{
        ...styles.container,
        padding: hideArrow ? 25 : 16, //hideArrow is a variable use for hide right arrow icon
        borderBottomLeftRadius: radius ? 20 : 0,
        borderBottomRightRadius: radius ? 20 : 0,
      }}>
      {/* Menu Icon */}
      {/* if arrowBack then show right icon in header else showing sidebar menu icon*/}
      {arrowBack ? (
        !hideArrow && (
          <TouchableOpacity
            onPress={rightClick}
            style={{...styles.menuIcon, padding: hideArrow ? 0 : 10}}>
            <ArrowSVG />
          </TouchableOpacity>
        )
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.menuIcon}>
          <SideMenuIconSVG />
        </TouchableOpacity>
      )}

      {/* Location Info */}
      {arrowBack ? (
        <View style={{...styles.locationContainer, marginLeft: 0, flex: 0.9}}>
          <TextView
            heading
            headingTextSty={{
              ...styles.locationTitle,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            {title}
          </TextView>
        </View>
      ) : types == 'Publications' ? (
        <View style={{...styles.locationContainer, marginLeft: 0}}>
          <TextView
            heading
            headingTextSty={{
              ...styles.locationTitle,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}>
            {title}
          </TextView>
        </View>
      ) : (
        <View style={styles.locationContainer}>
          <TextView heading headingTextSty={styles.locationTitle}>
            {/* GAUTENG */}
            {currentAddres?.address?.state}
          </TextView>
          <TextView textSty={styles.locationAddress}>
            {/* 22 RUE BERGERE, 75009 */}
            {currentAddres &&
              `${currentAddres?.address?.suburb || ''} ${
                (currentAddres?.address?.state_district, ',' || '')
              } ${currentAddres?.address?.postcode || ''}`}
          </TextView>
        </View>
      )}
      {/* Icons Section */}
      {arrowBack ? (
        <View style={styles.iconGroup}>
          {/* Notification Icon */}
          {notify && (
            <TouchableOpacity
              onPress={clickNotification}
              style={{...styles.iconButton, height: 0, top: -18}}>
              <HeaderNotificationIconSVG />
              {/* Notification Badge */}
              {notificationCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          {editProfileimg && (
            <TouchableOpacity onPress={clickEditProfile}>
              <EditIconSVG />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.iconGroup}>
          {/* Location Icon */}
          {/* {types !== 'Publications' && (
            <TouchableOpacity style={styles.iconButton}>
              <LocationIconSVG />
            </TouchableOpacity>
          )} */}

          {/* Notification Icon */}
          <TouchableOpacity
            onPress={clickNotification}
            style={styles.iconButton}>
            <HeaderNotificationIconSVG />
            {/* Notification Badge */}
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.TealBlue, // Adjust color to match the design
    padding: 14,

    paddingHorizontal: 15,
  },
  menuIcon: {
    marginRight: 10,
  },
  locationContainer: {
    flex: 1,
    marginLeft: 10,
  },
  locationTitle: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20.49,
  },
  locationAddress: {
    fontFamily: FontFamily.Light,
    color: '#fff',
    fontSize: 15,
    lineHeight: 20.49,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
