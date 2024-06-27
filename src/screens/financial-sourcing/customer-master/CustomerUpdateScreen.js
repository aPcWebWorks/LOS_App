import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native-paper';
import {getCustomerWithId} from '../../../features/customer-master/customerMasterThunk';
import UpdateCustomer from '../../../components/Features/financial sourcing/customer-master/UpdateCustomer';

const CustomerUpdateScreen = ({route}) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {customer, isLoading} = useSelector(state => state.getCustomerById);

  useEffect(() => {
    if (id) {
      dispatch(getCustomerWithId(id)).catch(error => {
        console.error('Error fetching customer:', error);
      });
    }
  }, [dispatch, id]);

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
            <ScrollView style={styles.scrollview}>
              <UpdateCustomer customer={customer} />
            </ScrollView>
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
  },
  scrollview: {padding: 10},
  loadingIndicator: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});
export default CustomerUpdateScreen;
