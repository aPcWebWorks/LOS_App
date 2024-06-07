import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getCustomerWithId} from '../../../../features/customer-master/customerMasterThunk';

const AllCustomer = ({customer, query}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCustomersPerPage, setNumberOfCustomersPerPage] = useState(10);

  const handleDetails = id => {
    if (id) {
      dispatch(getCustomerWithId(id));
      navigation.navigate('Customer Details', {id});
    }
    return;
  };

  return (
    <>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={[styles.columnHeader, {width: 30}]}>
              <Text style={styles.tableTitle}>No</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader]}>
              <Text style={styles.tableTitle}>CustomerID</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader]}>
              <Text style={styles.tableTitle}>Name</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader]}>
              <Text style={styles.tableTitle}>Mobile Number</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader]}>
              <Text style={styles.tableTitle}>EmailID</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader]}>
              <Text style={styles.tableTitle}>Gender</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader]}>
              <Text style={styles.tableTitle}>Action</Text>
            </DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={customer}
            renderItem={({item, index}) => {
              const {
                customerName,
                externalCustomerId,
                mobileNumber,
                email,
                gender,
              } = item;

              if (
                (customerName?.toLowerCase().includes(query.toLowerCase()) ||
                  externalCustomerId
                    ?.toString()
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  mobileNumber?.toLowerCase().includes(query.toLowerCase()) ||
                  email?.toLowerCase().includes(query.toLowerCase())) &&
                gender
              ) {
                return (
                  <DataTable.Row key={index}>
                    <DataTable.Cell>
                      {(currentPage - 1) * numberOfCustomersPerPage + index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {item?.externalCustomerId}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {item?.customerName}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {item?.mobileNumber}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {item?.email}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      {item?.gender}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell}>
                      <Button
                        onPress={() => handleDetails(item?.id)}
                        style={styles.actionButton}
                        mode="contained"
                        dark={true}
                        textColor="white">
                        View
                      </Button>
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.tableCell} width={100}>
                      <Button
                        onPress={() => DropdownhandleDelete(item)}
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
            }}
            keyExtractor={(item, index) => index.toString()}
            initialNumToRender={numberOfCustomersPerPage}
          />
        </DataTable>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
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
    width: 120,
  },
  tableTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableCell: {
    justifyContent: 'center',
    width: 80,
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

export default AllCustomer;
