import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import ImagePath from '../constant/ImagePath';
import {
  CrossIsonSVG,
  DashboardIconSVG,
  FAQIconSVG,
  LogoutIconSVG,
  MyApplicationIconSVG,
  NotificationIconSVG,
  PrivacyPolicyIconSVG,
  ProfileIconSVG,
  ProfileImageSVG,
  ReportIconSVG,
  TermsConditionIconSVG,
} from '../assets/svgIcons/Index';
import TextView from '../components/TextView';
import Colors from '../styles/Colors';
import NavigationString from './NavigationString';
import {logouthandler, saveUserData} from '../store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Image_URL} from '../config/Url';
import {LocalStorage} from '../utils/LocalStorage';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const {profileData} = useSelector(state => state.auth);

  const DrawerItemName = [
    {
      id: 1,
      name: 'Dashboard',
      image: <DashboardIconSVG />,
      // nav: NavigationString.HomeScreen,
      nav: NavigationString.DashboardScreen,
    },
    {
      id: 2,
      name: 'My Applications ',
      image: <MyApplicationIconSVG />,
      nav: NavigationString.ApplicationScreen,
    },
    {
      id: 11,
      name: 'My Trademarks ',
      image: <MyApplicationIconSVG />,
      nav: NavigationString.MyTrademarksScreen,
    },
    {
      id: 3,
      name: 'Notifications',
      image: <NotificationIconSVG />,
      nav: NavigationString.NotificationScreen,
    },
    {
      id: 4,
      name: 'Profile',
      image: <ProfileIconSVG />,
      nav: NavigationString.ProfilesScreen,
    },
    {
      id: 5,
      name: 'Privacy Policy',
      image: <PrivacyPolicyIconSVG />,
      nav: NavigationString.PrivacyPolicyScreen,
    },
    {
      id: 6,
      name: 'FAQ',
      image: <FAQIconSVG />,
      nav: NavigationString.FAQScreen,
    },
    {
      id: 7,
      name: 'Terms & Conditions',
      image: <TermsConditionIconSVG />,
      nav: NavigationString.TermsConditionsScreen,
    },

    {
      id: 8,
      name: 'Report an Issue',
      image: <ReportIconSVG />,
      nav: NavigationString.IssueReportScreen,
    },
    {
      id: 9,
      name: 'About Us',
      image: <TermsConditionIconSVG />,
      nav: NavigationString.AboutUsScreen,
    },
    {
      id: 10,
      name: 'Logout',
      image: <LogoutIconSVG />,
      nav: '',
    },
  ];

  const handleLogout = () => {
    dispatch(logouthandler(true));
    LocalStorage.clearAll();
    dispatch(saveUserData());
  };
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.containerView}>
        <ImageBackground
          source={ImagePath.drawerProfileCard}
          imageStyle={styles.imageStyle}
          style={styles.profileSection}>
          <View style={{marginLeft: 8}}>
            {/* <ProfileImageSVG /> */}
            <Image
              source={{
                uri: Image_URL + profileData?.image,
              }}
              style={styles.profileImage}
            />
          </View>
          <View style={{paddingHorizontal: 15, width: '60%'}}>
            <TextView heading headingTextSty={styles.profileName}>
              {profileData?.usR_Names}
            </TextView>
            <TextView textSty={styles.profileEmail}>
              {profileData?.usR_EmailAccount}
            </TextView>
          </View>
        </ImageBackground>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
          }}
          style={styles.crossSty}>
          <CrossIsonSVG />
        </TouchableOpacity>
      </View>

      {/* Drawer Items */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.drawerItems}>
        {DrawerItemName?.map((item, Index) => (
          <DrawerItem
            key={item?.id || Index}
            label={(color, size) => (
              <View>
                <View style={styles.ViewDrawerSty}>
                  {item?.image}
                  <TextView textSty={styles.itemTextSty}>{item?.name}</TextView>
                </View>
                <View style={styles.lineSty} />
              </View>
            )}
            onPress={() =>
              item.name == 'Logout'
                ? handleLogout()
                : (props.navigation.navigate(item.nav),
                  props.navigation.closeDrawer())
            }
          />
        ))}
      </ScrollView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.TealBlue,
  },
  imageStyle: {
    borderRadius: 10, // Customizes the actual image (rounded corners)
  },
  ViewDrawerSty: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineSty: {
    borderBottomWidth: 3,
    top: 15,
    borderColor: Colors['bluish-green'],
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  profileSection: {
    paddingVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },

  profileName: {
    lineHeight: 19,
    color: Colors.White,
    textTransform: 'uppercase',
  },
  profileEmail: {
    fontSize: 12,
    lineHeight: 17,
    color: Colors.White,
  },
  drawerItems: {
    flex: 1,
  },
  itemTextSty: {
    color: Colors.White,
    marginLeft: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  crossSty: {
    padding: 5,
    paddingVertical: 15,
  },
});

export default CustomDrawer;
