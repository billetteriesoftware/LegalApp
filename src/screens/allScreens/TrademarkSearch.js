import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import TextView from '../../components/TextView';
import InputFields from '../../components/InputFields';
import Button from '../../components/Button';
import AllString from '../../constant/AllString';
import FontFamily from '../../styles/FontFamily';
import CustomCheckbox from '../../components/CustomCheckbox';
import {useFormik} from 'formik';

import Collapsible from 'react-native-collapsible';
import NavigationString from '../../Navigations/NavigationString';
import CustomAlert from '../../components/CustomAlert';
import {
  Call_GetListServices,
  Call_GetSwaggerListServices,
  Call_InstancePostServices,
} from '../../Services/Services';
import {SavedSearch_API, SwaggerSearch_API} from '../../config/Url';
import {getSwaggerToken} from '../../utils/CommonMethod';
import Loading from '../../components/Loading';

const generateCaptcha = () => {
  return Math.random().toString(36).substring(2, 8); // Random 6-character string
};

const TrademarkSearch = ({navigation, route}) => {
  const [applicationNumber, setApplicationNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false); //state manage to handle custom loader
  const [verbalMark, setVerbalMark] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [input, setInput] = useState('');

  const [result, setResult] = useState(null);

  const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
  const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
  const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box

  useEffect(() => {
    const fetchData = async () => {
      setResult(undefined);
      if (route.params.from == 'SaveSearch') {
        const accessToken = await getSwaggerToken('T50228', 'Junior2020');

        let queryParams = [];

        if (route?.params?.item?.application_no) {
          queryParams.push(
            `applicationNumber=${route?.params?.item?.application_no}`,
          );
        }
        if (route?.params?.item?.trademark_name) {
          queryParams.push(
            `denomination=${route?.params?.item?.trademark_name}`,
          );
        }
        if (route?.params?.item?.goods_n_services?.length > 0) {
          queryParams.push(
            `niceClass=${route?.params?.item?.goods_n_services[0]}`,
          );
        }

        const apiUrl = `${SwaggerSearch_API}?${queryParams.join('&')}`;

        setIsLoading(true);
        try {
          const res = await Call_GetSwaggerListServices(apiUrl, accessToken);

          setIsLoading(false);
          if (res.status === 200) {
            setResult(res.data);
            setIsSaved(true);
          } else {
            setAlertTitle('Alert');
            setAlertDescription('Data Not Found');
            setAlertShow(true);
          }
        } catch (error) {
          setIsLoading(false);
          console.log('Error:', error);
          setAlertTitle('Error');
          setAlertDescription('Failed to fetch data');
          setAlertShow(true);
        }
      }
    };

    fetchData();
  }, [route.params?.from]);

  const toggleClassSelection = item => {
    setSelectedClasses(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [item],
    );
    setIsCollapsed(!isCollapsed);
  };

  const verifyCaptcha = () => {
    if (applicationNumber === '' && verbalMark === '') {
      setAlertTitle('Alert');
      setAlertDescription('Please enter details');
      setAlertShow(true);
      return;
    }
    if (input.toLowerCase() === captcha.toLowerCase()) {
      // setAlertTitle('Success');
      // setAlertDescription('Captcha Verified!');
      // setAlertShow(true);
      handleSearch();
    } else {
      setAlertTitle('Alert');
      setAlertDescription('Incorrect Captcha!');
      setAlertShow(true);
      setCaptcha(generateCaptcha()); // Generate new captcha
      setInput('');
    }
  };

  const handleSearch = async () => {
    const accessToken = await getSwaggerToken('T50228', 'Junior2020');

    let queryParams = [];

    if (applicationNumber) {
      queryParams.push(`applicationNumber=${applicationNumber}`);
    }
    if (verbalMark) {
      queryParams.push(`denomination=${verbalMark}`);
    }
    if (selectedClasses.length > 0) {
      queryParams.push(`niceClass=${selectedClasses[0]}`);
    }

    // Join query params dynamically
    const apiUrl = `${SwaggerSearch_API}?${queryParams.join('&')}`;

    setIsLoading(true);
    const res = await Call_GetSwaggerListServices(apiUrl, accessToken);
    console.log('Swagger API Response:', JSON.stringify(res));
    setIsLoading(false);
    if (res.status === 200) {
      setResult(res.data);
    } else {
      setAlertTitle('Alert');
      setAlertDescription('Data Not Found');
      setAlertShow(true);
    }
  };

  const toggleSaveSearch = async () => {
    const data = {
      ...(applicationNumber?.trim() && {
        application_no: applicationNumber.trim(),
      }),
      ...(verbalMark?.trim() && {trademark_name: verbalMark.trim()}),
      ...(selectedClasses?.length > 0 && {goods_n_services: selectedClasses}),
    };

    const response = await Call_InstancePostServices(SavedSearch_API, data);

    if (response?.success) setIsSaved(!isSaved);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'Trade Mark Search'}
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
      <Modal animated={true} transparent={true} visible={isLoading}>
        <Loading />
      </Modal>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          {route.params?.from == 'Trademark' && result?.length == null && (
            <View style={styles.boxView}>
              <View>
                <TextView textSty={styles.labelSty}>
                  Application Number
                </TextView>
                <InputFields
                  fieldStyle={styles.inputBox}
                  simpleField
                  placeholder={'Application Number'}
                  value={applicationNumber}
                  onChangeText={setApplicationNumber}
                />
              </View>

              <View>
                <TextView textSty={styles.labelSty}>Trade Mark Name</TextView>
                <InputFields
                  fieldStyle={styles.inputBox}
                  simpleField
                  // keyboardType="phone-pad"
                  placeholder={'Trade Mark Name'}
                  value={verbalMark}
                  onChangeText={setVerbalMark}
                />
              </View>
              <TextView
                onPress={() => {
                  navigation.navigate(
                    NavigationString.NiceClassesDescriptionScreen,
                    {key: 'tradeMarkSearch'},
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
                        {selectedClasses[0] < 10
                          ? `0${selectedClasses[0]}`
                          : selectedClasses[0]}
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
                <View style={{marginTop: 10, maxHeight: 200}}>
                  <FlatList
                    data={Array.from({length: 45}, (_, i) => i + 1)}
                    keyExtractor={i => i}
                    nestedScrollEnabled
                    renderItem={num => (
                      <CustomCheckbox
                        key={num?.item}
                        label={num.item < 10 ? `0${num?.item}` : num?.item}
                        isChecked={selectedClasses.includes(num?.item)}
                        onToggle={() => toggleClassSelection(num?.item)}
                      />
                    )}
                  />
                </View>
              </Collapsible>

              <View style={{marginTop: 20}}>
                <TextView textSty={styles.labelSty}>Captcha: </TextView>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      width: '49',
                      paddingHorizontal: 15,
                      paddingVertical: 7.2,
                      borderRadius: 5,
                      backgroundColor: Colors.Black,
                    }}>
                    <TextView
                      heading
                      headingTextSty={{
                        color: Colors.White,
                      }}>
                      {captcha}
                    </TextView>
                  </View>
                  <View style={{width: '49'}}>
                    <InputFields
                      fieldStyle={{...styles.inputBox, width: '70%'}}
                      simpleField
                      placeholder={'Enter captcha'}
                      value={input}
                      onChangeText={setInput}
                    />
                  </View>
                </View>
              </View>

              <Button
                onClick={() => {
                  verifyCaptcha();
                }}
                btnName={AllString.Search}
                buttonColor={Colors.White}
                allButtonSty={styles.loginBtnSty}
              />
            </View>
          )}

          {result?.length > 0 && (
            <>
              <View
                style={{
                  backgroundColor: Colors.White,
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  borderRadius: 8,
                  marginTop: 15,
                }}>
                {(verbalMark || route?.params?.item?.trademark_name) && (
                  <View style={styles.headingView}>
                    <TextView heading>Trade Mark Name</TextView>

                    <TextView>
                      {verbalMark || route?.params?.item?.trademark_name || ''}
                    </TextView>
                  </View>
                )}
                {(applicationNumber || route?.params?.item?.application_no) && (
                  <View style={styles.headingView}>
                    <TextView heading>Application Number</TextView>
                    <TextView>
                      {applicationNumber ||
                        route?.params?.item?.application_no ||
                        ''}
                    </TextView>
                  </View>
                )}

                {(selectedClasses[0] ||
                  route?.params?.item?.goods_n_services[0]) && (
                  <View style={styles.headingView}>
                    <TextView heading>Nice Class</TextView>
                    <TextView>
                      {selectedClasses[0] ||
                        route?.params?.item?.goods_n_services[0] ||
                        []}
                    </TextView>
                  </View>
                )}

                {route.params?.from !== 'SaveSearch' && (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 5,

                      // backgroundColor: 'red',
                      right: -10,
                    }}>
                    <TextView textSty={{fontSize: 12}}>
                      Add to saved searches
                    </TextView>

                    <CustomCheckbox
                      width={22}
                      height={22}
                      disabled={
                        route.params.from == 'Trademark' && isSaved == false
                          ? false
                          : true
                      }
                      isChecked={isSaved}
                      onToggle={toggleSaveSearch}
                    />
                  </View>
                )}
              </View>
            </>
          )}

          <View style={{marginBottom: 10}}>
            {/* Result */}
            {result &&
              result?.map((result, ind) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(
                        NavigationString.SaveSeachDetailsScreen,
                        {result},
                      )
                    }
                    style={styles.resultContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TextView
                        heading
                        headingTextSty={{
                          ...styles.resultText,
                          // color: result?.isAvailable
                          //   ? Colors.MantisGreen
                          //   : Colors.MintRed,
                        }}>
                        {/* {verbalMark || route?.params?.item?.trademark_name
                          ? verbalMark || route?.params?.item?.trademark_name
                          : result.tradeMarkApp?.title}{' '} */}
                        {/* application is state and  route?.params?.item?.application_no data comming from save serach scree*/}

                        {route?.params?.item.application_no ||
                          route?.params?.item?.trademark_name}
                      </TextView>
                    </View>

                    {/* <View style={styles.saveContainer}>
                      <TextView
                        textSty={{
                          fontSize: 14,
                          lineHeight: 19.12,
                          marginRight: 15,
                        }}>
                        Add to saved searches
                      </TextView>
                    </View> */}
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TrademarkSearch;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginHorizontal: 16,
  },
  boxView: {
    backgroundColor: '#01778112',
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 10,
    marginTop: 30,
  },
  inputBox: {
    width: '100%',
    fontSize: 12,
    line: 16.39,
    fontFamily: FontFamily.Bold,
  },
  loginBtnSty: {
    backgroundColor: Colors.TealBlue,
    marginHorizontal: 0,
    paddingVertical: 14,
    marginTop: 15,
  },

  resultContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.White,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    // elevation: 2,
    // marginBottom: 40,
  },
  resultText: {
    fontSize: 18,
    lineHeight: 24.59,
    // fontWeight: 'bold',
  },
  saveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    // justifyContent: 'space-between',
  },
  headingView: {
    // marginBottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Alert,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   Modal,
// } from 'react-native';
// import React, {useCallback, useEffect, useState} from 'react';
// import Header from '../../components/Header';
// import Colors from '../../styles/Colors';
// import TextView from '../../components/TextView';
// import InputFields from '../../components/InputFields';
// import Button from '../../components/Button';
// import AllString from '../../constant/AllString';
// import FontFamily from '../../styles/FontFamily';
// import CustomCheckbox from '../../components/CustomCheckbox';
// import {useFormik} from 'formik';

// import Collapsible from 'react-native-collapsible';
// import NavigationString from '../../Navigations/NavigationString';
// import CustomAlert from '../../components/CustomAlert';
// import {
//   Call_GetListServices,
//   Call_GetSwaggerListServices,
//   Call_InstancePostServices,
// } from '../../Services/Services';
// import {SavedSearch_API, SwaggerSearch_API} from '../../config/Url';
// import {getSwaggerToken} from '../../utils/CommonMethod';
// import Loading from '../../components/Loading';

// const generateCaptcha = () => {
//   return Math.random().toString(36).substring(2, 8); // Random 6-character string
// };

// const TrademarkSearch = ({navigation, route}) => {
//   const [applicationNumber, setApplicationNumber] = useState('');
//   const [isLoading, setIsLoading] = useState(false); //state manage to handle custom loader
//   const [verbalMark, setVerbalMark] = useState('');
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [isCollapsed, setIsCollapsed] = useState(true);
//   const [isSaved, setIsSaved] = useState(false);
//   const [captcha, setCaptcha] = useState(generateCaptcha());
//   const [input, setInput] = useState('');

//   const [result, setResult] = useState(null);

//   const [alertShow, setAlertShow] = useState(false); //state manage show/hide custom alert
//   const [alertTitle, setAlertTitle] = useState(''); //state manage to show title in alert box
//   const [alertDescription, setAlertDescription] = useState(''); //state manage to show description in alert box

//   useEffect(() => {
//     const fetchData = async () => {
//       setResult(undefined);
//       if (route.params.from == 'SaveSearch') {
//         const accessToken = await getSwaggerToken('T50228', 'Junior2020');

//         let queryParams = [];

//         if (route?.params?.item?.application_no) {
//           queryParams.push(
//             `applicationNumber=${route?.params?.item?.application_no}`,
//           );
//         }
//         if (route?.params?.item?.trademark_name) {
//           queryParams.push(
//             `denomination=${route?.params?.item?.trademark_name}`,
//           );
//         }
//         if (route?.params?.item?.goods_n_services?.length > 0) {
//           queryParams.push(
//             `niceClass=${route?.params?.item?.goods_n_services[0]}`,
//           );
//         }

//         const apiUrl = `${SwaggerSearch_API}?${queryParams.join('&')}`;

//         setIsLoading(true);
//         try {
//           const res = await Call_GetSwaggerListServices(apiUrl, accessToken);
//           setIsLoading(false);
//           if (res.status === 200) {
//             setResult(res.data);
//             setIsSaved(true);
//           } else {
//             setAlertTitle('Alert');
//             setAlertDescription('Data Not Found');
//             setAlertShow(true);
//           }
//         } catch (error) {
//           setIsLoading(false);
//           console.log('Error:', error);
//           setAlertTitle('Error');
//           setAlertDescription('Failed to fetch data');
//           setAlertShow(true);
//         }
//       }
//     };

//     fetchData();
//   }, [route.params?.from]);

//   const toggleClassSelection = item => {
//     setSelectedClasses(prev =>
//       prev.includes(item) ? prev.filter(i => i !== item) : [item],
//     );
//     setIsCollapsed(!isCollapsed);
//   };

//   const verifyCaptcha = () => {
//     if (applicationNumber === '' && verbalMark === '') {
//       setAlertTitle('Alert');
//       setAlertDescription('Please enter details');
//       setAlertShow(true);
//       return;
//     }
//     if (input.toLowerCase() === captcha.toLowerCase()) {
//       // setAlertTitle('Success');
//       // setAlertDescription('Captcha Verified!');
//       // setAlertShow(true);
//       handleSearch();
//     } else {
//       setAlertTitle('Alert');
//       setAlertDescription('Incorrect Captcha!');
//       setAlertShow(true);
//       setCaptcha(generateCaptcha()); // Generate new captcha
//       setInput('');
//     }
//   };

//   const handleSearch = async () => {
//     const accessToken = await getSwaggerToken('T50228', 'Junior2020');

//     let queryParams = [];

//     if (applicationNumber) {
//       queryParams.push(`applicationNumber=${applicationNumber}`);
//     }
//     if (verbalMark) {
//       queryParams.push(`denomination=${verbalMark}`);
//     }
//     if (selectedClasses.length > 0) {
//       queryParams.push(`niceClass=${selectedClasses[0]}`);
//     }

//     // Join query params dynamically
//     const apiUrl = `${SwaggerSearch_API}?${queryParams.join('&')}`;

//     setIsLoading(true);
//     const res = await Call_GetSwaggerListServices(apiUrl, accessToken);
//     // console.log('Swagger API Response:', JSON.stringify(res));
//     setIsLoading(false);
//     if (res.status === 200) {
//       setResult(res.data);
//     } else {
//       setAlertTitle('Alert');
//       setAlertDescription('Data Not Found');
//       setAlertShow(true);
//     }
//   };

//   const toggleSaveSearch = async () => {
//     const data = {
//       ...(applicationNumber?.trim() && {
//         application_no: applicationNumber.trim(),
//       }),
//       ...(verbalMark?.trim() && {trademark_name: verbalMark.trim()}),
//       ...(selectedClasses?.length > 0 && {goods_n_services: selectedClasses}),
//     };

//     const response = await Call_InstancePostServices(SavedSearch_API, data);

//     if (response?.success) setIsSaved(!isSaved);
//   };

//   return (
//     <SafeAreaView style={styles.safeView}>
//       {/* Header View */}

//       <Header
//         arrowBack
//         title={'Trademark Search'}
//         rightClick={() => navigation.goBack()}
//       />

//       <CustomAlert
//         isLoading={alertShow}
//         title={alertTitle}
//         description={alertDescription}
//         handleOkay={() => {
//           setAlertTitle('');
//           setAlertDescription('');
//           setAlertShow(false);
//         }}
//       />
//       <Modal animated={true} transparent={true} visible={isLoading}>
//         <Loading />
//       </Modal>

//       <ScrollView
//         contentContainerStyle={{flexGrow: 1}}
//         nestedScrollEnabled={true}>
//         <View style={styles.container}>
//           {route.params?.from == 'Trademark' && result?.length == null && (
//             <View style={styles.boxView}>
//               <View>
//                 <TextView textSty={styles.labelSty}>
//                   Application Number
//                 </TextView>
//                 <InputFields
//                   fieldStyle={styles.inputBox}
//                   simpleField
//                   placeholder={'Application Number'}
//                   value={applicationNumber}
//                   onChangeText={setApplicationNumber}
//                 />
//               </View>

//               <View>
//                 <TextView textSty={styles.labelSty}>Trade Mark Name</TextView>
//                 <InputFields
//                   fieldStyle={styles.inputBox}
//                   simpleField
//                   // keyboardType="phone-pad"
//                   placeholder={'Trade Mark Name'}
//                   value={verbalMark}
//                   onChangeText={setVerbalMark}
//                 />
//               </View>
//               <TextView
//                 onPress={() => {
//                   navigation.navigate(
//                     NavigationString.NiceClassesDescriptionScreen,
//                     {key: 'tradeMarkSearch'},
//                   );
//                 }}
//                 heading
//                 headingTextSty={{
//                   color: Colors.TealBlue,
//                   // textDecorationLine: "underline",
//                   textDecorationStyle: 'solid',
//                   marginTop: 10,
//                   paddingBottom: 0,
//                   lineHeight: 14,
//                   borderBottomWidth: 1,
//                   width: 200,
//                   borderColor: Colors.TealBlue,
//                 }}>
//                 {/* Nice Classes Description */}
//                 Class for good and services
//               </TextView>

//               {/* Accordion Header */}
//               <TouchableOpacity
//                 onPress={() => setIsCollapsed(!isCollapsed)}
//                 style={{
//                   backgroundColor: Colors.White,
//                   padding: 8,
//                   marginTop: 10,
//                   borderRadius: 5,
//                   marginBottom: 15,
//                 }}>
//                 {
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       justifyContent: 'space-between',
//                       alignItems: 'center',
//                       paddingVertical: 5,
//                     }}>
//                     {selectedClasses.length != 0 ? (
//                       <TextView
//                         heading
//                         headingTextSty={{
//                           color: Colors.Black,
//                           fontFamily: FontFamily.Bold,
//                           fontSize: 13,
//                           lineHeight: 20.49,
//                         }}>
//                         {selectedClasses[0] < 10
//                           ? `0${selectedClasses[0]}`
//                           : selectedClasses[0]}
//                       </TextView>
//                     ) : (
//                       <TextView
//                         heading
//                         headingTextSty={{
//                           color: Colors.placeHolderColor,
//                           fontFamily: FontFamily.Bold,
//                           fontSize: 13,
//                           lineHeight: 20.49,
//                         }}>
//                         Class (good and services)
//                       </TextView>
//                     )}
//                     {isCollapsed ? <Text>▼</Text> : <Text>▲</Text>}
//                   </View>
//                 }
//               </TouchableOpacity>

//               {/* Collapsible Checkbox List */}
//               <Collapsible collapsed={isCollapsed}>
//                 <View style={{marginTop: 10, maxHeight: 200}}>
//                   <FlatList
//                     data={Array.from({length: 45}, (_, i) => i + 1)}
//                     keyExtractor={i => i}
//                     nestedScrollEnabled
//                     renderItem={num => (
//                       <CustomCheckbox
//                         key={num?.item}
//                         label={num.item < 10 ? `0${num?.item}` : num?.item}
//                         isChecked={selectedClasses.includes(num?.item)}
//                         onToggle={() => toggleClassSelection(num?.item)}
//                       />
//                     )}
//                   />
//                 </View>
//               </Collapsible>

//               <View style={{marginTop: 20}}>
//                 <TextView textSty={styles.labelSty}>Captcha: </TextView>
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                   }}>
//                   <View
//                     style={{
//                       width: '49',
//                       paddingHorizontal: 15,
//                       paddingVertical: 7.2,
//                       borderRadius: 5,
//                       backgroundColor: Colors.Black,
//                     }}>
//                     <TextView
//                       heading
//                       headingTextSty={{
//                         color: Colors.White,
//                       }}>
//                       {captcha}
//                     </TextView>
//                   </View>
//                   <View style={{width: '49'}}>
//                     <InputFields
//                       fieldStyle={{...styles.inputBox, width: '70%'}}
//                       simpleField
//                       placeholder={'Enter captcha'}
//                       value={input}
//                       onChangeText={setInput}
//                     />
//                   </View>
//                 </View>
//               </View>

//               <Button
//                 onClick={() => {
//                   verifyCaptcha();
//                 }}
//                 btnName={AllString.Search}
//                 buttonColor={Colors.White}
//                 allButtonSty={styles.loginBtnSty}
//               />
//             </View>
//           )}

//           {result?.length > 0 && (
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 backgroundColor: Colors.White,
//                 // paddingHorizontal: 10,
//                 padding: 15,
//                 borderRadius: 8,
//                 marginTop: 15,
//               }}>
//               <View style={{flex: 0.95}}>
//                 {(applicationNumber || route?.params?.item?.application_no) && (
//                   <View style={styles.headingView}>
//                     <TextView>Application Number</TextView>
//                     <TextView>
//                       {applicationNumber ||
//                         route?.params?.item?.application_no ||
//                         ''}
//                     </TextView>
//                   </View>
//                 )}
//                 {route.params?.from == 'SaveSearch'
//                   ? (verbalMark || route?.params?.item?.trademark_name) && (
//                       <View style={styles.headingView}>
//                         <TextView>Trade Mark Name</TextView>
//                         <TextView>
//                           {verbalMark ||
//                             route?.params?.item?.trademark_name ||
//                             ''}
//                         </TextView>
//                       </View>
//                     )
//                   : (verbalMark || route?.params?.item?.trademark_name) && (
//                       <View
//                         style={{
//                           ...styles.headingView,
//                           alignItems: 'flex-start',
//                         }}>
//                         <View>
//                           <TextView>Trade Mark Name</TextView>
//                           <TextView>
//                             {verbalMark ||
//                               route?.params?.item?.trademark_name ||
//                               ''}
//                           </TextView>
//                         </View>
//                         <TextView>Add to saved searches</TextView>
//                       </View>
//                     )}
//                 {(selectedClasses[0] ||
//                   route?.params?.item?.goods_n_services[0]) && (
//                   <View style={styles.headingView}>
//                     <TextView>Nice Class</TextView>
//                     <TextView>
//                       {selectedClasses[0] ||
//                         route?.params?.item?.goods_n_services[0] ||
//                         []}
//                     </TextView>
//                   </View>
//                 )}
//               </View>
//               <View>
//                 <CustomCheckbox
//                   disabled={
//                     route.params.from == 'Trademark' && isSaved == false
//                       ? false
//                       : true
//                   }
//                   isChecked={isSaved}
//                   onToggle={toggleSaveSearch}
//                 />
//               </View>
//             </View>
//           )}

//           <View style={{marginBottom: 10}}>
//             {/* Result */}
//             {result &&
//               result?.map((result, ind) => {
//                 return (
//                   <TouchableOpacity
//                     onPress={() =>
//                       navigation.navigate(
//                         NavigationString.SaveSeachDetailsScreen,
//                         {result},
//                       )
//                     }
//                     style={styles.resultContainer}>
//                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
//                       <TextView
//                         heading
//                         headingTextSty={{
//                           ...styles.resultText,
//                           // color: result?.isAvailable
//                           //   ? Colors.MantisGreen
//                           //   : Colors.MintRed,
//                         }}>
//                         {result.tradeMarkApp?.title}{' '}
//                       </TextView>
//                     </View>

//                     {/* <View style={styles.saveContainer}>
//                       <TextView
//                         textSty={{
//                           fontSize: 14,
//                           lineHeight: 19.12,
//                           marginRight: 15,
//                         }}>
//                         Add to saved searches
//                       </TextView>
//                     </View> */}
//                   </TouchableOpacity>
//                 );
//               })}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default TrademarkSearch;

// const styles = StyleSheet.create({
//   safeView: {flex: 1, backgroundColor: Colors.bgColor},
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     marginHorizontal: 16,
//   },
//   boxView: {
//     backgroundColor: '#01778112',
//     paddingHorizontal: 15,
//     paddingVertical: 25,
//     borderRadius: 10,
//     marginTop: 30,
//   },
//   inputBox: {
//     width: '100%',
//     fontSize: 12,
//     line: 16.39,
//     fontFamily: FontFamily.Bold,
//   },
//   loginBtnSty: {
//     backgroundColor: Colors.TealBlue,
//     marginHorizontal: 0,
//     paddingVertical: 14,
//     marginTop: 15,
//   },

//   resultContainer: {
//     marginTop: 16,
//     padding: 16,
//     backgroundColor: Colors.White,
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//     // elevation: 2,
//     // marginBottom: 40,
//   },
//   resultText: {
//     fontSize: 18,
//     lineHeight: 24.59,
//     // fontWeight: 'bold',
//   },
//   saveContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     // justifyContent: 'space-between',
//   },
//   headingView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
// });
