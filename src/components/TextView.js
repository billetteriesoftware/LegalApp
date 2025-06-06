import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import Colors from '../styles/Colors';
import FontFamily from '../styles/FontFamily';

const TextView = props => {
  if (props.heading) {
    return (
      <View>
        <Text
          onPress={props.onPress}
          style={{...styles.headingTextSty, ...props.headingTextSty}}>
          {props.children}
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text
          numberOfLines={props.numberOfLines}
          ellipsizeMode={props.ellipsizeMode}
          onPress={props.onPressText}
          style={{...styles.textSty, ...props.textSty}}>
          {props.children}
        </Text>
      </View>
    );
  }
};

export default memo(TextView);

const styles = StyleSheet.create({
  headingTextSty: {
    fontFamily: FontFamily.ExtraBold,
    fontSize: 14,
    lineHeight: 33,
    color: Colors.LightGray,
  },
  textSty: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    lineHeight: 26,
    color: Colors.DimGray,
  },
});
