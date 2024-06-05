
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList,ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const CustomerDetailsScreen = ({ route }) => {
  const { customer,isLoading } = useSelector(state => state.getCustomerById);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  const customerDetails = {
    Id: customer.externalCustomerId,
    Name: `${customer.title}. ${customer.customerName}`,
    Gender: customer.gender,
    Address: customer.residentialAddress,
    Pincode: customer.pinCode,
    Email: customer.email,
    MobileNumber: customer.mobileNumber,
    AadharCardNumber: customer.aadhaarNumber,
    PanCardNumber: customer.panCardNumber,
  };

  const renderDetailItem = ({ item }) => (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{item.label}</Text>
      <Text style={styles.value}>{item.value}</Text>
    </View>
  );

  const data = Object.entries(customerDetails).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderDetailItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 20, 
  },
  loadingIndicator: {
    marginTop: 20,
    alignSelf: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:"center",
    paddingVertical: 10,
    paddingHorizontal:16
    
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex:1,
    marginRight:15,
    marginLeft:10
  },
  value: {
    fontSize: 16,
    flex:2,
  },
});

export default CustomerDetailsScreen;

