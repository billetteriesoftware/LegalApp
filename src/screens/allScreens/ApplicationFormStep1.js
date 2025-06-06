import {
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
import {DropdownIconSVg} from '../../assets/svgIcons/Index';
import {
  Countries,
  trademarkNatures,
  trademarkTypes,
} from '../../constant/Label';
import FontFamily from '../../styles/FontFamily';
import InputFields from '../../components/InputFields';
import Button from '../../components/Button';
import AllString from '../../constant/AllString';
import NavigationString from '../../Navigations/NavigationString';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {
  handleDial_code,
  saveTradeApplicationData,
} from '../../store/slices/auth';
import {AddressSchema, TM1Schema, TM2Schema} from '../../Services/Validation';
import {Image_URL} from '../../config/Url';
import WaterMark from '../../components/WaterMark';
import CountryPicker from 'react-native-country-picker-modal';

const ApplicationFormStep1 = ({navigation}) => {
  const dispatch = useDispatch();

  const {tradeApplicationData} = useSelector(state => state.auth);
  const [selectedTab, setSelectedTab] = useState('Applicants');

  const handleSelectCountry = val => {
    formik.setFieldValue('country', val.label);
  };

  const handleSelectAosCountry = val => {
    formikAddress.setFieldValue('aos_country', val.label);
  };

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: tradeApplicationData?.name || '',
      address: tradeApplicationData?.address || '',
      town: tradeApplicationData?.town || '',
      postal_code: tradeApplicationData?.postal_code || '',
      country_code: tradeApplicationData?.country_code || 'ZA',
      calling_code: tradeApplicationData?.calling_code || '27',
      country: tradeApplicationData?.country || '',
      contact_number: tradeApplicationData?.contact_number || '',
      fax: tradeApplicationData?.fax || '',
      email: tradeApplicationData?.email || '',
    },
    validationSchema: TM2Schema,
    onSubmit: values => {
      const payload = {
        ...formik.values,
      };
      dispatch(saveTradeApplicationData(payload));
      setSelectedTab('Address');
      // Handle form submission
    },
  });

  const formikAddress = useFormik({
    enableReinitialize: true,

    initialValues: {
      aos_name: tradeApplicationData?.aos_name || '',
      aos_address: tradeApplicationData?.aos_address || '',
      aos_town: tradeApplicationData?.aos_town || '',
      aos_postal_code: tradeApplicationData?.aos_postal_code || '',
      aos_country: tradeApplicationData?.aos_country || '',
      aos_phone: tradeApplicationData?.aos_phone || '',
      aos_fax: tradeApplicationData?.aos_fax || '',
      aos_email: tradeApplicationData?.aos_email || '',
      gpa_number: tradeApplicationData?.gpa_number || '',
      aoscountry_code: tradeApplicationData?.aoscountry_code || 'ZA',
      aoscalling_code: tradeApplicationData?.aoscalling_code || '27',
    },
    validationSchema: AddressSchema,
    onSubmit: values => {
      console.log('Form submitted', values);
      const payload = {
        ...formikAddress.values,
      };
      dispatch(saveTradeApplicationData(payload));
      navigation.navigate(NavigationString.ApplicationFormDetailsScreen);
      // Handle form submission
    },
  });

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}

      <Header
        arrowBack
        title={'New Application'}
        rightClick={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <WaterMark image={`${Image_URL}images/1741785095306-app-logo.png`}>
            <View style={styles.box}>
              <View style={styles.topHeading}>
                <TextView heading headingTextSty={styles.textHeaing}>
                  Trade Mark Ownership
                </TextView>
              </View>

              <View style={styles.fieldBox}>
                {/* =========Tabs =======*/}
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    // disabled={true}
                    onPress={() => setSelectedTab('Applicants')}
                    style={[
                      styles.tabView,
                      selectedTab === 'Applicants' && styles.activeTab,
                    ]}>
                    <TextView textSty={styles.tabLabel}>Applicant</TextView>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={true}
                    onPress={() => setSelectedTab('Address')}
                    style={[
                      styles.tabView,
                      selectedTab === 'Address' && styles.activeTab,
                    ]}>
                    <TextView textSty={styles.tabLabel}>
                      Address For Service
                    </TextView>
                  </TouchableOpacity>
                </View>

                {selectedTab == 'Applicants' && (
                  <>
                    <View>
                      <TextView textSty={styles.labelSty}>Name*</TextView>
                      <InputFields
                        fieldStyle={{
                          width: '100%',
                          fontSize: 12,
                          line: 16.39,
                          fontFamily: FontFamily.Bold,
                        }}
                        simpleField
                        placeholder={'Applicant Name'}
                        value={formik.values.name}
                        onChangeText={formik.handleChange('name')}
                        maxLength={500}
                        // fieldStyle={{width:'50%',backgroundColor:'red'}}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <TextView textSty={styles.errorText}>
                          {formik.errors.name}
                        </TextView>
                      ) : null}
                    </View>
                    <View>
                      <TextView textSty={styles.labelSty}>Address*</TextView>
                      <InputFields
                        fieldStyle={{
                          width: '100%',
                          fontSize: 12,
                          line: 16.39,
                          fontFamily: FontFamily.Bold,
                        }}
                        simpleField
                        placeholder={'Street Address'}
                        value={formik.values.address}
                        onChangeText={formik.handleChange('address')}
                        maxLength={200}
                      />
                      {formik.touched.address && formik.errors.address ? (
                        <TextView textSty={styles.errorText}>
                          {formik.errors.address}
                        </TextView>
                      ) : null}
                    </View>
                    <View>
                      <View>
                        <TextView textSty={styles.labelSty}>Town*</TextView>
                        <InputFields
                          fieldStyle={{
                            width: '100%',
                            fontSize: 12,
                            line: 16.39,
                            fontFamily: FontFamily.Bold,
                          }}
                          simpleField
                          placeholder={'Town'}
                          value={formik.values.town}
                          onChangeText={formik.handleChange('town')}
                          maxLength={200}
                        />
                        {formik.touched.town && formik.errors.town ? (
                          <TextView textSty={styles.errorText}>
                            {formik.errors.town}
                          </TextView>
                        ) : null}
                      </View>
                      <View>
                        <TextView textSty={styles.labelSty}>
                          Postal Code
                        </TextView>
                        <InputFields
                          fieldStyle={{
                            width: '100%',
                            fontSize: 12,
                            line: 16.39,
                            fontFamily: FontFamily.Bold,
                          }}
                          simpleField
                          placeholder={'Postal Code'}
                          value={formik.values.postal_code}
                          onChangeText={formik.handleChange('postal_code')}
                          maxLength={11}
                        />
                        {formik.touched.postal_code &&
                        formik.errors.postal_code ? (
                          <TextView textSty={styles.errorText}>
                            {formik.errors.postal_code}
                          </TextView>
                        ) : null}
                      </View>
                    </View>

                    <CustomDropdown
                      label={'Country *'}
                      placeholder="Country"
                      data={Countries}
                      onSelect={handleSelectCountry}
                      values={formik.values.country}
                    />

                    {formik.touched.country && formik.errors.country ? (
                      <TextView textSty={styles.errorText}>
                        {formik.errors.country}
                      </TextView>
                    ) : null}
                    <View>
                      <TextView textSty={styles.labelSty}>
                        Contact Number
                      </TextView>

                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{}}>
                          <CountryPicker
                            withCallingCode
                            withFilter
                            // countryCode={countryCode}
                            countryCode={formik.values?.country_code}
                            withFlag
                            withEmoji={false}
                            containerButtonStyle={{
                              maxWidth: '10%',
                            }}
                            onSelect={country => {
                              formik.setFieldValue(
                                'country_code',
                                country.cca2,
                              );

                              formik.setFieldValue(
                                'calling_code',
                                country.callingCode[0],
                              );
                            }}
                          />
                        </View>
                        <TextView textSty={styles.callingCode}>
                          +{formik.values?.calling_code}
                        </TextView>
                        <View>
                          <InputFields
                            fieldStyle={{
                              width: '88%',
                              fontSize: 12,
                              line: 16.39,
                              fontFamily: FontFamily.Bold,
                              paddingLeft: 34,
                            }}
                            simpleField
                            keyboardType="phone-pad"
                            placeholder={'Enter Contact Number'}
                            value={formik.values.contact_number}
                            onChangeText={formik.handleChange('contact_number')}
                            maxLength={15}
                          />
                        </View>
                      </View>
                      {formik.touched.contact_number &&
                      formik.errors.contact_number ? (
                        <TextView textSty={styles.errorText}>
                          {formik.errors.contact_number}
                        </TextView>
                      ) : null}
                    </View>
                    {/* <View>
                      <TextView textSty={styles.labelSty}>FAX *</TextView>
                      <InputFields
                        fieldStyle={{
                          width: '100%',
                          fontSize: 12,
                          line: 16.39,
                          fontFamily: FontFamily.Bold,
                        }}
                        simpleField
                        placeholder={'Enter FAX'}
                        keyboardType="numeric"
                        value={formik.values.fax}
                        onChangeText={formik.handleChange('fax')}
                        maxLength={200}
                      />
                      {formik.touched.fax && formik.errors.fax ? (
                        <TextView textSty={styles.errorText}>
                          {formik.errors.fax}
                        </TextView>
                      ) : null}
                    </View> */}
                    <View>
                      <TextView textSty={styles.labelSty}>Email *</TextView>
                      <InputFields
                        fieldStyle={{
                          width: '100%',
                          fontSize: 12,
                          line: 16.39,
                          fontFamily: FontFamily.Bold,
                        }}
                        simpleField
                        placeholder={'Enter Email'}
                        value={formik.values.email}
                        keyboardType="email-address"
                        onChangeText={formik.handleChange('email')}
                        maxLength={30}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <TextView textSty={styles.errorText}>
                          {formik.errors.email}
                        </TextView>
                      ) : null}
                    </View>
                  </>
                )}

                {selectedTab == 'Address' && (
                  <View>
                    <>
                      <View>
                        <TextView textSty={styles.labelSty}>Name*</TextView>
                        <InputFields
                          fieldStyle={{
                            width: '100%',
                            fontSize: 12,
                            line: 16.39,
                            fontFamily: FontFamily.Bold,
                          }}
                          simpleField
                          placeholder={'Applicant Name'}
                          value={formikAddress.values.aos_name}
                          onChangeText={formikAddress.handleChange('aos_name')}
                          maxLength={500}
                          // fieldStyle={{width:'50%',backgroundColor:'red'}}
                        />
                        {formikAddress.touched.aos_name &&
                        formikAddress.errors.aos_name ? (
                          <TextView textSty={styles.errorText}>
                            {formikAddress.errors.aos_name}
                          </TextView>
                        ) : null}
                      </View>
                      <View>
                        <TextView textSty={styles.labelSty}>Address*</TextView>
                        <InputFields
                          fieldStyle={{
                            width: '100%',
                            fontSize: 12,
                            line: 16.39,
                            fontFamily: FontFamily.Bold,
                          }}
                          simpleField
                          placeholder={'Street Address'}
                          value={formikAddress.values.aos_address}
                          onChangeText={formikAddress.handleChange(
                            'aos_address',
                          )}
                          maxLength={200}
                        />
                        {formikAddress.touched.aos_address &&
                        formikAddress.errors.aos_address ? (
                          <TextView textSty={styles.errorText}>
                            {formikAddress.errors.aos_address}
                          </TextView>
                        ) : null}
                      </View>
                      <View>
                        <View>
                          <TextView textSty={styles.labelSty}>Town*</TextView>
                          <InputFields
                            fieldStyle={{
                              width: '100%',
                              fontSize: 12,
                              line: 16.39,
                              fontFamily: FontFamily.Bold,
                            }}
                            simpleField
                            placeholder={'Town'}
                            value={formikAddress.values.aos_town}
                            onChangeText={formikAddress.handleChange(
                              'aos_town',
                            )}
                            maxLength={200}
                          />
                          {formikAddress.touched.aos_town &&
                          formikAddress.errors.aos_town ? (
                            <TextView textSty={styles.errorText}>
                              {formikAddress.errors.aos_town}
                            </TextView>
                          ) : null}
                        </View>
                        <View>
                          <TextView textSty={styles.labelSty}>
                            Postal Code
                          </TextView>
                          <InputFields
                            fieldStyle={{
                              width: '100%',
                              fontSize: 12,
                              line: 16.39,
                              fontFamily: FontFamily.Bold,
                            }}
                            simpleField
                            placeholder={'Postal Code'}
                            value={formikAddress.values.aos_postal_code}
                            onChangeText={formikAddress.handleChange(
                              'aos_postal_code',
                            )}
                            maxLength={11}
                          />
                          {formikAddress.touched.aos_postal_code &&
                          formikAddress.errors.aos_postal_code ? (
                            <TextView textSty={styles.errorText}>
                              {formikAddress.errors.aos_postal_code}
                            </TextView>
                          ) : null}
                        </View>
                      </View>
                      <CustomDropdown
                        label={'Country *'}
                        placeholder="Country"
                        data={Countries}
                        onSelect={handleSelectAosCountry}
                        values={formikAddress.values.aos_country}
                      />
                      {formikAddress.touched.aos_country &&
                      formikAddress.errors.aos_country ? (
                        <TextView textSty={styles.errorText}>
                          {formikAddress.errors.aos_country}
                        </TextView>
                      ) : null}
                      <View>
                        <TextView textSty={styles.labelSty}>
                          Contact Number
                        </TextView>

                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View style={{}}>
                            <CountryPicker
                              withCallingCode
                              withFilter
                              countryCode={
                                formikAddress.values?.aoscountry_code
                              }
                              withFlag
                              withEmoji={false}
                              containerButtonStyle={{
                                maxWidth: '10%',
                              }}
                              onSelect={country => {
                                formikAddress.setFieldValue(
                                  'aoscountry_code',
                                  country.cca2,
                                );
                                formikAddress.setFieldValue(
                                  'aoscalling_code',
                                  country.callingCode[0],
                                );
                              }}
                            />
                          </View>
                          <TextView textSty={styles.callingCode}>
                            {/* +{callingCode} */}+
                            {formikAddress.values?.aoscalling_code}
                          </TextView>
                          <View>
                            <InputFields
                              fieldStyle={{
                                width: '88%',
                                fontSize: 12,
                                line: 16.39,
                                fontFamily: FontFamily.Bold,
                                paddingLeft: 34,
                              }}
                              simpleField
                              keyboardType="phone-pad"
                              placeholder={'Enter Contact Number'}
                              value={formikAddress.values.aos_phone}
                              onChangeText={formikAddress.handleChange(
                                'aos_phone',
                              )}
                              maxLength={15}
                            />
                          </View>
                        </View>

                        {/* <InputFields
                          fieldStyle={{
                            width: '100%',
                            fontSize: 12,
                            line: 16.39,
                            fontFamily: FontFamily.Bold,
                          }}
                          simpleField
                          keyboardType="phone-pad"
                          placeholder={'Enter Contact Number'}
                          value={formikAddress.values.aos_phone}
                          onChangeText={formikAddress.handleChange('aos_phone')}
                          maxLength={15}
                        /> */}
                        {formikAddress.touched.aos_phone &&
                        formikAddress.errors.aos_phone ? (
                          <TextView textSty={styles.errorText}>
                            {formikAddress.errors.aos_phone}
                          </TextView>
                        ) : null}
                      </View>
                      {/* <View>
                        <TextView textSty={styles.labelSty}>FAX *</TextView>
                        <InputFields
                          fieldStyle={{
                            width: '100%',
                            fontSize: 12,
                            line: 16.39,
                            fontFamily: FontFamily.Bold,
                          }}
                          simpleField
                          placeholder={'Enter FAX'}
                          keyboardType="numeric"
                          value={formikAddress.values.aos_fax}
                          onChangeText={formikAddress.handleChange('aos_fax')}
                          maxLength={200}
                        />
                        {formikAddress.touched.aos_fax &&
                        formikAddress.errors.aos_fax ? (
                          <TextView textSty={styles.errorText}>
                            {formikAddress.errors.aos_fax}
                          </TextView>
                        ) : null}
                      </View> */}
                      <View>
                        <TextView textSty={styles.labelSty}>Email *</TextView>
                        <InputFields
                          fieldStyle={{
                            width: '100%',
                            fontSize: 12,
                            line: 16.39,
                            fontFamily: FontFamily.Bold,
                          }}
                          simpleField
                          placeholder={'Enter Email'}
                          value={formikAddress.values.aos_email}
                          keyboardType="email-address"
                          onChangeText={formikAddress.handleChange('aos_email')}
                          maxLength={30}
                        />
                        {formikAddress.touched.aos_email &&
                        formikAddress.errors.aos_email ? (
                          <TextView textSty={styles.errorText}>
                            {formikAddress.errors.aos_email}
                          </TextView>
                        ) : null}
                      </View>
                    </>
                    <View style={styles.line} />
                    <TextView textSty={styles.labelSty}>
                      GPA Number (Optional)
                    </TextView>
                    <InputFields
                      fieldStyle={{
                        width: '100%',
                        fontSize: 12,
                        line: 16.39,
                        fontFamily: FontFamily.Bold,
                      }}
                      simpleField
                      placeholder={'Enter GPA Number'}
                      value={formikAddress.values.gpa_number}
                      onChangeText={formikAddress.handleChange('gpa_number')}
                      maxLength={30}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={styles.btnView}>
              <View style={styles.innerViewBtn}>
                <Button
                  onClick={() => {
                    navigation.goBack();
                  }}
                  btnName={AllString.Cancel}
                  buttonColor={Colors.White}
                  allButtonSty={{
                    ...styles.loginBtnSty,
                    backgroundColor: Colors.MantisGreen,
                  }}
                />
              </View>
              <View style={styles.innerViewBtn}>
                <Button
                  onClick={
                    selectedTab == 'Applicants'
                      ? formik.handleSubmit
                      : formikAddress.handleSubmit
                  }
                  btnName={AllString.Next}
                  buttonColor={Colors.White}
                  allButtonSty={{
                    ...styles.loginBtnSty,
                    backgroundColor: Colors.TealBlue,
                  }}
                />
              </View>
            </View>
          </WaterMark>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationFormStep1;

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
    marginBottom: 28,
  },
  innerViewBtn: {width: '45%'},
  tabLabel: {
    fontSize: 12,
    lineHeight: 16.39,
    fontFamily: FontFamily.Bold,
    color: Colors.White,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  tabView: {
    backgroundColor: Colors.gray4,
    // paddingHorizontal: 16,
    paddingVertical: 15,

    borderRadius: 5,
    width: '45%',
  },

  line: {
    borderWidth: 0.8,
    borderColor: Colors.gray6,
    marginVertical: 15,
  },
  activeTab: {
    backgroundColor: '#00838F', // Active tab color
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    lineHeight: 12,
    top: -8,
  },
  callingCode: {
    fontFamily: FontFamily.Bold,
    color: Colors.Black,
    backgroundColor: Colors.White,
    position: 'absolute',
    top: -14,
    zIndex: 999,
    marginLeft: 10,
    fontSize: 12,
  },
});
