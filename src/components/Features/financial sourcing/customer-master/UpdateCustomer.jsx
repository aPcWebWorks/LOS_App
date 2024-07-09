import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TextInput, RadioButton, Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import DocumentPicker from '../../../Common/document-picker/DocumentPicker.js';
import {
  patchCustomerHandler,
  updateCustomerHandler,
} from '../../../../features/customer-master/customerMasterThunk.js';
// import {updateCustomerDetails} from '../../redux/actions';

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
const UpdateCustomer = ({customer}) => {
  // common state.
  const theme = useTheme();
  const styles = getStyles(theme);

  // redux toolkit.
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {loginId} = user.data || {};
  // component state.
  const [isFocus, setIsFocus] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState({});

  const [formData, setFormData] = useState({
    title: customer?.title || '',
    customerName: customer?.customerName || '',
    gender: customer?.gender || '',
    residentialAddress: customer?.residentialAddress || '',
    email: customer?.email || '',
    pinCode: customer?.pinCode || '',
    mobileNumber: customer?.mobileNumber || '',
    aadhaarNumber: customer?.aadhaarNumber || '',
    panCardNumber: customer?.panCardNumber || '',
    occupation: customer?.occupation || '',
    annualIncome: customer?.annualIncome || '',
    panCard: customer?.panCard || null,
    aadhaarCard: customer?.aadhaarCard || null,
  });

  const isMinimalChange = (formData, updatedFormData) => {
    // Compare the fields to determine minimal changes
    // Example: Assuming formData and updatedFormData are objects
    const formDataKeys = Object.keys(formData);
    const updatedFormDataKeys = Object.keys(updatedFormData);

    // Check if all keys in updatedFormData exist in formData and have the same values
    return updatedFormDataKeys.every(
      key =>
        formDataKeys.includes(key) && formData[key] === updatedFormData[key],
    );
  };

  const handleChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      ...prevState.formData,
      [name]: value,
    }));
  };

  // const handleSubmit = async () => {
  //   if (isMinimalChange(formData, updatedFormData)) {
  //     await dispatch(patchCustomerHandler(formData));
  //     console.log('patchCustomerHandler', formData);
  //   } else {
  //     // dispatch(updateCustomerHandler('CFCFL2DZ9V', updatedFormData));
  //     console.log('updateCustomerHandler');
  //   }
  //   // console.log(formData);
  // };

  const handleSubmit = async () => {
    dispatch(patchCustomerHandler({id: 'CFCFL2DZ9V', credentials: formData}));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.scpId}>
          <Text style={styles.label}>SCP Number : </Text>
          <Text style={{color: 'black'}}>{loginId}</Text>
        </View>

        <View style={styles.customerTitle}>
          <View>
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
              placeholder={
                <Text style={{color: 'black'}}>{formData.title}</Text>
              }
              value={formData.title}
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
              value={formData.customerName}
              onChangeText={value => handleChange('customerName', value)}
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>Gender</Text>
          <RadioButton.Group
            name="gender"
            onValueChange={value => handleChange('gender', value)}
            value={formData.gender}>
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
          <Text style={styles.label}>Residential Address*</Text>
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
            name="residentialAddress"
            value={formData.residentialAddress}
            onChangeText={value => handleChange('residentialAddress', value)}
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
            value={formData.email}
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
              value={formData.pinCode}
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
              value={formData.mobileNumber}
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
            value={formData.aadhaarNumber}
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
            value={formData.panCardNumber}
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
            placeholder={
              <Text style={{color: 'black'}}>{formData.occupation}</Text>
            }
            value={formData.occupation}
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
            value={formData.annualIncome}
            onChangeText={value => handleChange('annualIncome', value)}
          />
        </View>

        {/* <DocumentPicker
          label="Id Size Photo*"
          file={formData?.idDocument}
          onFileChange={value => setIdDocument(value)}
        />

        <DocumentPicker
          label="PAN Card Photo*"
          file={formData?.panCard}
          onFileChange={value => setPanCard(value)}
        />

        <DocumentPicker
          label="Aadhar Card Photo*"
          file={formData?.aadhaarCard}
          onFileChange={value => setAadhaarCard(value)}
        /> */}

        <Button
          style={styles.formButton}
          textColor="white"
          mode="contained-tonal"
          onPress={handleSubmit}>
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

export default UpdateCustomer;
