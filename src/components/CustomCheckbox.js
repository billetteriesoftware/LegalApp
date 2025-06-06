import React, {memo} from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import {SaveBlankSVG, SaveIconSvg} from '../assets/svgIcons/Index';

// const CustomCheckbox = ({isChecked, onPress}) => {
//   return (
//     <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
//       {/* <View style={[styles.checkbox, isChecked && styles.checkedCheckbox]}>
//         {isChecked && <Text style={styles.checkmark}>✓</Text>}
//       </View> */}
//       {isChecked ? <SaveIconSvg /> : <SaveBlankSVG />}
//     </TouchableOpacity>
//   );
// };
const CustomCheckbox = ({
  label,
  isChecked,
  onToggle,
  disabled,
  width = 24,
  height = 24,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onToggle}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
      }}>
      <View
        style={{
          width: width,
          height: height,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: isChecked ? '#4CAF50' : '#999',
          backgroundColor: isChecked ? '#4CAF50' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}>
        {isChecked && (
          <Text style={{color: 'white', fontWeight: 'bold'}}>✓</Text>
        )}
      </View>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedCheckbox: {
    backgroundColor: 'green',
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default memo(CustomCheckbox);
