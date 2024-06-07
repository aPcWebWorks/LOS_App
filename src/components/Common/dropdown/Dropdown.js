import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const DropdownComponent = ({
  style,
  label,
  labelDisplay = false,
  options,
  value,
  onChangeText,
  innerStyle,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleDropdownChange = selectedValue => {
    onChangeText(selectedValue);
  };
  return (
    <>
      <View style={[styles.container, style]}>
        {labelDisplay && <Text style={styles.label}>{label}</Text>}

        <Dropdown
          style={[
            styles.dropdown,
            isFocus && {borderColor: 'black'},
            innerStyle,
          ]}
          data={options}
          mode="default"
          labelField="label"
          valueField="value"
          placeholder={
            <Text style={{color: 'black', fontSize: 14}}>
              {labelDisplay && "Choose"}
            </Text>
          }
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={handleDropdownChange}
          iconColor="white"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 4,
    backgroundColor: 'white',
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
    letterSpacing: -0.5,
  },
  dropdown: {
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    backgroundColor: 'transperent',
    fontSize: 14,
    color: 'black',
    flex: 1,
    padding: 5,
    paddingLeft: 8,
  },
});

export default DropdownComponent;
