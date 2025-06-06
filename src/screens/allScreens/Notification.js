import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {hideTab} from '../../store/slices/auth';
import {useDispatch} from 'react-redux';
// import {useRouteNameContext} from '../../context/RouteNameContext';
import TextView from '../../components/TextView';
import ImagePath from '../../constant/ImagePath';
import {ProfileIconSVG, ProfileImageSVG} from '../../assets/svgIcons/Index';
import {
  Call_GetListServices,
  Call_GetServices,
  Call_InstancePutServices,
} from '../../Services/Services';
import {Notification_API, ReadNotification} from '../../config/Url';
import moment from 'moment';
import NavigationString from '../../Navigations/NavigationString';

const Notification = ({navigation}) => {
  const isFocused = useIsFocused();
  const [listData, setListData] = useState();

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (isFocused) {
      getList();
    }
  }, [isFocused]);

  const getList = async () => {
    const res = await Call_GetServices(Notification_API);
    console.log('notification ----', res);
    if (res.success) {
      setListData(res.data.notifications);
    }
  };

  const readNotification = async id => {
    await Call_InstancePutServices(`${ReadNotification}${id}/read`);
  };

  const NotificationItem = ({
    title,
    date,
    image,
    description,
    navigate,
    id,
    read,
    readId,
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          readNotification(readId);
          if (navigate == 'TrademarkDetails') {
            navigation.navigate(NavigationString.ApplicationdetailScreen, {
              id: id,
            });
          } else if (navigate == 'TicketDetails') {
            navigation.navigate(NavigationString.TicketDetailsScreen, {
              id: id,
            });
          }
        }}
        style={{
          ...styles.card,
          backgroundColor: read == false ? Colors.borderColor : Colors.White,
        }}>
        {image}
        <View style={styles.content}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.75}}>
              <TextView heading headingTextSty={styles.title}>
                {title}
              </TextView>
            </View>
            <View style={{flex: 0.25}}>
              <TextView textSty={styles.date}>
                {moment(date).format('MMM DD, YYYY')}
              </TextView>
            </View>
          </View>
          <TextView textSty={styles.description}>{description}</TextView>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        rightClick={() => {
          handleBack();
        }}
        radius
        arrowBack
        title={'Notifications'}
      />

      <View style={styles.container}>
        <FlatList
          data={listData}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <NotificationItem
              read={item?.read}
              title={item.title}
              date={item.createdAt}
              image={item.image}
              description={item.body}
              navigate={item.redirect_to}
              readId={item?._id}
              id={item.trademark_id?._id || item?.ticket_id?._id}
            />
          )}
          ListEmptyComponent={
            <View style={{marginTop: '40%'}}>
              <Image
                source={ImagePath.lawImage}
                style={{alignSelf: 'center'}}
              />
              <View style={{marginTop: 15}}>
                <TextView heading headingTextSty={styles.emptyHeading}>
                  No Notification Yet
                </TextView>
                <TextView textSty={styles.emptyText}>
                  Your notification will appear here once{`\n`}you've received
                  them.
                </TextView>
              </View>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
    paddingVertical: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  content: {
    flex: 1,
    left: 5,
    // paddingHorizontal: 8,
  },
  title: {
    fontSize: 13,
    color: Colors.Black,
    marginBottom: 5,
    lineHeight: 17.76,
  },
  date: {
    textAlign: 'right',
    right: 10,
    fontSize: 10,
    color: Colors.gray3,
    marginBottom: 5,
    lineHeight: 14,
  },
  description: {
    fontSize: 12,
    lineHeight: 14,
    marginTop: 2,
    color: Colors.gray3,
  },
  emptyHeading: {
    fontSize: 20,
    lineHeight: 27.32,
    color: Colors.Black,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 12,
    lineHeight: 14,
    color: Colors.Jet,
    textAlign: 'center',
    marginTop: 10,
  },
});
