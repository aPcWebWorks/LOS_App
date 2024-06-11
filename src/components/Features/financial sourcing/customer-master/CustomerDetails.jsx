import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';

const CustomerDetails = ({customerDetails}) => {
  const data = Object.entries(customerDetails).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  return (
    <>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>
                {item.label.split(/(?=[A-Z])/).join(' ')} :
              </Text>
              <Text style={styles.textValue}>{item.value}</Text>
            </View>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    // backgroundColor: '#ecf9ec',
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    color: 'black',
  },
  textValue: {
    fontSize: 16,
    flex: 2,
    marginLeft: 10,
    color: 'black',
  },
});

export default CustomerDetails;
