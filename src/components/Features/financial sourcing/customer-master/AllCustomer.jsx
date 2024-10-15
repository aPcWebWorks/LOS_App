import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AllCustomer = ({customer, query}) => {
  const navigation = useNavigation();

  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfCustomersPerPage, setNumberOfCustomersPerPage] = useState(10);

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
            <DataTable.Title style={[styles.columnHeader, {width: 100}]}>
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
                    <DataTable.Cell style={[styles.tableCell, {width: 100}]}>
                      <View style={{flexDirection: 'row', columnGap: 20}}>
                        <TouchableOpacity>
                          <Icon
                            onPress={() =>
                              navigation.navigate('Customer Details', {
                                id: item?.id,
                              })
                            }
                            name="visibility"
                            size={20}
                            color="#000"
                          />
                        </TouchableOpacity>

                        <TouchableOpacity>
                          <Icon
                            onPress={() =>
                              navigation.navigate('Customer Update', {
                                id: item?.id,
                              })
                            }
                            name="edit"
                            size={20}
                            color="#000"
                          />
                        </TouchableOpacity>
                      </View>
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
  // actionButton: {
  //   backgroundColor: 'green',
  //   borderRadius: 0,
  //   color: 'white',
  // },
});

export default AllCustomer;
