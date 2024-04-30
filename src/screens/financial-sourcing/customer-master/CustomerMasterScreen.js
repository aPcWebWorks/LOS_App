import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView, Text} from 'react-native';
import {Button, Searchbar, DataTable} from 'react-native-paper';
import DropdownComponent from '../../../components/Common/dropdown/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {customerMasterHandler} from '../../../features/customer-master/customerMasterThunk';
import {FlatList} from 'react-native-gesture-handler';

const CustomerMasterScreen = () => {
  const dispatch = useDispatch();
  const {customer} = useSelector(state => state.customerMaster);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCustomersPerPage, setNumberOfCustomersPerPage] = useState(10);

  useEffect(() => {
    dispatch(customerMasterHandler());
  }, [dispatch]);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const renderCustomerItem = (item, index) => (
    <>
    <DataTable.Row key={index}>
      <DataTable.Cell>
        {(currentPage - 1) * numberOfCustomersPerPage + index + 1}
      </DataTable.Cell>
      <DataTable.Cell style={styles.tableCell} width={70}>
        {item?.externalCustomerId}
      </DataTable.Cell>
      <DataTable.Cell style={styles.tableCell} width={100}>
        {item?.customerName}
      </DataTable.Cell>
      <DataTable.Cell style={styles.tableCell} width={100}>
        {item?.mobileNumber}
      </DataTable.Cell>
      <DataTable.Cell style={styles.tableCell} width={120}>
        {item?.email}
      </DataTable.Cell>
      <DataTable.Cell style={styles.tableCell} width={100}>
        {item?.gender}
      </DataTable.Cell>
      <DataTable.Cell style={styles.tableCell} width={100}>
        <Text>Update</Text>
        <Text>Edit</Text>
      </DataTable.Cell>
    </DataTable.Row>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.scrollView}>
          {/* Search and Add New section */}
          <View style={styles.elementGroup}>
            <DropdownComponent
              style={styles.dropdown}
              label="Select Customer"
              options={[]}
            />

            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              textColor="white"
              onPress={() => console.log('Add New clicked')}>
              Add New
            </Button>
          </View>

          {/* Searchbar */}
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={handleSearch}
            value={searchQuery}
            mode="bar"
          />

          {/* DataTable with pagination */}
          <ScrollView horizontal>
            <DataTable>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title style={[styles.columnHeader, {width: 30}]}>
                  <Text style={styles.tableTitle}>No</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.columnHeader, {width: 150}]}>
                  <Text style={styles.tableTitle}>CustomerID</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.columnHeader, {width: 150}]}>
                  <Text style={styles.tableTitle}>Name</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.columnHeader, {width: 150}]}>
                  <Text style={styles.tableTitle}>Mobile Number</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.columnHeader, {width: 150}]}>
                  <Text style={styles.tableTitle}>EmailId</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.columnHeader, {width: 150}]}>
                  <Text style={styles.tableTitle}>Gender</Text>
                </DataTable.Title>
                <DataTable.Title style={[styles.columnHeader, {width: 150}]}>
                  <Text style={styles.tableTitle}>Action</Text>
                </DataTable.Title>
              </DataTable.Header>

              <FlatList
                data={customer?.customers}
                renderItem={({item,index}) => renderCustomerItem(item,index)}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={numberOfCustomersPerPage}
              />
            </DataTable>
          </ScrollView>

          {/* Pagination */}
          <DataTable.Pagination
            page={currentPage - 1}
            numberOfPages={Math.ceil(
              (customer?.customers?.length || 0) / numberOfCustomersPerPage,
            )}
            onPageChange={handlePageChange}
            label={`${(currentPage - 1) * numberOfCustomersPerPage + 1}-
                    ${Math.min(
                      currentPage * numberOfCustomersPerPage,
                      customer?.customers?.length || 0,
                    )}
                    of ${customer?.customers?.length || 0}`}
            numberOfItemsPerPageList={[10, 20, 30]} // Adjust as needed
            numberOfItemsPerPage={numberOfCustomersPerPage}
            onItemsPerPageChange={setNumberOfCustomersPerPage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  scrollView: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  elementGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdown: {
    flex: 3,
    height: 55,
    backgroundColor: '#ecf9ec',
    borderWidth: 0,
    marginRight: 10,
  },
  search: {
    flex: 2, // Adjust flex to control the width of the search bar
    borderRadius: 0,
    backgroundColor: '#ecf9ec',
    marginRight: 8,
    paddingHorizontal:2,
    marginTop:1,
  },
  button: {
    flex: 1,
    fontSize: 16,
    borderRadius: 0,
    backgroundColor: 'green',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  tableHeader: {
    backgroundColor: '#ecf9ec',
    marginTop:10,
  },
  columnHeader: {
    justifyContent: 'center',
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableCell: {
    justifyContent: 'center',
  },
});

export default CustomerMasterScreen;
