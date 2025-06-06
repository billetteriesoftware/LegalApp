//{case sensitive,Classification} missing key
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../components/Header';
import TextView from '../../components/TextView';
import Colors from '../../styles/Colors';
import FontFamily from '../../styles/FontFamily';

const SaveSeachDetails = ({navigation, route}) => {
  // tradeMarkApp
  // console.log('details screen---', route.params?.result?.tradeMarkApp);
  var details = route.params?.result;

  console.log('2978489237423', details);
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'Trade Mark Search detail'}
        rightClick={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          {/* {details?.uniqueReference && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Client Reference</TextView>
              <TextView textSty={styles.valueText}>
                {details?.uniqueReference}
              </TextView>
            </View>
          )} */}
          {details?.nature && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Trade Mark Nature</TextView>
              <TextView>{details?.nature?.natureName}</TextView>
            </View>
          )}

          {/* -------------------Trademark details--------------------- */}
          <TextView heading headingTextSty={styles.headingView}>
            Trade Mark Details
          </TextView>
          {details?.denomination && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Representation</TextView>
              <TextView>{details?.denomination}</TextView>
            </View>
          )}

          {details?.goodsAndServices && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Goods and Services</TextView>
              <TextView>{details?.goodsAndServices}</TextView>
            </View>
          )}
          {/* {details?.endorsements && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Endorsements</TextView>
              <TextView>{details?.endorsements}</TextView>
            </View>
          )} */}

          {/* ----------------Trademark Ownership----------- */}
          <TextView heading headingTextSty={styles.headingView}>
            Trade Mark Ownership
          </TextView>
          <TextView textSty={styles.dateText}>Applicant </TextView>
          {details?.applicants[0]?.name && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Name</TextView>
              <TextView>{details?.applicants[0]?.name}</TextView>
            </View>
          )}
          {details?.applicants[0]?.address && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Address</TextView>
              <TextView>{details?.applicants[0]?.address}</TextView>
            </View>
          )}
          {details?.applicants[0]?.town && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Town</TextView>
              <TextView>{details?.applicants[0]?.town}</TextView>
            </View>
          )}
          {details?.applicants[0]?.zipCode && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Postal Code</TextView>
              <TextView>{details?.applicants[0]?.zipCode}</TextView>
            </View>
          )}
          {details?.applicants[0]?.countryName && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Country</TextView>
              <TextView>{details?.applicants[0]?.countryName}</TextView>
            </View>
          )}
          {details?.applicants[0]?.phone && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Contact Number</TextView>
              <TextView>{details?.applicants[0]?.phone}</TextView>
            </View>
          )}
          {details?.applicants[0]?.email && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Email</TextView>
              <TextView>{details?.applicants[0]?.email}</TextView>
            </View>
          )}
          {/* ---------------------------------------- */}

          <TextView heading headingTextSty={styles.headingView}>
            Address For Service
          </TextView>
          {details?.addforService?.name && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Name</TextView>
              <TextView>{details?.addforService?.name}</TextView>
            </View>
          )}
          {details?.addforService?.address && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Address</TextView>
              <TextView>{details?.addforService?.address}</TextView>
            </View>
          )}
          {details?.addforService?.town && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Town</TextView>
              <TextView>{details?.addforService?.town}</TextView>
            </View>
          )}
          {details?.addforService?.zipCode && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Postal Code</TextView>
              <TextView>{details?.addforService?.zipCode}</TextView>
            </View>
          )}
          {details?.addforService?.countryName && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Country</TextView>
              <TextView>{details?.addforService?.countyName}</TextView>
            </View>
          )}
          {details?.addforService?.phone && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Contact Number</TextView>
              <TextView>{details?.addforService?.phone}</TextView>
            </View>
          )}
          {details?.addforService?.email && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Email</TextView>
              <TextView>{details?.addforService?.email}</TextView>
            </View>
          )}
          {details?.addforService?.gpaNumber && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>GPA Number</TextView>
              <TextView>{details?.gpaNumber}</TextView>
            </View>
          )}

          {/* -------------------Priority Claim--------------------- */}
          {details?.priorities?.length > 0 && (
            <TextView heading headingTextSty={styles.headingView}>
              Priority Claim
            </TextView>
          )}
          {details?.priorities[0]?.priorityType && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Priority Type</TextView>
              <TextView>{details?.priorities[0]?.priorityType}</TextView>
            </View>
          )}

          {details?.priorities[0]?.countryName && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Country</TextView>
              <TextView>{details?.priorities[0]?.countryName}</TextView>
            </View>
          )}
          {details?.priorities[0]?.priorityNo && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Priority Number</TextView>
              <TextView>{details?.priorities[0]?.priorityNo}</TextView>
            </View>
          )}
          {details?.priorities[0]?.priorityDate && (
            <View style={styles.viewStyle}>
              <TextView textSty={styles.dateText}>Priority Date</TextView>
              <TextView>{details?.priorities[0]?.priorityDate}</TextView>
            </View>
          )}
          {/* -------------------Priority Claim--------------------- */}
          {details?.recordAttachments?.length > 0 && (
            <TextView heading headingTextSty={styles.headingView}>
              Attachment
            </TextView>
          )}
          {details?.recordAttachments?.length > 0 &&
            details?.recordAttachments?.map((item, ind) => {
              return (
                <>
                  <View style={styles.viewStyle}>
                    <TextView textSty={styles.dateText}>File Type</TextView>
                    <TextView>{item?.fileType}</TextView>
                  </View>
                  <TextView>{item?.fileURL}</TextView>
                </>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SaveSeachDetails;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 30,
  },
  header: {
    marginBottom: 16,
  },
  headingView: {
    fontSize: 18,
    lineHeight: 20.39,
    color: Colors.gray,
    fontFamily: FontFamily.ExtraBold,
    marginVertical: 10,
  },
  title: {
    fontSize: 15,
    lineHeight: 20.49,
    fontFamily: FontFamily.Bold,
    marginVertical: 4,
    color: Colors.gray1,
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dateText: {
    fontSize: 14,
    // lineHeight: 14,
    color: Colors.gray,
    fontFamily: FontFamily.Bold,
  },
  valueText: {
    fontSize: 16,
    lineHeight: 16.39,
    color: Colors.gray,

    fontFamily: FontFamily.Bold,
  },
  statusBadge: {
    backgroundColor: Colors.lightMintGreen,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    lineHeight: 16.39,
    color: Colors.MantisGreen,
    fontWeight: FontFamily.SemiBold,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 15,
    lineHeight: 20.49,
    fontFamily: FontFamily.Bold,
    marginVertical: 4,
    color: Colors.gray1,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.gray3,

    fontFamily: FontFamily.Bold,
  },
  value: {
    textAlign: 'right',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.gray3,
    fontFamily: FontFamily.Medium,
  },
  downloadButton: {
    backgroundColor: Colors.lightMintGreen,
    // padding: 12,
    paddingVertical: 8,
    borderRadius: 40,
    alignItems: 'center',
    width: '45%',
    alignSelf: 'flex-end',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  downloadButtonText: {
    fontSize: 12,
    lineHeight: 16.39,
    color: Colors.MantisGreen,
    fontWeight: FontFamily.SemiBold,
  },
  attachmentList: {
    marginTop: 8,
  },
  attachmentImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
  },
  line: {
    borderWidth: 0.8,
    borderColor: Colors.gray5,
    marginBottom: 8,
  },
});
