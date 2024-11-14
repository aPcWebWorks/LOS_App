import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Searchbar,
  ActivityIndicator,
} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {loanMasterHandler} from '../../../features/loan-master/loanMasterThunk';
import {searchCustomerByParameter} from '../../../features/customer-master/customerMasterThunk';
import AllLoan from '../../../components/Features/financial sourcing/loan-master/AllLoan';

const Data = [
  {label: 'Name', value: 'name'},
  {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
  {label: 'Customer ID', value: 'customerid'},
];

const LoanMasterScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const {loan, isLoading, isError, error} = useSelector(
    state => state.loanMaster,
  );
  const {user} = useSelector(state => state.auth);
  const {loginId} = user.data || {};

  // const {searchedCustomer} = useSelector(state => state.searchedCustomer);
  const [filteredLoans, setFilteredLoans] = useState(loan);

  useEffect(() => {
    dispatch(loanMasterHandler());
  }, [dispatch]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {
    if (searchQuery) {
      const matchedLoans = loan?.filter(
        item =>
          item?.response?.virefno
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item?.response?.loanTypeId
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (item?.response?.loanAmount &&
            item.response.loanAmount
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())),
      );
      setFilteredLoans(matchedLoans);
    } else {
      setFilteredLoans(loan);
    }
  }, [searchQuery, loan]);

  const handleSearchCustomer = async () => {
    await dispatch(
      searchCustomerByParameter({
        criteriaType: selectQuery.value,
        criteriaValue: modalSearchQuery,
      }),
    );

    navigation.navigate('Searched Customer', {location: 'loan-generate'});
  };

  if (isLoading) {
    return (
      <ActivityIndicator size="small" color="green" style={style.loader} />
    );
  }

  if (isError) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 400,
        }}>
        <Text>{error?.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <PaperProvider>
        <ScrollView style={style.scrollview}>
          <View style={{rowGap: 10}}>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                dismissableBackButton={false}
                contentContainerStyle={style.modal}>
                <Text style={style.modalText}>SCP No. : {loginId}</Text>

                <View style={style.modalSection}>
                  <Dropdown
                    style={style.dropdown}
                    data={Data}
                    mode="default"
                    labelField="label"
                    valueField="value"
                    placeholder={
                      <Text style={{color: 'black'}}>Select Customer</Text>
                    }
                    value={selectQuery}
                    onChange={setSelectQuery}
                    iconColor="black"
                    placeholderStyle={{color: 'black'}}
                  />

                  <Searchbar
                    style={style.modalSearchBar}
                    placeholder="Search"
                    onChangeText={setModalSearchQuery}
                    value={modalSearchQuery}
                    mode="bar"
                    icon={() => (
                      <TouchableOpacity>
                        <Icon name="search" size={20} color="#000" />
                      </TouchableOpacity>
                    )}
                    clearIcon={() => (
                      <TouchableOpacity>
                        <Icon name="close" size={20} color="#000" />
                      </TouchableOpacity>
                    )}
                    placeholderTextColor="black"
                  />

                  <Button
                    style={style.modalButton}
                    mode="contained"
                    dark={true}
                    textColor="white"
                    disabled={!selectQuery.value && !modalSearchQuery}
                    onPress={handleSearchCustomer}>
                    Search Customer
                  </Button>
                </View>
              </Modal>
            </Portal>
            <View style={style.elementGroup}>
              <Searchbar
                style={style.search}
                placeholder="Search"
                // onChangeText={item => onChangeHandler(item)}
                onChangeText={setSearchQuery}
                icon={() => (
                  <TouchableOpacity>
                    <Icon name="search" size={20} color="#000" />
                  </TouchableOpacity>
                )}
                clearIcon={() => (
                  <TouchableOpacity>
                    <Icon name="close" size={20} color="#000" />
                  </TouchableOpacity>
                )}
                value={searchQuery}
                mode="bar"
              />

              <Button
                style={style.button}
                mode="contained"
                dark={true}
                textColor="white"
                onPress={showModal}>
                Add New
              </Button>
            </View>

            <AllLoan filteredLoans={filteredLoans} />
          </View>
        </ScrollView>
      </PaperProvider>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollview: {padding: 4},
  elementGroup: {
    flexDirection: 'row',
    columnGap: 10,
  },
  search: {
    flex: 3,
    borderRadius: 0,
    backgroundColor: '#ecf9ec',
  },
  button: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: 0,
    fontSize: 16,
    justifyContent: 'center',
  },
  dropdown: {
    marginTop: 8,
    fontSize: 18,
    height: 55,
    backgroundColor: '#ecf9ec',
    paddingHorizontal: 10,
  },
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 60,
    rowGap: 20,
  },
  modalSection: {rowGap: 15},
  modalText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  modalButton: {
    borderRadius: 4,
    backgroundColor: 'green',
    height: 55,
    justifyContent: 'center',
    marginTop: 20,
  },
  modalSearchBar: {borderRadius: 4, backgroundColor: '#ecf9ec'},
  loader: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LoanMasterScreen;
