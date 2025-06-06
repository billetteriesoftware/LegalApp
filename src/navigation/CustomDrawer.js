import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Colors from '../styles/Colors';
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

const CustomDrawer = props => {
  const DrawerItemName = [
    {
      id: 1,
      name: 'Dashboard',
      image: <DashboardIconSVG />,
      //   nav: NavigationString.ProfileScreen,
    },
    {
      id: 2,
      name: 'My Applications ',
      image: <MyApplicationIconSVG />,
      //   nav: NavigationString.rentedPropertiesScreen,
    },
    {
      id: 3,
      name: 'Notifications',
      image: <NotificationIconSVG />,
      //   nav: NavigationString.ProfileScreen,
    },
    {
      id: 4,
      name: 'Profile',
      image: <ProfileIconSVG />,
      //   nav: NavigationString.rentedPropertiesScreen,
    },
    {
      id: 5,
      name: 'Privacy Policy',
      image: <PrivacyPolicyIconSVG />,
      //   nav: NavigationString.ProfileScreen,
    },
    {
      id: 6,
      name: 'FAQ',
      image: <FAQIconSVG />,
      //   nav: NavigationString.rentedPropertiesScreen,
    },
    {
      id: 7,
      name: 'Terms & Conditions',
      image: <TermsConditionIconSVG />,
      //   nav: NavigationString.ProfileScreen,
    },

    {
      id: 8,
      name: 'Report an Issue',
      image: <ReportIconSVG />,
      //   nav: NavigationString.ProfileScreen,
    },
    {
      id: 9,
      name: 'About Us',
      image: <TermsConditionIconSVG />,
      //   nav: NavigationString.rentedPropertiesScreen,
    },
    {
      id: 10,
      name: 'Logout',
      image: <LogoutIconSVG />,
      //   nav: NavigationString.rentedPropertiesScreen,
    },
  ];
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
          <ProfileImageSVG />
          <View style={{paddingHorizontal: 15}}>
            <TextView heading headingTextSty={styles.profileName}>
              John Doe
            </TextView>
            <TextView textSty={styles.profileEmail}>
              johndoe@example.com
            </TextView>
          </View>
        </ImageBackground>
        <CrossIsonSVG />
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
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
            onPress={() => props.navigation.navigate('Home')}
          />
        ))}
      </View>
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
    borderBottomWidth: 1,
    top: 15,
    borderColor: Colors['bluish-green'],
  },
  containerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileSection: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
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
    marginTop: 20,
    marginHorizontal: -12,
  },
  itemTextSty: {
    color: Colors.White,
    marginLeft: 15,
  },
});

export default CustomDrawer;
