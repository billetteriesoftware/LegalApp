import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../styles/Colors';
import Header from '../../components/Header';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import InputFields from '../../components/InputFields';
import {
  LineSvg,
  UploadFileIConSVG,
  UploadImgIconSVG,
} from '../../assets/svgIcons/Index';
import Button from '../../components/Button';
import NavigationString from '../../Navigations/NavigationString';
import {launchImageLibrary} from 'react-native-image-picker';
import {EnumForStoreImaage} from '../../constant/Label';
import {
  Call_DeleteServices,
  Call_InstancePostServices,
  Call_MediaUploadServices,
  Call_PostServices,
} from '../../Services/Services';
import {
  UploadProfileImage_API,
  ReportIssue_API,
  ImageDelete_API,
} from '../../config/Url';
import {CapitalizeFirstLetter} from '../../utils/CommonMethod';
import Loading from '../../components/Loading';
import {useFormik} from 'formik';
import {IssueReportSchema, LoginSchema} from '../../Services/Validation';

const IssueReport = ({navigation}) => {
  const [selected, setSelected] = useState('minor');
  const [isLoading, setIsLoading] = useState(false);

  const options = ['minor', 'moderate', 'major', 'critical'];

  const uploadImage = async imageUri => {
    // image path add in form data
    const formData = new FormData();
    formData.append('media', {
      uri: imageUri,
      type: 'image/jpeg', // Change based on image type
      name: 'uploaded_image.jpg',
    });

    formData.append('folder', EnumForStoreImaage.PUBLICATION);
    setIsLoading(true);
    const imgRes = await Call_MediaUploadServices(
      UploadProfileImage_API,
      formData,
    );

    console.log('---upload image res----', JSON.stringify(imgRes));
    setIsLoading(false);
    if (imgRes?.success) {
      formik.setFieldValue('upload_image', imgRes?.data[0]?.shortPath);
    }
  };

  // Open Image Library
  const openGallery = () => {
    let options = {
      mediaType: 'photo',
      quality: 1, // Image quality (1 = best)
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        uploadImage(imageUri);
      }
    });
  };

  const handleSubmit = async val => {
    const payload = {
      ticket_severity: selected,
      ticket_description: val?.documents,
      ticket_files: [val?.upload_image],
    };

    // console.log(payload, '----payload-----');

    setIsLoading(true);
    const response = await Call_InstancePostServices(ReportIssue_API, payload);
    setIsLoading(false);
    console.log(response, '--=-=-responsee======');
    if (response.success) {
      navigation.navigate(NavigationString.TicketSubmittedScreen);
    }
  };

  const formik = useFormik({
    initialValues: {
      documents: '',
      upload_image: '',
    },
    validationSchema: IssueReportSchema,
    onSubmit: values => {
      // Call Handle login
      handleSubmit(values);
    },
  });

  const handleDelete = async url => {
    const res = await Call_DeleteServices(ImageDelete_API + url);
    console.log('----delete api ----', res);
    if (res.success) {
      formik.setFieldValue('upload_image', '');
    }
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        radius
        arrowBack
        rightClick={() => navigation.goBack()}
        title={'Report an issue'}
      />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Modal animated={true} transparent={true} visible={isLoading}>
            <Loading />
          </Modal>
          <View style={{marginTop: 15}}>
            <TextView textSty={styles.labelSty}>Severity</TextView>
            <View style={styles.SelectContainer}>
              {options.map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.button,
                    selected === option && styles.selectedButton,
                  ]}
                  onPress={() => setSelected(option)}>
                  <Text
                    style={[
                      styles.text,
                      selected === option && styles.selectedText,
                    ]}>
                    {CapitalizeFirstLetter(option)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputBox}>
              <TextView textSty={styles.labelSty}>Description</TextView>
              <InputFields
                multiline={true}
                numberOfLines={4}
                simpleField
                placeholderTextColor={Colors.placeHolderColor1}
                placeholder={'Description'}
                fieldStyle={styles.inputField}
                value={formik.values.documents}
                onChangeText={formik.handleChange('documents')}
                // onChangeText={(e) => setDescription(e)}
              />
              {formik.touched.documents && formik.errors.documents ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.documents}
                </TextView>
              ) : null}
            </View>

            <View style={styles.inputBox}>
              <TextView textSty={styles.labelSty}>Upload Image</TextView>
              {/* <TouchableOpacity onPress={() => openGallery()}>
                <InputFields
                editable={false}
                  profileSection
                  inputFieldIcon={<UploadImgIconSVG />}
                  placeholderTextColor={Colors.Black}
                  placeholder={"Upload Image"}
                  fieldStyle={styles.inputField}
                  // value={selectedImage}
                  value={formik.values.upload_image}
                  onChangeText={formik.handleChange("upload_image")}
                />
               
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => openGallery()}
                activeOpacity={0.6}
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
                    color: formik.values.upload_image
                      ? Colors.gray4
                      : Colors.placeHolderColor,
                  }}>
                  {' '}
                  {formik.values.upload_image
                    ? formik.values.upload_image
                    : 'Attach'}
                </TextView>
                {formik.values.upload_image && (
                  <TouchableOpacity
                    onPress={() => handleDelete(formik.values.upload_image)}
                    style={{
                      position: 'absolute',
                      right: 10,
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
              {formik.touched.upload_image && formik.errors.upload_image ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.upload_image}
                </TextView>
              ) : null}
            </View>
          </View>

          {/* ============Save Button============ */}
          <Button
            onClick={formik.handleSubmit}
            // onClick={() => {
            //   handleSubmit()

            // }}
            btnName={'Submit'}
            buttonColor={Colors.White}
            allButtonSty={{
              ...styles.loginBtnSty,
              backgroundColor: Colors.MantisGreen,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IssueReport;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {justifyContent: 'center', padding: 16},
  SelectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },

  button: {
    width: '45%',
    marginVertical: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedButton: {
    borderColor: Colors.TealBlue, // Teal border color for selected
  },
  text: {
    color: Colors.gray3,
    fontSize: 15,
    lineHeight: 20.49,
    fontFamily: FontFamily.Bold,
    fontWeight: '700',
  },
  selectedText: {
    color: Colors.TealBlue, // Teal text color for selected
    fontWeight: '700',
  },
  labelSty: {
    fontSize: 14,
    lineHeight: 19.12,
    fontFamily: FontFamily.Medium,
    color: Colors.gray3,
    textTransform: 'uppercase',
  },
  inputBox: {
    marginTop: 10,
  },
  inputField: {
    width: '80%',
    maxLength: 40,
    fontFamily: FontFamily.Medium,
    fontSize: 14,
    lineHeight: 19.12,
  },
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginTop: 25,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: -8,
  },
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
