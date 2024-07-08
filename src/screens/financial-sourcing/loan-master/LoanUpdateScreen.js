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
import {loanGenerationHandler} from '../../../features/loan-master/loanMasterThunk';
import {getCustomerWithId} from '../../../features/customer-master/customerMasterThunk';

const LoanUpdateScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {loanDetails} = route.params;

  const {userByScpNumber} = useSelector(state => state.scpUser);
  const {isLoading} = useSelector(state => state.getCustomerById);
  const {document} = useSelector(state => state.document);

  const {allbanks} = useSelector(state => state.banks);
  const {loans} = useSelector(state => state.loanType);
  const {generatedLoan} = useSelector(state => state.loanGeneration);
  const {customer} = useSelector(state => state.getCustomerById);

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

  const [formData, setFormData] = useState({
    bankId: '',
    customerId: '',
    existingAccountNumber: '',
    loanAmount: '',
    loanTypeId: '',
    scpId: '',
  });

  const handleChange = (key, value) => {
    setFormData(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    const fetchScpIdAndSetFormData = async () => {
      try {
        const scpId = await AsyncStorage.getItem('scpId');
        setFormData(prevState => ({
          ...prevState,
          customerId: customer?.id || '',
          scpId: scpId || '',
        }));
      } catch (error) {
        console.error('Error retrieving scpId from AsyncStorage:', error);
      }
    };

    fetchScpIdAndSetFormData();
  }, [customer]);

  // useEffect(() => {
  //   getDocumentHandler(customer.documents);
  // }, []);

  useEffect(() => {
    dispatch(getCustomerWithId(loanDetails.customerId));
    console.log('customer', customer);
  }, [dispatch]);

  useEffect(() => {
    dispatchHandler();
  }, [dispatch]);

  useEffect(() => {
    if (customer && fetchedDocuments) {
      const objData = [
        {key: 'SCP No.', value: userByScpNumber?.scpDetail?.scpNo},
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
  }, [customer, userByScpNumber]);

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
    // await getDocumentHandler(customer.documents);

    dispatch(getAllBankHandller());
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

  const handleSubmit = async () => {
    try {
      await dispatch(loanGenerationHandler(formData));
      const {status, data} = generatedLoan;

      if (status === 201) {
        navigation.navigate('Loan Details', {id: data?.id});
      } else {
        console.log(`Unexpected status: ${status}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigation.navigate('Searched Customer');
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
                disable={!filteredBranches.length}
                onChange={item => {
                  setSelectedBranchQuery(item.value);
                }}
                value={selectedBranchQuery}
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
                // onChangeText={value => setAccountNumber(value)}
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
                onPress={handleSubmit}>
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

export default LoanUpdateScreen;
