// import React, {useState} from 'react';
// import {Alert, StyleSheet, Text, View} from 'react-native';
// import {TextInput, RadioButton, Button} from 'react-native-paper';
// import Dropdown from '../../Common/dropdown/Dropdown.js';
// import CustomDocumentPicker from '../../Common/document-picker/DocumentPicker.js';

// const title = [
//   {label: 'Mr', value: 'mr'},
//   {label: 'Mrs', value: 'mrs'},
//   {label: 'Other', value: 'other'},
// ];

// const education = [
//   {label: '10th', value: '10th'},
//   {label: '12th', value: '12th'},
//   {label: 'Garduate', value: 'garduate'},
//   {label: 'Post Garduate', value: 'post garduate'},
// ];

// const occupation = [
//   {label: 'Farmer', value: 'farmer'},
//   {label: 'Service', value: 'service'},
//   {label: 'Business', value: 'business'},
//   {label: 'Seller', value: 'seller'},
// ];

// const BcaFba = [
//   {label: 'No', value: 'no'},
//   {label: 'Yes', value: 'Yes'},
// ];

// const bank = [
//   {label: 'Bank 1', value: 'bank 1'},
//   {label: 'Bank 2', value: 'bank 2'},
//   {label: 'Bank 3', value: 'bank 3'},
//   {label: 'Bank 4', value: 'bank 4'},
// ];

// const SCPMaster = () => {
//   const [credentials, setCredentials] = useState({
//     title: '',
//     customerName: '',
//     gender: '',
//     recidentialAddress: '',
//     pincode: '',
//     mobileNumber: '',
//     alternativeMobileNumber: '',
//     emailId: '',
//     panNumber: '',
//     adharNumber: '',
//     education: '',
//     occupation: '',
//     pvcCertificateNumber: '',
//     iibfCertificateNumber: '',
//     draCertificateNumber: '',
//     bcsFba: '',
//     bcaBank: '',
//     bankName: '',
//     custIdCifNumber: '',
//     savingAccountNumber: '',
//     settelmentAccountNumber: '',
//     paymentReceivedAmount: '',
//     scpIdSizePhoto: '',
//     aadharCardPhoto: '',
//     panCardPhoto: '',
//     checkbookPassbookPhoto: '',
//     iibfCertificatePhoto: '',
//     pvcCertificatePhoto: '',
//     paymentReceiptPhoto: '',
//     draCertificatePhoto: '',
//   });

//   const handleChange = (name, value) => {
//     setCredentials({
//       ...credentials,
//       [name]: value,
//     });
//   };

//   const handleFormCredential = e => {
//     e.preventDefault();
//     console.log(credentials);
//   };

//   const handleFileChange = file => {
//     setSelectedFile(file);
//   };
//   return (
//     <>
//       <View style={style.container}>
//         <View>
//           <Text style={style.headLine}>Basic Information</Text>
//           <View style={style.formField}>
//             <View style={style.customer}>
//               <View style={style.customerTitleDropdown}>
//                 <Dropdown
//                   label="Title"
//                   options={title}
//                   value={credentials.title}
//                   onChange={text => handleChange('title', text.value)}
//                 />
//               </View>
//               <View style={style.customerNameSection}>
//                 <Text style={style.label}>SCP Name*</Text>
//                 <TextInput
//                   style={style.input}
//                   textColor="black"
//                   inputMode="text"
//                   mode="outlined"
//                   outlineStyle={style.inputOutline}
//                   activeOutlineColor='black'
//                   keyboardType="default"
//                   outlineColor="gray"
//                   name="customerName"
//                   value={credentials.customerName}
//                   onChangeText={text => handleChange('customerName', text)}
//                 />
//               </View>
//             </View>

//             <View>
//               <Text style={style.label}>Gender</Text>
//               <RadioButton.Group
//                 name="gender"
//                 onValueChange={text => handleChange('gender', text)}
//                 value={credentials.gender}>
//                 <View style={style.radioGroup}>
//                   <View style={style.radioOptions}>
//                     <RadioButton color="black" value="male" />
//                     <Text style={style.textBlack}>Male</Text>
//                   </View>
//                   <View style={style.radioOptions}>
//                     <RadioButton color="black" value="female" />
//                     <Text style={style.textBlack}>Female</Text>
//                   </View>
//                   <View style={style.radioOptions}>
//                     <RadioButton color="black" value="other" />
//                     <Text style={style.textBlack}>Other</Text>
//                   </View>
//                 </View>
//               </RadioButton.Group>
//             </View>

//             <View>
//               <Text style={style.label}>Recidensial Address*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="default"
//                 outlineColor="gray"
//                 name="recidentialAddress"
//                 value={credentials.recidentialAddress}
//                 onChangeText={text => handleChange('recidentialAddress', text)}
//               />
//             </View>

//             <View>
//               <Text style={style.label}>Pincode*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="numeric"
//                 outlineColor="gray"
//                 name="pincode"
//                 value={credentials.pincode}
//                 onChangeText={text => handleChange('pincode', text)}
//               />
//             </View>

//             <View>
//               <Text style={style.label}>Mobile No.*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="number-pad"
//                 outlineColor="gray"
//                 name="mobileNumber"
//                 value={credentials.mobileNumber}
//                 onChangeText={text => handleChange('mobileNumber', text)}
//               />
//             </View>

//             <View>
//               <Text style={style.label}>Alternative Mobile No.*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="number-pad"
//                 outlineColor="gray"
//                 name="alternativeMobileNumber"
//                 value={credentials.alternativeMobileNumber}
//                 onChangeText={text =>
//                   handleChange('alternativeMobileNumber', text)
//                 }
//               />
//             </View>

//             <View>
//               <Text style={style.label}>Email Id*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="email-address"
//                 outlineColor="gray"
//                 name="emailId"
//                 value={credentials.emailId}
//                 onChangeText={text => handleChange('emailId', text)}
//               />
//             </View>

//             <View>
//               <Text style={style.label}>Pan No.*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="default"
//                 outlineColor="gray"
//                 name="panNumber"
//                 value={credentials.panNumber}
//                 onChangeText={text => handleChange('panNumber', text)}
//               />
//             </View>

//             <View style={style.mobile}>
//               <Text style={style.label}>Aadhar No.*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="number-pad"
//                 outlineColor="gray"
//                 name="adharNumber"
//                 value={credentials.adharNumber}
//                 onChangeText={text => handleChange('adharNumber', text)}
//               />
//             </View>

//             <View style={style.dropdownGroup}>
//               <View style={style.educationDropdown}>
//                 <Dropdown
//                   label="Education"
//                   options={education}
//                   value={credentials.education}
//                   onChange={text => handleChange('education', text.value)}
//                 />
//               </View>
//               <View style={style.occupationDropdown}>
//                 <Dropdown
//                   label="Ocupation"
//                   options={occupation}
//                   value={credentials.occupation}
//                   onChange={text => handleChange('occupation', text.value)}
//                 />
//               </View>
//             </View>

//             <View>
//               <Text style={style.label}>PVC Certificate No.*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="default"
//                 outlineColor="gray"
//                 name="pvcCertificateNumber"
//                 value={credentials.pvcCertificateNumber}
//                 onChangeText={text =>
//                   handleChange('pvcCertificateNumber', text)
//                 }
//               />
//             </View>

//             <View>
//               <Text style={style.label}>IIBF Certificate No.*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="default"
//                 outlineColor="gray"
//                 name="iibfCertificateNumber"
//                 value={credentials.iibfCertificateNumber}
//                 onChangeText={text =>
//                   handleChange('iibfCertificateNumber', text)
//                 }
//               />
//             </View>

//             <View>
//               <Text style={style.label}>DRA Certificate No.*</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="default"
//                 outlineColor="gray"
//                 name="draCertificateNumber"
//                 value={credentials.draCertificateNumber}
//                 onChangeText={text =>
//                   handleChange('draCertificateNumber', text)
//                 }
//               />
//             </View>

//             <Dropdown
//               label="BCS/FBA"
//               options={BcaFba}
//               value={credentials.bcsFba}
//               onChange={text => handleChange('bcsFba', text.value)}
//             />

//             <View>
//               <Text style={style.label}>BCA Bank</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="default"
//                 outlineColor="gray"
//                 name="bcaBank"
//                 value={credentials.bcaBank}
//                 onChangeText={text => handleChange('bcaBank', text)}
//               />
//             </View>
//           </View>
//         </View>

//         <View style={style.formPaymentDetailsAndDocument}>
//           <Text style={style.headLine}>Bank & Payment Details</Text>

//           <View style={style.formField}>
//             <Dropdown
//               label="Bank Name"
//               options={bank}
//               value={credentials.bankName}
//               onChange={text => handleChange('bankName', text.value)}
//             />

//             <View>
//               <Text style={style.label}>Cust Id/Cif No</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="default"
//                 outlineColor="gray"
//                 name="custIdCifNumber"
//                 value={credentials.custIdCifNumber}
//                 onChangeText={text => handleChange('custIdCifNumber', text)}
//               />
//             </View>

//             <View>
//               <Text style={style.label}>Saving Acc No.</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="number-pad"
//                 outlineColor="gray"
//                 name="savingAccountNumber"
//                 value={credentials.savingAccountNumber}
//                 onChangeText={text => handleChange('savingAccountNumber', text)}
//               />
//             </View>

//             <View>
//               <Text style={style.label}>Settelment Acc No.</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="default"
//                 outlineColor="gray"
//                 name="settelmentAccountNumber"
//                 value={credentials.settelmentAccountNumber}
//                 onChangeText={text =>
//                   handleChange('settelmentAccountNumber', text)
//                 }
//               />
//             </View>

//             <View>
//               <Text style={style.label}>Payment Received Amount</Text>
//               <TextInput
//                 style={style.input}
//                 textColor="black"
//                 inputMode="text"
//                 mode="outlined"
//                 outlineStyle={style.inputOutline}
//                 activeOutlineColor='black'
//                 keyboardType="number-pad"
//                 outlineColor="gray"
//                 name="paymentReceivedAmount"
//                 value={credentials.paymentReceivedAmount}
//                 onChangeText={text =>
//                   handleChange('paymentReceivedAmount', text)
//                 }
//               />
//             </View>
//           </View>
//         </View>

//         <View style={style.formPaymentDetailsAndDocument}>
//           <Text style={style.headLine}>Document Uploading</Text>

//           <View style={style.formField}>
//             <CustomDocumentPicker
//               label="SCP Id Size Photo*"
//               file={credentials.scpIdSizePhoto}
//               onFileChange={value => handleChange('scpIdSizePhoto', value)}
//             />

//             <CustomDocumentPicker
//               label="Aadhar Card Photo*"
//               file={credentials.aadharCardPhoto}
//               onFileChange={value => handleChange('aadharCardPhoto', value)}
//             />

//             <CustomDocumentPicker
//               label="PAN Card Photo*"
//               file={credentials.panCardPhoto}
//               onFileChange={value => handleChange('panCardPhoto', value)}
//             />

//             <CustomDocumentPicker
//               label="Checkbook/Passbook Photo*"
//               file={credentials.checkbookPassbookPhoto}
//               onFileChange={value =>
//                 handleChange('checkbookPassbookPhoto', value)
//               }
//             />

//             <CustomDocumentPicker
//               label="PVC Certificate Photo*"
//               file={credentials.pvcCertificatePhoto}
//               onFileChange={value => handleChange('pvcCertificatePhoto', value)}
//             />

//             <CustomDocumentPicker
//               label="IIBF Certificate Photo*"
//               file={credentials.iibfCertificatePhoto}
//               onFileChange={value =>
//                 handleChange('iibfCertificatePhoto', value)
//               }
//             />

//             <CustomDocumentPicker
//               label="Payment receipt Photo*"
//               file={credentials.paymentReceiptPhoto}
//               onFileChange={value => handleChange('paymentReceiptPhoto', value)}
//             />

//             <CustomDocumentPicker
//               label="DRA Certificate Photo*"
//               file={credentials.draCertificatePhoto}
//               onFileChange={value => handleChange('draCertificatePhoto', value)}
//             />
//           </View>
//         </View>

//         <Button
//           style={style.formButton}
//           textColor="white"
//           mode="contained"
//           onPress={handleFormCredential}>
//           Submit
//         </Button>
//       </View>
//     </>
//   );
// };

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     backgroundColor: '#b2cfb2',
//     padding: 20,
//     rowGap: 15,
//   },

//   formPaymentDetailsAndDocument: {
//     marginTop: 20,
//   },

//   formField: {
//     rowGap: 20,
//     marginTop: 4,
//   },

//   headLine: {
//     fontWeight: '600',
//     fontSize: 18,
//     color: 'black',
//   },

//   dropdown: {
//     height: 45,
//   },

//   customer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     columnGap: 2,
//   },

//   customerTitleDropdown: {
//     width: 100,
//   },

//   customerNameSection: {
//     flex: 2,
//   },

//   label: {
//     fontWeight: '500',
//     fontSize: 14,
//     color: 'black',
//     letterSpacing: -0.5,
//   },

//   input: {
//     height: 45,
//     borderColor: 'gray',
//     fontSize: 18,
//     color: 'black',
//     backgroundColor: 'white',
//     marginTop: 4,
//   },

//   inputOutline: {
//     borderWidth: 1.5,
//   },

//   radioGroup: {
//     justifyContent: 'space-around',
//     gap: 20,
//     flexDirection: 'row',
//   },

//   radioOptions: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     // backgroundColor: "white",
//     // paddingRight: 6,
//     // borderRadius: 4,
//   },

//   marginLeft: {
//     // marginLeft: 10,
//   },

//   elementGroup: {
//     flexDirection: 'row',
//     columnGap: 6,
//   },

//   dropdownGroup: {
//     flexDirection: 'row',
//     columnGap: 5,
//   },

//   educationDropdown: {
//     flex: 1,
//   },

//   occupationDropdown: {
//     flex: 1,
//   },

//   formButton: {
//     backgroundColor: 'green',
//     borderRadius: 4,
//     // marginTop: 10,
//   },
//   // Common
//   textBlack: {color: 'black'},
// });
// export default SCPMaster;
