import React, {useState, useMemo} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import TextView from './TextView';
import {DropdownIconSVg, GenderSVG, LineSvg} from '../assets/svgIcons/Index';
import Colors from '../styles/Colors';
import FontFamily from '../styles/FontFamily';
import {CapitalizeFirstLetter} from '../utils/CommonMethod';

const CustomDropdown = ({
  label,
  values,
  data,
  onSelect,
  placeholder,
  genderIcon,
  disabled,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Memoize the dropdown list data to prevent re-renders
  const dropdownData = useMemo(() => data, [data]);

  const handleSelect = item => {
    onSelect(item);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      {label && <TextView textSty={styles.label}>{label}</TextView>}

      {/* Dropdown Button */}
      <TouchableOpacity
        disabled={disabled}
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
        {values ? (
          genderIcon ? (
            <View style={styles.genderField}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{}}>
                  <GenderSVG />
                </View>
                <View style={{paddingHorizontal: 5}}>
                  <LineSvg color={Colors.gray7} />
                </View>

                <TextView
                  textSty={{
                    ...styles.dropdownText,
                    color:genderIcon?Colors.gray4 :disabled?'#00000040': Colors.gray4,
                    fontSize: 15,
                    lineHeight: 20.49,
                    fontFamily: FontFamily.Bold,
                    left: 5,
                  }}>
                  {CapitalizeFirstLetter(values)}
                </TextView>
              </View>
              <DropdownIconSVg />
            </View>
          ) : (
            <TextView textSty={{...styles.dropdownText, color: Colors.gray4}}>
              {CapitalizeFirstLetter(values)}
            </TextView>
          )
        ) : genderIcon ? (
          <View style={styles.genderField}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{}}>
                <GenderSVG />
              </View>
              <View style={{paddingHorizontal: 5}}>
                <LineSvg color={Colors.gray7} />
              </View>

              <TextView
                textSty={{
                  ...styles.dropdownText,
                  color: Colors.gray3,
     
                  left: 10,
                  fontSize: 15,
                  lineHeight: 20.49,
                }}>
                {placeholder}
              </TextView>
            </View>
            <DropdownIconSVg />
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextView textSty={styles.dropdownText}>{placeholder}</TextView>
            <DropdownIconSVg />
          </View>
        )}
      </TouchableOpacity>

      {/* Render FlatList when dropdown is open */}
      {isDropdownOpen && (
        <FlatList
          nestedScrollEnabled={true}
          data={dropdownData} // Using memoized data
          keyExtractor={(item, index) => index.toString()}
          style={styles.dropdownList}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleSelect(item)}>
              <TextView textSty={styles.dropdownItemText}>
                {item?.label}
              </TextView>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    lineHeight: 16.39,
    marginBottom: 8,
    fontFamily: FontFamily.Bold,
    color: Colors.gray4,
  },
  dropdown: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    backgroundColor: Colors.White,
  },
  dropdownText: {
    fontSize: 12,
    lineHeight: 16.39,
    marginVertical: 4,
    fontFamily: FontFamily.Bold,
    color: Colors.placeHolderColor,
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 8,
    maxHeight: 150, // Limit the height of the dropdown list
    backgroundColor: '#fff',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  dropdownItemText: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: FontFamily.Bold,
  },
  genderField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CustomDropdown;
