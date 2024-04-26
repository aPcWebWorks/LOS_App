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
    id: 4,
    name: 'Mackwin',
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
    id: 4,
    name: 'Mackwin',
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
    id: 4,
    name: 'Mackwin',
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
      <ScrollView>
        <View style={styles.scrollView}>
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
          <View>
            <ScrollView horizontal>
              <DataTable>
                {/* Table Header */}
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title style={styles.columnHeader} width={15}>
                    <Text style={styles.tableTitle}>ID</Text>
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnHeader} width={200}>
                    <Text style={styles.tableTitle}>Name</Text>
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnHeader} width={100}>
                    <Text style={styles.tableTitle}>SCP No.</Text>
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnHeader} width={200}>
                    <Text style={styles.tableTitle}>Email</Text>
                  </DataTable.Title>
                  <DataTable.Title style={styles.columnHeader} width={100}>
                    <Text style={styles.tableTitle}>Mobile No.</Text>
                  </DataTable.Title>
                </DataTable.Header>

                {/* Table Rows */}
                {customers?.map((customer, index) => (
                  <DataTable.Row style={styles.tableRow} key={index}>
                    <DataTable.Cell style={styles.tableCell} width={15}>
                      {customer.id}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell} width={200}>
                      {customer.name}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell} width={100}>
                      {customer.scpnumber}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell} width={200}>
                      {customer.email}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell} width={100}>
                      {customer.mobilenumber}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </ScrollView>
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 4,
  },

  scrollView: {
    rowGap: 10,
  },

  elementGroup: {
    flexDirection: 'row',
    columnGap: 10,
  },

  search: {
    borderRadius: 0,
    backgroundColor: '#ecf9ec',
  },

  button: {
    flex: 1,
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
    backgroundColor: '#ecf9ec',
    borderWidth: 0,
    height: 55,
  },

  tableHeader: {
    backgroundColor: '#ecf9ec',
  },
  columnHeader: {
    justifyContent: 'center',
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    justifyContent: 'center',
  },
});

export default CustomerMasterScreen;
