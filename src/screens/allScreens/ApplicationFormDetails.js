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
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import CustomDropdown from '../../components/CustomDropdown';
import TextView from '../../components/TextView';
import {
  DropdownIconSVg,
  LineSvg,
  UploadImgIconSVG,
} from '../../assets/svgIcons/Index';
import {
  classHeadings,
  Countries,
  ECasesensitive,
  EClassification,
  EPriority,
  trademarkNatures,
  TrademarkTypes,
  trademarkTypes,
  TrademarkTypesDetails,
} from '../../constant/Label';
import FontFamily from '../../styles/FontFamily';
import InputFields from '../../components/InputFields';
import Button from '../../components/Button';
import AllString from '../../constant/AllString';
import NavigationString from '../../Navigations/NavigationString';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {TM1Schema, TM3Schema} from '../../Services/Validation';
import {saveTradeApplicationData} from '../../store/slices/auth';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {launchImageLibrary} from 'react-native-image-picker';
import {UploadImage} from '../../utils/CommonMethod';
import Collapsible from 'react-native-collapsible';
import CustomCheckbox from '../../components/CustomCheckbox';
import {
  Call_DeleteServices,
  Call_GetListServices,
  Call_GetServices,
  Call_InstancePostServices,
  Call_NewApplicationServices,
} from '../../Services/Services';
import {
  GetTradeMarkApperance_API,
  Image_URL,
  ImageDelete_API,
  Trademark_Appliaction_API,
  TradeMarkApplication_API,
} from '../../config/Url';
import Loading from '../../components/Loading';
import WaterMark from '../../components/WaterMark';
import CustomAlert from '../../components/CustomAlert';
import {LocalStorage} from '../../utils/LocalStorage';

const ApplicationFormDetails = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {tradeApplicationData} = useSelector(state => state.auth);
  const [TradeMarkApperance, setTradeMarkApperance] = useState([]);
  const {displayName} = useSelector(state => state.auth);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const {profileData} = useSelector(state => state.auth);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [showPriority, setShowPriority] = useState(false);

  const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
  const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
  const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box

  const handleSelectTrademarkType = val => {
    formik.setFieldValue('trademarkDetaild_type', val?.label);
    formik.setFieldValue('tradeMarkApperanceID', val?.value);
  };

  const handlePriorityType = val => {
    formik.setFieldValue('priority_type', val?.value);
  };

  const handleSelectCountry = val => {
    formik.setFieldValue('priority_country', val?.value);
  };
  console.log('profileData?.usR_Username', selectedClasses);
  const handleApplicationSubmit = async values => {
    // if (displayName) {
    //   return;
    // }

    // let supporting_docValue = values.supporting_documents?.map(
    //   i => i?.shortPath,
    // );

    // let upload_image_value = values.upload_image?.map(i => i?.shortPath);

    const payload = {
      Denomination: tradeApplicationData?.denomination,
      CustomerCode: profileData?.usR_Username,
      NiceClassId: selectedClasses[0]?.class,
      GoodAndServices: values?.good_services,
      Endorsements: values?.representation,
      GPANumber: tradeApplicationData?.gpa_number,
      TMApperanceId: values?.tradeMarkApperanceID,
      DrawingFile: values?.TradeMarkImage,
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
          priorityNo: values?.priority_number,
          priorityDate: values?.priority_date,
          priorityType: values?.priority_type,
          countryCode: 'US', // not set yet
          countryName: values?.priority_country,
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
    formData.append('Denomination', values?.representation || '');
    formData.append('CustomerCode', profileData?.usR_Username || '');
    formData.append('NiceClassId', selectedClasses[0]?.class || '');
    formData.append('GoodAndServices', values?.good_services || '');
    // formData.append('Endorsements', values?.representation || '');
    formData.append('GPANumber', tradeApplicationData?.gpa_number || '');
    formData.append('TMApperanceId', values?.tradeMarkApperanceID || '');

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
      values?.trademarkDetaild_type === 'Image Mark' &&
      payload?.DrawingFile
    ) {
      formData.append('DrawingFile', {
        uri: payload.DrawingFile,
        type: 'image/jpeg', // or use payload.DrawingFile.type if available
        name: 'photo.jpg', // or use payload.DrawingFile.name if available
      });
    }

    setIsLoading(true);
    const response = await Call_NewApplicationServices(
      TradeMarkApplication_API,
      formData,
    );
    console.log(JSON.stringify(formData), '-=>response--------', response);
    setIsLoading(false);
    if (response?.status === 200) {
      dispatch(saveTradeApplicationData({}));
      navigation.navigate(NavigationString.ApplicationSuccessScreen);
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      trademarkDetaild_type: tradeApplicationData?.trademarkDetaild_type || '',
      tradeMarkApperanceID: tradeApplicationData?.tradeMarkApperanceID || '1',
      representation: tradeApplicationData?.representation || '',
      case_sensitive: tradeApplicationData?.case_sensitive || '',
      classification: tradeApplicationData?.classification || '',
      good_services: tradeApplicationData?.good_services || '',
      endorsement: tradeApplicationData?.endorsement || '',
      priority_type: tradeApplicationData?.priority_type || '',
      priority_country: tradeApplicationData?.priority_country || '',
      priority_number: tradeApplicationData?.priority_number || '',
      priority_date: tradeApplicationData?.priority_date || '',
      TradeMarkImage: tradeApplicationData?.TradeMarkImage || '',
    },
    validationSchema: TM3Schema,
    onSubmit: values => {
      handleApplicationSubmit(values);
    },
  });

  useEffect(() => {
    getTradeMarkApperance();
  }, []);

  const getTradeMarkApperance = useCallback(async () => {
    const res = await Call_GetListServices(GetTradeMarkApperance_API);
    if (res) {
      const formatted = res.map(item => ({
        label: item.tmApperanceName,
        value: item.id,
      }));
      setTradeMarkApperance(formatted);
    }
    console.log('GetTradeMarkApperance_API res--', res);
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    const formattedDate = moment(date).format('MM-DD-YYYY');
    console.warn('A date has been picked: ', date);

    formik.setFieldValue('priority_date', formattedDate);

    // formik.setFieldValue('priority_date', date)
    hideDatePicker();
  };

  // Open Image Library
  const handleImageAttach = () => {
    let options = {
      mediaType: 'photo',
      quality: 1, // Image quality (1 = best)
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        setIsLoading(true);
        const imageUri = response.assets[0].uri;

        // const uploadImageUrl = await UploadImage(imageUri);
        setIsLoading(false);

        // console.log('uploadImageUrl images --', uploadImageUrl);

        // formik.setFieldValue('TradeMarkImage', uploadImageUrl);

        console.log('uploadImageUrl images --', imageUri);

        formik.setFieldValue('TradeMarkImage', imageUri);
      }
    });
  };

  const toggleClassSelection = item => {
    setSelectedClasses(prev => {
      // const updatedClasses = prev.includes(item)
      //   ? prev.filter((i) => i !== item)
      //   : [...prev, item];

      const updatedClasses = prev.includes(item)
        ? prev.filter(i => i !== item)
        : [item];

      // Update Formik field correctly using the updated state
      const updatedTerms = updatedClasses.map(cls => cls.terms).join(`--`);
      formik.setFieldValue('good_services', updatedTerms);
      setIsCollapsed(!isCollapsed);
      return updatedClasses;
    });
  };

  const handleDelete = async url => {
    const res = await Call_DeleteServices(ImageDelete_API + url);

    if (res.success) {
      formik.setFieldValue('TradeMarkImage', '');
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'New Application'}
        rightClick={() => navigation.goBack()}
      />

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
          <WaterMark image={`${Image_URL}images/1741785095306-app-logo.png`}>
            <Modal animated={true} transparent={true} visible={isLoading}>
              <Loading />
            </Modal>

            <View style={styles.box}>
              <View style={styles.topHeading}>
                <TextView heading headingTextSty={styles.textHeaing}>
                  Trade Mark Details
                </TextView>
              </View>

              <View style={styles.fieldBox}>
                <CustomDropdown
                  label={'Trade Mark Type*'}
                  placeholder="Select"
                  data={TradeMarkApperance}
                  // data={TrademarkTypesDetails}
                  values={formik.values.trademarkDetaild_type}
                  onSelect={handleSelectTrademarkType}
                />
                {formik.touched.tradeMarkApperanceID &&
                formik.errors.tradeMarkApperanceID ? (
                  <TextView textSty={styles.errorText}>
                    {formik.errors.tradeMarkApperanceID}
                  </TextView>
                ) : null}

                <View>
                  <TextView textSty={styles.labelSty}>Representation*</TextView>
                  <InputFields
                    fieldStyle={{
                      width: '100%',
                      fontSize: 12,
                      line: 16.39,
                      fontFamily: FontFamily.Bold,
                    }}
                    simpleField
                    placeholder={'Representation'}
                    value={formik.values.representation}
                    onChangeText={formik.handleChange('representation')}
                    maxLength={30}
                  />
                  {formik.touched.representation &&
                  formik.errors.representation ? (
                    <TextView textSty={styles.errorText}>
                      {formik.errors.representation}
                    </TextView>
                  ) : null}
                </View>

                {/* <CustomDropdown
                  label={'Case Sensitive'}
                  placeholder="Select"
                  data={ECasesensitive}
                  values={formik.values.case_sensitive}
                  onSelect={handleCaseSensitiveType}
                /> */}

                {formik.values.trademarkDetaild_type == 'Image Mark' && (
                  <View>
                    <TextView textSty={styles.labelSty}>
                      Trade Mark Image
                    </TextView>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleImageAttach()}
                      style={styles.uploadView}>
                      <View style={{paddingLeft: 15}}>
                        <UploadImgIconSVG />
                      </View>
                      <View style={{paddingHorizontal: 10}}>
                        <LineSvg color={Colors.gray7} />
                      </View>
                      <TextView
                        textSty={{
                          ...styles.uploadText,
                          color: formik.values.TradeMarkImage
                            ? Colors.gray4
                            : Colors.placeHolderColor,
                          width: formik.values.TradeMarkImage ? '35%' : '100%',
                        }}>
                        {formik.values.TradeMarkImage
                          ? formik.values.TradeMarkImage
                          : 'Attach'}
                      </TextView>
                      {formik?.values?.TradeMarkImage && (
                        <TouchableOpacity
                          onPress={() =>
                            handleDelete(formik?.values?.TradeMarkImage)
                          }
                          style={{
                            position: 'absolute',
                            right: 5,
                          }}>
                          <TextView
                            textSty={{
                              textAlign: 'rigth',
                              padding: 15,
                            }}>
                            X
                          </TextView>
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  </View>
                )}

                <TextView
                  onPress={() => {
                    navigation.navigate(
                      NavigationString.NiceClassesDescriptionScreen,
                      {key: 'applicationDetails'},
                    );
                  }}
                  heading
                  headingTextSty={{
                    color: Colors.TealBlue,
                    // textDecorationLine: "underline",
                    textDecorationStyle: 'solid',
                    marginTop: 10,
                    paddingBottom: 0,
                    lineHeight: 14,
                    borderBottomWidth: 1,
                    width: 200,
                    borderColor: Colors.TealBlue,
                  }}>
                  {/* Nice Classes Description */}
                  Class (goods and services)
                </TextView>

                {/* Accordion Header */}
                <TouchableOpacity
                  onPress={() => setIsCollapsed(!isCollapsed)}
                  style={{
                    backgroundColor: Colors.White,
                    padding: 8,
                    marginTop: 10,
                    borderRadius: 5,
                    marginBottom: 15,
                  }}>
                  {
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 5,
                      }}>
                      {selectedClasses.length != 0 ? (
                        <TextView
                          heading
                          headingTextSty={{
                            color: Colors.Black,
                            fontFamily: FontFamily.Bold,
                            fontSize: 13,
                            lineHeight: 20.49,
                          }}>
                          {selectedClasses[0].class < 10
                            ? `0${selectedClasses[0].class}`
                            : selectedClasses[0].class}
                        </TextView>
                      ) : (
                        <TextView
                          heading
                          headingTextSty={{
                            color: Colors.placeHolderColor,
                            fontFamily: FontFamily.Bold,
                            fontSize: 13,
                            lineHeight: 20.49,
                          }}>
                          Class (goods and services)
                        </TextView>
                      )}
                      {isCollapsed ? <Text>▼</Text> : <Text>▲</Text>}
                    </View>
                  }
                </TouchableOpacity>

                {/* Collapsible Checkbox List */}
                <Collapsible collapsed={isCollapsed}>
                  <View style={{marginBottom: 15, maxHeight: 200}}>
                    <FlatList
                      // data={Array.from({ length: 45 }, (_, i) => i + 1)}
                      data={classHeadings}
                      keyExtractor={i => i}
                      nestedScrollEnabled
                      renderItem={num => (
                        <CustomCheckbox
                          key={num?.item}
                          label={
                            num.item.class < 10
                              ? `0${num?.item.class}`
                              : num?.item.class
                          }
                          isChecked={selectedClasses.includes(num?.item)}
                          onToggle={() => toggleClassSelection(num?.item)}
                        />
                      )}
                    />
                  </View>
                </Collapsible>

                <View>
                  <TextView textSty={styles.labelSty}>
                    Goods and services*
                  </TextView>
                  <InputFields
                    fieldStyle={{
                      width: '100%',
                      fontSize: 12,
                      line: 16.39,
                      fontFamily: FontFamily.Bold,
                    }}
                    simpleField
                    placeholder={'Goods and services...'}
                    multiline={true}
                    numberOfLines={4}
                    value={formik.values.good_services}
                    onChangeText={formik.handleChange('good_services')}
                    // maxLength={500}
                  />

                  {formik.touched.good_services &&
                  formik.errors.good_services ? (
                    <TextView textSty={styles.errorText}>
                      {formik.errors.good_services}
                    </TextView>
                  ) : null}
                </View>
                {/* <View>
                <TextView textSty={styles.labelSty}>Endorsement</TextView>
                <InputFields
                  fieldStyle={{
                    width: '100%',
                    fontSize: 12,
                    line: 16.39,
                    fontFamily: FontFamily.Bold,
                  }}
                  simpleField
                  placeholder={'Endorsement'}
                  multiline={true}
                  numberOfLines={4}
                  value={formik.values.endorsement}
                  onChangeText={formik.handleChange('endorsement')}
                  maxLength={500}
                />
              </View> */}
                <View>
                  <View style={styles.line} />
                  <TextView textSty={styles.labelSty}>Priority Claim</TextView>
                  <Button
                    onClick={() => {
                      setShowPriority(!showPriority);
                    }}
                    btnName={AllString.ClickPriority}
                    buttonColor={Colors.White}
                    allButtonSty={{
                      ...styles.loginBtnSty,
                      backgroundColor: Colors.mintBlack,
                      marginBottom: 20,
                    }}
                  />
                </View>

                {showPriority && (
                  <>
                    <CustomDropdown
                      label={'Priority  Type'}
                      placeholder="Select"
                      data={EPriority}
                      values={formik.values.priority_type}
                      onSelect={handlePriorityType}
                    />
                    <CustomDropdown
                      label={'Country'}
                      placeholder="Select"
                      data={Countries}
                      values={formik.values.priority_country}
                      onSelect={handleSelectCountry}
                    />
                    <View>
                      <TextView textSty={styles.labelSty}>
                        Priority Number
                      </TextView>
                      <InputFields
                        fieldStyle={{
                          width: '100%',
                          fontSize: 12,
                          line: 16.39,
                          fontFamily: FontFamily.Bold,
                        }}
                        simpleField
                        keyboardType="phone-pad"
                        placeholder={'Priority Number'}
                        value={formik.values.priority_number}
                        onChangeText={formik.handleChange('priority_number')}
                        maxLength={15}
                      />
                    </View>
                    <View>
                      <TextView textSty={styles.labelSty}>
                        Priority Date
                      </TextView>
                      <InputFields
                        onPressDate={() => showDatePicker()}
                        fieldStyle={{
                          fontSize: 12,
                          line: 16.39,
                          width: '85%',
                          fontFamily: FontFamily.Bold,
                          color: formik.values.priority_date
                            ? Colors.gray4
                            : Colors.placeHolderColor,
                        }}
                        simpleField
                        editable={false}
                        value={formik.values.priority_date}
                        onChangeText={formik.values.priority_date}
                        dateIcon
                        placeholder={
                          formik.values.priority_date
                            ? formik.values.priority_date
                            : 'DD-MM-YYYY'
                        }
                      />
                    </View>
                  </>
                )}
              </View>
            </View>
            <View style={styles.btnView}>
              <View style={styles.innerViewBtn}>
                <Button
                  // onClick={() => {
                  //   navigation.goBack();
                  // }}
                  // btnName={AllString.Cancel}
                  onClick={() => {
                    // setShowPreview(true);

                    const payload = {
                      ...formik.values,
                      classification: selectedClasses.map(i => i.class),
                    };
                    dispatch(saveTradeApplicationData(payload));

                    navigation.navigate(NavigationString.PreviewScreens);
                    // navigation.goBack();
                  }}
                  btnName={AllString.Preview}
                  buttonColor={Colors.White}
                  allButtonSty={{
                    ...styles.loginBtnSty,
                    backgroundColor: Colors.MantisGreen,
                  }}
                />
              </View>
              <View style={styles.innerViewBtn}>
                <Button
                  onClick={formik.handleSubmit}
                  // btnName={AllString.Next}
                  btnName={AllString.Submit}
                  buttonColor={Colors.White}
                  allButtonSty={styles.loginBtnSty}
                />
              </View>
            </View>
          </WaterMark>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          minimumDate={new Date()}
          onCancel={hideDatePicker}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationFormDetails;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginHorizontal: 16,
  },
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginTop: 15,
  },
  box: {
    marginVertical: 10,
    backgroundColor: Colors.linghtBlue,
    borderRadius: 5,
    marginTop: 25,
  },
  topHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.White,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 15,
    paddingVertical: 20,
  },
  textHeaing: {
    fontSize: 14,
    lineHeight: 19.12,
    color: Colors.gray4,
  },
  fieldBox: {padding: 15, marginTop: 10},
  labelSty: {
    fontSize: 12,
    lineHeight: 16.39,
    fontFamily: FontFamily.Bold,
    color: Colors.gray4,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  innerViewBtn: {width: '45%'},
  line: {
    borderWidth: 0.8,
    borderColor: Colors.gray6,
    marginVertical: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: -8,
  },
  labelSty: {
    fontSize: 12,
    lineHeight: 16.39,
    fontFamily: FontFamily.Bold,
    color: Colors.gray4,
  },

  innerViewBtn: {width: '45%'},
  uploadView: {
    marginVertical: 8,
    backgroundColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 14,
    lineHeight: 19.12,
    color: Colors.placeHolderColor,
    fontFamily: FontFamily.Medium,
  },
});

// here navigate to attachment screen
// import {
//   FlatList,
//   Modal,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useCallback, useEffect, useState} from 'react';
// import Header from '../../components/Header';
// import Colors from '../../styles/Colors';
// import CustomDropdown from '../../components/CustomDropdown';
// import TextView from '../../components/TextView';
// import {
//   DropdownIconSVg,
//   LineSvg,
//   UploadImgIconSVG,
// } from '../../assets/svgIcons/Index';
// import {
//   classHeadings,
//   Countries,
//   ECasesensitive,
//   EClassification,
//   EPriority,
//   trademarkNatures,
//   TrademarkTypes,
//   trademarkTypes,
//   TrademarkTypesDetails,
// } from '../../constant/Label';
// import FontFamily from '../../styles/FontFamily';
// import InputFields from '../../components/InputFields';
// import Button from '../../components/Button';
// import AllString from '../../constant/AllString';
// import NavigationString from '../../Navigations/NavigationString';
// import {useDispatch, useSelector} from 'react-redux';
// import {useFormik} from 'formik';
// import {TM1Schema, TM3Schema} from '../../Services/Validation';
// import {saveTradeApplicationData} from '../../store/slices/auth';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import moment from 'moment';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {UploadImage} from '../../utils/CommonMethod';
// import Collapsible from 'react-native-collapsible';
// import CustomCheckbox from '../../components/CustomCheckbox';
// import {Call_DeleteServices} from '../../Services/Services';
// import {Image_URL, ImageDelete_API} from '../../config/Url';
// import Loading from '../../components/Loading';
// import WaterMark from '../../components/WaterMark';

// const ApplicationFormDetails = ({navigation}) => {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const {tradeApplicationData} = useSelector(state => state.auth);
//   const [trademarkType, setTrademarkType] = useState('');

//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const [showPriority, setShowPriority] = useState(false);

//   const handleSelectTrademarkType = val => {
//     setTrademarkType(val?.value);
//     formik.setFieldValue('trademarkDetaild_type', val?.label);
//   };

//   const handleCaseSensitiveType = val => {
//     formik.setFieldValue('case_sensitive', val?.value);
//   };

//   const handleclassificationType = val => {
//     formik.setFieldValue('classification', val?.value);
//   };

//   const handlePriorityType = val => {
//     formik.setFieldValue('priority_type', val?.value);
//   };

//   const handleSelectCountry = val => {
//     formik.setFieldValue('priority_country', val?.value);
//   };

//   console.log('23847293747234', tradeApplicationData);
//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       trademarkDetaild_type: tradeApplicationData?.trademarkDetaild_type || '',
//       representation: tradeApplicationData?.representation || '',
//       case_sensitive: tradeApplicationData?.case_sensitive || '',
//       classification: tradeApplicationData?.classification || '',
//       good_services: tradeApplicationData?.good_services || '',
//       endorsement: tradeApplicationData?.endorsement || '',
//       priority_type: tradeApplicationData?.priority_type || '',
//       priority_country: tradeApplicationData?.priority_country || '',
//       priority_number: tradeApplicationData?.priority_number || '',
//       priority_date: tradeApplicationData?.priority_date || '',
//       TradeMarkImage: tradeApplicationData?.TradeMarkImage || '',
//     },
//     validationSchema: TM3Schema,
//     onSubmit: values => {
//       console.log('Form submitted', values);
//       const payload = {
//         ...formik.values,
//         // trademarkDetaild_type: trademarkType,
//         classification: selectedClasses.map(i => i.class),
//       };
//       dispatch(saveTradeApplicationData(payload));
//       navigation.navigate(NavigationString.ApplicationImgUploadScreen);
//       // Handle form submission
//     },
//   });

//   const handleDatePicker = useCallback(() => {}, []);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = date => {
//     const formattedDate = moment(date).format('MM-DD-YYYY');
//     console.warn('A date has been picked: ', date);

//     formik.setFieldValue('priority_date', formattedDate);

//     // formik.setFieldValue('priority_date', date)
//     hideDatePicker();
//   };

//   // Open Image Library
//   const handleImageAttach = () => {
//     let options = {
//       mediaType: 'photo',
//       quality: 1, // Image quality (1 = best)
//     };

//     launchImageLibrary(options, async response => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error:', response.error);
//       } else {
//         const imageUri = response.assets[0].uri;

//         setIsLoading(true);
//         const uploadImageUrl = await UploadImage(imageUri);
//         setIsLoading(false);

//         console.log('uploadImageUrl images --', uploadImageUrl);

//         formik.setFieldValue('TradeMarkImage', uploadImageUrl);
//       }
//     });
//   };

//   const toggleClassSelection = item => {
//     setSelectedClasses(prev => {
//       // const updatedClasses = prev.includes(item)
//       //   ? prev.filter((i) => i !== item)
//       //   : [...prev, item];

//       const updatedClasses = prev.includes(item)
//         ? prev.filter(i => i !== item)
//         : [item];

//       // Update Formik field correctly using the updated state
//       const updatedTerms = updatedClasses.map(cls => cls.terms).join(`--`);
//       formik.setFieldValue('good_services', updatedTerms);
//       setIsCollapsed(!isCollapsed);
//       return updatedClasses;
//     });
//   };

//   const handleDelete = async url => {
//     const res = await Call_DeleteServices(ImageDelete_API + url);

//     if (res.success) {
//       formik.setFieldValue('TradeMarkImage', '');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeView}>
//       {/* Header View */}

//       <Header
//         arrowBack
//         title={'New Application'}
//         rightClick={() => navigation.goBack()}
//       />

//       <ScrollView
//         contentContainerStyle={{flexGrow: 1}}
//         nestedScrollEnabled={true}>
//         <View style={styles.container}>
//           <WaterMark image={`${Image_URL}images/1741785095306-app-logo.png`}>
//             <Modal animated={true} transparent={true} visible={isLoading}>
//               <Loading />
//             </Modal>

//             <View style={styles.box}>
//               <View style={styles.topHeading}>
//                 <TextView heading headingTextSty={styles.textHeaing}>
//                   Trade Mark Details
//                 </TextView>
//               </View>

//               <View style={styles.fieldBox}>
//                 <CustomDropdown
//                   label={'Trade Mark Type'}
//                   placeholder="Select"
//                   data={TrademarkTypesDetails}
//                   values={formik.values.trademarkDetaild_type}
//                   onSelect={handleSelectTrademarkType}
//                 />

//                 <View>
//                   <TextView textSty={styles.labelSty}>Representation</TextView>
//                   <InputFields
//                     fieldStyle={{
//                       width: '100%',
//                       fontSize: 12,
//                       line: 16.39,
//                       fontFamily: FontFamily.Bold,
//                     }}
//                     simpleField
//                     placeholder={'Trade Mark Name'}
//                     value={formik.values.representation}
//                     onChangeText={formik.handleChange('representation')}
//                     maxLength={30}
//                   />
//                   {formik.touched.representation &&
//                   formik.errors.representation ? (
//                     <TextView textSty={styles.errorText}>
//                       {formik.errors.representation}
//                     </TextView>
//                   ) : null}
//                 </View>

//                 <CustomDropdown
//                   label={'Case Sensitive'}
//                   placeholder="Select"
//                   data={ECasesensitive}
//                   values={formik.values.case_sensitive}
//                   onSelect={handleCaseSensitiveType}
//                 />

//                 {formik.values.trademarkDetaild_type == 'Image mark' && (
//                   <View>
//                     <TextView textSty={styles.labelSty}>
//                       Trade Mark Image
//                     </TextView>
//                     <TouchableOpacity
//                       activeOpacity={0.7}
//                       onPress={() => handleImageAttach()}
//                       style={styles.uploadView}>
//                       <View style={{paddingLeft: 15}}>
//                         <UploadImgIconSVG />
//                       </View>
//                       <View style={{paddingHorizontal: 10}}>
//                         <LineSvg color={Colors.gray7} />
//                       </View>
//                       <TextView
//                         textSty={{
//                           ...styles.uploadText,
//                           color: formik.values.TradeMarkImage
//                             ? Colors.gray4
//                             : Colors.placeHolderColor,
//                           width: formik.values.TradeMarkImage ? '35%' : '100%',
//                         }}>
//                         {formik.values.TradeMarkImage
//                           ? formik.values.TradeMarkImage
//                           : 'Attach'}
//                       </TextView>
//                       {formik?.values?.TradeMarkImage && (
//                         <TouchableOpacity
//                           onPress={() =>
//                             handleDelete(formik?.values?.TradeMarkImage)
//                           }
//                           style={{
//                             position: 'absolute',
//                             right: 5,
//                           }}>
//                           <TextView
//                             textSty={{
//                               textAlign: 'rigth',
//                               padding: 15,
//                             }}>
//                             X
//                           </TextView>
//                         </TouchableOpacity>
//                       )}
//                     </TouchableOpacity>
//                   </View>
//                 )}

//                 <TextView
//                   onPress={() => {
//                     navigation.navigate(
//                       NavigationString.NiceClassesDescriptionScreen,
//                       {key: 'applicationDetails'},
//                     );
//                   }}
//                   heading
//                   headingTextSty={{
//                     color: Colors.TealBlue,
//                     // textDecorationLine: "underline",
//                     textDecorationStyle: 'solid',
//                     marginTop: 10,
//                     paddingBottom: 0,
//                     lineHeight: 14,
//                     borderBottomWidth: 1,
//                     width: 200,
//                     borderColor: Colors.TealBlue,
//                   }}>
//                   {/* Nice Classes Description */}
//                   Class for good and services
//                 </TextView>

//                 {/* Accordion Header */}
//                 <TouchableOpacity
//                   onPress={() => setIsCollapsed(!isCollapsed)}
//                   style={{
//                     backgroundColor: Colors.White,
//                     padding: 8,
//                     marginTop: 10,
//                     borderRadius: 5,
//                     marginBottom: 15,
//                   }}>
//                   {
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         paddingVertical: 5,
//                       }}>
//                       {selectedClasses.length != 0 ? (
//                         <TextView
//                           heading
//                           headingTextSty={{
//                             color: Colors.Black,
//                             fontFamily: FontFamily.Bold,
//                             fontSize: 13,
//                             lineHeight: 20.49,
//                           }}>
//                           {selectedClasses[0].class < 10
//                             ? `0${selectedClasses[0].class}`
//                             : selectedClasses[0].class}
//                         </TextView>
//                       ) : (
//                         <TextView
//                           heading
//                           headingTextSty={{
//                             color: Colors.placeHolderColor,
//                             fontFamily: FontFamily.Bold,
//                             fontSize: 13,
//                             lineHeight: 20.49,
//                           }}>
//                           Classification
//                         </TextView>
//                       )}
//                       {isCollapsed ? <Text>▼</Text> : <Text>▲</Text>}
//                     </View>
//                   }
//                 </TouchableOpacity>

//                 {/* Collapsible Checkbox List */}
//                 <Collapsible collapsed={isCollapsed}>
//                   <View style={{marginBottom: 15, maxHeight: 200}}>
//                     <FlatList
//                       // data={Array.from({ length: 45 }, (_, i) => i + 1)}
//                       data={classHeadings}
//                       keyExtractor={i => i}
//                       nestedScrollEnabled
//                       renderItem={num => (
//                         <CustomCheckbox
//                           key={num?.item}
//                           label={
//                             num.item.class < 10
//                               ? `0${num?.item.class}`
//                               : num?.item.class
//                           }
//                           isChecked={selectedClasses.includes(num?.item)}
//                           onToggle={() => toggleClassSelection(num?.item)}
//                         />
//                       )}
//                     />
//                   </View>
//                 </Collapsible>

//                 <View>
//                   <TextView textSty={styles.labelSty}>
//                     Goods and services*
//                   </TextView>
//                   <InputFields
//                     fieldStyle={{
//                       width: '100%',
//                       fontSize: 12,
//                       line: 16.39,
//                       fontFamily: FontFamily.Bold,
//                     }}
//                     simpleField
//                     placeholder={'Goods and services...'}
//                     multiline={true}
//                     numberOfLines={4}
//                     value={formik.values.good_services}
//                     onChangeText={formik.handleChange('good_services')}
//                     // maxLength={500}
//                   />

//                   {formik.touched.good_services &&
//                   formik.errors.good_services ? (
//                     <TextView textSty={styles.errorText}>
//                       {formik.errors.good_services}
//                     </TextView>
//                   ) : null}
//                 </View>
//                 {/* <View>
//                 <TextView textSty={styles.labelSty}>Endorsement</TextView>
//                 <InputFields
//                   fieldStyle={{
//                     width: '100%',
//                     fontSize: 12,
//                     line: 16.39,
//                     fontFamily: FontFamily.Bold,
//                   }}
//                   simpleField
//                   placeholder={'Endorsement'}
//                   multiline={true}
//                   numberOfLines={4}
//                   value={formik.values.endorsement}
//                   onChangeText={formik.handleChange('endorsement')}
//                   maxLength={500}
//                 />
//               </View> */}
//                 <View>
//                   <View style={styles.line} />
//                   <TextView textSty={styles.labelSty}>Priority Claim</TextView>
//                   <Button
//                     onClick={() => {
//                       setShowPriority(!showPriority);
//                     }}
//                     btnName={AllString.ClickPriority}
//                     buttonColor={Colors.White}
//                     allButtonSty={{
//                       ...styles.loginBtnSty,
//                       backgroundColor: Colors.mintBlack,
//                       marginBottom: 20,
//                     }}
//                   />
//                 </View>

//                 {showPriority && (
//                   <>
//                     <CustomDropdown
//                       label={'Priority  Type'}
//                       placeholder="Select"
//                       data={EPriority}
//                       values={formik.values.priority_type}
//                       onSelect={handlePriorityType}
//                     />
//                     <CustomDropdown
//                       label={'Country'}
//                       placeholder="Select"
//                       data={Countries}
//                       values={formik.values.priority_country}
//                       onSelect={handleSelectCountry}
//                     />
//                     <View>
//                       <TextView textSty={styles.labelSty}>
//                         Priority Number
//                       </TextView>
//                       <InputFields
//                         fieldStyle={{
//                           width: '100%',
//                           fontSize: 12,
//                           line: 16.39,
//                           fontFamily: FontFamily.Bold,
//                         }}
//                         simpleField
//                         keyboardType="phone-pad"
//                         placeholder={'Priority Number'}
//                         value={formik.values.priority_number}
//                         onChangeText={formik.handleChange('priority_number')}
//                         maxLength={15}
//                       />
//                     </View>
//                     <View>
//                       <TextView textSty={styles.labelSty}>
//                         Priority Date
//                       </TextView>
//                       <InputFields
//                         onPressDate={() => showDatePicker()}
//                         fieldStyle={{
//                           fontSize: 12,
//                           line: 16.39,
//                           width: '85%',
//                           fontFamily: FontFamily.Bold,
//                           color: formik.values.priority_date
//                             ? Colors.gray4
//                             : Colors.placeHolderColor,
//                         }}
//                         simpleField
//                         editable={false}
//                         value={formik.values.priority_date}
//                         onChangeText={formik.values.priority_date}
//                         dateIcon
//                         placeholder={
//                           formik.values.priority_date
//                             ? formik.values.priority_date
//                             : 'DD-MM-YYYY'
//                         }
//                       />
//                     </View>
//                   </>
//                 )}
//               </View>
//             </View>
//             <View style={styles.btnView}>
//               <View style={styles.innerViewBtn}>
//                 <Button
//                   onClick={() => {
//                     navigation.goBack();
//                   }}
//                   btnName={AllString.Cancel}
//                   buttonColor={Colors.White}
//                   allButtonSty={{
//                     ...styles.loginBtnSty,
//                     backgroundColor: Colors.MantisGreen,
//                   }}
//                 />
//               </View>
//               <View style={styles.innerViewBtn}>
//                 <Button
//                   onClick={formik.handleSubmit}
//                   btnName={AllString.Next}
//                   buttonColor={Colors.White}
//                   allButtonSty={styles.loginBtnSty}
//                 />
//               </View>
//             </View>
//           </WaterMark>
//         </View>
//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="date"
//           onConfirm={handleConfirm}
//           minimumDate={new Date()}
//           onCancel={hideDatePicker}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default ApplicationFormDetails;

// const styles = StyleSheet.create({
//   safeView: {flex: 1, backgroundColor: Colors.bgColor},
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     marginHorizontal: 16,
//   },
//   loginBtnSty: {
//     backgroundColor: Colors.TealBlue,
//     marginHorizontal: 0,
//     paddingVertical: 14,
//     marginTop: 15,
//   },
//   box: {
//     marginVertical: 10,
//     backgroundColor: Colors.linghtBlue,
//     borderRadius: 5,
//     marginTop: 25,
//   },
//   topHeading: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: Colors.White,
//     borderTopLeftRadius: 5,
//     borderTopRightRadius: 5,
//     padding: 15,
//     paddingVertical: 20,
//   },
//   textHeaing: {
//     fontSize: 14,
//     lineHeight: 19.12,
//     color: Colors.gray4,
//   },
//   fieldBox: {padding: 15, marginTop: 10},
//   labelSty: {
//     fontSize: 12,
//     lineHeight: 16.39,
//     fontFamily: FontFamily.Bold,
//     color: Colors.gray4,
//   },
//   btnView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   innerViewBtn: {width: '45%'},
//   line: {
//     borderWidth: 0.8,
//     borderColor: Colors.gray6,
//     marginVertical: 15,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 10,
//     lineHeight: 12,
//     top: -8,
//   },
//   labelSty: {
//     fontSize: 12,
//     lineHeight: 16.39,
//     fontFamily: FontFamily.Bold,
//     color: Colors.gray4,
//   },

//   innerViewBtn: {width: '45%'},
//   uploadView: {
//     marginVertical: 8,
//     backgroundColor: Colors.White,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   uploadText: {
//     fontSize: 14,
//     lineHeight: 19.12,
//     color: Colors.placeHolderColor,
//     fontFamily: FontFamily.Medium,
//   },
// });
