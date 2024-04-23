// import React, {useEffect, useState} from 'react';
// import {ScrollView, Text, Animated, View, StyleSheet} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';

// const LoanMaster = ({id, isOpen, toggle}) => {
//   // animations.
//   const [height] = useState(new Animated.Value(isOpen ? 45 : 0));
//   const [rotation] = useState(new Animated.Value(isOpen ? 0 : 1));

//   // animation handler
//   const toggleCollapse = () => {
//     toggle(id);
//   };

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(height, {
//         toValue: isOpen ? 45 : 0,
//         duration: 300,
//         useNativeDriver: false,
//       }),
//       Animated.timing(rotation, {
//         toValue: isOpen ? 1 : 0, // Toggle between 0 and 1 for rotation
//         duration: 300,
//         useNativeDriver: false,
//       }),
//     ]).start();
//   }, [isOpen]);

//   const animatedStyle = {
//     height: height,
//     overflow: 'hidden',
//   };

//   const rotateIcon = rotation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '180deg'], // Rotate from 0 to 180 degrees
//   });
//   return (
//     <ScrollView>
//       <View style={style.container}>
//         <TouchableOpacity style={style.listItem} onPress={toggleCollapse}>
//           <Text style={style.listTitle}>Loan Master</Text>
//           <Animated.View style={{transform: [{rotate: rotateIcon}]}}>
//             <FontAwesome5 style={style.listDownArrowIcon} name="angle-down" />
//           </Animated.View>
//         </TouchableOpacity>

//         <Animated.View style={[style.toggleContent, animatedStyle]}>
//           <Text>Content Goes Here.</Text>
//         </Animated.View>
//       </View>
//     </ScrollView>
//   );
// };

// const style = StyleSheet.create({
//   container: {
//     backgroundColor: '#ecf9ec',
//     flex: 1,
//     flexDirection: 'column',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 6,
//   },
//   listItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // backgroundColor: "cyan",
//     width: '100%',
//     height: 40,
//   },
//   listTitle: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   listDownArrowIcon: {
//     fontSize: 20,
//     fontWeight: '900',
//     color: 'black',
//   },

//   toggleContent: {
//     // flex: 1,
//     backgroundColor: 'white',
//     position: 'relative',
//     top: 16,
//   },
// });
// export default LoanMaster;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateField,
  selectForm,
} from '../../../../features/customer-master/customerMasterSlice.js';
import {Button, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '../../../Common/date-time-picker/DateTimePicker.js';
import Dropdown from '../../../Common/dropdown/Dropdown.js';
import LinearGradient from 'react-native-linear-gradient';
import CustomDocumentPicker from '../../../Common/document-picker/DocumentPicker.js';

const subTitle = [
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

const bankName = [
  {label: 'Bank 1', value: 'bank 1'},
  {label: 'Bank 2', value: 'bank 2'},
  {label: 'Bank 3', value: 'bank 3'},
];
const brancName = [
  {label: 'Branch 1', value: 'branch 1'},
  {label: 'Branch 2', value: 'branch 2'},
  {label: 'Branch 3', value: 'branch 3'},
  {label: 'Branch 4', value: 'branch 4'},
];
const requiredLoanProduct = [
  {label: 'Product 1', value: 'product 1'},
  {label: 'Product 2', value: 'product 2'},
  {label: 'Product 3', value: 'product 3'},
];
const requiredLoanSubProduct = [
  {label: 'Sub Product 1', value: 'sub product 1'},
  {label: 'Sub Product 2', value: 'sub product 2'},
  {label: 'Sub Product 3', value: 'sub product 3'},
  {label: 'Sub Product 4', value: 'sub product 4'},
];

const requiredLoanAmount = [
  {label: 'Loan Amount 1', value: 'loan amount 1'},
  {label: 'Loan Amount 2', value: 'loan amount 2'},
  {label: 'Loan Amount 3', value: 'loan amount 3'},
  {label: 'Loan Amount 4', value: 'loan amount 4'},
];

// Main Component
const LoanMaster = ({id, isOpen, toggle}) => {
  // commom state.
  const theme = useTheme();
  const styles = getStyles(theme);

  // redux toolkit.
  const dispatch = useDispatch();
  // const formState = useSelector(selectForm);

  // component state.
  const [toggleContent, setToggleContent] = useState(false);
  const [pickedFile, setPickedFile] = useState(null);
  const [inputDate, setInputDate] = useState(undefined);
  const [gender, setGender] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, [loading]);

  // component handler
  const handleInputChange = (field, value) => {
    dispatch(updateField({field, value}));
  };

  const ToggleContentHandler = () => {
    setToggleContent(!toggleContent);
  };

  return (
    <>
      {/* {
    loading ? <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View> : */}

      <View
        style={styles.container}
        colors={['#006600', '#009900']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {/* <View style={styles.customerTitle}> */}
        {/* <Dropdown style={styles.dropdown} label="Title" options={subTitle} /> */}
        <View>
          <Text style={styles.label}>Customer Name*</Text>
          <TextInput
            style={styles.input}
            textColor="black"
            inputMode="text"
            mode="outlined"
            outlineStyle={{
              borderWidth: 1.5,
            }}
            keyboardType="email-address"
            outlineColor="gray"
          />
        </View>
        {/* </View> */}

        {/* <View>
          <Text style={styles.label}>Gender</Text>
          <RadioButton.Group
            onValueChange={value => setGender(value)}
            value={gender}>
            <View style={styles.radioGroup}>
              <View style={[styles.radioOptions, styles.marginLeft]}>
                <RadioButton color="gray" value="male" />
                <Text style={styles.textBlack}>Male</Text>
              </View>
              <View style={styles.radioOptions}>
                <RadioButton color="gray" value="female" />
                <Text style={styles.textBlack}>Female</Text>
              </View>
              <View style={styles.radioOptions}>
                <RadioButton color="gray" value="other" />
                <Text style={styles.textBlack}>Other</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        <View>
          <Text style={styles.label}>Recidensial Address*</Text>
          <TextInput
            style={styles.input}
            inputMode="text"
            keyboardType="email-address"
            multiline={true}
            // numberOfLines={2}
            autoFocus={false}
          />
        </View>

        <View>
          <Text style={styles.label}>Email Id*</Text>
          <TextInput
            style={styles.input}
            inputMode="text"
            mode="outlined"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.elementGroup}>
          <View style={styles.pincode}>
            <Text style={styles.label}>Pincode*</Text>
            <TextInput
              style={styles.input}
              textColor="black"
              inputMode="text"
              mode="outlined"
              outlineStyle={{
                borderWidth: 1.5,
              }}
              keyboardType="email-address"
              outlineColor="gray"
            />
          </View>

          <View style={styles.mobile}>
            <Text style={styles.label}>Mobile No.*</Text>
            <TextInput
              style={styles.input}
              textColor="black"
              inputMode="text"
              mode="outlined"
              outlineStyle={{
                borderWidth: 1.5,
              }}
              keyboardType="email-address"
              outlineColor="gray"
            />
          </View>
        </View>

        <View>
          <Text style={styles.label}>PAN No.*</Text>
          <TextInput
            style={styles.input}
            inputMode="text"
            keyboardType="email-address"
          />
        </View> */}

        <Dropdown
          style={{marginTop: 6}}
          label="Occupation"
          options={occupation}
        />

        <View>
          <Text style={styles.label}>Annual Income</Text>
          <TextInput
            style={styles.input}
            textColor="black"
            inputMode="text"
            mode="outlined"
            outlineStyle={{
              borderWidth: 1.5,
            }}
            keyboardType="email-address"
            outlineColor="gray"
          />
        </View>

        <Dropdown
          style={styles.dropdown}
          label="Bank Name"
          options={bankName}
        />

        <Dropdown
          style={styles.dropdown}
          label="Branch Name"
          options={brancName}
        />

        <Dropdown
          style={styles.dropdown}
          label="Required Loan Product"
          options={requiredLoanProduct}
        />

        <Dropdown
          style={styles.dropdown}
          label="Required Loan Sub Product"
          options={requiredLoanSubProduct}
        />

        <Dropdown
          style={styles.dropdown}
          label="Required Loan Amount"
          options={requiredLoanAmount}
        />
        <Button style={styles.formButton} textColor="white" mode="contained">
          Submit
        </Button>
      </View>
    </>
  );
};

function getStyles(theme) {
  return StyleSheet.create({
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    container: {
      flex: 1,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: '#b2cfb2',
      padding: 20,
      rowGap: 20,
    },

    customerTitle: {
      flexDirection: 'row',
      columnGap: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },

    dropdown: {
      minWidth: 100,
      height: 45,
    },

    // customerName: {
    //   flex: 3,
    // },

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
      marginTop: 4,
      borderRadius: 4,
    },

    dropdown: {
      marginTop: 6,
    },

    // Common
    textBlack: {color: 'black'},
  });
}

export default LoanMaster;
