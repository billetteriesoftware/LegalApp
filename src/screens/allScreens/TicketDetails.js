import {
  FlatList,
  Image,
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
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import {CloseIcon_SVG} from '../../assets/svgIcons/Index';
import Button from '../../components/Button';
import {
  Call_GetListServices,
  Call_GetServices,
  Call_InstancePostServices,
} from '../../Services/Services';
import {AddResponse_API, Image_URL, ReportDetail_API} from '../../config/Url';
import InputFields from '../../components/InputFields';
import {useFormik} from 'formik';
import {TicketValidation} from '../../Services/Validation';
import {useIsFocused} from '@react-navigation/native';

const TicketDetails = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState([]);

  const getTicketDetail = async () => {
    const response = await Call_GetServices(
      `${ReportDetail_API}${route.params.id}`,
    );

    let test = response.data;
    setData(test);
  };

  useEffect(() => {
    if (isFocused) {
      getTicketDetail();
    }
  }, [isFocused]);

  function formatTimeStampChat(timestamp) {
    const date = new Date(timestamp);
    // Extracting date components
    const day = date.getDate();
    const month = date.toLocaleString('en-US', {month: 'short'});
    const year = date.getFullYear();
    // Extracting time components
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // Convert hours to 12-hour format and pad with zero if needed
    hours = hours % 12 || 12;
    const formattedHours = hours.toString().padStart(2, '0');
    return `${day} ${month} ${year} ${formattedHours}:${minutes} ${ampm}`;
  }

  const formik = useFormik({
    initialValues: {
      add_response: '',
    },
    validationSchema: TicketValidation,
    onSubmit: values => {
      // Handle form submission
      handleResponseSubmit(values);
    },
  });

  const handleResponseSubmit = async values => {
    const payload = {
      ticket_id: route.params.id,
      response: values.add_response,
    };
    const response = await Call_InstancePostServices(AddResponse_API, payload);
    console.log(payload, '---Call_InstancePostServices---', response);
    if (response.success) {
      formik.resetForm();
      getTicketDetail();
      setModalVisible(false);
    }
  };

  let ticketStatus;
  switch (data?.ticket_status) {
    case 'pending':
      ticketStatus = 'Open';
      break;
    case 'inprogress':
      ticketStatus = 'In Progress';
      break;
    case 'closed':
      ticketStatus = 'Closed';
      break;
  }

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'Ticket Details'}
        radius
        rightClick={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.ticketView}>
                <TextView textSty={styles.referenceText}>Ticket ID</TextView>
                <TextView
                  textSty={{
                    ...styles.referenceText,
                    fontFamily: FontFamily.Bold,
                  }}>
                  #{data?.ticket_identity}
                </TextView>
              </View>
              <View style={styles.ticketView}>
                <TextView textSty={styles.referenceText}>Status</TextView>
                <TextView
                  textSty={{
                    ...styles.referenceText,
                    fontFamily: FontFamily.Bold,
                  }}>
                  {/* {data.ticket_status} */}
                  {ticketStatus}
                </TextView>
              </View>
            </View>

            {data?.responses?.map(i => (
              <>
                <View style={styles.line} />
                <View style={styles.section}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {/* <TicketImg1SVG /> */}
                    {/* <Image
                      source={{
                        uri: `${Image_URL}${i.user_id.image}`,
                      }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                      }}
                    /> */}
                    <TextView textSty={styles.sectionTitle}>
                      {`  `}
                      {i.user_id.full_name}
                    </TextView>
                  </View>
                  <View>
                    <TextView textSty={styles.content}>{i.response}</TextView>
                    <TextView textSty={styles.date}>
                      {formatTimeStampChat(i.createdAt)}
                    </TextView>
                  </View>
                </View>
              </>
            ))}

            {/* ============Save Button============ */}
            {ticketStatus !== 'Closed' && (
              <>
                {/* Application Overview Section */}
                <View style={styles.line} />

                <Button
                  onClick={() => {
                    setModalVisible(true);
                    // navigation.navigate(NavigationString.MyTicketsScreen);
                  }}
                  btnName={'Add Response'}
                  buttonColor={Colors.White}
                  allButtonSty={{
                    ...styles.loginBtnSty,
                    backgroundColor: Colors.MantisGreen,
                  }}
                />
              </>
            )}
          </View>
        </View>
      </ScrollView>
      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press (Android)
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* <Text style={styles.modalText}>Hello! This is a Modal</Text> */}

            <View>
              <TextView textSty={styles.labelSty}>Add Response</TextView>
              <TouchableOpacity
                onPress={() => {
                  formik.resetForm();
                  setModalVisible(false);
                }}
                style={styles.closeBtn}>
                <CloseIcon_SVG />
              </TouchableOpacity>
              <View style={{marginTop: 10}}></View>
              <InputFields
                simpleField
                placeholder={'Enter Response'}
                multiline={true}
                numberOfLines={5}
                value={formik.values.add_response}
                onChangeText={formik.handleChange('add_response')}
                maxLength={500}
                fieldStyle={styles.responseField}
              />

              {formik.touched.add_response && formik.errors.add_response ? (
                <TextView textSty={styles.errorText}>
                  {formik.errors.add_response}
                </TextView>
              ) : null}
            </View>
            <Button
              onClick={formik.handleSubmit}
              btnName={'Submit'}
              buttonColor={Colors.White}
              allButtonSty={{
                ...styles.loginBtnSty,
                backgroundColor: Colors.MantisGreen,
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TicketDetails;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  ticketView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 14,
    lineHeight: 40,
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
  content: {
    fontSize: 12,
    lineHeight: 20,
    color: Colors.gray3,
    marginTop: 5,
  },
  date: {
    fontFamily: FontFamily.Light,
    fontSize: 10,
    lineHeight: 13.66,
    color: Colors.gray3,
    textAlign: 'right',
    marginBottom: 10,
  },
  line: {
    borderWidth: 0.8,
    borderColor: Colors.gray7,
    marginBottom: 8,
  },
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginVertical: 20,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: -8,
  },
  responseField: {
    width: '100%',
    fontSize: 12,
    line: 16.39,
    fontFamily: FontFamily.Bold,
  },
  closeBtn: {
    position: 'absolute',
    right: 0,
    top: -8,
    padding: 5,
  },
});
