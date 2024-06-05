// import React, {useEffect, useState} from 'react';
// import {
//   FlatList,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {
//   Modal,
//   Portal,
//   Button,
//   PaperProvider,
//   Searchbar,
//   DataTable,
// } from 'react-native-paper';
// import DropdownComponent from '../../../components/Common/dropdown/Dropdown';
// import {useDispatch, useSelector} from 'react-redux';
// import {loanMasterHandler} from '../../../features/loan-master/loanMasterThunk';
// import {
//   getCustomerWithId,
//   searchCustomerParamsHandler,
// } from '../../../features/customer-master/customerMasterThunk';
// import {documentHandler} from '../../../features/documents/documentThunk';

// const Data = [
//   {label: 'Name', value: 'name'},
//   {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
//   {label: 'Customer ID', value: 'customerid'},
// ];

// const scpLoanStatusObj = [
//   {
//     id: 1,
//     label: 'Label',
//     value: 'Value',
//   },
//   {
//     id: 2,
//     label: 'Label',
//     value: 'Value',
//   },
//   {
//     id: 1,
//     label: 'Label',
//     value: 'Value',
//   },
//   {
//     id: 2,
//     label: 'Label',
//     value: 'Value',
//   },
// ];

// const scpLoanStatusDropdoenObj = [
//   {
//     id: 1,
//     label: 'Select Customer',
//     options: scpLoanStatusObj,
//   },
//   {
//     id: 1,
//     label: 'Select User',
//     options: scpLoanStatusObj,
//   },
//   {
//     id: 1,
//     label: 'Select SCP',
//     options: scpLoanStatusObj,
//   },
//   {
//     id: 1,
//     label: 'Select SCP',
//     options: scpLoanStatusObj,
//   },
// ];

// const LoanGenerationScreen = ({navigation, route}) => {
//   const dispatch = useDispatch();
//   const {id} = route.params;
//   const {userByScpNumber} = useSelector(state => state.scpUser);
//   const {customer} = useSelector(state => state.getCustomerById);
//   const {document} = useSelector(state => state.document);

//   useEffect(() => {
//     dispatch(getCustomerWithId(id));
//     // dispatch(documentHandler(customer.documents[0].id));
//     // dispatch(documentHandler(customer.documents[1].id))
//     // dispatch(documentHandler(customer.documents[2].id))
//     // console.log('Customer', customer.documents[0].id);
//     console.log('Document', document);
//   }, []);
//   const handleStack = () => {
//     setToggleLoanForm(false);
//   };

//   const handleCancel = () => {
//     navigation.navigate('Searched Customer');
//   };

//   const obj = [
//     {
//       key: 'SCP No.',
//       value: userByScpNumber?.scpDetail?.scpNo,
//     },
//     {
//       key: 'Customer Name',
//       value: `${customer?.title}. ${customer?.customerName}`,
//     },
//     {
//       key: 'Gender',
//       value: customer?.gender,
//     },
//     {
//       key: 'Address',
//       value: customer?.residentialAddress,
//     },
//     {
//       key: 'Pincode',
//       value: customer?.pinCode,
//     },
//     {
//       key: 'E-Mail ID.',
//       value: customer?.email,
//     },
//     {
//       key: 'Mobile',
//       value: customer?.mobileNumber,
//     },
//     {
//       key: 'PAN No.',
//       value: customer?.panCardNumber,
//     },
//     {
//       key: 'Aadhar No.',
//       value: customer?.aadhaarNumber,
//     },
//     {
//       key: 'Occupation',
//       value: customer?.occupation,
//     },
//   ];

//   const image = [
//     {
//       key: 'ID Photo',
//       value: customer?.idDocument,
//     },
//     {
//       key: 'PAN Photo',
//       value: customer?.panCard,
//     },
//     {
//       key: 'Aadhar Photo',
//       value: customer?.aadhaarCard,
//     },
//   ];
//   return (
//     <>
//       <SafeAreaView>
//         {/* <ScrollView> */}
//         <View style={styles.row}>
//           {obj?.map((item, index) => {
//             return (
//               <>
//                 <View style={styles.inputText} key={index}>
//                   <Text style={styles.lebel}>{item.key}</Text>
//                   <Text style={styles.textValue}>{item.value}</Text>
//                 </View>
//               </>
//             );
//           })}

//           {image?.map((item, index) => {
//             return (
//               <>
//                 <View style={styles.inputText} key={index}>
//                   <Text style={styles.lebel}>{item.key}</Text>
//                   {/* <Text style={styles.textValue}>{item.value}</Text> */}
//                   <Image source={{uri: `file:///${item.value}`}} />
//                 </View>
//               </>
//             );
//           })}

//           {/* <FlatList
//           data={obj}
//           renderItem={({item}) => (
//             <View style={styles.inputText}>
//               <Text style={styles.lebel}>{item.key}</Text>
//               <Text style={styles.textValue}>{item.value}</Text>
//             </View>
//             // console.log('From Flatlist', customer);
//           )}
//           keyExtractor={item => item.id}
//         /> */}
//         </View>

//         <View style={styles.dropdownGroup}>
//           {scpLoanStatusDropdoenObj?.map((item, index) => {
//             return (
//               <DropdownComponent
//                 style={styles.dropdown}
//                 label={item.label}
//                 options={Data}
//               />
//             );
//           })}
//         </View>

//         <View style={styles.buttonGroup}>
//           <Button
//             style={styles.button}
//             mode="contained"
//             dark={true}
//             textColor="white"
//             onPress={handleStack}>
//             <Text style={styles.buttonLebel}>Submit</Text>
//           </Button>

//           <Button
//             style={styles.button}
//             mode="contained"
//             dark={true}
//             textColor="white"
//             onPress={handleCancel}>
//             <Text style={styles.buttonLebel}>Cancel</Text>
//           </Button>
//         </View>
//         {/* </ScrollView> */}
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   row: {
//     display: 'flex',
//     flexDirection: 'row',
//     columnGap: 7,
//     rowGap: 20,
//     flexWrap: 'wrap',
//     padding: 15,
//   },

//   inputText: {width: '49%'},

//   lebel: {
//     fontWeight: '400',
//     fontSize: 13,
//     letterSpacing: 0.8,
//     color: 'black',
//   },

//   textValue: {
//     fontSize: 16,
//     color: 'black',
//     fontWeight: '600',
//     // marginLeft: 4,
//     marginTop: 4,
//   },

//   dropdownGroup: {
//     marginTop: 20,
//     rowGap: 10,
//   },

//   buttonGroup: {
//     marginTop: 30,
//     rowGap: 15,
//   },

//   button: {
//     borderRadius: 4,
//     backgroundColor: 'green',
//     height: 50,
//     justifyContent: 'center',
//     // marginTop: 10,
//   },

//   buttonLebel: {
//     fontSize: 18,
//     fontWeight: '600',
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
  Button,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCustomerWithId} from '../../../features/customer-master/customerMasterThunk';
import DropdownComponent from '../../../components/Common/dropdown/Dropdown';

const LoanGenerationScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const {userByScpNumber} = useSelector(state => state.scpUser);
  const {customer, isLoading} = useSelector(state => state.getCustomerById);

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
      <ScrollView>
        <View style={styles.contentContainer}>
              <FlatList 
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
              
          
           {/* Render ActivityIndicator when isLoading is true */}
        {isLoading && (
          <ActivityIndicator size="large" color="green" style={styles.loadingIndicator} />
        )}
          {/* Dropdown Components */}
          <View style={styles.dropdownGroup}>
            <DropdownComponent
              label="Select Customer"
              options={[
                {label: 'Name', value: 'name'},
                {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
                {label: 'Customer ID', value: 'customerid'},
              ]}
            />
            <View style={{marginTop: 10}} />
            <DropdownComponent
              label="Select User"
              options={[
                {label: 'Name', value: 'name'},
                {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
                {label: 'Customer ID', value: 'customerid'},
              ]}
            />
            <View style={{marginTop: 10}} />
            <DropdownComponent
              label="Select SCP"
              options={[
                {label: 'Name', value: 'name'},
                {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
                {label: 'Customer ID', value: 'customerid'},
              ]}
            />
            <View style={{marginTop: 10}} />
            <DropdownComponent
              label="Select SCP"
              options={[
                {label: 'Name', value: 'name'},
                {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
                {label: 'Customer ID', value: 'customerid'},
              ]}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Button
              style={styles.button}
              title="Submit"
              onPress={handleStack}
              color="green"
            />
            <Button
              style={styles.button}
              title="Cancel"
              onPress={handleCancel}
              color="green"
            />
            
          </View>
        
       </View>
       </ScrollView> 
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  contentContainer: {
    padding: 15,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  textValue: {
    fontSize: 16,
    flex: 2,
    marginLeft: 10,
  },
  photo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  dropdownGroup: {
    marginTop: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: '40%',
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loadingIndicator: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default LoanGenerationScreen;
