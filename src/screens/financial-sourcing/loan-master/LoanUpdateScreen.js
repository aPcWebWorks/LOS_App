// import React, {useEffect} from 'react';
// import {SafeAreaView, StyleSheet} from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {ActivityIndicator} from 'react-native-paper';
// import {loanDetailsHandler} from '../../../features/loan-master/loanMasterThunk';
// import LoanDetails from '../../../components/Features/financial sourcing/loan-master/LoanDetails';

// const LoanUpdateScreen = ({route}) => {
//   const dispatch = useDispatch();
//   const {userByScpNumber} = useSelector(state => state.scpUser);
//   const {loanDetails, isLoading} = useSelector(state => state.loanDetails);
//   const {customer} = useSelector(state => state.getCustomerById);
//   const {bank} = useSelector(state => state.bankMaster);

//   const {id} = route.params;

//   useEffect(() => {
//     dispatch(loanDetailsHandler(id));
//   }, [dispatch]);

//   const singalLoanDetails = {
//     ScpNo: userByScpNumber?.scpDetail?.scpNo,
//     CustomerId: customer?.externalCustomerId,
//     Name: `${customer?.title}. ${customer?.customerName}`,
//     Gender: customer?.gender,
//     Address: customer?.residentialAddress,
//     Pincode: customer?.pinCode,
//     MobileNumber: customer?.mobileNumber,
//     PanCardNumber: customer?.panCardNumber,
//     AadharCardNumber: customer?.aadhaarNumber,
//     BankId: loanDetails?.bankId,
//     BankName: bank?.bankName,
//     BranchName: bank?.branchName,
//     LoanTypeId: loanDetails?.loanTypeId,
//     LoanAmount: loanDetails?.loanAmount,
//   };

//   return (
//     <>
//       <SafeAreaView style={styles.container}>
//         {isLoading ? (
//           <ActivityIndicator
//             size="large"
//             color="green"
//             style={styles.loadingIndicator}
//           />
//         ) : (
//           <>
//             <LoanDetails singalLoanDetails={singalLoanDetails} />
//           </>
//         )}
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     flexGrow: 1,
//     padding: 10,
//   },
//   loadingIndicator: {
//     flex: 1,
//     backgroundColor: 'rgba(255,255,255,0.5)',
//   },
// });
// export default LoanUpdateScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Searchbar, Modal, Portal} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import bankMasterHandler, {
  getAllBankHandller,
} from '../../../features/loan-master/bank-master/bankMasterThunk';
import {
  getLoanTypeWithIdHandler,
  loanUpdateHandler,
} from '../../../features/loan-master/loanMasterThunk';
import {
  getCustomerWithId,
  searchCustomerByParameter,
} from '../../../features/customer-master/customerMasterThunk';

const LoanUpdateScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);
  const {loginId} = user.data || {};
  const {customer} = useSelector(state => state.getCustomerById);
  const {document} = useSelector(state => state.document);
  const {allbanks} = useSelector(state => state.banks);
  const {loans} = useSelector(state => state.loanType);
  const [obj, setObj] = useState([]);
  const [image, setImage] = useState([]);
  const [fetchedDocuments, setFetchedDocuments] = useState([]);
  let uri;
  const [selectBankQuery, setSelectBankQuery] = useState(null);
  const [selectedBranchQuery, setSelectedBranchQuery] = useState(null);
  const [selectLoanQuery, setSelectLoanQuery] = useState(null);
  const [selectLoanProductQuery, setSelectLoanProductQuery] = useState('');
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectQuery, setSelectQuery] = useState('');

  const Data = [
    {label: 'Name', value: 'name'},
    {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
    {label: 'Customer ID', value: 'customerid'},
  ];

  const {updatePayload} = route.params || {};
  const {bank} = useSelector(state => state.bankMaster);
  const {loanType} = useSelector(state => state.loanTypeWithId);

  const [formData, setFormData] = useState({
    bankId: updatePayload?.bankId || '',
    customerId: updatePayload?.customerId || '',
    loanTypeId: updatePayload?.loanTypeId || '',
    scpId: updatePayload?.scpId || '',
    existingAccountNumber: updatePayload?.existingAccountNumber || '',
    loanAmount: updatePayload?.loanAmount || '',
  });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // useEffect(() => {
  //   getDocumentHandler(customer.documents);
  // }, []);

  useEffect(() => {
    if (customer) {
      const objData = [
        {key: 'SCP No.', value: loginId},
        {
          key: 'Customer Name',
          value: `${customer?.title}. ${customer?.customerName}`,
        },
        {key: 'Gender', value: customer?.gender},
        {key: 'Address', value: customer?.residentialAddress},
        {key: 'Pincode', value: customer?.pinCode},
        {key: 'E-Mail ID', value: customer?.email},
        {key: 'Mobile', value: customer?.mobileNumber},
        {key: 'PAN No.', value: customer?.panCardNumber},
        {key: 'Aadhar No.', value: customer?.aadhaarNumber},
        {key: 'Occupation ', value: customer?.occupation},
        // {key: 'ID Photo :', value: fetchedDocuments[0]},
        // {key: 'PAN Photo :', value: fetchedDocuments[1]},
        // {key: 'Aadhar Photo :', value: fetchedDocuments[2]},
      ];
      setObj(objData);
    }
  }, [customer]);

  // const getDocumentHandler = async documents => {
  //   await dispatch(documentHandler(documents[0].id));
  //   await dispatch(documentHandler(documents[1].id));
  //   dispatch(documentHandler(documents[2].id));
  //   return;
  // };

  // useEffect(() => {
  //   getDocumentHandler(customer?.documents);
  //   // console.log(customer?.documents);
  // }, []);

  // const getDocumentHandler = async docs => {
  //   for (let i = 0; i < 1; i++) {
  //     await dispatch(documentHandler(docs[2].id));
  //   }
  //   dispatch(resetDocumentState());
  //   return;
  // };

  useEffect(() => {
    if (document) {
      setFetchedDocuments(prevDocs => [...prevDocs, document]);
    }
  }, [document]);

  const dispatchHandler = async () => {
    // await getDocumentHandler(customer.documents);

    dispatch(getAllBankHandller());
  };

  useEffect(() => {
    bankUpdateHandler();
  }, [dispatch]);

  const bankUpdateHandler = async () => {
    await dispatch(getCustomerWithId(formData.customerId));
    await dispatch(bankMasterHandler(formData.bankId));
    await dispatch(getLoanTypeWithIdHandler(formData.loanTypeId));
    await dispatch(getAllBankHandller());

    if (bank) {
      setSelectBankQuery(bank.bankName);
      setSelectedBranchQuery(bank.branchName);
    }

    if (loanType) {
      setSelectLoanQuery(loanType.productName);
      setSelectLoanProductQuery(loanType.subProductName);
    }
  };

  const handleChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSearchCustomer = () => {
    if (selectQuery.value && modalSearchQuery) {
      dispatch(
        searchCustomerByParameter({
          criteriaType: selectQuery.value,
          criteriaValue: modalSearchQuery,
        }),
      );
      setVisible(false);
      navigation.navigate('Searched Customer');
    }
    return;
  };

  const bankChangeHandler = item => {
    setSelectBankQuery(item.value);
    const newFilteredBranches = allbanks
      .filter(bank => bank.response.bankName === item.label)
      .map(bank => ({
        label: bank.response.branchName,
        value: bank.response.branchName,
      }));
    setFormData(prevState => ({
      ...prevState,
      bankId: item.id,
    }));
    setFilteredBranches(newFilteredBranches);
  };

  const loanTypeChangeHandler = item => {
    setSelectLoanQuery(item.value);
    const newFliteredLoans = loans
      .filter(loan => loan.response.productName === item.label)
      .map(loan => ({
        label: loan.response.subProductName,
        value: loan.response.subProductName,
      }));
    setFormData(prevState => ({
      ...prevState,
      loanTypeId: item.id,
    }));
    setFilteredLoans(newFliteredLoans);
  };

  const handleUpdate = async () => {
    const params = {
      id: updatePayload?.id,
      formData,
    };
    await dispatch(loanUpdateHandler(params));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* {isLoading ? (
          <>
            <ActivityIndicator
              size="large"
              color="green"
              style={styles.loadingIndicator}
            />
          </>
        ) : ( */}
        <>
          <ScrollView style={styles.scrollView}>
            <View style={{rowGap: 10}}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={showModal}>
                Update Customer
              </Button>
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                scrollEnabled={false}
                data={obj.concat(image)}
                renderItem={({item}) => (
                  <View style={styles.itemContainer}>
                    <Text style={styles.label}>{item.key}</Text>
                    {item.key.startsWith('Photo') ? (
                      <Image source={{uri: uri}} style={styles.photo} />
                    ) : (
                      <Text style={styles.textValue}>{item.value}</Text>
                    )}
                  </View>
                )}
                keyExtractor={(item, index) => `${item.key}-${index}`}
              />
            </View>

            <View style={styles.dropdownGroup}>
              <Dropdown
                style={styles.dropdown}
                data={
                  allbanks?.map(item => ({
                    id: item.response.id,
                    label: item.response.bankName,
                    value: item.response.bankName,
                  })) || []
                }
                mode="default"
                value={selectBankQuery}
                onChange={item => {
                  bankChangeHandler(item);
                }}
                labelField="label"
                valueField="value"
                placeholder={
                  <Text style={{color: 'black'}}>Select Bank Name</Text>
                }
                iconColor="black"
              />

              <Dropdown
                style={styles.dropdown}
                data={filteredBranches}
                mode="default"
                labelField="label"
                valueField="value"
                placeholder={
                  <Text style={{color: 'black'}}>Select Branch Name</Text>
                }
                // disable={!filteredBranches.length}
                onChange={item => {
                  setSelectedBranchQuery(item.value);
                }}
                // value={selectedBranchQuery}
                iconColor="black"
              />

              <Dropdown
                style={styles.dropdown}
                data={
                  loans.map(item => ({
                    id: item.response.id,
                    label: item.response.productName,
                    value: item.response.productName,
                  })) || []
                }
                mode="default"
                labelField="label"
                valueField="value"
                value={selectLoanQuery}
                onChange={item => {
                  loanTypeChangeHandler(item);
                }}
                placeholder={
                  <Text style={{color: 'black'}}>Select product Name</Text>
                }
                iconColor="black"
              />

              <Dropdown
                style={styles.dropdown}
                data={filteredLoans}
                mode="default"
                labelField="label"
                valueField="value"
                placeholder={
                  <Text style={{color: 'black'}}>Select Sub product Name</Text>
                }
                onChange={item => {
                  setSelectLoanProductQuery(item.value);
                }}
                disable={!filteredLoans.length}
                value={selectLoanProductQuery}
                iconColor="black"
              />
              <TextInput
                style={styles.dropdown}
                placeholder="Existing Account Number"
                placeholderTextColor="black"
                value={formData?.existingAccountNumber}
                onChangeText={value =>
                  handleChange('existingAccountNumber', value)
                }
              />

              <TextInput
                style={styles.dropdown}
                placeholder="Loan Amount"
                placeholderTextColor="black"
                value={formData?.loanAmount}
                onChangeText={value => handleChange('loanAmount', value)}
              />
            </View>

            <View style={styles.buttonGroup}>
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleUpdate}>
                <Text>Update</Text>
              </Button>

              <Button
                style={styles.button}
                mode="contained"
                // onPress={handleCancel}
              >
                <Text>Cancel</Text>
              </Button>
            </View>
            <Portal>
              <Modal
                // visible={!toggleLoanForm ? visible : hide}
                visible={visible}
                onDismiss={hideModal}
                // dismissable={false}
                dismissableBackButton={false}
                contentContainerStyle={styles.modal}>
                {/* <Text style={styles.modalText}>SCP No. : {loginId}</Text> */}

                <View style={styles.modalSection}>
                  <Dropdown
                    style={styles.dropdown}
                    data={Data}
                    mode="default"
                    labelField="label"
                    valueField="value"
                    placeholder={
                      <Text style={{color: 'black'}}>Select Customer</Text>
                    }
                    value={selectQuery}
                    // onFocus={() => setIsFocus(true)}
                    // onBlur={() => setIsFocus(false)}
                    onChange={setSelectQuery}
                    iconColor="black"
                    placeholderStyle={{color: 'black'}}
                  />

                  <Searchbar
                    style={styles.modalSearchBar}
                    placeholder="Search"
                    onChangeText={setModalSearchQuery}
                    value={modalSearchQuery}
                    mode="bar"
                    iconColor="black"
                    placeholderTextColor="black"
                  />

                  <Button
                    style={styles.modalButton}
                    mode="contained"
                    dark={true}
                    textColor="white"
                    onPress={handleSearchCustomer}>
                    Search Customer
                  </Button>
                </View>
              </Modal>
            </Portal>
          </ScrollView>
        </>
        {/* )} */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
  photo: {
    width: 200,
    height: 200,
    // resizeMode: 'contain',
  },
  dropdownGroup: {
    marginTop: 20,
    rowGap: 10,
  },
  dropdown: {
    height: 55,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#ecf9ec',
  },
  modalSearchBar: {borderRadius: 4, backgroundColor: '#ecf9ec'},
  buttonGroup: {
    flex: 1,
    marginTop: 40,
    rowGap: 10,
    marginBottom: 20,
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
  button: {
    height: 45,
    borderRadius: 0,
    backgroundColor: 'green',
  },
  loadingIndicator: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default LoanUpdateScreen;
