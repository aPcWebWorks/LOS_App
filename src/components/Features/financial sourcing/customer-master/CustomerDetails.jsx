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
            <View style={styles.detailRow}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginRight: 15,
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
});

export default CustomerDetails;
