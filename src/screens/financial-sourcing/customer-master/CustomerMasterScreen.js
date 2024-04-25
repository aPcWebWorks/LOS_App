// import React,{useState} from "react";
// import {
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     View,
//     Text,
//     Button,
// } from 'react-native';
// import { Picker } from "@react-native-picker/picker";
// import { DataTable } from "react-native-paper";
// import { TouchableOpacity } from "react-native-gesture-handler";

// const CustomerMasterScreen= ()=>{
//     const [selectedCustomerId, selectedCustomerId]=useState();
//     const [showDetails, setShowDetails]= useState(false);

//     const customers=[
//         {id:1, name:"John Doe"},
//         {id:2, name:"Shantanu Pande"},
//         {id:3, name:"Rushikesh Deshpande"},
//         {id:4, name:"Sharwari Tambolkar"},
//         {id:5, name:"Shruti Sathe"},
//     ];
//     const customerDetails =[
//         {key:1, name:"John Doe",mobile:12345678910,email:'john@gmail.com',gender:'male',action:'Edit'},
//         {key:2, name:"Shantanu Pande",mobile:12345678919,email:'shantanu@gmail.com',gender:'male',action:'Edit'},
//         {key:3, name:"Rus",mobile:12345678998,email:'rushi@gmail.com',gender:'male',action:'Edit'},
//         {key:4, name:"John Doe",mobile:12345678945,email:'sharwari@gmail.com',gender:'Female',action:'Edit'},
//         {key:5, name:"John Doe",mobile:123456789101,email:'shruti@gmail.com',gender:'Female',action:'Edit'},

//     ];
//     const [page, setPage] = useState(0);
//     const itemsPerPage = 5;
//     const from = page * itemsPerPage;
//     const to = Math.min((page + 1) * itemsPerPage, customerDetails.length);

// }

import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import DropdownComponent from '../../../components/Common/dropdown/Dropdown';
import {Button, Searchbar} from 'react-native-paper';

const Data = [
  {label: 'Name', value: 'name'},
  {label: 'SCP Number', value: 'scpnumber'},
  {label: 'Business', value: 'business'},
];

function CustomerMasterScreen() {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.searchSection}>
        <DropdownComponent style={style.search} options={Data} />
        <Button style={style.button} mode="contained">
          Add New
        </Button>
      </View>

      {/* <Searchbar placeholder="Search" /> */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    columnGap: 50,
    alignItems: 'center'
    // backgroundColor: 'yellow',
  },
  search: {
    flex: 2,
    // flexDirection: 'row',
    // backgroundColor: 'red',
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: 'gray',
  },
});
export default CustomerMasterScreen;
