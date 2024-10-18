// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';

// const Dropdown = ({
//   style,
//   label,
//   labelDisplay = false,
//   options,
//   value,
//   onChangeText,
//   innerStyle,
// }) => {
//   const [isFocus, setIsFocus] = useState(false);

//   const handleDropdownChange = selectedValue => {
//     onChangeText(selectedValue);
//   };
//   return (
//     <>
//       <View style={[styles.container, style]}>
//         {labelDisplay && <Text style={styles.label}>{label}</Text>}

//         <Dropdown
//           style={[
//             styles.dropdown,
//             isFocus && {borderColor: 'black'},
//             innerStyle,
//           ]}
//           data={options}
//           mode="default"
//           labelField="label"
//           valueField="value"
//           placeholder={
//             <Text style={{color: 'black', fontSize: 14}}>
//               {labelDisplay && "Choose"}
//             </Text>
//           }
//           value={value}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           onChange={handleDropdownChange}
//           iconColor="white"
//         />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 4,
//     backgroundColor: 'white',
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
//     borderRadius: 4,
//     backgroundColor: 'transperent',
//     fontSize: 14,
//     color: 'black',
//     flex: 1,
//     padding: 5,
//     paddingLeft: 8,
//   },
// });

// export default Dropdown;

// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const CustomDropdown = ({
//   options,
//   value,
//   handleChange,
//   handleBlur,
//   errors,
//   touched,
//   name,
// }) => {
//   const [isFocus, setIsFocus] = useState(false);

//   return (
//     <View>
//       <Dropdown
//         style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
//         mode="default"
//         data={options}
//         labelField="label"
//         valueField="value"
//         placeholder="Choose"
//         value={value}
//         // onFocus={() => setIsFocus(true)}
//         // onBlur={() => {
//         //   setIsFocus(false);
//         //   handleBlur(name);
//         // }}
//         // onChange={item => {
//         //   setIsFocus(false);
//         //   handleChange(name)(item.value);
//         // }}
//         // renderLeftIcon={() => {
//         //   <Icon name="keyboard-arrow-down" size={20} color="#000" />;
//         // }}
//         maxHeight={300}
//         minHeight={100}
//       />
//       {errors && errors[name] && touched && touched[name] ? (
//         <Text style={styles.errorText}>{errors[name]}</Text> // Display error message
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   dropdown: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//     backgroundColor: 'white',
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 4,
//   },
// });

// export default CustomDropdown;

// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {Dropdown as RNEDropdown} from 'react-native-element-dropdown';

// const Dropdown = ({
//   style,
//   label,
//   labelDisplay = false,
//   options,
//   value,
//   handleChange,
//   handleBlur,
//   errors,
//   touched,
//   name,
// }) => {
//   const [isFocus, setIsFocus] = useState(false);

//   console.log("handleChange", handleChange)
//   return (
//     <View style={[styles.container, style]}>
//       {labelDisplay && <Text style={styles.label}>{label}</Text>}

//       <RNEDropdown
//         style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
//         data={options}
//         mode="default"
//         labelField="label"
//         valueField="value"
//         placeholder={
//           <Text style={{color: 'black', fontSize: 14}}>
//             {labelDisplay ? 'Choose' : ''}
//           </Text>
//         }
//         value={value}
//         onFocus={() => setIsFocus(true)}
//         onBlur={() => {
//           setIsFocus(false);
//           handleBlur(name);
//         }}
//         onChange={item => {
//           handleChange(name, item.value);
//           setIsFocus(false);
//         }}
//         iconColor="white"
//         renderRightIcon={() => <Icon name="keyboard-arrow-down" size={20} />}
//       />

//       {errors && errors[name] && touched && touched[name] ? (
//         <Text style={styles.errorText}>{errors[name]}</Text>
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   label: {
//     fontWeight: '500',
//     fontSize: 14,
//     color: 'black',
//     letterSpacing: -0.5,
//   },
//   dropdown: {
//     marginTop: 4,
//     minHeight: 45,
//     maxHeight: 45,
//     borderColor: 'gray',
//     borderWidth: 1.5,
//     borderRadius: 4,
//     backgroundColor: 'transperent',
//     fontSize: 14,
//     color: 'black',
//     flex: 1,
//     padding: 5,
//     paddingLeft: 8,
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 4,
//   },
// });

// export default Dropdown;

import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dropdown as RNEDropdown} from 'react-native-element-dropdown';

const Dropdown = ({
  style,
  label,
  labelDisplay = false,
  options,
  value,
  handleChange,
  handleBlur,
  errors,
  touched,
  name,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {labelDisplay && <Text style={styles.label}>{label}</Text>}

      <RNEDropdown
        style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
        data={options}
        mode="default"
        labelField="label"
        valueField="value"
        placeholder={
          <Text style={{color: 'black', fontSize: 14}}>
            {labelDisplay ? 'Choose' : ''}
          </Text>
        }
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
          handleBlur(name);
        }}
        onChange={item => {
          handleChange(name, item.value);
          setIsFocus(false);
        }}
        iconColor="white"
        renderRightIcon={() => <Icon name="keyboard-arrow-down" size={20} />}
      />

      {errors && errors[name] && touched && touched[name] ? (
        <Text style={styles.errorText}>{errors[name]}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    color: 'black',
    letterSpacing: -0.5,
  },
  dropdown: {
    marginTop: 4,
    minHeight: 45,
    maxHeight: 45,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 4,
    backgroundColor: 'transparent',
    fontSize: 14,
    color: 'black',
    flex: 1,
    padding: 5,
    paddingLeft: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default Dropdown;
