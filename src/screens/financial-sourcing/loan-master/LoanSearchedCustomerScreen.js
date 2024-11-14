import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import SearchedCustomers from '../../../components/Features/financial sourcing/loan-master/SearchedCustomers';

const SearchedCustomer = ({route}) => {
  const {params} = route;

  console.log('params', params);
  const {customers, isLoading} = useSelector(
    state => state.searchCustomerByParameter,
  );

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        color="green"
        style={style.loadingIndicator}
      />
    );

  return (
    <>
      <SafeAreaView style={style.container}>
        <ScrollView style={style.scrollview}>
          <SearchedCustomers customers={customers} location={params.location} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollview: {
    padding: 4,
  },
  loadingIndicator: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default SearchedCustomer;
