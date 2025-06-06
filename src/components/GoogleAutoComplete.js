import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Alert, Platform} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {LocationIcon} from '../Assets/svgIcons';

import {FindCurrentLocation} from '../utils/CommonMethod';
import Colors from '../Styles/Colors';
import Config from 'react-native-config';

// const GOOGLE_API_KEY ='AIzaSyBJTv10ZLAa2VeFS7QQCColhJNsSLY7ABY'

const GoogleAutoComplete = React.memo(({placeholder, onSelect, address}) => {
  const [locationFetched, setLocationFetched] = useState(false);
  const [currentLocationFetched, setCurrentLocationFetched] = useState(false);

  useEffect(() => {
    if (!locationFetched) {
      const onSuccess = res => {
        setCurrentLocationFetched(res);
      };
      const onError = err => {
        console.log('er', err);
      };
      FindCurrentLocation(onSuccess, onError);

      setLocationFetched(true); // Ensure the function is not called again
    }
  }, [locationFetched]);

  const delhiPlace = {
    description: currentLocationFetched?.payload,
    geometry: {
      location: {
        lat: currentLocationFetched?.latitude,
        lng: currentLocationFetched?.longitude,
      },
    }, // Latitude and Longitude of Delhi
  };

  // Reference to GooglePlacesAutocomplete component
  const googlePlacesRef = useRef();
  return (
    <View style={styles.container}>
      {address ? null : <LocationIcon />}
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        keepResultsAfterBlur={true}
        placeholder={address ? placeholder : 'Search'}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        fetchDetails={true}
        listViewDisplayed="auto"
        minLength={2}
        onPress={async (data, details = null) => {
          const latitude = details.geometry.location.lat;
          const longitude = details.geometry.location.lng;
          if (details) {
            googlePlacesRef.current?.setAddressText(data.description);

            const response = await fetch(
              `${Config.AutoComplteAddressApi}=${encodeURIComponent(
                data?.description,
              )}&key=${Config.GOOGLE_API_KEY}`,
            );
            const datas = await response.json();
            if (datas.results.length > 0) {
              const location = datas.results[0].geometry.location;

              if (onSelect) {
                onSelect({
                  description: data?.description,
                  latitude: location?.lat,
                  longitude: location?.lng,
                });
              }
            } else {
              console.error('No results found for the specified address.');
              return null;
            }
          } else {
            console.log('No details available for the selected place.');
          }
        }}
        query={{
          key: Config.GOOGLE_API_KEY,
          language: 'en',
        }}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: address ? styles.textInputs : styles.textInput,
        }}
        textInputProps={{
          placeholderTextColor: Colors.midnight_blue, // Set your desired placeholder color here
          fontWeight: Platform.OS === 'ios' ? '400' : '600',
          fontFamily: 'Rubik-Light',
        }}
        keyboardShouldPersistTaps="always"
        GooglePlacesDetailsQuery={{
          fields: 'geometry',
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 38,
    color: '#5d5d5d',
    fontSize: 16,
    top: 3,
  },
  textInputs: {
    height: 37,
    color: Colors.Cyprus,
    fontSize: 14,
    top: 3,
  },
  locationContainer: {
    marginTop: 20,
  },
});

export default GoogleAutoComplete;
