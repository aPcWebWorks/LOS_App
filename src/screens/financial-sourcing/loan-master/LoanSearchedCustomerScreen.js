import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import SearchedCustomers from '../../../components/Features/financial sourcing/loan-master/SearchedCustomers';

const SearchedCustomer = () => {
  const {customers, isLoading} = useSelector(state => state.searchCustomerByParameter);

  return (
    <>
      <SafeAreaView style={style.container}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="green"
            style={style.loadingIndicator}
          />
        ) : (
          <>
            <ScrollView style={style.scrollview}>
              <SearchedCustomers customers={customers} />
            </ScrollView>
          </>
        )}
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
