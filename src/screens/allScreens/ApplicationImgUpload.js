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
import React, {useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import CustomDropdown from '../../components/CustomDropdown';
import TextView from '../../components/TextView';
import {
  DropdownIconSVg,
  LineSvg,
  UploadFileIConSVG,
  UploadImgIconSVG,
} from '../../assets/svgIcons/Index';
import {FileTypes} from '../../constant/Label';
import FontFamily from '../../styles/FontFamily';
import Button from '../../components/Button';
import AllString from '../../constant/AllString';
import NavigationString from '../../Navigations/NavigationString';
import {useFormik} from 'formik';
import {TM4Schema} from '../../Services/Validation';
import {UploadImage} from '../../utils/CommonMethod';
import Loading from '../../components/Loading';
import DocumentPicker from 'react-native-document-picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  Call_DeleteServices,
  Call_InstancePostServices,
} from '../../Services/Services';
import {
  Image_URL,
  ImageDelete_API,
  Trademark_Appliaction_API,
} from '../../config/Url';
import CustomAlert from '../../components/CustomAlert';
import WaterMark from '../../components/WaterMark';
import {saveTradeApplicationData} from '../../store/slices/auth';

const ApplicationImgUpload = ({navigation}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const {displayName} = useSelector(state => state.auth);
  const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
  const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
  const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box

  const [showPreview, setShowPreview] = useState(false); //state manage show/hide preview screen
  const {tradeApplicationData} = useSelector(state => state.auth);

  const renderItem = ({item, ind}, type) => (
    <View style={styles.itemContainer}>
      <TextView textSty={styles.fileName}>{item?.originalname}</TextView>

      <TouchableOpacity
        onPress={() => handleDelete(item.shortPath, type)}
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
    </View>
  );

  const handleSelectTrademarkType = val => {
    formik.setFieldValue('file_type', val.label);
  };

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      supporting_documents: tradeApplicationData?.supporting_documents || [],
      file_type: tradeApplicationData?.file_type || '',
      upload_image: tradeApplicationData?.upload_image || [],
    },
    validationSchema: TM4Schema,
    onSubmit: values => {
      // console.log('Form submitted', values);
      // navigation.navigate(NavigationString.TermsandConditionsScreen);
      handleApplicationSubmit(values);
    },
  });

  console.log('4238823747234 upload---', tradeApplicationData);

  const handleApplicationSubmit = async values => {
    // if (displayName) {
    //   return;
    // }

    let supporting_docValue = values.supporting_documents?.map(
      i => i?.shortPath,
    );

    let upload_image_value = values.upload_image?.map(i => i?.shortPath);

    const payload = {
      trademark_name: tradeApplicationData.representation,
      trademark_type: tradeApplicationData?.trademarkDetaild_type,
      client_reference: tradeApplicationData?.client_reference,
      trademark_nature: tradeApplicationData?.trademark_natures,
      applicant_name: tradeApplicationData?.name,
      applicant_address: tradeApplicationData?.address,
      applicant_town: tradeApplicationData?.town,
      applicant_postal_code: tradeApplicationData.postal_code,
      applicant_country: tradeApplicationData?.country,
      applicant_phone: tradeApplicationData?.contact_number,
      applicant_fax: tradeApplicationData?.fax,
      applicant_email: tradeApplicationData?.email,
      aos_name: tradeApplicationData?.aos_name,
      aos_address: tradeApplicationData?.aos_address,
      aos_town: tradeApplicationData?.aos_town,
      aos_postal_code: tradeApplicationData?.aos_postal_code,
      aos_country: tradeApplicationData?.aos_country,
      aos_phone: tradeApplicationData?.aos_phone,
      aos_fax: tradeApplicationData?.aos_fax,
      aos_email: tradeApplicationData?.aos_email,
      aos_gpa_number: tradeApplicationData.gpa_number,
      trademark_classification: tradeApplicationData?.classification,
      goods_services: tradeApplicationData?.good_services?.trim(),
      endorsement: tradeApplicationData.endorsement,
      priority_type: tradeApplicationData?.priority_type,
      priority_country: tradeApplicationData?.priority_country,
      priority_number: tradeApplicationData?.priority_number,
      priority_date: tradeApplicationData?.priority_date,
      supporting_documents: supporting_docValue,
      attachment_type: 'document',
      attachments: upload_image_value,
      display_address: displayName,
      trademark_image: tradeApplicationData?.TradeMarkImage,
    };
    // console.log('upload payload-----', payload);
    setIsLoading(true);
    const response = await Call_InstancePostServices(
      Trademark_Appliaction_API,
      payload,
    );

    setIsLoading(false);
    if (response?.success) {
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

  // Open Image Library
  const selectDocuments = async types => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles], // Restricting to PDF files only
        allowMultiSelection: true,
        // type: [DocumentPicker.types.allFiles],
      });

      const selectedDocuments = result?.map(doc => ({
        uri: doc.uri,
        name: doc.name,
        type: doc.type,
      }));

      const resultsUrl = selectedDocuments?.map(doc => doc.uri);
      setIsLoading(true);
      const uploadImageUrl = await UploadImage(resultsUrl);
      setIsLoading(false);

      // console.log(types, '----uploadImageUrl-----', uploadImageUrl);

      if (types == 'supporting_documents') {
        formik.setFieldValue(`${types}`, [
          ...formik.values?.supporting_documents,
          ...uploadImageUrl,
        ]);
      }

      if (types == 'upload_image') {
        formik.setFieldValue(`${types}`, [
          ...formik.values?.upload_image,
          ...uploadImageUrl,
        ]);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled document picker');
      } else {
        console.log('Document picker error:', error);
      }
    }
  };

  //   const handleDelete = async (item) => {
  //     const updatedDocs = formik.values.supporting_documents.filter(i => i.shortPath !== item.shortPath);
  //     formik.setFieldValue('supporting_documents', updatedDocs);
  //     formik.setFieldValue('upload_image', updatedDocs);
  //     const res = await Call_DeleteServices(ImageDelete_API + item.shortPath);
  //     if (res.success) {
  //         console.log("File deleted successfully");
  //     }
  // };
  const handleDelete = async (url, type) => {
    setIsLoading(true);

    const res = await Call_DeleteServices(ImageDelete_API + url);

    if (res.success) {
      // Update Formik state after successful deletion
      formik.setFieldValue(
        type,
        formik.values[type].filter(item => item.shortPath !== url),
      );
    }

    setIsLoading(false);
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
                  Attachments
                </TextView>
              </View>

              <View style={styles.fieldBox}>
                {/* ----------File Type dropdown-------- */}
                <CustomDropdown
                  label={'Select File Type'}
                  placeholder="Select File Type"
                  data={FileTypes}
                  values={formik.values.file_type}
                  onSelect={handleSelectTrademarkType}
                />
                {formik.touched.file_type && formik.errors.file_type ? (
                  <TextView textSty={styles.errorText}>
                    {formik.errors.file_type}
                  </TextView>
                ) : null}

                {/* ----------Supporting Documents-------- */}
                <View>
                  <TextView textSty={styles.labelSty}>
                    Supporting Documents
                  </TextView>
                  <TouchableOpacity
                    onPress={() => selectDocuments('supporting_documents')}
                    activeOpacity={0.6}
                    style={styles.uploadView}>
                    <View style={{paddingLeft: 15}}>
                      <UploadImgIconSVG />
                    </View>
                    <View style={{paddingHorizontal: 10}}>
                      <LineSvg color={Colors.gray7} />
                    </View>
                    <TextView textSty={styles.uploadText}>{'Attach'}</TextView>
                  </TouchableOpacity>
                  {formik.touched.supporting_documents &&
                  formik.errors.supporting_documents ? (
                    <TextView textSty={styles.errorText}>
                      {formik.errors.supporting_documents}
                    </TextView>
                  ) : null}
                  <FlatList
                    data={formik.values.supporting_documents}
                    keyExtractor={(item, index) => index.toString()}
                    // renderItem={renderItem}
                    renderItem={props =>
                      renderItem(props, 'supporting_documents')
                    }
                    contentContainerStyle={styles.listContainer}
                  />
                </View>

                {/* ----------Attact file-------- */}
                {/* <TouchableOpacity
                onPress={() => selectDocuments('upload_image')}
                activeOpacity={0.6}
                style={styles.uploadView}>
                <View style={{paddingLeft: 15}}>
                  <UploadFileIConSVG />
                </View>
                <View style={{paddingHorizontal: 10}}>
                  <LineSvg color={Colors.gray7} />
                </View>
                <TextView textSty={styles.uploadText}>Attach</TextView>
              </TouchableOpacity> */}
                {formik.touched.upload_image && formik.errors.upload_image ? (
                  <TextView textSty={styles.errorText}>
                    {formik.errors.upload_image}
                  </TextView>
                ) : null}
                <FlatList
                  data={formik.values.upload_image}
                  keyExtractor={(item, index) => index.toString()}
                  // renderItem={renderItem}
                  renderItem={props => renderItem(props, 'upload_image')}
                  contentContainerStyle={styles.listContainer}
                />
              </View>
            </View>
            <View style={styles.btnView}>
              <View style={styles.innerViewBtn}>
                <Button
                  onClick={() => {
                    // setShowPreview(true);

                    const payload = {
                      ...formik.values,
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
                  btnName={AllString.Submit}
                  buttonColor={Colors.White}
                  allButtonSty={styles.loginBtnSty}
                />
              </View>
            </View>
          </WaterMark>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationImgUpload;

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
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: -8,
  },

  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  fileName: {
    width: '92%',
    fontSize: 12,
    line: 16.39,
    fontFamily: FontFamily.Bold,
  },
});
