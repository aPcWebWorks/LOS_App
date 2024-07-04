// import React, {useEffect, useState} from 'react';
// // import RNFetchBlob from 'rn-fetch-blob';
// import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
// import {TextInput, RadioButton, Button, useTheme} from 'react-native-paper';
// import {useDispatch, useSelector} from 'react-redux';
// import {Dropdown} from 'react-native-element-dropdown';
// import CustomDocumentPicker from '../../../Common/document-picker/DocumentPicker.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {addcustomer} from '../../../../features/customer-master/customerMasterThunk.js';

// const title = [
//   {label: 'Mr', value: 'mr'},
//   {label: 'Mrs', value: 'mrs'},
//   {label: 'Other', value: 'other'},
// ];

// const occupation = [
//   {label: 'Farmer', value: 'farmer'},
//   {label: 'Service', value: 'service'},
//   {label: 'Business', value: 'business'},
//   {label: 'Seller', value: 'seller'},
// ];

// // Main Component
// const NewCustomer = ({navigation, id, isOpen, toggle}) => {
//   // commom state.
//   const theme = useTheme();
//   const styles = getStyles(theme);
//   const {userByScpNumber, userByScpDetails} = useSelector(
//     state => state.scpUser,
//   );

//   // console.log('User By Scp Details', userByScpDetails?.scpDetail?.id);
//   // redux toolkit.
//   const dispatch = useDispatch();
//   // const credentials = useSelector(state => state.customer);

//   // component state.
//   const [isFocus, setIsFocus] = useState(false);

//   // const [toggleContent, setToggleContent] = useState(false);
//   const [credentials, setCredentials] = useState({
//     idDocument: null,
//     panCard: null,
//     aadhaarCard: null,
//     customer: {
//       scpNo: '',
//       title: '',
//       customerName: '',
//       gender: '',
//       residentialAddress: '',
//       email: '',
//       pinCode: '',
//       mobileNumber: '',
//       aadhaarNumber: '',
//       panCardNumber: '',
//       occupation: '',
//       annualIncome: '',
//     },
//   });

//   useEffect(() => {
//     scpidHandler();
//   });

//   const handleChange = (name, value) => {
//     if (name === 'idDocument' || name === 'panCard' || name === 'aadhaarCard') {
//       setCredentials(prevState => ({
//         ...prevState,
//         [name]: value,
//       }));
//     } else {
//       setCredentials(prevState => ({
//         ...prevState,
//         customer: {
//           ...prevState.customer,
//           [name]: value,
//         },
//       }));
//     }
//   };

//   async function scpidHandler() {
//     const ID = await AsyncStorage.getItem('userid');
//     credentials.customer.scpNo = ID;
//   }
//   // const handleFormCredential = e => {
//   //   e.preventDefault();
//   //   try {
//   //     const formData = new FormData();
//   //     const customerBlob = new Blob([JSON.stringify(credentials.customer)], {
//   //       type: 'application/json',
//   //     });

//   //     formData.append('idDocument', credentials?.idDocument);
//   //     formData.append('panCard', credentials?.panCard);
//   //     formData.append('aadhaarCard', credentials?.aadhaarCard);
//   //     formData.append('customer', customerBlob._data, 'customer.json');
//   //     // console.log('credentials.idDocument.name', credentials.idDocument.name);
//   //     dispatch(addcustomer(formData._parts));
//   //     // console.log('formData _parts', customerBlob);
//   //     // console.log('formData _parts', customerBlob._data);
//   //     // navigation.navigate('/Customer Master')
//   //   } catch (error) {
//   //     console.log('Error', error);
//   //   }
//   //   console.log('credentials', credentials.customer);
//   // };

//   const handleFormCredential = e => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       const blob = new Blob([JSON.stringify(credentials.customer)], {
//         type: 'application/json',
//       });

//       formData.append('idDocument', credentials?.idDocument);
//       formData.append('panCard', credentials?.panCard);
//       formData.append('aadhaarCard', credentials?.aadhaarCard);
//       formData.append('customer', blob, 'customer.json');

//       dispatch(addcustomer(formData));
//     } catch (error) {
//       console.log('Error', error);
//     }
//     // console.log('credentials', credentials.customer);
//   };

//   // const handleFilterChange = filter => {
//   //   setSelectedFilter(filter);
//   //   setSearchQuery('');
//   // };

//   // const ToggleContentHandler = () => {
//   //   setToggleContent(!toggleContent);
//   // };

//   return (
//     <>
//       <SafeAreaView style={styles.container}>
//         <View style={styles.scpId}>
//           <Text style={styles.label}>SCP Number : </Text>
//           <Text style={{color: 'black'}}>
//             {userByScpNumber?.scpDetail?.scpNo}
//           </Text>
//         </View>

//         <View style={styles.customerTitle}>
//           <View>
//             {/* <Dropdown
//               labelDisplay={true}
//               label="Title"
//               options={title}
//               value={credentials?.customer?.title}
//               onChange={value => handleChange('title', value?.value)}
//             /> */}

//             <Text style={styles.label}>Title</Text>
//             <Dropdown
//               style={[
//                 styles.dropdown,
//                 {width: 100},
//                 isFocus && {borderColor: 'black'},
//               ]}
//               data={title}
//               mode="default"
//               labelField="label"
//               valueField="value"
//               placeholder={<Text style={{color: 'black'}}>Select</Text>}
//               value={credentials?.customer?.title}
//               onFocus={() => setIsFocus(true)}
//               onBlur={() => setIsFocus(false)}
//               onChange={value => handleChange('title', value?.value)}
//               iconColor="black"
//             />
//           </View>
//           <View style={styles.customerName}>
//             <Text style={styles.label}>Customer Name*</Text>
//             <TextInput
//               style={styles.input}
//               textColor="black"
//               inputMode="text"
//               mode="outlined"
//               outlineStyle={styles.inputOutline}
//               activeOutlineColor="black"
//               keyboardType="default"
//               outlineColor="gray"
//               name="customerName"
//               value={credentials?.customer?.customerName}
//               onChangeText={value => handleChange('customerName', value)}
//             />
//           </View>
//         </View>

//         <View>
//           <Text style={styles.label}>Gender</Text>
//           <RadioButton.Group
//             name="gender"
//             onValueChange={value => handleChange('gender', value)}
//             value={credentials?.customer?.gender}>
//             <View style={styles.radioGroup}>
//               <View style={[styles.radioOptions, styles.marginLeft]}>
//                 <RadioButton color="black" value="male" />
//                 <Text style={styles.textBlack}>Male</Text>
//               </View>
//               <View style={styles.radioOptions}>
//                 <RadioButton color="black" value="female" />
//                 <Text style={styles.textBlack}>Female</Text>
//               </View>
//               <View style={styles.radioOptions}>
//                 <RadioButton color="black" value="other" />
//                 <Text style={styles.textBlack}>Other</Text>
//               </View>
//             </View>
//           </RadioButton.Group>
//         </View>

//         <View>
//           <Text style={styles.label}>Recidential Address*</Text>
//           <TextInput
//             style={styles.inputMultiline}
//             multiline={true}
//             numberOfLines={3}
//             autoFocus={false}
//             textColor="black"
//             inputMode="text"
//             mode="outlined"
//             outlineStyle={styles.inputOutline}
//             activeOutlineColor="black"
//             keyboardType="default"
//             outlineColor="gray"
//             name="recidentialAddress"
//             value={credentials?.customer?.recidentialAddress}
//             onChangeText={value => handleChange('recidentialAddress', value)}
//             cursorColor="black"
//           />
//         </View>

//         <View>
//           <Text style={styles.label}>Email Id*</Text>
//           <TextInput
//             style={styles.input}
//             inputMode="email"
//             mode="outlined"
//             keyboardType="email-address"
//             textColor="black"
//             outlineStyle={styles.inputOutline}
//             activeOutlineColor="black"
//             outlineColor="gray"
//             name="email"
//             value={credentials?.customer?.email}
//             onChangeText={value => handleChange('email', value)}
//           />
//         </View>

//         <View style={styles.elementGroup}>
//           <View style={styles.pincode}>
//             <Text style={styles.label}>Pincode*</Text>
//             <TextInput
//               style={styles.input}
//               textColor="black"
//               inputMode="numeric"
//               mode="outlined"
//               outlineStyle={styles.inputOutline}
//               activeOutlineColor="black"
//               keyboardType="email-address"
//               outlineColor="gray"
//               name="pinCode"
//               value={credentials?.customer?.pinCode}
//               onChangeText={value => handleChange('pinCode', value)}
//             />
//           </View>

//           <View style={styles.mobile}>
//             <Text style={styles.label}>Mobile No.*</Text>
//             <TextInput
//               style={styles.input}
//               textColor="black"
//               inputMode="tel"
//               mode="outlined"
//               outlineStyle={styles.inputOutline}
//               activeOutlineColor="black"
//               keyboardType="email-address"
//               outlineColor="gray"
//               name="mobileNumber"
//               value={credentials?.customer?.mobileNumber}
//               onChangeText={value => handleChange('mobileNumber', value)}
//             />
//           </View>
//         </View>

//         <View>
//           <Text style={styles.label}>Aadhar No.*</Text>
//           <TextInput
//             style={styles.input}
//             textColor="black"
//             inputMode="numeric"
//             mode="outlined"
//             outlineStyle={styles.inputOutline}
//             activeOutlineColor="black"
//             keyboardType="email-address"
//             outlineColor="gray"
//             name="aadhaarNumber"
//             value={credentials?.customer?.aadhaarNumber}
//             onChangeText={value => handleChange('aadhaarNumber', value)}
//           />
//         </View>

//         <View>
//           <Text style={styles.label}>PAN No.*</Text>
//           <TextInput
//             style={styles.input}
//             textColor="black"
//             inputMode="text"
//             mode="outlined"
//             outlineStyle={styles.inputOutline}
//             activeOutlineColor="black"
//             keyboardType="default"
//             outlineColor="gray"
//             name="panCardNumber"
//             value={credentials?.customer?.panCardNumber}
//             onChangeText={value => handleChange('panCardNumber', value)}
//           />
//         </View>

//         <View>
//           <Text style={styles.label}>Occupation</Text>
//           <Dropdown
//             style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
//             data={occupation}
//             mode="default"
//             labelField="label"
//             valueField="value"
//             placeholder={<Text style={{color: 'black'}}>Select</Text>}
//             value={credentials?.customer?.occupation}
//             onFocus={() => setIsFocus(true)}
//             onBlur={() => setIsFocus(false)}
//             onChange={value => handleChange('occupation', value?.value)}
//             iconColor="black"
//           />
//         </View>

//         <View>
//           <Text style={styles.label}>Annual Income</Text>
//           <TextInput
//             style={styles.input}
//             textColor="black"
//             inputMode="text"
//             mode="outlined"
//             outlineStyle={styles.inputOutline}
//             activeOutlineColor="black"
//             keyboardType="default"
//             outlineColor="gray"
//             name="annualIncome"
//             value={credentials?.customer?.annualIncome}
//             onChangeText={value => handleChange('annualIncome', value)}
//           />
//         </View>

//         <CustomDocumentPicker
//           label="Id Size Photo*"
//           file={credentials?.idDocument}
//           onFileChange={value => handleChange('idDocument', value)}
//         />

//         <CustomDocumentPicker
//           label="PAN Card Photo*"
//           file={credentials?.panCard}
//           onFileChange={value => handleChange('panCard', value)}
//         />

//         <CustomDocumentPicker
//           label="Aadhar Card Photo*"
//           file={credentials?.aadhaarCard}
//           onFileChange={value => handleChange('aadhaarCard', value)}
//         />

//         <Button
//           style={styles.formButton}
//           textColor="white"
//           mode="contained-tonal"
//           onPress={handleFormCredential}>
//           Submit
//         </Button>
//       </SafeAreaView>
//     </>
//   );
// };

// function getStyles(theme) {
//   return StyleSheet.create({
//     container: {
//       flex: 1,
//       rowGap: 14,
//       marginTop: 4,
//     },

//     scpId: {
//       flexDirection: 'row',
//       justifyContent: 'center',
//       paddingVertical: 20,
//     },

//     customerTitle: {
//       flexDirection: 'row',
//       columnGap: 4,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },

//     dropdown: {
//       borderWidth: 1.5,
//       height: 45,
//       borderColor: 'gray',
//       fontSize: 18,
//       color: 'black',
//       marginTop: 4,
//       borderRadius: 4,
//       backgroundColor: 'white',
//     },

//     customerName: {
//       flex: 2.5,
//     },

//     label: {
//       fontWeight: '500',
//       fontSize: 14,
//       color: 'black',
//       letterSpacing: -0.5,
//     },

//     input: {
//       height: 45,
//       borderColor: 'gray',
//       fontSize: 18,
//       color: 'black',
//       backgroundColor: 'white',
//       marginTop: 4,
//     },

//     inputMultiline: {
//       borderColor: 'gray',
//       fontSize: 18,
//       color: 'black',
//       backgroundColor: 'white',
//       marginTop: 4,
//       paddingVertical: 8,
//     },

//     inputOutline: {
//       borderWidth: 1.5,
//     },

//     elementGroup: {
//       flexDirection: 'row',
//       columnGap: 6,
//     },

//     radioGroup: {
//       justifyContent: 'flex-start',
//       gap: 20,
//       flexDirection: 'row',
//       paddingTop: 5,
//       paddingBottom: 10,
//     },

//     marginLeft: {
//       marginLeft: 10,
//     },

//     radioOptions: {
//       alignItems: 'center',
//       flexDirection: 'row',
//     },

//     pincode: {
//       flexDirection: 'column',
//       flex: 1,
//     },

//     mobile: {
//       flexDirection: 'column',
//       flex: 1,
//     },

//     formButton: {
//       backgroundColor: 'green',
//       borderRadius: 4,
//     },
//     // Common
//     textBlack: {color: 'black'},
//   });
// }

// export default NewCustomer;

import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Alert} from 'react-native';
import {TextInput, RadioButton, Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import CustomDocumentPicker from '../../../Common/document-picker/DocumentPicker.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addcustomer} from '../../../../features/customer-master/customerMasterThunk.js';

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

const FormData = global.FormData;

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  customer: Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number')
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
});

// Main Component
const NewCustomer = ({navigation, id, isOpen, toggle}) => {
  const theme = useTheme();
  const styles = getStyles(theme);
  const {userByScpNumber, userByScpDetails} = useSelector(
    state => state.scpUser,
  );
  // const dispatch = useDispatch();

  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    scpidHandler();
  });

  const scpidHandler = async () => {
    const ID = await AsyncStorage.getItem('userid');
    // setFieldValue('customer.scpNo', ID);
  };

  const handleFormCredential = (values, {resetForm}) => {
    // const formData = new FormData();
    // const blob = new Blob([JSON.stringify(values.customer)], {
    //   type: 'application/json',
    // });

    // formData.append('idDocument', values?.idDocument);
    // formData.append('panCard', values?.panCard);
    // formData.append('aadhaarCard', values?.aadhaarCard);
    // formData.append('customer', blob, 'customer.json');

    // dispatch(addcustomer(formData));

    // resetForm();

    // // Log the form data to console
    // console.log('Form Data:', values);

    // // Optionally, show an alert or navigate to another screen
    // Alert.alert(
    //   'Form Submitted',
    //   'Customer data has been submitted successfully.',
    // );

    console.log("customer values", values)
  };

  return (
    <Formik
      initialValues={{
        customer: {
          scpNo: '',
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
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormCredential}>
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
            <Text style={{color: 'black'}}>
              {userByScpNumber?.scpDetail?.scpNo}
            </Text>
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
                placeholder={<Text style={{color: 'black'}}>Select</Text>}
                value={values.customer.title}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={value => setFieldValue('customer.title', value.value)}
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
              style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
              data={occupation}
              mode="default"
              labelField="label"
              valueField="value"
              placeholder={<Text style={{color: 'black'}}>Select</Text>}
              value={values.customer.occupation}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={value =>
                setFieldValue('customer.occupation', value.value)
              }
              iconColor="black"
            />
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
              keyboardType="numeric"
              outlineColor="gray"
              name="annualIncome"
              value={values.customer.annualIncome}
              onChangeText={handleChange('customer.annualIncome')}
            />
          </View>

          <CustomDocumentPicker
            label="Id Size Photo*"
            file={values.idDocument}
            onFileChange={value => setFieldValue('idDocument', value)}
          />

          <CustomDocumentPicker
            label="PAN Card Photo*"
            file={values.panCard}
            onFileChange={value => setFieldValue('panCard', value)}
          />

          <CustomDocumentPicker
            label="Aadhar Card Photo*"
            file={values.aadhaarCard}
            onFileChange={value => setFieldValue('aadhaarCard', value)}
          />

          <Button
            style={styles.submitButton}
            mode="contained"
            buttonColor="green"
            onPress={handleSubmit}>
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
