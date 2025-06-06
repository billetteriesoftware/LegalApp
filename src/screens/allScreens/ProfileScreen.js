import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import {
  EditProfileIconSVG,
  ProfileImageSVG,
  RightArrowSvg,
} from '../../assets/svgIcons/Index';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import NavigationString from '../../Navigations/NavigationString';
import {Call_GetListServices} from '../../Services/Services';
import {GetProfile_API, Image_URL} from '../../config/Url';
import {saveProfileData} from '../../store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';
import {emitUnreadCount} from '../../utils/CommonMethod';
import {setupSocketConnection} from '../SocketServices/Socket';

const sections = [
  {
    title: 'GENERAL',
    data: [
      {id: '1', title: 'Account Info', nav: NavigationString.AccountInfoScreen},
      {
        id: '2',
        title: 'My Trademarks',
        nav: NavigationString.MyTrademarksScreen,
      },
      {
        id: '3',
        title: 'My Applications',
        nav: NavigationString.ApplicationScreen,
      },
      // {
      //   id: '4',
      //   title: 'Change Password',
      //   nav: NavigationString.ChangePasswordProfileScreen,
      // },
      {
        id: '5',
        title: 'Notifications',
        nav: NavigationString.NotificationScreen,
      },
      {
        id: '6',
        title: 'Privacy Policy',
        nav: NavigationString.PrivacyPolicyScreen,
      },
      {
        id: '7',
        title: 'Terms And Conditions',
        nav: NavigationString.TermsConditionsScreen,
      },
      {id: '8', title: 'About Us', nav: NavigationString.AboutUsScreen},
    ],
  },
  {
    title: 'SUPPORT',
    data: [
      {id: '8', title: 'FAQ', nav: NavigationString.FAQScreen},
      {
        id: '9',
        title: 'Report An Issue',
        nav: NavigationString.IssueReportScreen,
      },
      {id: '10', title: 'My Tickets', nav: NavigationString.MyTicketsScreen},
    ],
  },
];

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {profileData} = useSelector(state => state.auth);

  useEffect(() => {
    // setupSocketConnection();
    emitUnreadCount(dispatch);
  }, []);

  const renderSection = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        item?.title == 'Account Info'
          ? navigation.navigate(item.nav, {editStatus: false})
          : navigation.navigate(item.nav)
      }
      style={styles.listItem}>
      <TextView textSty={styles.listItemText}>{item.title}</TextView>
      <RightArrowSvg color={'#B5B5B5'} />
    </TouchableOpacity>
  );

  const handleNotification = useCallback(() => {
    navigation.navigate(NavigationString.NotificationScreen);
  }, []);

  const handleSideMunu = useCallback(() => {
    navigation.openDrawer();
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        radius
        onPress={handleSideMunu}
        types={'Publications'}
        title={'Profile'}
        clickNotification={handleNotification}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image
              source={{
                uri: Image_URL + profileData?.image,
              }}
              style={styles.profileImage}
            />
            {/* <ProfileImageSVG /> */}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{profileData?.usR_Names}</Text>
              <Text style={styles.userEmail}>
                {profileData?.usR_EmailAccount}
              </Text>
            </View>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate(NavigationString.AccountInfoScreen, {
                  editStatus: true,
                });
              }}
              style={styles.editIcon}>
              <EditProfileIconSVG />
            </TouchableOpacity> */}
          </View>

          {/* Sections */}
          {sections.map(section => (
            <View key={section.title}>
              <TextView textSty={styles.sectionTitle}>{section.title}</TextView>
              <FlatList
                nestedScrollEnabled={true}
                data={section.data}
                keyExtractor={item => item.id}
                renderItem={renderSection}
                scrollEnabled={false}
                contentContainerStyle={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#D7D7D7',
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {justifyContent: 'center', marginBottom: 50, padding: 16},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderWidth: 1,
    borderRadius: 13,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  editIcon: {
    borderRadius: 16,
    top: 0,
    right: 0,
    position: 'absolute',
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 19.12,
    fontFamily: FontFamily.Bold,
    color: '#444444',
    marginTop: 16,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 13,
    lineHeight: 43,
    color: '#444444',
    fontFamily: FontFamily.Medium,
  },
});
