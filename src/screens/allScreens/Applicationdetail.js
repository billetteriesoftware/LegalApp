import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import TextView from '../../components/TextView';
import {GetTrademarkDetails_API, Image_URL} from '../../config/Url';
import {Call_GetListServices} from '../../Services/Services';
import Colors from '../../styles/Colors';
import FontFamily from '../../styles/FontFamily';
import {CapitalizeFirstLetter} from '../../utils/CommonMethod';

const Applicationdetail = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetails] = useState();

  const renderAttachment = ({item}) => {
    const fileUrl = Image_URL + item;
    const isPdf = item?.fileURL?.endsWith('.pdf');

    return (
      <View style={{}}>
        {isPdf ? (
          <TouchableOpacity onPress={() => Linking?.openURL(fileUrl)}>
            <Image
              source={require('../../assets/images/PDF_icon.png')}
              style={styles.attachmentImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <Image source={{uri: fileUrl}} style={styles.attachmentImage} />
        )}
      </View>
    );
  };

  useEffect(() => {
    if (isFocused) {
      getDetails();
    }
  }, [isFocused]);

  const getDetails = async () => {
    setIsLoading(true);
    const res = await Call_GetListServices(
      `${GetTrademarkDetails_API}/${route?.params?.id}`,
    );
    console.log(route?.params?.id, 'ApplicationDetails_API------', res);
    setIsLoading(false);
    if (res) {
      setDetails(res);
    }
  };

  console.log('23874823477234detail', detail);
  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'TRADE MARK APPLICATION DETAILS'}
        rightClick={() => navigation.goBack()}
      />

      <Modal animated={true} transparent={true} visible={isLoading}>
        <Loading />
      </Modal>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.header}>
              <TextView textSty={styles.referenceText}>
                #{detail?.uniqueReference}
              </TextView>
              <TextView textSty={styles.title}>{detail?.denomination}</TextView>
              <View style={styles.statusContainer}>
                <TextView textSty={styles.dateText}>
                  {moment(detail?.applicationDate).format('MMM DD, YYYY')}
                </TextView>
                <View
                  style={{
                    ...styles.statusBadge,
                    backgroundColor:
                      detail?.filingStatus == 'Approved'
                        ? Colors.lightMintGreen
                        : '#FFF8E1',
                  }}>
                  <TextView
                    textSty={{
                      ...styles.statusText,
                      color:
                        detail?.filingStatus == 'Approved'
                          ? '#64B560'
                          : '#A6AB04',
                    }}>
                    {CapitalizeFirstLetter(detail?.filingStatus)}
                  </TextView>
                </View>
              </View>
            </View>
            <View style={styles.line} />
            {/* Application Overview Section */}
            <View style={styles.section}>
              <TextView textSty={styles.sectionTitle}>
                Application Overview
              </TextView>
              {/* <View style={styles.row}>
                <TextView textSty={styles.label}>Business Name</TextView>
                <TextView textSty={styles.value}>Company LTD.</TextView>
              </View> */}
              {/* <View style={styles.row}>
                <TextView textSty={styles.label}>Trademark Type</TextView>
                <View>
                  <TextView textSty={styles.value}>
                    {CapitalizeFirstLetter(detail?.trademark_type)}
                  </TextView>
                </View>
              </View> */}

              {/* <View style={styles.row}>
                <TextView textSty={styles.label}>Representation</TextView>
                <View>
                  <TextView textSty={styles.value}>
                    {CapitalizeFirstLetter(detail?.denomination)}
                  </TextView>
                </View>
              </View> */}

              {/* <View style={styles.row}>
                <TextView textSty={styles.label}>Endorsements</TextView>
                <View>
                  <TextView textSty={styles.value}>
                    {CapitalizeFirstLetter(detail?.endorsements)}
                  </TextView>
                </View>
              </View> */}

              {/* <View style={{flexDirection: 'row'}}>
                <TextView textSty={styles.label}>Goods Services</TextView>
                <View style={{flex: 1}}>
                  <TextView
                    ellipsizeMode="tail"
                    numberOfLines={3}
                    textSty={{...styles.value}}>
                    {detail?.goodsAndServices || detail?.goodAndServices}
                  </TextView>
                </View>
              </View>
              {detail?.niceClass && (
                <View style={styles.row}>
                  <TextView textSty={styles.label}>Class</TextView>
                  <TextView textSty={styles.value}>
                    {Array.isArray(detail?.niceClass)
                      ? detail.niceClass.map(i => i).join(',')
                      : CapitalizeFirstLetter(detail?.niceClass)}
                  </TextView>
                </View>
              )} */}
              {/* <View style={styles.row}>
                <TextView textSty={styles.label}>Case Sensitive</TextView>
                <TextView textSty={styles.value}>
                  {CapitalizeFirstLetter(detail?.case_sensitive)}
                </TextView>
              </View> */}
            </View>

            {/* ******************************************* */}
            {/* -------------------Trademark details--------------------- */}

            {detail?.denomination && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Representation</TextView>
                <TextView textSty={styles.value}>
                  {detail?.denomination}
                </TextView>
              </View>
            )}

            <View style={{flexDirection: 'row'}}>
              <TextView textSty={styles.label}>Goods Services</TextView>
              <View style={{flex: 1}}>
                <TextView
                  ellipsizeMode="tail"
                  numberOfLines={3}
                  textSty={{...styles.value}}>
                  {detail?.goodsAndServices || detail?.goodAndServices}
                </TextView>
              </View>
            </View>

            {/* ----------------Trademark Ownership----------- */}
            <TextView
              heading
              headingTextSty={{...styles.headingView, marginTop: 5}}>
              Trade Mark Ownership
            </TextView>
            <TextView textSty={styles.label}>Applicant </TextView>
            {detail?.applicants[0]?.name && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Name</TextView>
                <TextView textSty={styles.value}>
                  {detail?.applicants[0]?.name}
                </TextView>
              </View>
            )}
            {detail?.applicants[0]?.address && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Address</TextView>
                <TextView textSty={styles.value}>
                  {detail?.applicants[0]?.address}
                </TextView>
              </View>
            )}
            {detail?.applicants[0]?.town && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Town</TextView>
                <TextView textSty={styles.value}>
                  {detail?.applicants[0]?.town}
                </TextView>
              </View>
            )}
            {detail?.applicants[0]?.zipCode && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Postal Code</TextView>
                <TextView textSty={styles.value}>
                  {detail?.applicants[0]?.zipCode}
                </TextView>
              </View>
            )}
            {detail?.applicants[0]?.countryName && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Country</TextView>
                <TextView textSty={styles.value}>
                  {detail?.applicants[0]?.countryName}
                </TextView>
              </View>
            )}
            {detail?.applicants[0]?.phone && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Contact Number</TextView>
                <TextView textSty={styles.value}>
                  {detail?.applicants[0]?.phone}
                </TextView>
              </View>
            )}
            {detail?.applicants[0]?.email && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Email</TextView>
                <TextView textSty={styles.value}>
                  {detail?.applicants[0]?.email}
                </TextView>
              </View>
            )}
            {/* ---------------------------------------- */}

            <TextView heading headingTextSty={styles.headingView}>
              Address For Service
            </TextView>
            {detail?.addforService?.name && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Name</TextView>
                <TextView textSty={styles.value}>
                  {detail?.addforService?.name}
                </TextView>
              </View>
            )}
            {detail?.addforService?.address && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Address</TextView>
                <TextView textSty={styles.value}>
                  {detail?.addforService?.address}
                </TextView>
              </View>
            )}
            {detail?.addforService?.town && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Town</TextView>
                <TextView textSty={styles.value}>
                  {detail?.addforService?.town}
                </TextView>
              </View>
            )}
            {detail?.addforService?.zipCode && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Postal Code</TextView>
                <TextView textSty={styles.value}>
                  {detail?.addforService?.zipCode}
                </TextView>
              </View>
            )}
            {detail?.addforService?.countryName && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Country</TextView>
                <TextView textSty={styles.value}>
                  {detail?.addforService?.countyName}
                </TextView>
              </View>
            )}
            {detail?.addforService?.phone && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Contact Number</TextView>
                <TextView textSty={styles.value}>
                  {detail?.addforService?.phone}
                </TextView>
              </View>
            )}
            {detail?.addforService?.email && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Email</TextView>
                <TextView textSty={styles.value}>
                  {detail?.addforService?.email}
                </TextView>
              </View>
            )}
            {detail?.addforService?.gpaNumber && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>GPA Number</TextView>
                <TextView textSty={styles.value}>{detail?.gpaNumber}</TextView>
              </View>
            )}

            {/* -------------------Priority Claim--------------------- */}
            {detail?.priorities?.length > 1 && (
              <TextView heading headingTextSty={styles.headingView}>
                Priority Claim
              </TextView>
            )}
            {detail?.priorities[0]?.priorityType && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Priority Type</TextView>
                <TextView>{detail?.priorities[0]?.priorityType}</TextView>
              </View>
            )}

            {detail?.priorities[0]?.countryName && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Country</TextView>
                <TextView>{detail?.priorities[0]?.countryName}</TextView>
              </View>
            )}
            {detail?.priorities[0]?.priorityNo && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Priority Number</TextView>
                <TextView>{detail?.priorities[0]?.priorityNo}</TextView>
              </View>
            )}
            {detail?.priorities[0]?.priorityDate && (
              <View style={styles.row}>
                <TextView textSty={styles.label}>Priority Date</TextView>
                <TextView>{detail?.priorities[0]?.priorityDate}</TextView>
              </View>
            )}
            {/* -------------------Priority Claim--------------------- */}
            {detail?.recordAttachments?.length > 0 && (
              <TextView heading headingTextSty={styles.headingView}>
                Attachment
              </TextView>
            )}
            {/* {detail?.recordAttachments?.length > 0 &&
              detail?.recordAttachments?.map((item, ind) => {
                return (
                  <>
                    <View style={styles.row}>
                      <TextView textSty={styles.label}>File Type</TextView>
                      <TextView>{item?.fileType}</TextView>
                    </View>
                    <TextView>{item?.fileURL}</TextView>
                  </>
                );
              })} */}

            {/* ************************************************* */}
            {/* Download Button */}
            {/* <TouchableOpacity style={styles.downloadButton}>
              <TextView textSty={styles.downloadButtonText}>
                📄 Download Invoice
              </TextView>
            </TouchableOpacity> */}

            {/* Attachments Section */}
            {detail?.drawing?.drawingBase64 && (
              <View style={styles.section}>
                <View style={styles.line} />
                <TextView style={styles.sectionTitle}>Attachments</TextView>

                <Image
                  source={{
                    uri: `data:image/*;base64,${detail?.drawing?.drawingBase64}`,
                  }}
                  style={{width: 100, height: 100}}
                  resizeMode="contain"
                />
              </View>
            )}
            <FlatList
              // data={attachments}
              data={detail?.recordAttachments}
              renderItem={renderAttachment}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.attachmentList}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Applicationdetail;

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
  referenceText: {
    fontSize: 12,
    lineHeight: 16.39,
    color: Colors.gray,
    fontFamily: FontFamily.Medium,
  },
  title: {
    fontSize: 15,
    lineHeight: 20.49,
    fontFamily: FontFamily.Bold,
    marginVertical: 4,
    color: Colors.gray1,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dateText: {
    fontSize: 12,
    lineHeight: 16.39,
    color: Colors.gray,
    fontFamily: FontFamily.Medium,
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
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
