// // import React, {useEffect, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   SafeAreaView,
// //   FlatList,
// //   Image,
// //   ActivityIndicator,
// //   ScrollView,
// // } from 'react-native';
// // import {useDispatch, useSelector} from 'react-redux';
// // import {Button} from 'react-native-paper';
// // import {Dropdown} from 'react-native-element-dropdown';
// // import {resetDocumentState} from '../../../features/documents/documentSlice';
// // import documentHandler from '../../../features/documents/documentThunk';

// // const LoanGenerationScreen = ({navigation, route}) => {
// //   const dispatch = useDispatch();
// //   const {selectedCustomer} = route.params;
// //   const {userByScpNumber} = useSelector(state => state.scpUser);
// //   const {isLoading} = useSelector(state => state.getCustomerById);
// //   const {document} = useSelector(state => state.document);
// //   const [selectQuery, setSelectQuery] = useState('');

// //   const [obj, setObj] = useState([]);
// //   const [image, setImage] = useState([]);
// //   const [fetchedDocuments, setFetchedDocuments] = useState([]);

// //   let uri;

// //   useEffect(() => {
// //     getDocumentHandler(selectedCustomer.documents);
// //   }, []);

// //   useEffect(() => {
// //     if (selectedCustomer && fetchedDocuments) {
// //       const objData = [
// //         {key: 'SCP No.', value: userByScpNumber?.scpDetail?.scpNo},
// //         {
// //           key: 'Customer Name',
// //           value: `${selectedCustomer?.title}. ${selectedCustomer?.customerName}`,
// //         },
// //         {key: 'Gender', value: selectedCustomer?.gender},
// //         {key: 'Address', value: selectedCustomer?.residentialAddress},
// //         {key: 'Pincode', value: selectedCustomer?.pinCode},
// //         {key: 'E-Mail ID', value: selectedCustomer?.email},
// //         {key: 'Mobile', value: selectedCustomer?.mobileNumber},
// //         {key: 'PAN No.', value: selectedCustomer?.panCardNumber},
// //         {key: 'Aadhar No.', value: selectedCustomer?.aadhaarNumber},
// //         {key: 'Occupation ', value: selectedCustomer?.occupation},
// //         {key: 'ID Photo :', value: fetchedDocuments[0]},
// //         {key: 'PAN Photo :', value: fetchedDocuments[1]},
// //         {key: 'Aadhar Photo :', value: fetchedDocuments[2]},
// //       ];
// //       setObj(objData);
// //     }
// //   }, [selectedCustomer, userByScpNumber]);

// //   // const getDocumentHandler = async documents => {
// //   //   await dispatch(documentHandler(documents[0].id));
// //   //   await dispatch(documentHandler(documents[1].id));
// //   //   dispatch(documentHandler(documents[2].id));
// //   //   return;
// //   // };

// //   // useEffect(() => {
// //   //   getDocumentHandler(selectedCustomer?.documents);
// //   //   // console.log(selectedCustomer?.documents);
// //   // }, []);

// //   const getDocumentHandler = async docs => {
// //     for (let i = 0; i < docs.length; i++) {
// //       await dispatch(documentHandler(docs[i].id));
// //     }
// //     dispatch(resetDocumentState());
// //     return;
// //   };

// //   useEffect(() => {
// //     if (document) {
// //       setFetchedDocuments(prevDocs => [...prevDocs, document]);
// //     }
// //   }, [document]);

// //   const handleStack = () => {
// //     // Handle submit logic
// //     // console.log('fetchedDocuments', fetchedDocuments);
// //   };

// //   const handleCancel = () => {
// //     navigation.navigate('Searched Customer');
// //   };

// //   return (
// //     <>
// //       <SafeAreaView style={styles.container}>
// //         {isLoading ? (
// //           <>
// //             <ActivityIndicator
// //               size="large"
// //               color="green"
// //               style={styles.loadingIndicator}
// //             />
// //           </>
// //         ) : (
// //           <>
// //             <ScrollView style={styles.scrollView}>
// //               <FlatList
// //                 scrollEnabled={false}
// //                 data={obj.concat(image)}
// //                 renderItem={({item}) => (
// //                   <View style={styles.itemContainer}>
// //                     <Text style={styles.label}>{item.key}</Text>
// //                     {item.key.startsWith('Photo') ? (
// //                       <Image source={{uri: uri}} style={styles.photo} />
// //                     ) : (
// //                       <Text style={styles.textValue}>{item.value}</Text>
// //                     )}
// //                   </View>
// //                 )}
// //                 keyExtractor={(item, index) => `${item.key}-${index}`}
// //               />

// //               <View style={styles.dropdownGroup}>
// //                 <Dropdown
// //                   style={styles.dropdown}
// //                   data={[
// //                     {label: 'Name', value: 'name'},
// //                     {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
// //                     {label: 'Customer ID', value: 'customerid'},
// //                   ]}
// //                   mode="default"
// //                   labelField="label"
// //                   valueField="value"
// //                   placeholder={
// //                     <Text style={{color: 'black'}}>Select Customer</Text>
// //                   }
// //                   // value={credentials?.customer?.occupation}
// //                   // onFocus={() => setIsFocus(true)}
// //                   // onBlur={() => setIsFocus(false)}
// //                   onChange={setSelectQuery}
// //                   iconColor="black"
// //                 />
// //                 {/* <View style={{marginTop: 10}} /> */}
// //                 <Dropdown
// //                   style={styles.dropdown}
// //                   data={[
// //                     {label: 'Name', value: 'name'},
// //                     {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
// //                     {label: 'Customer ID', value: 'customerid'},
// //                   ]}
// //                   mode="default"
// //                   labelField="label"
// //                   valueField="value"
// //                   placeholder={
// //                     <Text style={{color: 'black'}}>Select Customer</Text>
// //                   }
// //                   // value={credentials?.customer?.occupation}
// //                   // onFocus={() => setIsFocus(true)}
// //                   // onBlur={() => setIsFocus(false)}
// //                   onChange={setSelectQuery}
// //                   iconColor="black"
// //                 />
// //                 {/* <View style={{marginTop: 10}} /> */}
// //                 <Dropdown
// //                   style={styles.dropdown}
// //                   data={[
// //                     {label: 'Name', value: 'name'},
// //                     {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
// //                     {label: 'Customer ID', value: 'customerid'},
// //                   ]}
// //                   mode="default"
// //                   labelField="label"
// //                   valueField="value"
// //                   placeholder={
// //                     <Text style={{color: 'black'}}>Select Customer</Text>
// //                   }
// //                   // value={credentials?.customer?.occupation}
// //                   // onFocus={() => setIsFocus(true)}
// //                   // onBlur={() => setIsFocus(false)}
// //                   onChange={setSelectQuery}
// //                   iconColor="black"
// //                 />
// //                 {/* <View style={{marginTop: 10}} /> */}
// //                 <Dropdown
// //                   style={styles.dropdown}
// //                   data={[
// //                     {label: 'Name', value: 'name'},
// //                     {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
// //                     {label: 'Customer ID', value: 'customerid'},
// //                   ]}
// //                   mode="default"
// //                   labelField="label"
// //                   valueField="value"
// //                   placeholder={
// //                     <Text style={{color: 'black'}}>Select Customer</Text>
// //                   }
// //                   // value={credentials?.customer?.occupation}
// //                   // onFocus={() => setIsFocus(true)}
// //                   // onBlur={() => setIsFocus(false)}
// //                   onChange={setSelectQuery}
// //                   iconColor="black"
// //                 />
// //               </View>

// //               <View style={styles.buttonGroup}>
// //                 <Button
// //                   style={styles.button}
// //                   mode="contained"
// //                   onPress={handleStack}>
// //                   <Text>Submit</Text>
// //                 </Button>

// //                 <Button
// //                   style={styles.button}
// //                   mode="contained"
// //                   onPress={handleCancel}>
// //                   <Text>Cancel</Text>
// //                 </Button>
// //               </View>
// //             </ScrollView>
// //           </>
// //         )}
// //       </SafeAreaView>
// //     </>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //   },
// //   scrollView: {
// //     padding: 10,
// //   },

// //   itemContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //     paddingVertical: 10,
// //     paddingHorizontal: 15,
// //     backgroundColor: '#f0f0f0',
// //     // backgroundColor: '#ecf9ec',
// //     borderRadius: 8,
// //   },
// //   label: {
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //     flex: 1,
// //     color: 'black',
// //   },
// //   textValue: {
// //     fontSize: 16,
// //     flex: 2,
// //     marginLeft: 10,
// //     color: 'black',
// //   },
// //   photo: {
// //     width: 200,
// //     height: 200,
// //     // resizeMode: 'contain',
// //   },
// //   dropdownGroup: {
// //     marginTop: 20,
// //     rowGap: 10,
// //   },
// //   dropdown: {
// //     height: 55,
// //     fontSize: 18,
// //     color: 'black',
// //     backgroundColor: '#ecf9ec',
// //   },
// //   buttonGroup: {
// //     flex: 1,
// //     marginTop: 40,
// //     rowGap: 10,
// //     marginBottom: 20,
// //   },
// //   button: {
// //     height: 45,
// //     borderRadius: 0,
// //     backgroundColor: 'green',
// //   },
// //   loadingIndicator: {
// //     flex: 1,
// //     backgroundColor: 'white',
// //   },
// // });

// // export default LoanGenerationScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {resetDocumentState} from '../../../features/documents/documentSlice';
import documentHandler from '../../../features/documents/documentThunk';
import {getAllBankHandller} from '../../../features/loan-master/bank-master/bankMasterThunk';
import {
  getAllLoanHandler,
  loanGenerationHandler,
} from '../../../features/loan-master/loanMasterThunk';
import {combineReducers} from 'redux';

const LoanGenerationScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {selectedCustomer} = route.params;

  const {userByScpNumber} = useSelector(state => state.scpUser);
  const {isLoading} = useSelector(state => state.getCustomerById);
  const {document} = useSelector(state => state.document);

  const {allbanks} = useSelector(state => state.banks);
  const {loans} = useSelector(state => state.loanType);

  // const {allproducts} = useSelector(state => state.products);
  const [selectQuery, setSelectQuery] = useState('');
  const [obj, setObj] = useState([]);
  const [image, setImage] = useState([]);
  const [fetchedDocuments, setFetchedDocuments] = useState([]);
  const [bankList, setBankList] = useState([]);
  let uri;
  const [selectedBank, setSelectedBank] = useState(null);
  const [branchList, setBranchList] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [productList, setProductList] = useState([]);
  const [subProductList, setSubProductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSubProduct, setSelectedSubProduct] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);

  // useEffect(() => {
  //   getDocumentHandler(selectedCustomer.documents);
  // }, []);

  useEffect(() => {
    dispatchHandler();
  }, [dispatch]);

  // useEffect(() => {
  //   if (allbanks && allbanks.length > 0) {
  //     setBankList(allbanks);
  //     // console.log('banks from', allbanks);
  //   }
  // }, [allbanks]);
  // useEffect(() => {
  //   if (allproducts && allproducts.length > 0) {
  //     setProductList(allproducts);
  //     // console.log('products from', allproducts);
  //   }
  // }, [allproducts]);

  useEffect(() => {
    if (selectedCustomer && fetchedDocuments) {
      const objData = [
        {key: 'SCP No.', value: userByScpNumber?.scpDetail?.scpNo},
        {
          key: 'Customer Name',
          value: `${selectedCustomer?.title}. ${selectedCustomer?.customerName}`,
        },
        {key: 'Gender', value: selectedCustomer?.gender},
        {key: 'Address', value: selectedCustomer?.residentialAddress},
        {key: 'Pincode', value: selectedCustomer?.pinCode},
        {key: 'E-Mail ID', value: selectedCustomer?.email},
        {key: 'Mobile', value: selectedCustomer?.mobileNumber},
        {key: 'PAN No.', value: selectedCustomer?.panCardNumber},
        {key: 'Aadhar No.', value: selectedCustomer?.aadhaarNumber},
        {key: 'Occupation ', value: selectedCustomer?.occupation},
        // {key: 'ID Photo :', value: fetchedDocuments[0]},
        // {key: 'PAN Photo :', value: fetchedDocuments[1]},
        // {key: 'Aadhar Photo :', value: fetchedDocuments[2]},
      ];
      setObj(objData);
    }
  }, [selectedCustomer, userByScpNumber]);

  // const getDocumentHandler = async documents => {
  //   await dispatch(documentHandler(documents[0].id));
  //   await dispatch(documentHandler(documents[1].id));
  //   dispatch(documentHandler(documents[2].id));
  //   return;
  // };

  // useEffect(() => {
  //   getDocumentHandler(selectedCustomer?.documents);
  //   // console.log(selectedCustomer?.documents);
  // }, []);

  const getDocumentHandler = async docs => {
    for (let i = 0; i < 1; i++) {
      await dispatch(documentHandler(docs[2].id));
    }
    dispatch(resetDocumentState());
    return;
  };

  useEffect(() => {
    if (document) {
      setFetchedDocuments(prevDocs => [...prevDocs, document]);
    }
  }, [document]);

  const dispatchHandler = async () => {
    // await getDocumentHandler(selectedCustomer.documents);

    dispatch(getAllBankHandller());
  };

  const handleStack = async () => {
    // Handle submit logic
    // console.log('fetchedDocuments', fetchedDocuments);
    console.log('accountNumber:', accountNumber);
    console.log('loanAmount:', loanAmount);
    let bankId = null;
    const bank = allbanks.find(bank => {
      return (
        bank.response.bankCode === selectedBank ||
        bank.response.bankName === selectedBank
      );
    });

    if (bank) {
      bankId = bank.response.id;
    }
    console.log('bankId:', bankId);

    let scpID = null;
    try {
      scpID = await AsyncStorage.getItem('scpId');
    } catch (error) {
      console.error('Error retrieving scpId from AsyncStorage:', error);
    }
    console.log('scpID:', scpID);

    let customerID = selectedCustomer?.id;
    console.log('customerID:', customerID);

    let loanID = null;
    // console.log('selectedProduct:', selectedProduct);

    const loan = loans.find(loan => {
      // console.log('loan:', loan);
      return (
        loan.response.productCode === selectedProduct ||
        loan.response.productName === selectedProduct
      );
    });

    if (loan) {
      loanID = loan.response.id;
    }

    console.log('loanTypeID:', loanID);

    // if (
    //   selectedBank &&
    //   selectedBranch &&
    //   selectedProduct &&
    //   selectedSubProduct &&
    //   accountNumber &&
    //   loanAmount
    // ) {
    //   const payload = {
    //     bankID: bankId,
    //     customerID: selectedCustomer?.id,
    //     existingAccountNumber: accountNumber,
    //     loanAmount: loanAmount,
    //     loanTypeID: loanTypeId,
    //     scpID: scpID,
    //   };
    //   console.log('payload', payload);

    // } else {
    //   console.error('Missing required fields for loan generation');
    //   // Handle missing fields error
    // }
  };

  const bankChangeHandler = item => {
    const newFilteredBranches = allbanks
      .filter(bank => bank.response.bankName === item.label)
      .map(bank => ({
        label: bank.response.branchName,
        value: bank.response.branchName,
      }));

    setFilteredBranches(newFilteredBranches);
    setSelectedBank(item.label);
    setSelectQuery(item.label);
    // console.log(filteredBranches);
    // console.log("Selected Bank:", item);
  };

  const loanTypeChangeHandler = item => {
    console.log('loan type change handler', item);
    const newFliteredLoans = loans
      // .filter(loan => loan.response.productName === item.label)
      .filter(loan => {
        console.log('loan', loan);
      })
      .map(loan => ({
        label: loan.response.subProductName,
        value: loan.response.subProductName,
      }));
    setFilteredLoans(newFliteredLoans);
    // console.log(filteredLoans);
    // setSelectedProduct(item.value);
    // console.log("Loans",loans);
  };

  const handleCancel = () => {
    navigation.navigate('Searched Customer');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <>
            <ActivityIndicator
              size="large"
              color="green"
              style={styles.loadingIndicator}
            />
          </>
        ) : (
          <>
            <ScrollView style={styles.scrollView}>
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

              <View style={styles.dropdownGroup}>
                {/* {bankList && bankList.length > 0 && ( */}
                <Dropdown
                  style={styles.dropdown}
                  data={
                    allbanks?.map(item => ({
                      label: item.response.bankName,
                      id: item.response.id,
                    })) || []
                  }
                  mode="default"
                  value={
                    selectQuery || (selectedBank ? selectedBank.label : '')
                  }
                  onChange={item => {
                    bankChangeHandler(item);
                    // setSelectedBank(item);
                    // setSelectQuery(item.label);
                  }}
                  labelField="label"
                  valueField="value"
                  placeholder={
                    <Text style={{color: 'black'}}>Select Bank Name</Text>
                  }
                  iconColor="black"
                />
                {/* )} */}
                {/* <View style={{marginTop: 10}} /> */}
                <Dropdown
                  style={styles.dropdown}
                  data={filteredBranches}
                  mode="default"
                  labelField="label"
                  valueField="value"
                  placeholder={
                    <Text style={{color: 'black'}}>Select Branch Name</Text>
                  }
                  onChange={item => {
                    setSelectedBranch(item.value);
                    setSelectQuery(item.value);
                  }}
                  // onChange={setSelectQuery}
                  value={selectedBranch}
                  // value={selectQuery}
                  iconColor="black"
                />

                {/* <View style={{marginTop: 10}} />  */}
                {/* {productList && productList.length > 0 && ( */}
                <Dropdown
                  style={styles.dropdown}
                  // data={productList.map(item => ({
                  //   label: item.response.productName,
                  //   id: item.response.id,
                  // }))}

                  data={loans.map(item => ({
                    label: item.response.productName,
                    id: item.response.id,
                  }))}
                  // data={loans.map(item => {
                  //   console.log('loans', item);
                  // })}
                  mode="default"
                  labelField="label"
                  valueField="value"
                  value={selectedProduct}
                  // onChange={loanTypeChangeHandler}
                  onChange={item => {
                    loanTypeChangeHandler(item);
                    // setSelectedBank(item);
                    // setSelectQuery(item.label);
                  }}
                  // value={selectQuery}
                  // onChange={setSelectQuery}
                  placeholder={
                    <Text style={{color: 'black'}}>Select product Name</Text>
                  }
                  iconColor="black"
                />
                {/* )} */}
                {/* <View style={{marginTop: 10}} /> */}

                <Dropdown
                  style={styles.dropdown}
                  data={filteredLoans}
                  mode="default"
                  labelField="label"
                  valueField="value"
                  placeholder={
                    <Text style={{color: 'black'}}>
                      Select Sub product Name
                    </Text>
                  }
                  // onChange={item => setSelectedSubProduct(item.value)}
                  // value={selectedSubProduct}
                  onChange={item => {
                    setSelectedProduct(item.value);
                    setSelectQuery(item.value);
                  }}
                  // onChange={setSelectQuery}
                  value={selectedProduct}
                  // value={selectQuery}
                  // onChange={setSelectQuery}
                  iconColor="black"
                />
                <TextInput
                  style={styles.dropdown}
                  placeholder="Existing Account Number"
                  placeholderTextColor="black"
                  value={accountNumber}
                  onChangeText={value => setAccountNumber(value)}
                />

                <TextInput
                  style={styles.dropdown}
                  placeholder="Loan Amount"
                  placeholderTextColor="black"
                  value={loanAmount}
                  onChangeText={value => setLoanAmount(value)}
                />
              </View>

              <View style={styles.buttonGroup}>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleStack}>
                  <Text>Submit</Text>
                </Button>

                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={handleCancel}>
                  <Text>Cancel</Text>
                </Button>
              </View>
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
  buttonGroup: {
    flex: 1,
    marginTop: 40,
    rowGap: 10,
    marginBottom: 20,
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

export default LoanGenerationScreen;
