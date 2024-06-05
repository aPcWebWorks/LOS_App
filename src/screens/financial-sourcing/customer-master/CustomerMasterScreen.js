import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Button, Searchbar, DataTable} from 'react-native-paper';
import DropdownComponent from '../../../components/Common/dropdown/Dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {
  customerMasterHandler,
  getCustomerWithId,
} from '../../../features/customer-master/customerMasterThunk';
import {FlatList} from 'react-native-gesture-handler';

const data = [
  {label: 'Name', value: 'customername'},
  {label: 'CustomerId', value: 'customerid'},
  {label: 'Mobile Number', value: 'mobile number'},
  {label: 'Email', value: 'emailid'},
];

const CustomerMasterScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {customer, isLoading} = useSelector(state => state.customerMaster);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCustomersPerPage, setNumberOfCustomersPerPage] = useState(10);

  const [selectedFilter, setSelectedFilter] = useState(
    'customerName',
    'mobilenumber',
    'email',
    'customerid',
  );

  useEffect(() => {
    dispatch(customerMasterHandler());
  }, [dispatch]);

  useEffect(() => {
    console.log('Customer data:', customer);
  }, [customer]);

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    setSearchQuery(''); // Clear search query when filter changes
  };
  const handleSearch = query => {
    let filteredQuery = query; // Initialize with the original query

    switch (selectedFilter) {
      case 'customerName':
        // Allow only letters and spaces in the search query
        filteredQuery = query.replace(/[^a-zA-Z\s]/g, '');
        break;
      case 'customerid':
        // Allow only numeric values in the search query
        filteredQuery = query.replace(/\D/g, ''); // Remove non-numeric characters
        break;
      case 'mobilenumber':
        // Allow only numeric values in the search query
        filteredQuery = query.replace(/\D/g, ''); // Remove non-numeric characters
        break;
      case 'email':
        // Allow alphabetical characters and symbols in the search query
        filteredQuery = query.replace(/[^a-zA-Z@._]/g, ''); // Only allow letters, '@', '.', '_'
        break;
      default:
        // Default case: Allow all characters if no specific filter is selected
        filteredQuery = query;
        break;
    }

    setSearchQuery(filteredQuery); // Update the search query state
  };

  const handleEdit = id => {
    console.log('View customer:', id);
    if (id) {
      dispatch(getCustomerWithId(id));
      navigation.navigate('Customer Details', {id});
    }
  };

  const handleDelete = customer => {
    console.log('Delete customer:', customer);
  };

  const renderCustomerItem = (item, index) => {
    const {customerName, externalCustomerId, mobileNumber, email, gender} =
      item;

    if (
      (customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        externalCustomerId
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        mobileNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      gender
    ) {
      return (
        <DataTable.Row key={index}>
          <DataTable.Cell>
            {(currentPage - 1) * numberOfCustomersPerPage + index + 1}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} >
            {item?.externalCustomerId}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell}>
            {item?.customerName}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell}>
            {item?.mobileNumber}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} >
            {item?.email}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} >
            {item?.gender}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} >
            <Button
              onPress={() => handleEdit(item?.id)}
              style={styles.actionButton}
              mode="contained"
              dark={true}
              textColor="white">
              View
            </Button>
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} width={100}>
            <Button
              onPress={() => handleDelete(item)}
              style={styles.actionButton}
              mode="contained"
              dark={true}
              textColor="white">
              Edit
            </Button>
          </DataTable.Cell>
        </DataTable.Row>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.scrollView}>
          <View style={styles.elementGroup}>
            <DropdownComponent
              style={styles.dropdown}
              label="Select Customer"
              options={data}
              onChangeText={handleFilterChange}
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

          
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={item => handleSearch(item)}
            value={searchQuery}
            mode="bar"
          />
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="green"
              style={styles.loadingIndicator}
            />
          ) : (
            <>
              <ScrollView horizontal>
                <DataTable>
                  <DataTable.Header style={styles.tableHeader}>
                    <DataTable.Title style={[styles.columnHeader, {width: 30}]}>
                      <Text style={styles.tableTitle}>No</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader]}>
                      <Text style={styles.tableTitle}>CustomerID</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader]}>
                      <Text style={styles.tableTitle}>Name</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader]}>
                      <Text style={styles.tableTitle}>Mobile Number</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader]}>
                      <Text style={styles.tableTitle}>EmailID</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader]}>
                      <Text style={styles.tableTitle}>Gender</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader]}>
                      <Text style={styles.tableTitle}>Action</Text>
                    </DataTable.Title>
                  </DataTable.Header>

                  <FlatList
                    data={customer?.customers}
                    renderItem={({item, index}) =>
                      renderCustomerItem(item, index)
                    }
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={numberOfCustomersPerPage}
                  />
                </DataTable>
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    flex: 2,
    borderRadius: 0,
    backgroundColor: '#ecf9ec',
    marginRight: 8,
    paddingHorizontal: 2,
    marginTop: 1,
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
    marginTop: 10,
    
  },
  columnHeader: {
    justifyContent: 'center',
    width:120,
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  
  },
  tableCell: {
    justifyContent: 'center',
    width:80,
    
  },
  loadingIndicator: {
    marginTop: 20,
    alignSelf: 'center',
  },
  actionButtonsContainer: {
    display: 'flex',
    flexdirection: 'row',
    justifycontent: 'flex-start',
    alignitems: 'center',
    flex: 1,
  },
  actionButton: {
    backgroundColor: 'green',
    borderRadius: 0,
    fontSize: 16,
    justifyContent: 'center',
    padding: '2px',
    columnGap: 10,
    marginRight: 10,
    color: 'white',
  },
});

export default CustomerMasterScreen;
