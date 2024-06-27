// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   ScrollView,
// } from 'react-native';
// import {useDispatch, useSelector} from 'react-redux';
// import {Button} from 'react-native-paper';
// import {Dropdown} from 'react-native-element-dropdown';
// import {getCustomerWithId} from '../../../features/customer-master/customerMasterThunk';

// const LoanGenerationScreen = ({navigation, route}) => {
//   const dispatch = useDispatch();
//   const {id} = route.params;
//   const {userByScpNumber} = useSelector(state => state.scpUser);
//   const {customer, isLoading} = useSelector(state => state.getCustomerById);
//   const [selectQuery, setSelectQuery] = useState('');

//   const [obj, setObj] = useState([]);
//   const [image, setImage] = useState([]);

//   useEffect(() => {
//     dispatch(getCustomerWithId(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     if (customer) {
//       const objData = [
//         {key: 'SCP No.   :', value: userByScpNumber?.scpDetail?.scpNo},
//         {
//           key: 'Customer Name  :',
//           value: `${customer.title}. ${customer.customerName}`,
//         },
//         {key: 'Gender:', value: customer.gender},
//         {key: 'Address:', value: customer.residentialAddress},
//         {key: 'Pincode:', value: customer.pinCode},
//         {key: 'E-Mail ID :', value: customer.email},
//         {key: 'Mobile:', value: customer.mobileNumber},
//         {key: 'PAN No. :', value: customer.panCardNumber},
//         {key: 'Aadhar No.:', value: customer.aadhaarNumber},
//         {key: 'Occupation :', value: customer.occupation},
//       ];
//       setObj(objData);

//       const imageData = [
//         {key: 'ID Photo :', value: customer.idDocument},
//         {key: 'PAN Photo :', value: customer.panCard},
//         {key: 'Aadhar Photo :', value: customer.aadhaarCard},
//       ];
//       setImage(imageData);
//     }
//   }, [customer, userByScpNumber]);

//   const handleStack = () => {
//     // Handle submit logic
//   };

//   const handleCancel = () => {
//     navigation.navigate('Searched Customer');
//   };

//   return (
//     <>
//       <SafeAreaView style={styles.container}>
//         {isLoading ? (
//           <>
//             <ActivityIndicator
//               size="large"
//               color="green"
//               style={styles.loadingIndicator}
//             />
//           </>
//         ) : (
//           <>
//             <ScrollView style={styles.scrollView}>
//               <FlatList
//                 scrollEnabled={false}
//                 data={obj.concat(image)}
//                 renderItem={({item}) => (
//                   <View style={styles.itemContainer}>
//                     <Text style={styles.label}>{item.key}</Text>
//                     {item.key.startsWith('Photo') ? (
//                       <Image
//                         source={{uri: `file:///${item.value}`}}
//                         style={styles.photo}
//                       />
//                     ) : (
//                       <Text style={styles.textValue}>{item.value}</Text>
//                     )}
//                   </View>
//                 )}
//                 keyExtractor={(item, index) => `${item.key}-${index}`}
//               />

//               <View style={styles.dropdownGroup}>
//                 <Dropdown
//                   style={styles.dropdown}
//                   data={[
//                     {label: 'Name', value: 'name'},
//                     {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
//                     {label: 'Customer ID', value: 'customerid'},
//                   ]}
//                   mode="default"
//                   labelField="label"
//                   valueField="value"
//                   placeholder={
//                     <Text style={{color: 'black'}}>Select Customer</Text>
//                   }
//                   // value={credentials?.customer?.occupation}
//                   // onFocus={() => setIsFocus(true)}
//                   // onBlur={() => setIsFocus(false)}
//                   onChange={setSelectQuery}
//                   iconColor="black"
//                 />
//                 {/* <View style={{marginTop: 10}} /> */}
//                 <Dropdown
//                   style={styles.dropdown}
//                   data={[
//                     {label: 'Name', value: 'name'},
//                     {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
//                     {label: 'Customer ID', value: 'customerid'},
//                   ]}
//                   mode="default"
//                   labelField="label"
//                   valueField="value"
//                   placeholder={
//                     <Text style={{color: 'black'}}>Select Customer</Text>
//                   }
//                   // value={credentials?.customer?.occupation}
//                   // onFocus={() => setIsFocus(true)}
//                   // onBlur={() => setIsFocus(false)}
//                   onChange={setSelectQuery}
//                   iconColor="black"
//                 />
//                 {/* <View style={{marginTop: 10}} /> */}
//                 <Dropdown
//                   style={styles.dropdown}
//                   data={[
//                     {label: 'Name', value: 'name'},
//                     {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
//                     {label: 'Customer ID', value: 'customerid'},
//                   ]}
//                   mode="default"
//                   labelField="label"
//                   valueField="value"
//                   placeholder={
//                     <Text style={{color: 'black'}}>Select Customer</Text>
//                   }
//                   // value={credentials?.customer?.occupation}
//                   // onFocus={() => setIsFocus(true)}
//                   // onBlur={() => setIsFocus(false)}
//                   onChange={setSelectQuery}
//                   iconColor="black"
//                 />
//                 {/* <View style={{marginTop: 10}} /> */}
//                 <Dropdown
//                   style={styles.dropdown}
//                   data={[
//                     {label: 'Name', value: 'name'},
//                     {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
//                     {label: 'Customer ID', value: 'customerid'},
//                   ]}
//                   mode="default"
//                   labelField="label"
//                   valueField="value"
//                   placeholder={
//                     <Text style={{color: 'black'}}>Select Customer</Text>
//                   }
//                   // value={credentials?.customer?.occupation}
//                   // onFocus={() => setIsFocus(true)}
//                   // onBlur={() => setIsFocus(false)}
//                   onChange={setSelectQuery}
//                   iconColor="black"
//                 />
//               </View>

//               <View style={styles.buttonGroup}>
//                 <Button
//                   style={styles.button}
//                   mode="contained"
//                   onPress={handleStack}>
//                   <Text>Submit</Text>
//                 </Button>

//                 <Button
//                   style={styles.button}
//                   mode="contained"
//                   onPress={handleCancel}>
//                   <Text>Cancel</Text>
//                 </Button>
//               </View>
//             </ScrollView>
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
//   },
//   scrollView: {
//     padding: 10,
//   },

//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: '#f0f0f0',
//     // backgroundColor: '#ecf9ec',
//     borderRadius: 8,
//   },
//   label: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     flex: 1,
//     color: 'black',
//   },
//   textValue: {
//     fontSize: 16,
//     flex: 2,
//     marginLeft: 10,
//     color: 'black',
//   },
//   photo: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   dropdownGroup: {
//     marginTop: 20,
//     rowGap: 10,
//   },
//   dropdown: {
//     height: 55,
//     fontSize: 18,
//     color: 'black',
//     backgroundColor: '#ecf9ec',
//   },
//   buttonGroup: {
//     flex: 1,
//     marginTop: 40,
//     rowGap: 10,
//     marginBottom: 20,
//   },
//   button: {
//     height: 45,
//     borderRadius: 0,
//     backgroundColor: 'green',
//   },
//   loadingIndicator: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });

// export default LoanGenerationScreen;

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
import {resetDocumentState} from '../../../features/documents/documentSlice';
import documentHandler from '../../../features/documents/documentThunk';

const LoanGenerationScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {selectedCustomer} = route.params;
  const {userByScpNumber} = useSelector(state => state.scpUser);
  const {isLoading} = useSelector(state => state.getCustomerById);
  const {document} = useSelector(state => state.document);
  const [selectQuery, setSelectQuery] = useState('');

  const [obj, setObj] = useState([]);
  const [image, setImage] = useState([]);
  const [fetchedDocuments, setFetchedDocuments] = useState([]);

  let uri;

  useEffect(() => {
    getDocumentHandler(selectedCustomer.documents);
  }, []);

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
        {key: 'ID Photo :', value: fetchedDocuments[0]},
        {key: 'PAN Photo :', value: fetchedDocuments[1]},
        {key: 'Aadhar Photo :', value: fetchedDocuments[2]},
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
    for (let i = 0; i < docs.length; i++) {
      await dispatch(documentHandler(docs[i].id));
    }
    dispatch(resetDocumentState());
    return;
  };

  useEffect(() => {
    if (document) {
      setFetchedDocuments(prevDocs => [...prevDocs, document]);
    }
  }, [document]);

  const handleStack = () => {
    // Handle submit logic
    // console.log('fetchedDocuments', fetchedDocuments);
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

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Image,
//   ActivityIndicator,
//   ScrollView,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'react-native-paper';
// import { Dropdown } from 'react-native-element-dropdown';
// import { getCustomerWithId } from '../../../features/customer-master/customerMasterThunk';
// import documentHandler from '../../../features/documents/documentThunk';

// const LoanGenerationScreen = ({ navigation, route }) => {
//   const dispatch = useDispatch();
//   const { selectedCustomer } = route.params;
//   const { userByScpNumber } = useSelector(state => state.scpUser);
//   const { isLoading } = useSelector(state => state.getCustomerById);
//   const { document } = useSelector(state => state.document);
//   const [selectQuery, setSelectQuery] = useState('');

//   const [obj, setObj] = useState([]);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     getDocumentHandler();
//   }, []);

//   useEffect(() => {
//     if (selectedCustomer) {
//       const objData = [
//         { key: 'SCP No.', value: userByScpNumber?.scpDetail?.scpNo },
//         {
//           key: 'Customer Name',
//           value: `${selectedCustomer?.title}. ${selectedCustomer?.customerName}`,
//         },
//         { key: 'Gender', value: selectedCustomer?.gender },
//         { key: 'Address', value: selectedCustomer?.residentialAddress },
//         { key: 'Pincode', value: selectedCustomer?.pinCode },
//         { key: 'E-Mail ID', value: selectedCustomer?.email },
//         { key: 'Mobile', value: selectedCustomer?.mobileNumber },
//         { key: 'PAN No.', value: selectedCustomer?.panCardNumber },
//         { key: 'Aadhar No.', value: selectedCustomer?.aadhaarNumber },
//         { key: 'Occupation ', value: selectedCustomer?.occupation },
//         {key: 'ID Photo ', value: selectedCustomer?.idDocument},
//         {key: 'PAN Photo ', value: selectedCustomer?.idDocument},
//        {key: 'Aadhar Photo ', value: selectedCustomer?.idDocument},
//       ];
//       setObj(objData);
//     }
//   }, [selectedCustomer, userByScpNumber]);

//   const getDocumentHandler = async () => {
//     if (selectedCustomer?.documents?.length) {
//       const documentData = await Promise.all(
//         selectedCustomer.documents.map(async doc => {
//           const response = await dispatch(documentHandler(doc.id));
//           if (response.payload) {
//             // Convert ArrayBuffer or ArrayBufferView to base64 string
//             const base64String = arrayBufferToBase64(response.payload);
//             return { key: `${doc.type} Photo`, value: base64String };
//           }
//           return null;
//         })
//       );
//       setImages(documentData.filter(item => item !== null));
//     }
//   };

//   // Function to convert ArrayBuffer or ArrayBufferView to base64 string
//   const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//       binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
//   };

//   const handleStack = () => {
//     // Handle submit logic
//   };

//   const handleCancel = () => {
//     navigation.navigate('Searched Customer');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {isLoading ? (
//         <ActivityIndicator
//           size="large"
//           color="green"
//           style={styles.loadingIndicator}
//         />
//       ) : (
//         <ScrollView style={styles.scrollView}>
//           <FlatList
//             scrollEnabled={false}
//             data={obj.concat(images)}
//             renderItem={({ item }) => (
//               <View style={styles.itemContainer}>
//                 <Text style={styles.label}>{item.key} :</Text>
//                 {item.key.includes('Photo') ? (
//                   <Image
//                     source={{ uri: `data:image/jpeg;base64,${item.value}` }}
//                     style={styles.photo}
//                   />
//                 ) : (
//                   <Text style={styles.textValue}>{item.value}</Text>
//                 )}
//               </View>
//             )}
//             keyExtractor={(item, index) => `${item.key}-${index}`}
//           />

//           <View style={styles.dropdownGroup}>
//             <Dropdown
//               style={styles.dropdown}
//               data={[
//                 { label: 'Name', value: 'name' },
//                 { label: 'Aadhar or PAN Number', value: 'aadharorpannumber' },
//                 { label: 'Customer ID', value: 'customerid' },
//               ]}
//               mode="default"
//               labelField="label"
//               valueField="value"
//               placeholder={
//                 <Text style={{ color: 'black' }}>Select Customer</Text>
//               }
//               onChange={item => setSelectQuery(item.value)}
//               iconColor="black"
//             />
//             <Dropdown
//               style={styles.dropdown}
//               data={[
//                 { label: 'Name', value: 'name' },
//                 { label: 'Aadhar or PAN Number', value: 'aadharorpannumber' },
//                 { label: 'Customer ID', value: 'customerid' },
//               ]}
//               mode="default"
//               labelField="label"
//               valueField="value"
//               placeholder={
//                 <Text style={{ color: 'black' }}>Select Customer</Text>
//               }
//               onChange={item => setSelectQuery(item.value)}
//               iconColor="black"
//             />
//             <Dropdown
//               style={styles.dropdown}
//               data={[
//                 { label: 'Name', value: 'name' },
//                 { label: 'Aadhar or PAN Number', value: 'aadharorpannumber' },
//                 { label: 'Customer ID', value: 'customerid' },
//               ]}
//               mode="default"
//               labelField="label"
//               valueField="value"
//               placeholder={
//                 <Text style={{ color: 'black' }}>Select Customer</Text>
//               }
//               onChange={item => setSelectQuery(item.value)}
//               iconColor="black"
//             />
//             <Dropdown
//               style={styles.dropdown}
//               data={[
//                 { label: 'Name', value: 'name' },
//                 { label: 'Aadhar or PAN Number', value: 'aadharorpannumber' },
//                 { label: 'Customer ID', value: 'customerid' },
//               ]}
//               mode="default"
//               labelField="label"
//               valueField="value"
//               placeholder={
//                 <Text style={{ color: 'black' }}>Select Customer</Text>
//               }
//               onChange={item => setSelectQuery(item.value)}
//               iconColor="black"
//             />
//           </View>

//           <View style={styles.buttonGroup}>
//             <Button
//               style={styles.button}
//               mode="contained"
//               onPress={handleStack}>
//               <Text>Submit</Text>
//             </Button>

//             <Button
//               style={styles.button}
//               mode="contained"
//               onPress={handleCancel}>
//               <Text>Cancel</Text>
//             </Button>
//           </View>
//         </ScrollView>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   scrollView: {
//     padding: 10,
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//   },
//   label: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     flex: 1,
//     color: 'black',
//   },
//   textValue: {
//     fontSize: 16,
//     flex: 2,
//     marginLeft: 10,
//     color: 'black',
//   },
//   photo: {
//     width: 100,
//     height: 100,
//     resizeMode: 'contain',
//   },
//   dropdownGroup: {
//     marginTop: 20,
//     rowGap: 10,
//   },
//   dropdown: {
//     height: 55,
//     fontSize: 18,
//     color: 'black',
//     backgroundColor: '#ecf9ec',
//   },
//   buttonGroup: {
//     flex: 1,
//     marginTop: 40,
//     rowGap: 10,
//     marginBottom: 20,
//   },
//   button: {
//     height: 45,
//     borderRadius: 0,
//     backgroundColor: 'green',
//   },
//   loadingIndicator: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
// });

// export default LoanGenerationScreen;
