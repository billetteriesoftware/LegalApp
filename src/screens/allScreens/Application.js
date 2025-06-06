import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import NavigationString from '../../Navigations/NavigationString';
import {Call_GetListServices} from '../../Services/Services';
import {SearchSVG} from '../../assets/svgIcons/Index';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import TextView from '../../components/TextView';
import {GetTrademark_API} from '../../config/Url';
import Colors from '../../styles/Colors';
import FontFamily from '../../styles/FontFamily';
import {CapitalizeFirstLetter, emitUnreadCount} from '../../utils/CommonMethod';

const Application = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const {profileData} = useSelector(state => state.auth);

  const [searchText, setSearchText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [publications, setApplicationList] = useState([]); //state manage to publication list data from api

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);

  const [filterData, setFilterData] = useState([]);

  // ✅ Run getList only when screen is opened, not on search
  useEffect(() => {
    if (isFocused) {
      setPage(1); // Reset pagination when screen opens
      setApplicationList([]); // Clear old data
      getList(true);
      // setupSocketConnection();
      emitUnreadCount(dispatch);
    }
  }, [isFocused]);

  const getList = async (reset = false, isRefresh = true) => {
    setIsLoading(isRefresh);

    const res = await Call_GetListServices(
      // `${GetTrademark_API}/${profileData?.usR_Username}`,
      `${GetTrademark_API}?OrderBy=createdasc&PageNumber=1&PageSize=1000000&customerCode=${profileData?.usR_Username}`,
    );
    setIsLoading(false);

    console.log(res, '----userdata----');

    if (res) {
      setApplicationList(res);
      // setApplicationList(prevState =>
      //   reset
      //     ? res?.data[0]?.trademarks
      //     : [...prevState, ...res?.data[0]?.trademarks],
      // );
      // setTotalPages(res?.data[0]?.pagination[0]?.total / 10);
    }
  };

  const handleSearch = text => {
    setIsLoading(false);
    setSearchText(text);

    if (!text) {
      setFilterData(publications); // Reset list if search is cleared
      return;
    }
    const filtered = publications.filter(item => {
      const titleText = item?.uniqueReference
        ?.replace(/<[^>]*>/g, '')
        .toLowerCase(); // Strip HTML
      const descriptionText = item?.denomination
        ?.replace(/<[^>]*>/g, '')
        .toLowerCase();

      return (
        titleText?.includes(text.toLowerCase()) ||
        descriptionText?.includes(text.toLowerCase())
      );
    });

    setFilterData(filtered);
  };

  // const handleSearch = useCallback(
  //   text => {
  //     setSearchText(text);
  //     setIsLoading(false);
  //     setPage(1); // Reset pagination
  //     setApplicationList([]); // Clear existing results
  //   },
  //   [searchText], // Dependency array
  // );

  const renderStatusBadge = status => {
    const statusStyles = {
      Approved: styles.approvedBadge,
      Pending: styles.pendingBadge,
      Filed: styles.pendingBadge,
    };

    return (
      <View style={[styles.statusBadge, statusStyles[status]]}>
        <TextView
          textSty={{
            ...styles.statusText,
            color: status == 'Approved' ? '#64B560' : '#A6AB04',
          }}>
          {CapitalizeFirstLetter(status)}
        </TextView>
      </View>
    );
  };

  const renderItem = ({item}) => {
    if (item?.registerStatus === 'None')
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavigationString.ApplicationdetailScreen, {
              id: item?.uniqueReference,
            })
          }
          style={styles.card}>
          <TextView textSty={styles.trademarkNumber}>
            #{item?.uniqueReference}
          </TextView>
          <TextView textSty={styles.title}>{item?.denomination}</TextView>
          <View style={styles.footer}>
            <TextView textSty={styles.date}>
              {moment(item?.applicationDate).format('MMM DD, YYYY')}
            </TextView>
            {renderStatusBadge(item?.filingStatus)}
          </View>
        </TouchableOpacity>
      );
  };

  const loadMoreData = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  // ✅ Load more data only on pagination
  useEffect(() => {
    if (page > 1) {
      getList();
    }
  }, [page]);

  // // ✅ Run only when user types in search
  // useDebounceSearch(
  //   searchText,
  //   () => {
  //     setPage(1);
  //     setApplicationList([]); // Clear previous results
  //     getList(true);
  //   },
  //   1000,
  // );

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
        title={'My Applications'}
        clickNotification={handleNotification}
      />

      <Modal animated={true} transparent={true} visible={isLoading}>
        <Loading />
      </Modal>

      <ScrollView
        onMomentumScrollEnd={loadMoreData}
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
            data={searchText ? filterData : publications}
            renderItem={renderItem}
            keyExtractor={item => item?._id?.toString()}
            contentContainerStyle={styles.list}
            nestedScrollEnabled={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Application;

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
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 12,
  },
  approvedBadge: {
    backgroundColor: '#E6F4EA',
  },
  pendingBadge: {
    backgroundColor: '#FFF8E1',
  },
  statusText: {
    fontSize: 12,
    fontFamily: FontFamily.SemiBold,
    lineHeight: 16.39,
    color: '#4CAF50',
  },
});

// import React, {useCallback, useEffect, useState} from 'react';
// import Header from '../../components/Header';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TextInput,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import Colors from '../../styles/Colors';
// import {SearchSVG} from '../../assets/svgIcons/Index';
// import TextView from '../../components/TextView';
// import FontFamily from '../../styles/FontFamily';
// import NavigationString from '../../Navigations/NavigationString';
// import {ApplicatinList_API} from '../../config/Url';
// import {Call_GetListServices} from '../../Services/Services';
// import Loading from '../../components/Loading';
// import moment from 'moment';
// import {
//   CapitalizeFirstLetter,
//   useDebounceSearch,
// } from '../../utils/CommonMethod';
// import {useIsFocused} from '@react-navigation/native';

// const Application = ({navigation}) => {
//   const isFocused = useIsFocused();
//   const [searchText, setSearchText] = useState('');

//   const [isLoading, setIsLoading] = useState(false);

//   const [publications, setApplicationList] = useState([]); //state manage to publication list data from api

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState([]);

//   // ✅ Run getList only when screen is opened, not on search
//   useEffect(() => {
//     if (isFocused) {
//       setPage(1); // Reset pagination when screen opens
//       setApplicationList([]); // Clear old data
//       getList(true);
//     }
//   }, [isFocused]);

//   const getList = async (reset = false, isRefresh = true) => {
//     setIsLoading(isRefresh);
//     const res = await Call_GetListServices(
//       `${ApplicatinList_API}?page=${page}&count=10&search=${searchText}`,
//     );
//     setIsLoading(false);

//     if (res.success) {
//       setApplicationList(prevState =>
//         reset
//           ? res?.data[0]?.trademarks
//           : [...prevState, ...res?.data[0]?.trademarks],
//       );
//       setTotalPages(res?.data[0]?.pagination[0]?.total / 10);
//     }
//   };

//   const handleSearch = useCallback(
//     text => {
//       setSearchText(text);
//       setIsLoading(false);
//       setPage(1); // Reset pagination
//       setApplicationList([]); // Clear existing results
//     },
//     [searchText], // Dependency array
//   );

//   const renderStatusBadge = status => {
//     const statusStyles = {
//       approved: styles.approvedBadge,
//       pending: styles.pendingBadge,
//       rejected: styles.pendingBadge,
//     };

//     return (
//       <View style={[styles.statusBadge, statusStyles[status]]}>
//         <TextView
//           textSty={{
//             ...styles.statusText,
//             color: status == 'approved' ? '#64B560' : '#A6AB04',
//           }}>
//           {CapitalizeFirstLetter(status)}
//         </TextView>
//       </View>
//     );
//   };

//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate(NavigationString.ApplicationdetailScreen, {
//           id: item?._id,
//         })
//       }
//       style={styles.card}>
//       <TextView textSty={styles.trademarkNumber}>
//         {item.trademark_identity}
//       </TextView>
//       <TextView textSty={styles.title}>{item.trademark_name}</TextView>
//       <View style={styles.footer}>
//         <TextView textSty={styles.date}>
//           {moment(item.createdAt).format('MMM DD, YYYY')}
//         </TextView>
//         {renderStatusBadge(item.trademark_status)}
//       </View>
//     </TouchableOpacity>
//   );

//   const loadMoreData = () => {
//     if (page < totalPages) {
//       setPage(prevPage => prevPage + 1);
//     }
//   };

//   // ✅ Load more data only on pagination
//   useEffect(() => {
//     if (page > 1) {
//       getList();
//     }
//   }, [page]);

//   // ✅ Run only when user types in search
//   useDebounceSearch(
//     searchText,
//     () => {
//       setPage(1);
//       setApplicationList([]); // Clear previous results
//       getList(true);
//     },
//     1000,
//   );

//   // useDebounceSearch(searchText, getList, 1000,{
//   //   page: page,
//   // });

//   const handleNotification = useCallback(() => {
//     navigation.navigate(NavigationString.NotificationScreen);
//   }, []);

//   const handleSideMunu = useCallback(() => {
//     navigation.openDrawer();
//   }, []);

//   return (
//     <SafeAreaView style={styles.safeView}>
//       {/* Header View */}
//       <Header
//         radius
//         onPress={handleSideMunu}
//         types={'Publications'}
//         title={'My Applications'}
//         clickNotification={handleNotification}
//       />

//       <Modal animated={true} transparent={true} visible={isLoading}>
//         <Loading />
//       </Modal>

//       <ScrollView
//         onMomentumScrollEnd={loadMoreData}
//         nestedScrollEnabled={true}
//         contentContainerStyle={{flexGrow: 1}}>
//         <View style={styles.container}>
//           <View
//             style={{
//               position: 'absolute',
//               top: 30,
//               right: 30,
//               zIndex: 999,
//               alignItems: 'flex-end',
//             }}>
//             <SearchSVG />
//           </View>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search"
//             value={searchText}
//             onChangeText={handleSearch}
//           />

//           <FlatList
//             data={publications}
//             renderItem={renderItem}
//             keyExtractor={item => item?._id?.toString()}
//             contentContainerStyle={styles.list}
//             nestedScrollEnabled={true}
//           />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Application;

// const styles = StyleSheet.create({
//   safeView: {flex: 1, backgroundColor: Colors.bgColor},
//   container: {justifyContent: 'center', padding: 16},
//   searchInput: {
//     paddingRight: 35,
//     backgroundColor: Colors.White,
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     fontSize: 12,
//     lineHeight: 14,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: '#DDDDDD',
//   },
//   list: {
//     paddingBottom: 16,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 12,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   trademarkNumber: {
//     fontSize: 12,
//     lineHeight: 16.39,
//     color: Colors.gray,
//     marginBottom: 4,
//     fontFamily: FontFamily.Medium,
//   },
//   title: {
//     fontSize: 15,
//     lineHeight: 20.49,
//     fontFamily: FontFamily.Bold,
//     color: Colors.gray1,
//     marginBottom: 8,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   date: {
//     fontSize: 12,
//     lineHeight: 16.39,
//     fontFamily: FontFamily.Medium,
//     color: Colors.gray,
//   },
//   statusBadge: {
//     paddingHorizontal: 18,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   approvedBadge: {
//     backgroundColor: '#E6F4EA',
//   },
//   pendingBadge: {
//     backgroundColor: '#FFF8E1',
//   },
//   statusText: {
//     fontSize: 12,
//     fontFamily: FontFamily.SemiBold,
//     lineHeight: 16.39,
//     color: '#4CAF50',
//   },
// });
