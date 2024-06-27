import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import {getCustomerWithId} from '../../../../features/customer-master/customerMasterThunk';

const AllCustomer = ({customer, query}) => {
  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCustomersPerPage, setNumberOfCustomersPerPage] = useState(10);

  // const handleDetails = id => {
  //   if (id) {
  //     // dispatch(getCustomerWithId(id));
  //     navigation.navigate('Customer Details', {id});
  //   }
  //   return;
  // };

  return (
    <>
      <ScrollView horizontal>
        <DataTable style={styles.container} key="">
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={[styles.columnHeader, {width: 30}]}>
              <Text style={styles.tableTitle}>No</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader, {width: 120}]}>
              <Text style={styles.tableTitle}>CustomerID</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader, {width: 200}]}>
              <Text style={styles.tableTitle}>Name</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader, {width: 120}]}>
              <Text style={styles.tableTitle}>Mobile Number</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader, {width: 200}]}>
              <Text style={styles.tableTitle}>EmailID</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader, {width: 60}]}>
              <Text style={styles.tableTitle}>Gender</Text>
            </DataTable.Title>
            <DataTable.Title style={[styles.columnHeader, {width: 200}]}>
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
                    <DataTable.Cell style={[styles.tableCell, {width: 30}]}>
                      {(currentPage - 1) * numberOfCustomersPerPage + index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, {width: 120}]}>
                      {item?.externalCustomerId}
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, {width: 200}]}>
                      {item?.customerName}
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, {width: 120}]}>
                      {item?.mobileNumber}
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, {width: 200}]}>
                      {item?.email}
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, {width: 60}]}>
                      {item?.gender}
                    </DataTable.Cell>
                    <DataTable.Cell style={[styles.tableCell, {width: 200}]}>
                      <Button
                        onPress={() =>
                          navigation.navigate('Customer Details', {
                            id: item?.id,
                          })
                        }
                        style={styles.actionButton}
                        mode="contained"
                        dark={true}
                        textColor="white">
                        View
                      </Button>
                      <Button
                        onPress={() =>
                          navigation.navigate('Customer Update', {
                            id: item?.id,
                          })
                        }
                        style={styles.actionButton}
                        mode="contained"
                        dark={true}
                        textColor="white">
                        Update
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
  container: {
    flex: 1,
    marginTop: 20,
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
    width: 'auto',
  },
  tableCell: {
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: 'green',
    borderRadius: 0,
    color: 'white',
  },
});

export default AllCustomer;
