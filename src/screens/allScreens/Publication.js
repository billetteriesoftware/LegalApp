import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import FontFamily from '../../styles/FontFamily';
import TextView from '../../components/TextView';
import {SearchSVG} from '../../assets/svgIcons/Index';
import NavigationString from '../../Navigations/NavigationString';
import {Call_GetListServices, Call_GetServices} from '../../Services/Services';
import {Image_URL, PublicationList_API} from '../../config/Url';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import RenderHTML from 'react-native-render-html';
import Loading from '../../components/Loading';
import {useDispatch} from 'react-redux';
import {emitUnreadCount} from '../../utils/CommonMethod';
import {setupSocketConnection} from '../SocketServices/Socket';

const Publication = ({navigation}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [publications, setPublicationList] = useState([]); //state manage to publication list data from api
  const [filterData, setFilterData] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);

  const handleSearch = text => {
    setSearchText(text);

    if (!text) {
      setFilterData(publications); // Reset list if search is cleared
      return;
    }

    const filtered = publications.filter(item => {
      const titleText = item.title.replace(/<[^>]*>/g, '').toLowerCase(); // Strip HTML
      const descriptionText = item.description
        .replace(/<[^>]*>/g, '')
        .toLowerCase();

      return (
        titleText.includes(text.toLowerCase()) ||
        descriptionText.includes(text.toLowerCase())
      );
    });

    setFilterData(filtered);
  };

  const renderItem = ({item}) => {
    let imageURL = Image_URL + item?.image;

    const formattedDate = moment(item?.createdAt).format('D MMM');
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavigationString.PublicationDetailsScreen, {
            id: item?._id,
          })
        }
        style={styles.Publicationcard}>
        <Image
          source={{
            uri: imageURL,
          }}
          style={styles.Publicationimage}
        />

        <View style={styles.Publicationcontent}>
          {/* <TextView textSty={styles.Publicationcategory}>
            {item?.category}
          </TextView> */}
          {/* <RenderHTML  source={{ html: item?.title }} tagsStyles={htmlStyles}  /> */}
          <RenderHTML
            // contentWidth={screenWidth}
            source={{html: item?.title}}
            tagsStyles={{
              p: {
                fontSize: 13,
                lineHeight: 17,
                fontWeight: '800',
                color: Colors.Black,
                marginTop: 0,
                marginBottom: 5,
              }, // Apply to <p>
            }}
          />

          <RenderHTML
            // contentWidth={screenWidth}
            source={{html: item?.description}}
            tagsStyles={{
              p: {
                fontSize: 13,
                lineHeight: 17,
                fontWeight: '400',
                color: Colors.Black,
                marginTop: 0,
              }, // Apply to <p>
            }}
          />
          {/* <TextView heading headingTextSty={styles.Publicationtitle}>
            {item?.title}
          
          </TextView> */}

          {/* <TextView textSty={styles.Publicationdescription}>
       
            {item?.description}
          </TextView> */}
        </View>
        <View style={styles.Publicationdate}>
          <TextView textSty={styles.PublicationdateDay}>
            {formattedDate?.split(' ')[0]}
          </TextView>
          <TextView textSty={styles.PublicationdateMonth}>
            {formattedDate?.split(' ')[1]}
          </TextView>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSideMunu = useCallback(() => {
    navigation.openDrawer();
  }, []);

  useEffect(() => {
    getPublication(page);
    // setupSocketConnection();
    emitUnreadCount(dispatch);
  }, [page]);

  const getPublication = async () => {
    setIsLoading(true);
    const response = await Call_GetServices(PublicationList_API);
    setIsLoading(false);
    if (response.success) {
      setPublicationList(preState => [
        ...preState,
        ...response?.data[0]?.publications,
      ]);
      setTotalPages(response?.data[0]?.pagination[0]?.total / 10);
    }
  };

  const loadMoreData = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleNotification = useCallback(() => {
    navigation.navigate(NavigationString.NotificationScreen);
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        radius
        onPress={handleSideMunu}
        types={'Publications'}
        title={'Publications'}
        clickNotification={handleNotification}
      />

      <ScrollView
        onMomentumScrollEnd={loadMoreData}
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <Modal animated={true} transparent={true} visible={isLoading}>
            <Loading />
          </Modal>

          {/* Publication Container */}
          <View style={styles.Publicationcontainer}>
            {/* search view */}
            <View style={styles.SearchIcon}>
              <SearchSVG />
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchText}
              onChangeText={handleSearch}
            />
            {/* list view */}
            <FlatList
              nestedScrollEnabled={true}
              // data={publications}
              data={searchText ? filterData : publications}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Publication;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {justifyContent: 'center'},
  // -------publication--------
  Publicationcontainer: {
    padding: 15,
    // marginTop: 15,
  },

  Publicationheading: {
    color: Colors.Black,
    lineHeight: 24.59,
  },

  Publicationlist: {
    paddingBottom: 16,
  },
  Publicationcard: {
    flexDirection: 'row',
    backgroundColor: Colors.White,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Publicationimage: {
    width: 100,
    height: 110,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  Publicationcontent: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  Publicationcategory: {
    fontSize: 12,
    lineHeight: 14,
    color: Colors['Dim Gray'],
    marginBottom: 4,
  },
  Publicationtitle: {
    fontSize: 13,
    lineHeight: 17,
    color: Colors.Black,
    marginBottom: 4,
  },
  Publicationdescription: {
    fontSize: 12,
    lineHeight: 14,
    color: Colors.Jet,
    marginBottom: 4,
  },
  Publicationdate: {
    // position: 'absolute',
    width: 40,
    height: 40,
    right: 10,
    top: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00796B',
    padding: 8,
    borderRadius: 8,
  },
  PublicationdateDay: {
    fontSize: 10,
    lineHeight: 10,
    color: Colors.White,
  },
  PublicationdateMonth: {
    fontSize: 10,
    lineHeight: 10,
    marginTop: 5,
    color: Colors.White,
  },
  // -------input view ----------
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
    marginTop: 10,
  },
  // --------search icon -------
  SearchIcon: {
    position: 'absolute',
    top: 40,
    right: 30,
    zIndex: 999,
    alignItems: 'flex-end',
  },
  list: {
    marginTop: 8,
  },
});
