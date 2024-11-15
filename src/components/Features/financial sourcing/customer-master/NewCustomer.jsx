import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {TextInput, RadioButton, Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import DocumentPicker from '../../../Common/document-picker/DocumentPicker.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addcustomer} from '../../../../features/customer-master/customerMasterThunk.js';

const titleOptions = [
  {label: 'Mr', value: 'mr'},
  {label: 'Mrs', value: 'mrs'},
  {label: 'Other', value: 'other'},
];

const occupationOptions = [
  {label: 'Farmer', value: 'farmer'},
  {label: 'Service', value: 'service'},
  {label: 'Business', value: 'business'},
  {label: 'Seller', value: 'seller'},
];

const validationSchema = Yup.object().shape({
  customer: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    mobileNumber: Yup.number()
      .typeError('Mobile number must be a number')
      .integer('Mobile number must be a valid number')
      .positive('Mobile number must be a positive number')
      .test(
        'len',
        'Mobile number must be exactly 10 digits',
        val => val && val.toString().length === 10,
      )
      .required('Mobile number is required'),
    aadhaarNumber: Yup.string()
      .matches(/^[0-9]{12}$/, 'Please enter a valid 12-digit Aadhaar number')
      .required('Aadhaar number is required'),
    panCardNumber: Yup.string()
      .matches(
        /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
        'Please enter a valid PAN card number in uppercase',
      )
      .required('PAN card number is required'),
    customerName: Yup.string()
      .required('Customer name is required')
      .matches(
        /^[a-zA-Z\s]+$/,
        'Customer name should contain only letters and spaces',
      ),
    pinCode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode')
      .required('Pincode is required'),
  }),
  documents: Yup.object().shape({
    idDocument: Yup.mixed().required('Id document is required'),
    panCard: Yup.mixed().required('PAN card is required'),
    aadhaarCard: Yup.mixed().required('Aadhar card is required'),
  }),
});

const NewCustomer = () => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {loginId} = user.data || {};

  const [isTitleFocus, setIsTitleFocus] = useState(false);
  const [isOccupationFocus, SetIsOccupationFocus] = useState(false);

  const [formValues, setFormValues] = useState({
    customer: {
      scpId: '',
      title: '',
      customerName: '',
      gender: '',
      residentialAddress: '',
      email: '',
      pinCode: '',
      mobileNumber: '',
      aadhaarNumber: '',
      panCardNumber: '',
      occupation: '',
      annualIncome: '',
    },
    documents: {
      idDocument: null,
      panCard: null,
      aadhaarCard: null,
    },
  });

  useEffect(() => {
    const handleSCP = async () => {
      const scpId = await AsyncStorage.getItem('scpId');

      if (scpId) {
        setFormValues(prevValues => ({
          ...prevValues,
          customer: {
            ...prevValues.customer,
            scpId,
          },
        }));
      }
    };

    handleSCP();
  }, []);

  const logFormData = formData => {
    const entries = Array.from(formData.entries());
    entries.forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
  };
  return (
    <Formik
      initialValues={formValues}
      enableReinitialize
      // validationSchema={validationSchema}
      onSubmit={async (values, {resetForm}) => {
        const token = await AsyncStorage.getItem('token');

        try {
          const payload = {
            ...values.customer,
            pinCode: parseInt(values.customer.pinCode),
            mobileNumber: parseInt(values.customer.mobileNumber),
            aadhaarNumber: parseInt(values.customer.aadhaarNumber),
            annualIncome: parseInt(values.customer.annualIncome),
          };

          const myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${token}`);

          const formdata = new FormData();
          formdata.append('customer', JSON.stringify(payload));
          formdata.append('idDocument', {
            uri: values.documents.idDocument.uri,
            name: values.documents.idDocument.name,
            type: values.documents.idDocument.type,
          });
          formdata.append('panCard', {
            uri: values.documents.panCard.uri,
            name: values.documents.panCard.name,
            type: values.documents.panCard.type,
          });
          formdata.append('aadhaarCard', {
            uri: values.documents.aadhaarCard.uri,
            name: values.documents.aadhaarCard.name,
            type: values.documents.aadhaarCard.type,
          });


          try {
            fetch('http://192.168.29.113:8589/api/v1/los/customer', {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow',
            })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error('Error:', error));
          } catch (error) {
            console.error('Error uploading files:', error);
          }
        } catch (err) {
          console.log('Form submit error:', err);
        } finally {
          // resetForm();
        }
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        touched,
      }) => (
        <SafeAreaView style={styles.container}>
          <View style={styles.scpId}>
            <Text style={styles.label}>SCP Number : </Text>
            <Text style={{color: 'black'}}>{loginId}</Text>
          </View>

          <View style={styles.customerTitle}>
            <View style={styles.titleDropdown}>
              <Text style={styles.label}>Title</Text>
              <Dropdown
                style={[
                  styles.dropdown,
                  isTitleFocus && {borderColor: 'black'},
                ]}
                data={titleOptions}
                mode="default"
                labelField="label"
                valueField="value"
                placeholder={
                  <Text style={{color: 'black', fontSize: 14}}>Choose</Text>
                }
                name="title"
                value={values.customer.title}
                onFocus={() => setIsTitleFocus(true)}
                onBlur={() => {
                  handleBlur('customer.title');
                  setIsTitleFocus(false);
                }}
                onChange={item => {
                  setFieldValue('customer.title', item.value);
                  setIsTitleFocus(false);
                }}
                renderRightIcon={() => (
                  <Icon name="keyboard-arrow-down" size={20} color="#000" />
                )}
              />
              {errors.customer?.title && touched.customer?.title ? (
                <Text style={styles.errorText}>{errors.customer.title}</Text>
              ) : null}
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
                value={values.customer.customerName}
                onChangeText={handleChange('customer.customerName')}
                onBlur={handleBlur('customer.customerName')}
              />
              {errors.customer?.customerName &&
              touched.customer?.customerName ? (
                <Text style={styles.errorText}>
                  {errors.customer.customerName}
                </Text>
              ) : null}
            </View>
          </View>

          <View>
            <Text style={styles.label}>Gender</Text>
            <RadioButton.Group
              name="gender"
              onValueChange={value => setFieldValue('customer.gender', value)}
              value={values.customer.gender}>
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
              value={values.customer.residentialAddress}
              onChangeText={handleChange('customer.residentialAddress')}
              cursorColor="black"
            />
            {errors.customer?.residentialAddress &&
            touched.customer?.residentialAddress ? (
              <Text style={styles.errorText}>
                {errors.customer.residentialAddress}
              </Text>
            ) : null}
          </View>

          <View>
            <Text style={styles.label}>Email Id*</Text>
            <TextInput
              style={styles.input}
              inputMode="email"
              mode="outlined"
              keyboardType="default"
              textColor="black"
              outlineStyle={styles.inputOutline}
              activeOutlineColor="black"
              outlineColor="gray"
              name="email"
              value={values.customer.email}
              onChangeText={handleChange('customer.email')}
              onBlur={handleBlur('customer.email')}
            />
            {errors.customer?.email && touched.customer?.email ? (
              <Text style={styles.errorText}>{errors.customer.email}</Text>
            ) : null}
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
                keyboardType="numeric"
                outlineColor="gray"
                name="pinCode"
                value={values.customer.pinCode}
                onChangeText={handleChange('customer.pinCode')}
                onBlur={handleBlur('customer.pinCode')}
              />
              {errors.customer?.pinCode && touched.customer?.pinCode ? (
                <Text style={styles.errorText}>{errors.customer.pinCode}</Text>
              ) : null}
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
                keyboardType="phone-pad"
                outlineColor="gray"
                name="mobileNumber"
                value={values.customer.mobileNumber}
                onChangeText={handleChange('customer.mobileNumber')}
                onBlur={handleBlur('customer.mobileNumber')}
              />
              {errors.customer?.mobileNumber &&
              touched.customer?.mobileNumber ? (
                <Text style={styles.errorText}>
                  {errors.customer.mobileNumber}
                </Text>
              ) : null}
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
              keyboardType="numeric"
              outlineColor="gray"
              name="aadhaarNumber"
              value={values.customer.aadhaarNumber}
              onChangeText={handleChange('customer.aadhaarNumber')}
              onBlur={handleBlur('customer.aadhaarNumber')}
            />
            {errors.customer?.aadhaarNumber &&
            touched.customer?.aadhaarNumber ? (
              <Text style={styles.errorText}>
                {errors.customer.aadhaarNumber}
              </Text>
            ) : null}
          </View>

          <View>
            <Text style={styles.label}>Pan No.*</Text>
            <TextInput
              style={styles.input}
              textColor="black"
              mode="outlined"
              outlineStyle={styles.inputOutline}
              activeOutlineColor="black"
              outlineColor="gray"
              name="panCardNumber"
              keyboardType="default"
              value={values.customer.panCardNumber}
              onChangeText={handleChange('customer.panCardNumber')}
              onBlur={handleBlur('customer.panCardNumber')}
            />
            {errors.customer?.panCardNumber &&
            touched.customer?.panCardNumber ? (
              <Text style={styles.errorText}>
                {errors.customer.panCardNumber}
              </Text>
            ) : null}
          </View>

          <View>
            <Text style={styles.label}>Occupation</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isOccupationFocus && {borderColor: 'black'},
              ]}
              data={occupationOptions}
              mode="default"
              labelField="label"
              valueField="value"
              placeholder={
                <Text style={{color: 'black', fontSize: 14}}>Choose</Text>
              }
              value={values.customer.title}
              onFocus={() => SetIsOccupationFocus(true)}
              onBlur={() => {
                handleBlur('customer.occupation');
                SetIsOccupationFocus(false);
              }}
              onChange={item => {
                setFieldValue('customer.occupation', item.value);
                SetIsOccupationFocus(false);
              }}
              renderRightIcon={() => (
                <Icon name="keyboard-arrow-down" size={20} color="#000" />
              )}
            />
            {errors.customer?.title && touched.customer?.title ? (
              <Text style={styles.errorText}>{errors.customer.title}</Text>
            ) : null}
          </View>

          <View>
            <Text style={styles.label}>Annual Income</Text>
            <TextInput
              style={styles.input}
              textColor="black"
              inputMode="numeric"
              mode="outlined"
              outlineStyle={styles.inputOutline}
              activeOutlineColor="black"
              keyboardType="default"
              outlineColor="gray"
              name="annualIncome"
              value={values.customer.annualIncome}
              onChangeText={handleChange('customer.annualIncome')}
            />
            {errors.customer?.title && touched.customer?.title ? (
              <Text style={styles.errorText}>{errors.customer.title}</Text>
            ) : null}
          </View>

          <DocumentPicker
            label="Id Size Photo*"
            file={values.documents.idDocument}
            onFileChange={value => setFieldValue('documents.idDocument', value)}
          />
          {errors.documents?.idDocument && touched.documents?.idDocument && (
            <Text style={styles.errorText}>{errors.documents.idDocument}</Text>
          )}

          <DocumentPicker
            label="PAN Card Photo*"
            file={values.documents.panCard}
            onFileChange={value => setFieldValue('documents.panCard', value)}
          />
          {errors.documents?.panCard && touched.documents?.panCard && (
            <Text style={styles.errorText}>{errors.documents.panCard}</Text>
          )}

          <DocumentPicker
            label="Aadhar Card Photo*"
            file={values.documents.aadhaarCard}
            onFileChange={value =>
              setFieldValue('documents.aadhaarCard', value)
            }
          />
          {errors?.documents?.aadhaarCard &&
            touched?.documents?.aadhaarCard && (
              <Text style={styles.errorText}>
                {errors.documents.aadhaarCard}
              </Text>
            )}

          <Button mode="contained" buttonColor="green" onPress={handleSubmit}>
            Submit
          </Button>
        </SafeAreaView>
      )}
    </Formik>
  );
};

const getStyles = theme =>
  StyleSheet.create({
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

    titleDropdown: {
      flexDirection: 'column',
      columnGap: 4,
      width: 100,
    },

    dropdown: {
      maxHeight: 45,
      minHeight: 45,
      borderColor: 'gray',
      borderWidth: 1.5,
      borderRadius: 4,
      backgroundColor: 'white',
      fontSize: 14,
      color: 'black',
      padding: 5,
      paddingLeft: 8,
      paddingHorizontal: 8,
      marginTop: 4,
    },

    customerName: {
      flex: 2.5,
    },

    label: {
      fontWeight: '400',
      fontSize: 14,
      color: '#000',
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
    errorText: {
      position: 'absolute',
      top: 65,
      fontSize: 12,
      color: 'red',
      marginTop: 4,
    },
    // Common
    textBlack: {color: 'black'},
  });

export default NewCustomer;
