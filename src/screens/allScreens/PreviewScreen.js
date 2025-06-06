//{case sensitive,Classification} missing key

import {
  Alert,
  FlatList,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import {
  ApplicationDetails_API,
  Image_URL,
  Trademark_Appliaction_API,
  TradeMarkApplication_API,
} from '../../config/Url';
import {
  Call_GetListServices,
  Call_InstancePostServices,
  Call_NewApplicationServices,
} from '../../Services/Services';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../../components/Loading';
import {CapitalizeFirstLetter} from '../../utils/CommonMethod';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Config from 'react-native-config';
import Button from '../../components/Button';
import AllString from '../../constant/AllString';
import NavigationString from '../../Navigations/NavigationString';
import CustomAlert from '../../components/CustomAlert';
import {saveTradeApplicationData} from '../../store/slices/auth';

const PreviewScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
  const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
  const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box
  const [isLoading, setIsLoading] = useState(false);

  const {displayName} = useSelector(state => state.auth);
  const {profileData} = useSelector(state => state.auth);

  // tradeMarkApp
  // console.log('details screen---', route.params?.result?.tradeMarkApp);

  const {tradeApplicationData} = useSelector(state => state.auth);

  console.log(tradeApplicationData, '2978489237423');

  const handleSubmit = async values => {
    // const payload = {
    //   trademark_name: tradeApplicationData.representation,
    //   trademark_type: tradeApplicationData?.trademarkDetaild_type,
    //   client_reference: tradeApplicationData?.client_reference,
    //   trademark_nature: tradeApplicationData?.trademark_natures,
    //   applicant_name: tradeApplicationData?.name,
    //   applicant_address: tradeApplicationData?.address,
    //   applicant_town: tradeApplicationData?.town,
    //   applicant_postal_code: tradeApplicationData.postal_code,
    //   applicant_country: tradeApplicationData?.country,
    //   applicant_phone: tradeApplicationData?.contact_number,
    //   applicant_fax: tradeApplicationData?.fax,
    //   applicant_email: tradeApplicationData?.email,
    //   aos_name: tradeApplicationData?.aos_name,
    //   aos_address: tradeApplicationData?.aos_address,
    //   aos_town: tradeApplicationData?.aos_town,
    //   aos_postal_code: tradeApplicationData?.aos_postal_code,
    //   aos_country: tradeApplicationData?.aos_country,
    //   aos_phone: tradeApplicationData?.aos_phone,
    //   aos_fax: tradeApplicationData?.aos_fax,
    //   aos_email: tradeApplicationData?.aos_email,
    //   aos_gpa_number: tradeApplicationData.gpa_number,
    //   trademark_classification: tradeApplicationData?.classification,
    //   goods_services: tradeApplicationData?.good_services?.trim(),
    //   endorsement: tradeApplicationData.endorsement,
    //   priority_type: tradeApplicationData?.priority_type,
    //   priority_country: tradeApplicationData?.priority_country,
    //   priority_number: tradeApplicationData?.priority_number,
    //   priority_date: tradeApplicationData?.priority_date,
    //   // supporting_documents: supporting_docValue,
    //   // attachment_type: 'document',
    //   // attachments: upload_image_value,
    //   display_address: displayName,
    //   trademark_image: tradeApplicationData?.TradeMarkImage,
    // };

    const payload = {
      Denomination: tradeApplicationData?.denomination,
      CustomerCode: profileData?.usR_Username,
      NiceClassId: tradeApplicationData?.classification[0],
      GoodAndServices: tradeApplicationData?.good_services,
      Endorsements: tradeApplicationData?.representation,
      GPANumber: tradeApplicationData?.gpa_number,
      TMApperanceId: tradeApplicationData?.tradeMarkApperanceID,
      Applicants: [
        {
          name: tradeApplicationData?.name,
          address: tradeApplicationData?.address,
          countryCode: tradeApplicationData?.country_code,
          countryName: tradeApplicationData?.country,
          zipCode: tradeApplicationData?.postal_code,
          town: tradeApplicationData?.town,
          phone: tradeApplicationData?.contact_number,
          email: tradeApplicationData?.email,
        },
      ],
      Priorities: [
        {
          priorityNo: tradeApplicationData?.priority_number,
          priorityDate: tradeApplicationData?.priority_date,
          priorityType: tradeApplicationData?.priority_type,
          countryCode: 'US', // not set yet
          countryName: tradeApplicationData?.priority_country,
        },
      ],
      'AddforService.Name': tradeApplicationData?.aos_name,
      'AddforService.Address': tradeApplicationData?.aos_address,
      'AddforService.CountryCode': tradeApplicationData?.country_code,
      'AddforService.CountyName': tradeApplicationData?.aos_country,
      'AddforService.ZIPCode': tradeApplicationData?.aos_postal_code,
      'AddforService.Town': tradeApplicationData?.aos_town,
      'AddforService.Phone': tradeApplicationData?.aos_phone,
      'AddforService.Email': tradeApplicationData?.aos_email,
    };

    const formData = new FormData();

    // formData.append('Denomination', tradeApplicationData?.denomination || '');
    formData.append('Denomination', tradeApplicationData?.representation || '');
    formData.append('CustomerCode', profileData?.usR_Username || '');
    formData.append(
      'NiceClassId',
      tradeApplicationData?.classification[0] || '',
    );
    formData.append(
      'GoodAndServices',
      tradeApplicationData?.good_services || '',
    );
    // formData.append('Endorsements', tradeApplicationData?.representation || '');
    formData.append('GPANumber', tradeApplicationData?.gpa_number || '');
    formData.append(
      'TMApperanceId',
      tradeApplicationData?.tradeMarkApperanceID || '',
    );

    // Applicants (Array with one object)
    formData.append('Applicants', JSON.stringify(payload.Applicants));
    // Priorities (Array with one object)
    formData.append('Priorities', JSON.stringify(payload?.Priorities));

    // AddforService (dot notation keys)
    formData.append('AddforService.Name', tradeApplicationData?.aos_name || '');
    formData.append(
      'AddforService.Address',
      tradeApplicationData?.aos_address || '',
    );
    formData.append(
      'AddforService.CountryCode',
      tradeApplicationData?.country_code || '',
    );
    formData.append(
      'AddforService.CountyName',
      tradeApplicationData?.aos_country || '',
    );
    formData.append(
      'AddforService.ZIPCode',
      tradeApplicationData?.aos_postal_code || '',
    );
    formData.append('AddforService.Town', tradeApplicationData?.aos_town || '');
    formData.append(
      'AddforService.Phone',
      tradeApplicationData?.aos_phone || '',
    );
    formData.append(
      'AddforService.Email',
      tradeApplicationData?.aos_email || '',
    );

    if (
      tradeApplicationData?.trademarkDetaild_type === 'Image Mark' &&
      tradeApplicationData?.DrawingFile
    ) {
      formData.append('DrawingFile', {
        uri: tradeApplicationData.DrawingFile,
        type: 'image/jpeg', // or use payload.DrawingFile.type if available
        name: 'photo.jpg', // or use payload.DrawingFile.name if available
      });
    }

    setIsLoading(true);

    const response = await Call_NewApplicationServices(
      TradeMarkApplication_API,
      formData,
    );

    setIsLoading(false);
    if (response?.status === 200) {
      dispatch(saveTradeApplicationData({}));
      navigation.replace(NavigationString.ApplicationSuccessScreen);
    } else if (response.data.error.statusCode === 409) {
      setAlertTitle('Alert');
      setAlertDescription(response.data.message);
      setAlertShow(true);
    } else {
      setAlertTitle('Alert');
      setAlertDescription(response.data.message);
      setAlertShow(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'Preview Application'}
        rightClick={() => navigation.goBack()}
      />

      <Modal animated={true} transparent={true} visible={isLoading}>
        <Loading />
      </Modal>

      <CustomAlert
        isLoading={alertShow}
        title={alertTitle}
        description={alertDescription}
        handleOkay={() => {
          setAlertTitle('');
          setAlertDescription('');
          setAlertShow(false);
        }}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={styles.cardView}>
            {tradeApplicationData?.client_reference && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Client Refrence</TextView>
                <TextView textSty={styles.valueText}>
                  {tradeApplicationData?.client_reference}
                </TextView>
              </View>
            )}
            {tradeApplicationData?.trademark_natures && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Trade Mark Nature</TextView>
                <TextView>{tradeApplicationData?.trademark_natures}</TextView>
              </View>
            )}
          </View>

          {/* --------------------------- */}
          <View style={styles.cardView}>
            <TextView heading headingTextSty={styles.headingView}>
              Trade Mark Ownership
            </TextView>
            <View style={styles.line} />
            <TextView textSty={{...styles.dateText, marginBottom: 5}}>
              Applicant{' '}
            </TextView>
            <View style={styles.line} />
            {tradeApplicationData?.name && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Name</TextView>
                <TextView>{tradeApplicationData?.name}</TextView>
              </View>
            )}
            {tradeApplicationData?.address && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Address</TextView>
                <TextView>{tradeApplicationData?.address}</TextView>
              </View>
            )}
            {tradeApplicationData?.town && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Town</TextView>
                <TextView>{tradeApplicationData?.town}</TextView>
              </View>
            )}
            {tradeApplicationData?.postal_code && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Postal Code</TextView>
                <TextView>{tradeApplicationData?.postal_code}</TextView>
              </View>
            )}
            {tradeApplicationData?.country && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Country</TextView>
                <TextView>{tradeApplicationData?.country}</TextView>
              </View>
            )}
            {tradeApplicationData?.contact_number && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Contact Number</TextView>
                <TextView>{tradeApplicationData?.contact_number}</TextView>
              </View>
            )}
            {tradeApplicationData?.email && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Email</TextView>
                <TextView>{tradeApplicationData?.email}</TextView>
              </View>
            )}
          </View>

          {/* ---------------------------------------- */}
          <View style={styles.cardView}>
            <TextView heading headingTextSty={styles.headingView}>
              Address For Service
            </TextView>
            <View style={styles.line} />
            {tradeApplicationData?.address && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Name</TextView>
                <TextView>{tradeApplicationData?.aos_name}</TextView>
              </View>
            )}
            {tradeApplicationData?.aos_address && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Address</TextView>
                <TextView>{tradeApplicationData?.aos_address}</TextView>
              </View>
            )}
            {tradeApplicationData?.aos_town && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Town</TextView>
                <TextView>{tradeApplicationData?.aos_town}</TextView>
              </View>
            )}
            {tradeApplicationData?.aos_postal_code && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Postal Code</TextView>
                <TextView>{tradeApplicationData?.aos_postal_code}</TextView>
              </View>
            )}
            {tradeApplicationData?.aos_country && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Country</TextView>
                <TextView>{tradeApplicationData?.aos_country}</TextView>
              </View>
            )}
            {tradeApplicationData?.aos_phone && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Contact Number</TextView>
                <TextView>{tradeApplicationData?.aos_phone}</TextView>
              </View>
            )}
            {tradeApplicationData?.aos_email && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Email</TextView>
                <TextView>{tradeApplicationData?.aos_email}</TextView>
              </View>
            )}
            {tradeApplicationData?.gpa_number && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>GPA Number</TextView>
                <TextView>{tradeApplicationData?.gpa_number}</TextView>
              </View>
            )}
          </View>
          {/* -------------------Trademark details--------------------- */}
          <View style={styles.cardView}>
            <TextView heading headingTextSty={styles.headingView}>
              Trade Mark Details
            </TextView>
            <View style={styles.line} />
            {tradeApplicationData?.trademarkDetaild_type && (
              <View style={{...styles.viewStyle, alignItems: 'flex-start'}}>
                <TextView textSty={styles.dateText}>Trade Mark type</TextView>
                <View>
                  <TextView>
                    {tradeApplicationData?.trademarkDetaild_type}
                  </TextView>
                </View>
              </View>
            )}

            {tradeApplicationData?.representation && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Representation</TextView>
                <TextView>{tradeApplicationData?.representation}</TextView>
              </View>
            )}

            {tradeApplicationData?.good_services && (
              <View style={{...styles.viewStyle, alignItems: 'flex-start'}}>
                <TextView textSty={styles.dateText}>
                  Goods and Services
                </TextView>
                <View style={{flex: 1}}>
                  <TextView
                    textSty={{textAlign: 'right'}}
                    ellipsizeMode="tail"
                    numberOfLines={3}>
                    {tradeApplicationData?.good_services}
                  </TextView>
                </View>
              </View>
            )}
            {tradeApplicationData?.endorsement && (
              <View style={styles.viewStyle}>
                <TextView textSty={styles.dateText}>Endorsements</TextView>
                <TextView>{tradeApplicationData?.endorsement}</TextView>
              </View>
            )}
          </View>
          {/* -------------------Priority Claim--------------------- */}
          {(tradeApplicationData?.priority_type ||
            tradeApplicationData?.priority_country ||
            tradeApplicationData?.priority_number ||
            tradeApplicationData?.priority_date) && (
            <View style={styles.cardView}>
              <TextView heading headingTextSty={styles.headingView}>
                Priority Claim
              </TextView>
              <View style={styles.line} />
              {tradeApplicationData?.priority_type && (
                <View style={styles.viewStyle}>
                  <TextView textSty={styles.dateText}>Priority Type</TextView>
                  <TextView>{tradeApplicationData?.priority_type}</TextView>
                </View>
              )}

              {tradeApplicationData?.priority_country && (
                <View style={styles.viewStyle}>
                  <TextView textSty={styles.dateText}>Country</TextView>
                  <TextView>{tradeApplicationData?.priority_country}</TextView>
                </View>
              )}
              {tradeApplicationData?.priority_number && (
                <View style={styles.viewStyle}>
                  <TextView textSty={styles.dateText}>Priority Number</TextView>
                  <TextView>{tradeApplicationData?.priority_number}</TextView>
                </View>
              )}
              {tradeApplicationData?.priority_date && (
                <View style={styles.viewStyle}>
                  <TextView textSty={styles.dateText}>Priority Date</TextView>
                  <TextView>{tradeApplicationData?.priority_date}</TextView>
                </View>
              )}
            </View>
          )}
          {/* -------------------Priority Claim--------------------- */}
          {tradeApplicationData?.trademarkDetaild_type == 'Image mark' && (
            <>
              <View style={styles.cardView}>
                <TextView heading headingTextSty={styles.headingView}>
                  Attachment
                </TextView>
                <View style={styles.line} />
                <View style={{...styles.viewStyle, alignItems: 'flex-start'}}>
                  <TextView textSty={styles.dateText}>File Type</TextView>
                  <View>
                    <TextView>
                      {tradeApplicationData?.trademarkDetaild_type}
                    </TextView>
                    {/* file_type */}
                    <View
                      style={{flexDirection: 'row', flexWrap: 'wrap', gap: 5}}>
                      {tradeApplicationData?.TradeMarkImage && (
                        <View>
                          <Image
                            source={{
                              uri: `${Config.Image_URL}${tradeApplicationData?.TradeMarkImage}`,
                            }}
                            style={{width: 100, height: 100}}
                          />
                        </View>
                      )}
                      {/* {tradeApplicationData?.supporting_documents?.length > 0 &&
                        tradeApplicationData?.supporting_documents?.map(
                          (item, ind) => {
                            return (
                              <Image
                                source={{
                                  uri: `${Config.Image_URL}${item?.shortPath}`,
                                }}
                                style={{width: 100, height: 100}}
                              />
                            );
                          },
                        )} */}
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}

          <View>
            <Button
              onClick={() => handleSubmit()}
              btnName={AllString.Submit}
              buttonColor={Colors.White}
              allButtonSty={styles.loginBtnSty}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    margin: 8,
    // padding:16
  },
  cardView: {
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderColor: Colors.gray6,
    marginVertical: 10,
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
    lineHeight: 29,
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
    borderWidth: 0.6,
    borderColor: Colors.gray6,
    marginVertical: 8,
  },
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginVertical: 25,
  },
});
