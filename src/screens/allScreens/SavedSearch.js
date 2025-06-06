import {
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import {CrossIsonSVG} from '../../assets/svgIcons/Index';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import {SavedSearchDelete_API, SavedSearchGetList_API} from '../../config/Url';
import {
  Call_DeleteServices,
  Call_GetListServices,
  Call_GetServices,
} from '../../Services/Services';
import Loading from '../../components/Loading';
import {useIsFocused} from '@react-navigation/native';
import NavigationString from '../../Navigations/NavigationString';

const SavedSearch = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [searchResults, setSearchResults] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const [isLoading, setIsLoading] = useState(false); //state manage to handle custom loader

  const handleDelete = async id => {
    try {
      setIsLoading(true);
      const response = await Call_DeleteServices(
        `${SavedSearchDelete_API}?id=${id}`,
      );
      if (response?.success) {
        setSearchResults(prevResults =>
          prevResults.filter(item => item._id != id),
        );
      }
    } catch (error) {
      console.log('Delete save searched error', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setCurrentPage(1);
      setHasMoreData(true);
      listData(1);
    }
  }, [isFocused]);

  const listData = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setIsLoading(true);
      else setIsFetchingMore(true);

      const response = await Call_GetServices(
        `${SavedSearchGetList_API}?page=${pageNumber}&count=10&search`,
      );

      console.log('----save-----', response);
      if (response?.success) {
        const newData = response?.data[0]?.savedSearch || [];

        // Append data if not first page
        if (pageNumber === 1) {
          setSearchResults(newData);
        } else {
          setSearchResults(prev => [...prev, ...newData]);
        }

        // Check if more data exists
        if (newData.length < 10) {
          setHasMoreData(false);
        } else {
          setHasMoreData(true);
        }
      }
    } catch (error) {
      console.log('Error fetching terms:', error);
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (hasMoreData && !isFetchingMore) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      listData(nextPage);
    }
  };

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={{paddingVertical: 20}}>
        <Loading />
      </View>
    ); // Your existing loader component
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(NavigationString.TrademarkSearchScreen, {
            from: 'SaveSearch',
            item,
          })
        }
        style={styles.itemInfo}>
        <TextView textSty={styles.itemName}>
          {item.application_no || item?.trademark_name}
        </TextView>
        {/* <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <TextView textSty={styles.statusText}>Available</TextView>
        </View> */}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDelete(item._id)}>
        <CrossIsonSVG color={Colors.crossColor} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'Saved Search'}
        rightClick={() => navigation.goBack()}
      />

      <Modal animated={true} transparent={true} visible={isLoading}>
        <Loading />
      </Modal>

      <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={searchResults}
          keyExtractor={item => item?.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

export default SavedSearch;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    // justifyContent: 'center',
    // marginHorizontal: 16,
    // margin: 18,
    marginTop: 15,
    marginHorizontal: 18,
  },

  listContainer: {
    // paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2, // Adds shadow on Android
    shadowColor: '#000', // Adds shadow on iOS
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    marginTop: 5,
  },
  itemInfo: {
    flex: 1,
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 14,
    lineHeight: 19.12,
    fontFamily: FontFamily.Bold,
    color: Colors.gray4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.MantisGreen,
    marginRight: 6,
  },
  statusText: {
    fontFamily: FontFamily.Medium,
    fontSize: 12,
    lineHeight: 16.39,
    color: Colors.MantisGreen,
  },
});
