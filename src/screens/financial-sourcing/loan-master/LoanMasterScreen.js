import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Searchbar,
  DataTable,
} from 'react-native-paper';
import DropdownComponent from '../../../components/Common/dropdown/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {loanMasterHandler} from '../../../features/loan-master/loanMasterThunk';
import {searchCustomerHandler} from '../../../features/customer-master/customerMasterThunk';

const Data = [
  {label: 'Name', value: 'name'},
  {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
  {label: 'Customer ID', value: 'customerid'},
];

const scpLoanStatusObj = [
  {
    id: 1,
    label: 'Label',
    value: 'Value',
  },
  {
    id: 2,
    label: 'Label',
    value: 'Value',
  },
  {
    id: 1,
    label: 'Label',
    value: 'Value',
  },
  {
    id: 2,
    label: 'Label',
    value: 'Value',
  },
];

const scpLoanStatusDropdoenObj = [
  {
    id: 1,
    label: 'Select Customer',
    options: scpLoanStatusObj,
  },
  {
    id: 1,
    label: 'Select User',
    options: scpLoanStatusObj,
  },
  {
    id: 1,
    label: 'Select SCP',
    options: scpLoanStatusObj,
  },
  {
    id: 1,
    label: 'Select SCP',
    options: scpLoanStatusObj,
  },
];

const customers = [
  {
    id: 1,
    name: 'John Doe',
    scpnumber: 'SCP123',
    business: 'Tech',
    email: 'john@gmail.com',
    mobilenumber: '87967645353',
  },
  {
    id: 2,
    name: 'Jonas Smith',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 3,
    name: 'Ram',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 4,
    name: 'Mackwin',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 4,
    name: 'Mackwin',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 4,
    name: 'Mackwin',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 4,
    name: 'Mackwin',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 4,
    name: 'Mackwin',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
];

const LoanGenerationForm = ({setToggleLoanForm}) => {
  const handleStack = () => {
    setToggleLoanForm(false);
  };

  const handleCancel = () => {
    setToggleLoanForm(false);
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.row}>
            {scpLoanStatusObj.map((item, index) => {
              return (
                <>
                  <View style={styles.inputText} key={index}>
                    <Text style={styles.lebel}>{item.label}</Text>
                    <Text style={styles.textValue}>{item.value}</Text>
                  </View>
                </>
              );
            })}

            {/* <FlatList
              data={scpLoanStatusObj}
              renderItem={({item}) => (
                <View style={styles.inputText}>
                  <Text style={styles.lebel}>{item.label}</Text>
                  <Text style={styles.textValue}>{item.value}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
            /> */}
          </View>

          <View style={styles.dropdownGroup}>
            {scpLoanStatusDropdoenObj?.map((item, index) => {
              return (
                <DropdownComponent
                  style={style.dropdown}
                  label={item.label}
                  options={Data}
                />
              );
            })}
          </View>

          <View style={styles.buttonGroup}>
            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              textColor="white"
              onPress={handleStack}>
              <Text style={styles.buttonLebel}>Submit</Text>
            </Button>

            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              textColor="white"
              onPress={handleCancel}>
              <Text style={styles.buttonLebel}>Cancel</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 7,
    rowGap: 20,
    flexWrap: 'wrap',
    padding: 15,
  },

  inputText: {width: '49%'},

  lebel: {
    fontWeight: '400',
    fontSize: 13,
    letterSpacing: 0.8,
    color: 'black',
  },

  textValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    // marginLeft: 4,
    marginTop: 4,
  },

  dropdownGroup: {
    marginTop: 20,
    rowGap: 10,
  },

  buttonGroup: {
    marginTop: 30,
    rowGap: 15,
  },

  button: {
    borderRadius: 4,
    backgroundColor: 'green',
    height: 50,
    justifyContent: 'center',
    // marginTop: 10,
  },

  buttonLebel: {
    fontSize: 18,
    fontWeight: '600',
  },
});

const LoanMasterScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [selectQuery, setSelectQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [toggleLoanForm, setToggleLoanForm] = useState(false);

  const dispatch = useDispatch();
  const {loan} = useSelector(state => state.loanMaster);
  const {userByScpNumber} = useSelector(state => state.scpUser);
  const {searchedCustomer} = useSelector(state => state.searchedCustomer);
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

  const numberOfCustomersPerPageList = [2, 3, 4];

  const [page, setPage] = React.useState(0);
  const [numberOfCustomersPerPage, onCustomersPerPageChange] = React.useState(
    numberOfCustomersPerPageList[0],
  );
  const from = page * numberOfCustomersPerPage;
  const to = Math.min((page + 1) * numberOfCustomersPerPage, customers.length);

  useEffect(() => {
    setPage(0);
  }, [numberOfCustomersPerPage]);

  // Loan Generation

  const handleSearchCustomer = () => {
    // setToggleLoanForm(true);
    // setVisible(false);

    if (selectQuery.value && modalSearchQuery) {
      dispatch(
        searchCustomerHandler({
          criteriaType: selectQuery.value,
          criteriaValue: modalSearchQuery,
        }),
      );
      navigation.navigate('Searched Customer');
    }
    // console.log('Please selct option and search your value', customerParams);
  };

  return (
    <SafeAreaView style={style.container}>
      <PaperProvider>
        <ScrollView style={style.scrollview}>
          {!toggleLoanForm ? (
            <>
              <View style={{rowGap: 10}}>
                <Portal>
                  <Modal
                    visible={!toggleLoanForm ? visible : hide}
                    onDismiss={hideModal}
                    // dismissable={false}
                    dismissableBackButton={false}
                    contentContainerStyle={style.modal}>
                    <Text style={style.modalText}>
                      SCP No. : {userByScpNumber?.scpDetail?.scpNo}
                    </Text>

                    <View style={style.modalSection}>
                      <DropdownComponent
                        style={style.dropdown}
                        label="Select Customer"
                        options={Data}
                        onChangeText={setSelectQuery}
                      />

                      <Searchbar
                        style={style.modalSearchBar}
                        placeholder="Search"
                        onChangeText={setModalSearchQuery}
                        value={modalSearchQuery}
                        mode="bar"
                      />

                      <Button
                        style={style.modalButton}
                        mode="contained"
                        dark={true}
                        textColor="white"
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

                <View style={style.table}>
                  <ScrollView horizontal>
                    <DataTable>
                      {/* Table Header */}
                      <DataTable.Header style={style.tableHeader}>
                        <DataTable.Title style={style.columnHeader} width={15}>
                          <Text style={style.tableTitle}>ID</Text>
                        </DataTable.Title>
                        <DataTable.Title style={style.columnHeader} width={150}>
                          <Text style={style.tableTitle}>Vi. Ref. No.</Text>
                        </DataTable.Title>
                        <DataTable.Title style={style.columnHeader} width={100}>
                          <Text style={style.tableTitle}>Loan Type ID.</Text>
                        </DataTable.Title>
                        <DataTable.Title style={style.columnHeader} width={200}>
                          <Text style={style.tableTitle}>Loan Amount</Text>
                        </DataTable.Title>
                        <DataTable.Title style={style.columnHeader} width={100}>
                          <Text style={style.tableTitle}>Action</Text>
                        </DataTable.Title>
                      </DataTable.Header>

                      {/* Table Rows */}
                      <FlatList
                        data={filteredLoans}
                        renderItem={({item, index}) => (
                          <DataTable.Row style={style.tableRow}>
                            <DataTable.Cell style={style.tableCell} width={15}>
                              {index + 1}
                            </DataTable.Cell>
                            <DataTable.Cell style={style.tableCell} width={150}>
                              {item?.response?.virefno}
                            </DataTable.Cell>
                            <DataTable.Cell style={style.tableCell} width={100}>
                              {item?.response?.loanTypeId}
                            </DataTable.Cell>
                            <DataTable.Cell style={style.tableCell} width={200}>
                              {item?.response?.loanAmount}
                            </DataTable.Cell>
                            <DataTable.Cell style={style.tableCell} width={100}>
                              <Button
                                style={style.button}
                                mode="contained"
                                dark={true}
                                textColor="white">
                                Update
                              </Button>
                            </DataTable.Cell>
                          </DataTable.Row>
                        )}
                        keyExtractor={item => item.id}
                      />
                    </DataTable>
                  </ScrollView>
                  <DataTable>
                    <DataTable.Pagination
                      page={page}
                      numberOfPages={Math.ceil(
                        customers.length / numberOfCustomersPerPage,
                      )}
                      onPageChange={page => setPage(page)}
                      label={`${from + 5}-${to} of ${customers.length}`}
                      showFastPaginationControls
                      numberOfItemsPerPageList={numberOfCustomersPerPageList}
                      numberOfItemsPerPage={numberOfCustomersPerPage}
                      onItemsPerPageChange={onCustomersPerPageChange}
                      selectPageDropdownLabel={'Rows per page'}
                    />
                  </DataTable>
                </View>
              </View>
            </>
          ) : (
            <LoanGenerationForm
              navigation={navigation}
              setToggleLoanForm={setToggleLoanForm}
            />
          )}
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
    // width: '100%',
    flexDirection: 'row',
    columnGap: 10,
    // height: 40,
  },

  search: {
    flex: 3,
    borderRadius: 0,
    backgroundColor: '#ecf9ec',
  },

  button: {
    flex: 1,
    // height: 50,
    backgroundColor: 'green',
    borderRadius: 0,
    fontSize: 16,
    justifyContent: 'center',
  },

  dropdown: {backgroundColor: '#ecf9ec', borderWidth: 0, height: 55},

  table: {backgroundColor: 'white'},

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

  tableHeader: {
    backgroundColor: '#ecf9ec',
  },
  columnHeader: {
    justifyContent: 'center',
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    justifyContent: 'center',
  },
});

export default LoanMasterScreen;
