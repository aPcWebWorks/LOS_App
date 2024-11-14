import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const SearchedCustomers = ({customers, location}) => {
  const navigation = useNavigation();

  if (customers?.customers?.length === 0) {
    return (
      <Text style={{textAlign: 'center', marginTop: 20}}>
        Customer not found!
      </Text>
    );
  }

  return (
    <>
      <ScrollView horizontal>
        <DataTable key="">
          <DataTable.Header style={style.tableHeader}>
            <DataTable.Title style={style.columnHeader} width={30}>
              <Text style={style.tableTitle}>Id.</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={150}>
              <Text style={style.tableTitle}>Customer ID.</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={150}>
              <Text style={style.tableTitle}>Name</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={70}>
              <Text style={style.tableTitle}>Gender</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={200}>
              <Text style={style.tableTitle}>Address</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={70}>
              <Text style={style.tableTitle}>Pincode</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={200}>
              <Text style={style.tableTitle}>E-Mail ID</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={120}>
              <Text style={style.tableTitle}>Mobile</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={120}>
              <Text style={style.tableTitle}>PAN Card</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={170}>
              <Text style={style.tableTitle}>Aaadhar No.</Text>
            </DataTable.Title>
            <DataTable.Title style={style.columnHeader} width={100}>
              <Text style={style.tableTitle}>Action</Text>
            </DataTable.Title>
          </DataTable.Header>

          <FlatList
            data={customers?.customers}
            renderItem={({item, index}) => (
              <DataTable.Row style={style.tableRow}>
                <DataTable.Cell style={style.tableCell} width={30}>
                  {index + 1}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={150}>
                  {item?.id}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={150}>
                  {`${item?.title}. ${item?.customerName}`}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={70}>
                  {item?.gender}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={200}>
                  {item?.residentialAddress}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={70}>
                  {item?.pinCode}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={200}>
                  {item?.email}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={120}>
                  {item?.mobileNumber}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={120}>
                  {item?.panCardNumber}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={170}>
                  {item?.aadhaarNumber}
                </DataTable.Cell>
                <DataTable.Cell style={style.tableCell} width={100}>
                  <Button
                    style={style.button}
                    mode="contained"
                    dark={true}
                    textColor="white"
                    onPress={() => {
                      location === 'loan-update'
                        ? navigation.navigate('Loan Update', {id: item.id})
                        : navigation.navigate('Loan Generation', {id: item.id});
                    }}>
                    Select
                  </Button>
                </DataTable.Cell>
              </DataTable.Row>
            )}
            keyExtractor={item => item.id}
          />
        </DataTable>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  button: {
    borderRadius: 4,
    backgroundColor: 'green',
    height: 40,
    justifyContent: 'center',
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
export default SearchedCustomers;
