import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../styles/Colors';
import {RightArrowSvg, SearchSVG} from '../../assets/svgIcons/Index';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import NavigationString from '../../Navigations/NavigationString';
import {Call_GetListServices, Call_GetServices} from '../../Services/Services';
import {ReportList_API} from '../../config/Url';
import moment from 'moment';

const trademarkData = [
  {
    id: '1',
    number: '#TM-987654',
    title: 'Issue with invoice payment process for legal services.',
    date: 'Dec 6, 2024',
    status: 'Open',
  },
  {
    id: '6',
    number: '#TM-987654',
    title: 'Issue with invoice payment process for legal services.',
    date: 'Dec 6, 2024',
    status: 'Open',
  },
  {
    id: '2',
    number: '#TM-987654',
    title: 'Issue with invoice payment process for legal services.',
    date: 'Dec 6, 2024',
    status: 'In Progress',
  },
  {
    id: '3',
    number: '#TM-987654',
    title: 'Issue with invoice payment process for legal services.',
    date: 'Dec 6, 2024',
    status: 'Close',
  },
  {
    id: '4',
    number: '#TM-987654',
    title: 'Issue with invoice payment process for legal services.',
    date: 'Dec 6, 2024',
    status: 'Open',
  },
  {
    id: '5',
    number: '#TM-987654',
    title: 'Issue with invoice payment process for legal services.',
    date: 'Dec 6, 2024',
    status: 'Open',
  },
];

const MyTIckets = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = useCallback(
    text => {
      setSearchText(text);
      const filtered = trademarkData.filter(
        item =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.number.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredData(filtered);
    },
    [searchText], // Dependency array
  );

  const renderStatusBadge = status => {
    let statusStyle;
    let textColor;
    let statusText;

    switch (status) {
      case 'open':
        statusStyle = styles.approvedBadge;
        textColor = '#64B560';
        statusText = 'Open';
        break;

      case 'inprogress':
        statusStyle = styles.pendingBadge;
        textColor = '#007F86';
        statusText = 'In Progress';
        break;

      case 'closed':
        statusStyle = styles.closeBadge;
        textColor = '#B56060';
        statusText = 'Closed';
        break;

      default:
        statusStyle = styles.defaultBadge;
        textColor = '#000'; // Default color
        statusText = status;
        break;
    }

    return (
      <View style={[styles.statusBadge, statusStyle]}>
        <TextView
          textSty={{
            ...styles.statusText,
            color: textColor,
          }}>
          {statusText}
        </TextView>
      </View>
    );
  };

  const formatDate = dateString => {
    return moment(dateString).format('MMM D, YYYY');
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavigationString.TicketDetailsScreen, {
            id: item._id,
          })
        }
        style={styles.card}>
        {/* <TextView textSty={styles.trademarkNumber}>{item.number}</TextView> */}
        <View style={styles.top}>
          <TextView textSty={styles.title}>{item.ticket_description}</TextView>
          <View style={{top: 6}}>
            <RightArrowSvg color={Colors.arrowColor} />
          </View>
        </View>
        <View style={styles.footer}>
          <TextView textSty={styles.date}>
            {formatDate(item.createdAt)}
          </TextView>
          {renderStatusBadge(item.ticket_status)}
        </View>
      </TouchableOpacity>
    );
  };

  const getTicketList = async () => {
    const response = await Call_GetServices(ReportList_API);
    console.log(response.data[0].tickets, '====response====');
    setFilteredData(response.data[0].tickets);
  };

  useEffect(() => {
    getTicketList();
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        arrowBack
        radius
        title={'My TIckets'}
        rightClick={() => navigation.goBack()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              zIndex: 999,
              alignItems: 'flex-end',
            }}>
            <SearchSVG />
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={handleSearch}
          />

          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            nestedScrollEnabled={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyTIckets;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {justifyContent: 'center', padding: 16},
  searchInput: {
    paddingRight: 35,
    backgroundColor: Colors.White,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  trademarkNumber: {
    fontSize: 12,
    lineHeight: 16.39,
    color: Colors.gray,
    marginBottom: 4,
    fontFamily: FontFamily.Medium,
  },
  title: {
    fontSize: 15,
    lineHeight: 20.49,
    fontFamily: FontFamily.Bold,
    color: Colors.gray1,
    marginBottom: 8,
    paddingRight: 20,
    // width:'90%'
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    lineHeight: 16.39,
    fontFamily: FontFamily.Medium,
    color: Colors.gray,
  },
  statusBadge: {
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 12,
  },
  approvedBadge: {
    backgroundColor: '#E6F4EA',
  },
  pendingBadge: {
    backgroundColor: '#007F861A',
  },
  closeBadge: {
    backgroundColor: '#B560601A',
  },
  statusText: {
    fontSize: 12,
    fontFamily: FontFamily.SemiBold,
    lineHeight: 16.39,
    color: '#4CAF50',
  },
});
