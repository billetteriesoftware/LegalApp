import {
  BackHandler,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import FontFamily from '../../styles/FontFamily';
import {classHeadings} from '../../constant/Label';

const NiceClassesDescription = ({navigation, route}) => {
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'Nice Classes Description'}
        rightClick={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* Header Row */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.headerText, {flex: 0.2}]}>Class</Text>
          <Text style={[styles.headerText, {flex: 0.8}]}>List of Terms</Text>
        </View>

        {/* Data Rows */}
        <FlatList
          data={classHeadings}
          keyExtractor={item => item.class}
          renderItem={({item}) => (
            <View style={styles.row}>
              <Text style={[styles.cell, {flex: 0.2}]}>{item.class}</Text>
              <Text style={[styles.cell, {flex: 0.8}]}>{item.terms}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default NiceClassesDescription;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    // justifyContent: 'center',
    // marginHorizontal: 16,
    margin: 10,
  },

  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    backgroundColor: '#e6e6e6',
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
  headerText: {
    fontSize: 16,
    fontFamily: FontFamily.ExtraBold,
    color: Colors['LightGreen'],
  },
});
