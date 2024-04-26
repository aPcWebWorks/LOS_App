// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, View, ScrollView, Text } from 'react-native';
// import { Button, Searchbar, DataTable } from 'react-native-paper';
// import DropdownComponent from '../../../components/Common/dropdown/Dropdown';

// const Data = [
//   { label: 'Name', value: 'name' },
//   { label: 'SCP Number', value: 'scpnumber' },
//   { label: 'Business', value: 'business' },
// ];

// const customers = [
//   {
//     id: 1,
//     name: 'John Doe',
//     scpnumber: 'SCP123',
//     business: 'Tech',
//     email: 'john@gmail.com',
//     mobilenumber: '87967645353',
//   },
//   {
//     id: 2,
//     name: 'Jonas Smith',
//     scpnumber: 'SCP456',
//     business: 'Retail',
//     email: 'jonas@gmail.com',
//     mobilenumber: '87967645355',
//   },
// ];

// const CustomerMasterScreen = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredCustomers, setFilteredCustomers] = useState(customers);

//   const onchangeSearch = query => {
//     setSearchQuery(query);
//     setFilteredCustomers(
//       customers.filter(
//         customer =>
//           customer.name.toLowerCase().includes(query.toLowerCase()) ||
//           customer.email.toLowerCase().includes(query.toLowerCase()),
//       ),
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.searchSection}>
//         <DropdownComponent style={styles.dropdown} options={Data} />
//         <Button style={styles.button} mode="contained">
//           Add New
//         </Button>
//       </View>
//       <Searchbar
//         style={styles.search}
//         placeholder="Search"
//         onChangeText={setSearchQuery}
//         value={searchQuery}
//         mode="bar"
//       />

//       <ScrollView horizontal>
//         <DataTable>
//           <DataTable.Header style={styles.tableHeader}>
//             <DataTable.Title style={styles.columnHeader} width={30}>
//               <Text style={styles.tableTitle}>ID</Text>
//             </DataTable.Title>
//             <DataTable.Title style={styles.columnHeader} width={200}>
//               <Text style={styles.tableTitle}>Name</Text>
//             </DataTable.Title>
//             <DataTable.Title style={styles.columnHeader} width={200}>
//               <Text style={styles.tableTitle}>SCP Number</Text>
//             </DataTable.Title>
//             <DataTable.Title style={styles.columnHeader} width={200}>
//               <Text style={styles.tableTitle}>Email</Text>
//             </DataTable.Title>
//             <DataTable.Title style={styles.columnHeader} width={200}>
//               <Text style={styles.tableTitle}>Mobile Number</Text>
//             </DataTable.Title>
//           </DataTable.Header>

//           {filteredCustomers.map((customer, index) => (
//             <DataTable.Row style={styles.tableRow} key={index}>
//               <DataTable.Cell style={styles.tableCell} width={30}>
//                 {customer.id}
//               </DataTable.Cell>
//               <DataTable.Cell style={styles.tableCell} width={200}>
//                 {customer.name}
//               </DataTable.Cell>
//               <DataTable.Cell style={styles.tableCell} width={200}>
//                 {customer.scpnumber}
//               </DataTable.Cell>
//               <DataTable.Cell style={styles.tableCell} width={200}>
//                 {customer.email}
//               </DataTable.Cell>
//               <DataTable.Cell style={styles.tableCell} width={200}>
//                 {customer.mobilenumber}
//               </DataTable.Cell>
//             </DataTable.Row>
//           ))}
//         </DataTable>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 4,
//   },
//   searchSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   dropdown: {
//     flex: 3,
//   },
//   button: {
//     flex: 1,
//     backgroundColor: 'gray',
//     borderRadius: 0,
//     marginLeft: 10,
//   },
//   tableHeader: {
//     backgroundColor: '#f2f2f2',
//   },
//   columnHeader: {
//     justifyContent: 'center',
//   },
//   tableTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   tableRow: {
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: 'white',
//   },
//   tableCell: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
// });

// export default CustomerMasterScreen;

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button, Searchbar, DataTable} from 'react-native-paper';
import DropdownComponent from '../../../components/Common/dropdown/Dropdown';

const Data = [
  {label: 'Name', value: 'name'},
  {label: 'SCP Number', value: 'scpnumber'},
  {label: 'Business', value: 'business'},
];

const customers = [
  {
    id: 1,
    name: 'John Doe',
    scpnumber: 'SCP123',
    business: 'Tech',
    email: 'john@gmail.com',
    mobilenumber: '87967645353',
  },
  {
    id: 2,
    name: 'Jonas Smith',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 3,
    name: 'Ram',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 4,
    name: 'Mackwin',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
  {
    id: 5,
    name: 'Salliy',
    scpnumber: 'SCP456',
    business: 'Retail',
    email: 'jonas@gmail.com',
    mobilenumber: '87967645355',
  },
];

// const ITEMS_PER_PAGE = 5;
const numberOfCustomersPerPageList = [2, 3, 4];

const CustomerMasterScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  // Filtered customers based on search query
  const filteredCustomers = customers.filter(
    customer =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // // Pagination logic
  // const totalItems = filteredCustomers.length;
  // const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // const paginatedCustomers = filteredCustomers.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE
  // );

  // const handlePageChange = page => {
  //   setCurrentPage(page);
  // };
  const [page, setPage] = React.useState(0);
  const [numberOfCustomersPerPage, onCustomersPerPageChange] = React.useState(
    numberOfCustomersPerPageList[0],
  );
  const from = page * numberOfCustomersPerPage;
  const to = Math.min((page + 1) * numberOfCustomersPerPage, customers.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfCustomersPerPage]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Search and Add New section */}
      <View style={styles.elementGroup}>
        <DropdownComponent
          style={styles.dropdown}
          label="Select Customer"
          options={Data}
        />

        <Button
          style={styles.button}
          mode="contained"
          dark={true}
          textColor="white"
          onPress={showModal}>
          Add New
        </Button>
      </View>

      {/* Searchbar */}
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        mode="bar"
      />

      {/* DataTable with pagination */}
      <ScrollView horizontal>
        <DataTable>
          {/* Table Header */}
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.columnHeader} width={30}>
              <Text style={styles.tableTitle}>ID</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.columnHeader} width={200}>
              <Text style={styles.tableTitle}>Name</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.columnHeader} width={200}>
              <Text style={styles.tableTitle}>SCP Number</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.columnHeader} width={200}>
              <Text style={styles.tableTitle}>Email</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.columnHeader} width={200}>
              <Text style={styles.tableTitle}>Mobile Number</Text>
            </DataTable.Title>
          </DataTable.Header>

          {/* Table Rows */}
          {customers?.map((customer, index) => (
            <DataTable.Row style={styles.tableRow} key={index}>
              <DataTable.Cell style={styles.tableCell} width={30}>
                {customer.id}
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell} width={200}>
                {customer.name}
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell} width={200}>
                {customer.scpnumber}
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell} width={200}>
                {customer.email}
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell} width={200}>
                {customer.mobilenumber}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <DataTable>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(
              customers.length / numberOfCustomersPerPage,
            )}
            onPageChange={page => setPage(page)}
            label={`${from + 1}-${to} of ${customers.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfCustomersPerPageList}
            numberOfItemsPerPage={numberOfCustomersPerPage}
            onItemsPerPageChange={onCustomersPerPageChange}
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    rowGap: 10
  },

  elementGroup: {
    // width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'red',
    columnGap: 10,
    // height: 40,
  },

  search: {
    // flex: 3,
    borderRadius: 0,
    backgroundColor: '#ecf9ec',
    // backgroundColor: 'cyan',
  },

  button: {
    flex: 1,
    // height: 50,
    backgroundColor: 'green',
    borderRadius: 0,
    fontSize: 16,
    justifyContent: 'center',
  },

  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dropdown: {
    flex: 3,
    backgroundColor: '#ecf9ec', borderWidth: 0, height: 55
  },
  // dropdown: {backgroundColor: '#ecf9ec', borderWidth: 0, height: 55},

  // button: {
  //   flex: 1,
  //   backgroundColor: 'gray',
  //   borderRadius: 0,
  //   marginLeft: 10,
  // },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  columnHeader: {
    // justifyContent: 'center',
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  tableCell: {
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  // pagination: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   marginTop: 10,
  // },
  // paginationButton: {
  //   marginHorizontal: 5,
  // },
});

export default CustomerMasterScreen;
