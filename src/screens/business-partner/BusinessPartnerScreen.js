import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getUser} from '../../features/auth/authThunks.js';

const FinancialSourcingScreen = () => {
  return (
    <>
      <ScrollView style={style.container}>
        <Text style={style.headLine}>Basic Information</Text>
        <View style={style.formField}>
          <View style={style.elementGroup}>
            <View style={style.widthFifty}>
              <Text style={style.label} color="black" fontSize="50">
                SCP No.
              </Text>
              <Text style={style.textValue}>SCP000141</Text>
            </View>
            <View style={style.widthFifty}>
              <Text style={style.label}>Name</Text>
              <Text style={style.textValue}>Mr. Tushar Dhotre</Text>
            </View>
          </View>

          <View style={style.elementGroup}>
            <View style={style.widthFifty}>
              <Text style={style.label}>Gender</Text>
              <Text style={style.textValue}>Male</Text>
            </View>
            <View style={style.widthFifty}>
              <Text style={style.label}>RES. ADDRESS</Text>
              <Text style={style.textValue}>Pune Maharashtra</Text>
            </View>
          </View>

          <View style={style.elementGroup}>
            <View style={style.widthFifty}>
              <Text style={style.label}>PINCODE</Text>
              <Text style={style.textValue}>411052</Text>
            </View>
            <View style={style.widthFifty}>
              <Text style={style.label}>MOBILE NO.</Text>
              <Text style={style.textValue}>7558260125</Text>
            </View>
          </View>

          <View style={style.elementGroup}>
            <View style={style.widthFifty}>
              <Text style={style.label}>ALT. MOBILE NO.</Text>
              <Text style={style.textValue}>8080819321</Text>
            </View>
            <View style={style.widthFifty}>
              <Text style={style.label}>EMAIL ID</Text>
              <Text style={style.textValue}>admin@visionindia.com</Text>
            </View>
          </View>

          <View style={style.elementGroup}>
            <View style={style.widthFifty}>
              <Text style={style.label}>PAN NO.</Text>
              <Text style={style.textValue}>ASDFG4512H</Text>
            </View>
            <View style={style.widthFifty}>
              <Text style={style.label}>AADHAR NO.</Text>
              <Text style={style.textValue}>1245 1212 7845</Text>
            </View>
          </View>

          <View style={style.elementGroup}>
            <View style={style.widthFifty}>
              <Text style={style.label}>EDUCATION</Text>
              <Text style={style.textValue}>post graduate</Text>
            </View>
            <View style={style.widthFifty}>
              <Text style={style.label}>OCCUPATION</Text>
              <Text style={style.textValue}>Service</Text>
            </View>
          </View>

          <View style={style.elementGroup}>
            <View style={style.widthFifty}>
              <Text style={style.label}>PVC CERT. NO.</Text>
              <Text style={style.textValue}>89561245</Text>
            </View>
            <View style={style.widthFifty}>
              <Text style={style.label}>IIBF CERT. NO.</Text>
              <Text style={style.textValue}>451223DWSA4</Text>
            </View>
          </View>

          <View style={style.elementGroup}>
            <View style={style.widthFifty}>
              <Text style={style.label}>PVC CERT. NO.</Text>
              <Text style={style.textValue}>89561245</Text>
            </View>
            <View style={style.widthFifty}>
              <Text style={style.label}>IIBF CERT. NO.</Text>
              <Text style={style.textValue}>451223DWSA4</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
    rowGap: 15,
  },

  formPaymentDetailsAndDocument: {
    marginTop: 20,
  },

  formField: {
    rowGap: 20,
    marginTop: 4,
  },

  headLine: {
    fontWeight: '600',
    fontSize: 18,
    color: 'black',
  },

  customer: {
    // flexDirection: 'column',
  },

  customerTitleDropdown: {
    width: 100,
  },

  customerNameSection: {
    flex: 2,
  },

  label: {
    fontWeight: '500',
    fontSize: 12,
    // color: 'gray',
    letterSpacing: -0.2,
  },

  textValue: {color: 'black', fontSize: 16},

  input: {
    height: 45,
    borderColor: 'gray',
    fontSize: 18,
    // color: 'black',
    backgroundColor: 'white',
    marginTop: 4,
  },

  inputOutline: {
    borderWidth: 1.5,
  },

  radioGroup: {
    justifyContent: 'space-around',
    gap: 20,
    flexDirection: 'row',
  },

  radioOptions: {
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: "white",
    // paddingRight: 6,
    // borderRadius: 4,
  },

  marginLeft: {
    // marginLeft: 10,
  },

  elementGroup: {
    flexDirection: 'row',
    // columnGap: 40,
    // justifyContent: 'space-between'
  },

  widthFifty: {width: '50%'},
  dropdownGroup: {
    flexDirection: 'row',
    columnGap: 5,
  },

  educationDropdown: {
    flex: 1,
  },

  occupationDropdown: {
    flex: 1,
  },

  formButton: {
    backgroundColor: 'green',
    borderRadius: 4,
    // marginTop: 10,
  },
  // Common
  textBlack: {color: 'black'},
});

export default FinancialSourcingScreen;
