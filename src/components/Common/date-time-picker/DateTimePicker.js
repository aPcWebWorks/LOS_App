import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';

const MyDateTimePicker = ({
  showDateTimePicker,
  chosenDate,
  showPicker,
  handleDateChange,
}) => {
  const formatDate = date => {
    if (!date) {
      return 'dd/mm/yyyy';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDateTimePicker} style={styles.input}>
        <Text style={styles.text}>{formatDate(chosenDate)}</Text>
        <FontAwesome5 name="calendar-week" style={styles.fileIcon} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={chosenDate}
          mode="date"
          is24Hour={true}
          display="calendar"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 2,
    marginBottom: 16,
    paddingHorizontal: 10,
    fontSize: 13.5,
  },
  text: {
    flex: 1,
  },
  fileIcon: {
    color: 'black',
    fontSize: 15,
  },
});

export default MyDateTimePicker;
