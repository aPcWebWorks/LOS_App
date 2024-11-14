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
import {ActivityIndicator, Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {BackHandler} from 'react-native';
import {getAllBankHandller} from '../../../features/loan-master/bank-master/bankMasterThunk';
import {loanGenerationHandler} from '../../../features/loan-master/loanMasterThunk';
import {getCustomerWithId} from '../../../features/customer-master/customerMasterThunk';
import {resetDocumentState} from '../../../features/documents/documentSlice';

const LoanGenerationScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {customer, isLoading: customerLoading} = useSelector(
    state => state.getCustomerById,
  );
  const {scpUser} = useSelector(state => state.scpUser);
  const {documents} = useSelector(state => state.document);
  const {allbanks} = useSelector(state => state.banks);
  const {loans} = useSelector(state => state.loanType);
  const [obj, setObj] = useState([]);
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
    dispatch(getCustomerWithId(id));
    dispatch(getAllBankHandller());
  }, [id]);

  useEffect(() => {
    const objData = [
      {key: 'SCP No.', value: scpUser?.scpDetail?.scpNo},
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
      {key: 'ID Photo :', value: documents[0]},
      {key: 'PAN Photo :', value: documents[1]},
      {key: 'Aadhar Photo :', value: documents[2]},
    ];

    setObj(objData);
  }, [customer, scpUser, documents]);

  useEffect(() => {
    const backAction = () => {
      navigation.pop(2);
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [navigation]);

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
      const result = await dispatch(loanGenerationHandler(formData));
      const {status, data} = result?.payload || {};

      if (status === 201 && data?.id) {
        navigation.navigate('Loan Details', {id: data.id});
      }
    } catch (error) {
      console.error('Error during loan generation:', error);
    } finally {
      setObj([
        {key: 'SCP No.', value: ''},
        {key: 'Customer Name', value: ''},
        {key: 'Gender', value: ''},
        {key: 'Address', value: ''},
        {key: 'Pincode', value: ''},
        {key: 'E-Mail ID', value: ''},
        {key: 'Mobile', value: ''},
        {key: 'PAN No.', value: ''},
        {key: 'Aadhar No.', value: ''},
        {key: 'Occupation', value: ''},
        {key: 'ID Photo :', value: ''},
        {key: 'PAN Photo :', value: ''},
        {key: 'Aadhar Photo :', value: ''},
      ]);

      dispatch(resetDocumentState());
    }
  };

  if (customerLoading)
    return (
      <ActivityIndicator
        size="small"
        color="green"
        style={styles.loadingIndicator}
      />
    );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <FlatList
            scrollEnabled={false}
            data={obj}
            renderItem={({item}) => (
              <View style={styles.itemContainer}>
                <Text style={styles.label}>{item.key}</Text>
                {item.key.match('Photo') ? (
                  <Image
                    source={{uri: item.value}}
                    style={{height: '100%', width: 100, objectFit: 'contain'}}
                  />
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
              fontSize={16}
              onChangeText={value =>
                handleChange('existingAccountNumber', value)
              }
            />

            <TextInput
              style={styles.dropdown}
              placeholder="Loan Amount"
              placeholderTextColor="black"
              value={formData?.loanAmount}
              fontSize={16}
              onChangeText={value => handleChange('loanAmount', value)}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              style={styles.button}
              mode="contained"
              disabled={
                !formData?.loanAmount ||
                !formData?.existingAccountNumber ||
                !selectLoanProductQuery ||
                !selectLoanQuery ||
                !selectedBranchQuery ||
                !selectBankQuery
              }
              onPress={handleSubmit}>
              <Text>Submit</Text>
            </Button>
          </View>
        </ScrollView>
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
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    height: 45,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    width: 100,
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
    rowGap: 10,
  },
  dropdown: {
    height: 45,
    fontSize: 18,
    color: 'black',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 8,
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
