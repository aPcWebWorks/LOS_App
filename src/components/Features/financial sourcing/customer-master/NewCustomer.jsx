import React, {useState} from 'react';
// import RNFetchBlob from 'rn-fetch-blob';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TextInput, RadioButton, Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {postCustomerCredentials} from '../../../../features/customer-master/customerMasterSlice.js';
import {Dropdown} from 'react-native-element-dropdown';
import CustomDocumentPicker from '../../../Common/document-picker/DocumentPicker.js';

const title = [
  {label: 'Mr', value: 'mr'},
  {label: 'Mrs', value: 'mrs'},
  {label: 'Other', value: 'other'},
];

const occupation = [
  {label: 'Farmer', value: 'farmer'},
  {label: 'Service', value: 'service'},
  {label: 'Business', value: 'business'},
  {label: 'Seller', value: 'seller'},
];

// Main Component
const NewCustomer = ({navigation, id, isOpen, toggle}) => {
  // commom state.
  const theme = useTheme();
  const styles = getStyles(theme);

  // redux toolkit.
  const dispatch = useDispatch();
  // const credentials = useSelector(state => state.customer);

  // component state.
  const [isFocus, setIsFocus] = useState(false);

  // const [toggleContent, setToggleContent] = useState(false);
  const [credentials, setCredentials] = useState({
    idDocument: null,
    panCard: null,
    aadhaarCard: null,
    customer: {
      scpId: '',
      title: '',
      customerName: '',
      gender: '',
      recidentialAddress: '',
      email: '',
      pinCode: '',
      mobileNumber: '',
      aadhaarNumber: '',
      panCardNumber: '',
      occupation: '',
      annualIncome: '',
    },
  });

  const handleChange = (name, value) => {
    if (name === 'idDocument' || name === 'panCard' || name === 'aadhaarCard') {
      setCredentials(prevState => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setCredentials(prevState => ({
        ...prevState,
        customer: {
          ...prevState.customer,
          [name]: value,
        },
      }));
    }
  };

  const handleFormCredential = e => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const customerBlob = new Blob([JSON.stringify(credentials.customer)], {
        type: 'application/json',
      });

      formData.append('idDocument', credentials?.idDocument);
      formData.append('panCard', credentials?.panCard);
      formData.append('aadhaarCard', credentials?.aadhaarCard);
      formData.append('customer', customerBlob._data, 'customer.json');
      console.log('credentials.idDocument.name', credentials.idDocument.name);
      dispatch(postCustomerCredentials(formData._parts));
      // console.log('formData _parts', customerBlob);
      // console.log('formData _parts', customerBlob._data);
      // navigation.navigate('/Customer Master')
    } catch (error) {
      console.log('Error', error);
    }
  };

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    setSearchQuery('');
  };

  // const ToggleContentHandler = () => {
  //   setToggleContent(!toggleContent);
  // };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.scpId}>
          <Text style={styles.label}>SCP Id : </Text>
          <Text>SCP000300</Text>
        </View>

        <View style={styles.customerTitle}>
          <View>
            {/* <Dropdown
              labelDisplay={true}
              label="Title"
              options={title}
              value={credentials?.customer?.title}
              onChange={value => handleChange('title', value?.value)}
            /> */}

            <Text style={styles.label}>Title</Text>
            <Dropdown
              style={[
                styles.dropdown,
                {width: 100},
                isFocus && {borderColor: 'black'},
              ]}
              data={title}
              mode="default"
              labelField="label"
              valueField="value"
              placeholder={<Text style={{color: 'black'}}>Select</Text>}
              value={credentials?.customer?.title}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={value => handleChange('title', value?.value)}
              iconColor="black"
            />
          </View>
          <View style={styles.customerName}>
            <Text style={styles.label}>Customer Name*</Text>
            <TextInput
              style={styles.input}
              textColor="black"
              inputMode="text"
              mode="outlined"
              outlineStyle={styles.inputOutline}
              activeOutlineColor="black"
              keyboardType="default"
              outlineColor="gray"
              name="customerName"
              value={credentials?.customer?.customerName}
              onChangeText={value => handleChange('customerName', value)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Gender</Text>
          <RadioButton.Group
            name="gender"
            onValueChange={value => handleChange('gender', value)}
            value={credentials?.customer?.gender}>
            <View style={styles.radioGroup}>
              <View style={[styles.radioOptions, styles.marginLeft]}>
                <RadioButton color="black" value="male" />
                <Text style={styles.textBlack}>Male</Text>
              </View>
              <View style={styles.radioOptions}>
                <RadioButton color="black" value="female" />
                <Text style={styles.textBlack}>Female</Text>
              </View>
              <View style={styles.radioOptions}>
                <RadioButton color="black" value="other" />
                <Text style={styles.textBlack}>Other</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        <View>
          <Text style={styles.label}>Recidential Address*</Text>
          <TextInput
            style={styles.inputMultiline}
            multiline={true}
            numberOfLines={3}
            autoFocus={false}
            textColor="black"
            inputMode="text"
            mode="outlined"
            outlineStyle={styles.inputOutline}
            activeOutlineColor="black"
            keyboardType="default"
            outlineColor="gray"
            name="recidentialAddress"
            value={credentials?.customer?.recidentialAddress}
            onChangeText={value => handleChange('recidentialAddress', value)}
            cursorColor="black"
          />
        </View>

        <View>
          <Text style={styles.label}>Email Id*</Text>
          <TextInput
            style={styles.input}
            inputMode="email"
            mode="outlined"
            keyboardType="email-address"
            textColor="black"
            outlineStyle={styles.inputOutline}
            activeOutlineColor="black"
            outlineColor="gray"
            name="email"
            value={credentials?.customer?.email}
            onChangeText={value => handleChange('email', value)}
          />
        </View>

        <View style={styles.elementGroup}>
          <View style={styles.pincode}>
            <Text style={styles.label}>Pincode*</Text>
            <TextInput
              style={styles.input}
              textColor="black"
              inputMode="numeric"
              mode="outlined"
              outlineStyle={styles.inputOutline}
              activeOutlineColor="black"
              keyboardType="email-address"
              outlineColor="gray"
              name="pinCode"
              value={credentials?.customer?.pinCode}
              onChangeText={value => handleChange('pinCode', value)}
            />
          </View>

          <View style={styles.mobile}>
            <Text style={styles.label}>Mobile No.*</Text>
            <TextInput
              style={styles.input}
              textColor="black"
              inputMode="tel"
              mode="outlined"
              outlineStyle={styles.inputOutline}
              activeOutlineColor="black"
              keyboardType="email-address"
              outlineColor="gray"
              name="mobileNumber"
              value={credentials?.customer?.mobileNumber}
              onChangeText={value => handleChange('mobileNumber', value)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Aadhar No.*</Text>
          <TextInput
            style={styles.input}
            textColor="black"
            inputMode="numeric"
            mode="outlined"
            outlineStyle={styles.inputOutline}
            activeOutlineColor="black"
            keyboardType="email-address"
            outlineColor="gray"
            name="aadhaarNumber"
            value={credentials?.customer?.aadhaarNumber}
            onChangeText={value => handleChange('aadhaarNumber', value)}
          />
        </View>

        <View>
          <Text style={styles.label}>PAN No.*</Text>
          <TextInput
            style={styles.input}
            textColor="black"
            inputMode="text"
            mode="outlined"
            outlineStyle={styles.inputOutline}
            activeOutlineColor="black"
            keyboardType="default"
            outlineColor="gray"
            name="panCardNumber"
            value={credentials?.customer?.panCardNumber}
            onChangeText={value => handleChange('panCardNumber', value)}
          />
        </View>

        <View>
          <Text style={styles.label}>Occupation</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
            data={occupation}
            mode="default"
            labelField="label"
            valueField="value"
            placeholder={<Text style={{color: 'black'}}>Select</Text>}
            value={credentials?.customer?.occupation}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={value => handleChange('occupation', value?.value)}
            iconColor="black"
          />
        </View>

        <View>
          <Text style={styles.label}>Annual Income</Text>
          <TextInput
            style={styles.input}
            textColor="black"
            inputMode="text"
            mode="outlined"
            outlineStyle={styles.inputOutline}
            activeOutlineColor="black"
            keyboardType="default"
            outlineColor="gray"
            name="annualIncome"
            value={credentials?.customer?.annualIncome}
            onChangeText={value => handleChange('annualIncome', value)}
          />
        </View>

        <CustomDocumentPicker
          label="Id Size Photo*"
          file={credentials?.idDocument}
          onFileChange={value => handleChange('idDocument', value)}
        />

        <CustomDocumentPicker
          label="PAN Card Photo*"
          file={credentials?.panCard}
          onFileChange={value => handleChange('panCard', value)}
        />

        <CustomDocumentPicker
          label="Aadhar Card Photo*"
          file={credentials?.aadhaarCard}
          onFileChange={value => handleChange('aadhaarCard', value)}
        />

        <Button
          style={styles.formButton}
          textColor="white"
          mode="contained-tonal"
          onPress={handleFormCredential}>
          Submit
        </Button>
      </SafeAreaView>
    </>
  );
};

function getStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      rowGap: 14,
      marginTop: 4,
    },

    scpId: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    
    customerTitle: {
      flexDirection: 'row',
      columnGap: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },

    dropdown: {
      borderWidth: 1.5,
      height: 45,
      borderColor: 'gray',
      fontSize: 18,
      color: 'black',
      marginTop: 4,
      borderRadius: 4,
      backgroundColor: 'white',
    },

    customerName: {
      flex: 2.5,
    },

    label: {
      fontWeight: '500',
      fontSize: 14,
      color: 'black',
      letterSpacing: -0.5,
    },

    input: {
      height: 45,
      borderColor: 'gray',
      fontSize: 18,
      color: 'black',
      backgroundColor: 'white',
      marginTop: 4,
    },

    inputMultiline: {
      borderColor: 'gray',
      fontSize: 18,
      color: 'black',
      backgroundColor: 'white',
      marginTop: 4,
      paddingVertical: 8,
    },

    inputOutline: {
      borderWidth: 1.5,
    },

    elementGroup: {
      flexDirection: 'row',
      columnGap: 6,
    },

    radioGroup: {
      justifyContent: 'flex-start',
      gap: 20,
      flexDirection: 'row',
      paddingTop: 5,
      paddingBottom: 10,
    },

    marginLeft: {
      marginLeft: 10,
    },

    radioOptions: {
      alignItems: 'center',
      flexDirection: 'row',
    },

    pincode: {
      flexDirection: 'column',
      flex: 1,
    },

    mobile: {
      flexDirection: 'column',
      flex: 1,
    },

    formButton: {
      backgroundColor: 'green',
      borderRadius: 4,
    },
    // Common
    textBlack: {color: 'black'},
  });
}

export default NewCustomer;
