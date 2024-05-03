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
import {customerMasterHandler} from '../../../features/customer-master/customerMasterThunk';
import {FlatList} from 'react-native-gesture-handler';
// import { filterHandler } from '../../../features/customer-master/customerMasterSlice';
// import { useRoute } from '@react-navigation/native';

const data = [
  {label: 'Name', value: 'customername'},
  {label: 'CustomerId', value: 'customerid'},
  {label: 'Mobile Number', value: 'mobile number'},
  {label: 'Email', value: 'emailid'},
];

const CustomerMasterScreen = () => {
  const dispatch = useDispatch();
  const {customer, isLoading} = useSelector(state => state.customerMaster);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCustomersPerPage, setNumberOfCustomersPerPage] = useState(10);
  //  const route= useRoute();
  const [selectedFilter, setSelectedFilter] = useState(
    'customerName',
    'mobilenumber',
    'email',
    'customerid',
  );

  useEffect(() => {
    dispatch(customerMasterHandler());
  }, [dispatch]);

  const handleFilterChange = filter => {
    setSelectedFilter(filter);
    setSearchQuery(''); // Clear search query when filter changes
  };
  const handleSearch = query => {
    setSearchQuery(query);
  };

  // useEffect(()=>{
  //   const {pageNumber=0, pageSize=10}=route.params || {};
  //   setCurrentPage(pageNumber+ 1);

  //   setNumberOfCustomersPerPage(pageSize);
  // },[route.params]);

  // const handleSearch = async query => {
  //    await setSearchQuery(query);
  //    dispatch(filterHandler({key: searchQuery}))
  //   console.log('Filter handler');
  // };

  // const handlePageChange = pageNumber => {
  //   setCurrentPage(pageNumber);
  // };
  // const handleItemsPerPageChange = itemsPerPage => {
  //   setNumberOfCustomersPerPage(itemsPerPage);
  //   setCurrentPage(1); // Reset to first page when changing items per page
  //   dispatch(customerMasterHandler({ pageNumber: 0, pageSize: itemsPerPage }));
  // };

  const handleEdit = customer => {
    console.log('Edit customer:', customer);
  };

  const handleDelete = customer => {
    console.log('Delete customer:', customer);
  };

  // const handleItemsPerPageChange = itemsPerPage => {
  //   setNumberOfCustomersPerPage(itemsPerPage);
  //   setCurrentPage(1); // Reset to first page when changing items per page
  // };
  // const numberOfCustomersPerPageList = [2, 3, 4];

  // const [page, setPage] = React.useState(0);
  // const [numberOfCustomersPerPage, onCustomersPerPageChange] = React.useState(
  //   numberOfCustomersPerPageList[5],
  // );
  // const from = page * numberOfCustomersPerPage;
  // const to = Math.min((page + 1) * numberOfCustomersPerPage, customers.length);

  // React.useEffect(() => {
  //   setPage(0);
  // }, [numberOfCustomersPerPage]);

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
          <DataTable.Cell style={styles.tableCell} width={70}>
            {item?.externalCustomerId}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} width={100}>
            {item?.customerName}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} width={50}>
            {item?.mobileNumber}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} width={120}>
            {item?.email}
          </DataTable.Cell>
          <DataTable.Cell style={styles.tableCell} width={100}>
            {item?.gender}
          </DataTable.Cell>
          <Button
            onPress={() => handleEdit(item)}
            style={styles.actionButton}
            mode="contained"
            dark={true}
            textColor="white">
            Edit
          </Button>
          <Button
            onPress={() => handleDelete(item)}
            style={styles.actionButton}
            mode="contained"
            dark={true}
            textColor="white">
            Delete
          </Button>
        </DataTable.Row>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.scrollView}>
          {/* Search and Add New section */}
          <View style={styles.elementGroup}>
            <DropdownComponent
              style={styles.dropdown}
              label="Select Customer"
              options={data}
              onChange={handleFilterChange}
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
                      style={[styles.columnHeader, {width: 150}]}>
                      <Text style={styles.tableTitle}>CustomerID</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader, {width: 150}]}>
                      <Text style={styles.tableTitle}>Name</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader, {width: 150}]}>
                      <Text style={styles.tableTitle}>Mobile Number</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader, {width: 150}]}>
                      <Text style={styles.tableTitle}>EmailID</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader, {width: 150}]}>
                      <Text style={styles.tableTitle}>Gender</Text>
                    </DataTable.Title>
                    <DataTable.Title
                      style={[styles.columnHeader, {width: 150}]}>
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

              {/* Pagination*/}
              {/* <DataTable.Pagination
              page={currentPage - 1}
              numberOfPages={Math.ceil(customer?.customers?.length / numberOfCustomersPerPage)}
              onPageChange={handlePageChange}
              // label={`${(currentPage - 1) * numberOfCustomersPerPage + 1}-
              //   ${Math.min(currentPage * numberOfCustomersPerPage, customer?.customers?.length)}
              //   of ${customer?.customers?.length}`}
              // showFastPaginationControls
              numberOfItemsPerPageList={[10,15,20]} // Adjust as needed
              numberOfItemsPerPage={numberOfCustomersPerPage}
              onItemsPerPageChange={setNumberOfCustomersPerPage}
              selectPageDropdownLabel={'Rows per page'}
            />  */}
              {/* <DataTable.Pagination
                page={currentPage - 1}
                numberOfPages={Math.ceil(customer?.customers?.length / numberOfCustomersPerPage)}
                onPageChange={handlePageChange}
                label={`${(currentPage - 1) * numberOfCustomersPerPage + 1}-${
                  Math.min(currentPage * numberOfCustomersPerPage, customer?.customers?.length)
                } of ${customer?.customers?.length}`}
                showFastPaginationControls
                numberOfItemsPerPageList={[10, 15]} // Display 10 and 15 rows per page options
                numberOfItemsPerPage={numberOfCustomersPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                selectPageDropdownLabel={'Rows per page'}
              /> */}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: 'white',
  //     padding: 0,
  //     paddingTop: 0,
  //     paddingBottom: 0,
  //     paddingHorizontal: 0,
  //   },
  //   scrollView: {
  //     marginHorizontal: 10,
  //     marginTop: 10,
  //   },
  //   elementGroup: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     marginBottom: 10,
  //   },
  //   dropdown: {
  //     flex: 3,
  //     height: 55,
  //     backgroundColor: '#ecf9ec',
  //     borderWidth: 0,
  //     marginRight: 10,
  //   },
  //   search: {
  //     flex: 2, // Adjust flex to control the width of the search bar
  //     borderRadius: 0,
  //     backgroundColor: '#ecf9ec',
  //     marginRight: 8,
  //     paddingHorizontal:2,
  //     marginTop:1,
  //   },
  //   button: {
  //     flex: 1,
  //     fontSize: 16,
  //     borderRadius: 0,
  //     backgroundColor: 'green',
  //     justifyContent: 'center',
  //     paddingVertical: 12,
  //     paddingHorizontal: 5,
  //   },
  //   tableHeader: {
  //     backgroundColor: '#ecf9ec',
  //     marginTop:10,
  //   },
  //   columnHeader: {
  //     justifyContent: 'center',
  //   },
  //   tableTitle: {
  //     fontWeight: 'bold',
  //     fontSize: 16,
  //   },
  //   tableCell: {
  //     justifyContent: 'center',
  //   },
  //   loadingIndicator:{
  //     marginTop:20,
  //     alignSelf:'center',
  //   },
  //   actionButton: {
  //     flex:1,
  //     backgroundColor: 'green',
  //     color: 'white',
  //     paddingHorizontal: 8,
  //     paddingVertical: 5,
  //     borderRadius: 3,
  //     marginRight: 5,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  // });
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
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableCell: {
    justifyContent: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
    alignSelf: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: 'green',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 3,
    marginRight: 5,
  },
});

export default CustomerMasterScreen;
