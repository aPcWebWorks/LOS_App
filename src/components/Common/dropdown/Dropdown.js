// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';

// const DropdownComponent = ({label, options, onChange}) => {
//   const [value, setValue] = useState(null);
//   const [isFocus, setIsFocus] = useState(false);

//   const handleValueChange = item => {
//     setValue(item.value);
//     setIsFocus(false);
//     onChange(item.value);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>{label}</Text>
//       <Dropdown
//         style={[
//           styles.dropdown,
//           isFocus && {borderColor: 'black'},
//           styles.input,
//         ]}
//         data={options}
//         // containerStyle
//         mode="default"
//         labelField="label"
//         valueField="value"
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         // selectedTextProps
//         iconStyle={styles.iconStyle}
//         placeholder={
//           <Text style={{color: 'black'}} disabled={false}>
//             Choose
//           </Text>
//         }
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => setIsFocus(false)}
//         onChange={handleValueChange}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     rowGap: 4,
//   },

//   label: {
//     fontWeight: '500',
//     fontSize: 14,
//     color: 'black',
//     letterSpacing: -0.5,
//   },

//   dropdown: {
//     borderColor: 'gray',
//     borderWidth: 1.5,
//     borderRadius: 2,
//     boxSizing: 'border-box',
//     paddingHorizontal: 10,
//     backgroundColor: 'red',
//     padding: 20,
//   },

//   icon: {
//     marginRight: 5,
//   },

//   placeholderStyle: {
//     fontSize: 16,
//     color: 'black',
//   },
//   selectedTextStyle: {
//     fontSize: 14,
//     color: 'black',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },

//   input: {
//     height: 45,
//     borderRadius: 2,
//     borderWidth: 1.5,
//     borderColor: 'gray',
//     // marginBottom: 16,
//     fontSize: 14,
//     color: 'black',
//     backgroundColor: 'white',
//     // marginTop: 4,
//   },
//   // inputSearchStyle: {
//   //   height: 40,
//   //   fontSize: 16,
//   // },
// });

// export default DropdownComponent;

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const DropdownComponent = ({style, label, options, value, onChange}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleDropdownChange = selectedValue => {
    onChange(selectedValue);
  };
  return (
    <View style={[styles.container, style]}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {borderColor: 'black'},
          style
        ]}
        data={options}
        mode="default"
        labelField="label"
        valueField="value"
        placeholder={<Text style={{color: 'black'}}>{label}</Text>}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleDropdownChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 4,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
    letterSpacing: -0.5,
  },
  dropdown: {
    borderWidth: 1.5,
    borderRadius: 4,
    padding: 8,
    height: 45,
    borderColor: 'gray',
    fontSize: 14,
    color: 'black',
    backgroundColor: 'white',
  }
});

export default DropdownComponent;
