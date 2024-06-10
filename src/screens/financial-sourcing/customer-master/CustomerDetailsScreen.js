import React from 'react';
import CustomerDetails from '../../../components/Features/financial sourcing/customer-master/CustomerDetails';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';

const CustomerDetailsScreen = () => {
  const {customer, isLoading} = useSelector(state => state.getCustomerById);

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

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="green"
            style={styles.loadingIndicator}
          />
        ) : (
          <>
            <CustomerDetails customerDetails={customerDetails} />
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 10,
  },
  loadingIndicator: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
export default CustomerDetailsScreen;
