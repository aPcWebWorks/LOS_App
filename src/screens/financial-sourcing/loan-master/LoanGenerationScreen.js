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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {getCustomerWithId} from '../../../features/customer-master/customerMasterThunk';

const LoanGenerationScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {userByScpNumber} = useSelector(state => state.scpUser);
  const {customer, isLoading} = useSelector(state => state.getCustomerById);
  const [selectQuery, setSelectQuery] = useState('');

  const [obj, setObj] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    dispatch(getCustomerWithId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (customer) {
      const objData = [
        {key: 'SCP No.', value: userByScpNumber?.scpDetail?.scpNo},
        {
          key: 'Customer Name',
          value: `${customer.title}. ${customer.customerName}`,
        },
        {key: 'Gender', value: customer.gender},
        {key: 'Address', value: customer.residentialAddress},
        {key: 'Pincode', value: customer.pinCode},
        {key: 'E-Mail ID', value: customer.email},
        {key: 'Mobile', value: customer.mobileNumber},
        {key: 'PAN No.', value: customer.panCardNumber},
        {key: 'Aadhar No.', value: customer.aadhaarNumber},
        {key: 'Occupation', value: customer.occupation},
      ];
      setObj(objData);

      const imageData = [
        {key: 'ID Photo', value: customer.idDocument},
        {key: 'PAN Photo', value: customer.panCard},
        {key: 'Aadhar Photo', value: customer.aadhaarCard},
      ];
      setImage(imageData);
    }
  }, [customer, userByScpNumber]);

  const handleStack = () => {
    // Handle submit logic
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
                      <Image
                        source={{uri: `file:///${item.value}`}}
                        style={styles.photo}
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
                  data={[
                    {label: 'Name', value: 'name'},
                    {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
                    {label: 'Customer ID', value: 'customerid'},
                  ]}
                  mode="default"
                  labelField="label"
                  valueField="value"
                  placeholder={
                    <Text style={{color: 'black'}}>Select Customer</Text>
                  }
                  // value={credentials?.customer?.occupation}
                  // onFocus={() => setIsFocus(true)}
                  // onBlur={() => setIsFocus(false)}
                  onChange={setSelectQuery}
                  iconColor="black"
                />
                {/* <View style={{marginTop: 10}} /> */}
                <Dropdown
                  style={styles.dropdown}
                  data={[
                    {label: 'Name', value: 'name'},
                    {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
                    {label: 'Customer ID', value: 'customerid'},
                  ]}
                  mode="default"
                  labelField="label"
                  valueField="value"
                  placeholder={
                    <Text style={{color: 'black'}}>Select Customer</Text>
                  }
                  // value={credentials?.customer?.occupation}
                  // onFocus={() => setIsFocus(true)}
                  // onBlur={() => setIsFocus(false)}
                  onChange={setSelectQuery}
                  iconColor="black"
                />
                {/* <View style={{marginTop: 10}} /> */}
                <Dropdown
                  style={styles.dropdown}
                  data={[
                    {label: 'Name', value: 'name'},
                    {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
                    {label: 'Customer ID', value: 'customerid'},
                  ]}
                  mode="default"
                  labelField="label"
                  valueField="value"
                  placeholder={
                    <Text style={{color: 'black'}}>Select Customer</Text>
                  }
                  // value={credentials?.customer?.occupation}
                  // onFocus={() => setIsFocus(true)}
                  // onBlur={() => setIsFocus(false)}
                  onChange={setSelectQuery}
                  iconColor="black"
                />
                {/* <View style={{marginTop: 10}} /> */}
                <Dropdown
                  style={styles.dropdown}
                  data={[
                    {label: 'Name', value: 'name'},
                    {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
                    {label: 'Customer ID', value: 'customerid'},
                  ]}
                  mode="default"
                  labelField="label"
                  valueField="value"
                  placeholder={
                    <Text style={{color: 'black'}}>Select Customer</Text>
                  }
                  // value={credentials?.customer?.occupation}
                  // onFocus={() => setIsFocus(true)}
                  // onBlur={() => setIsFocus(false)}
                  onChange={setSelectQuery}
                  iconColor="black"
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
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
