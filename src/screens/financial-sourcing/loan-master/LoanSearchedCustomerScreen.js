import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {Button, DataTable} from 'react-native-paper';
import {useSelector} from 'react-redux';

const SearchedCustomer = ({navigation}) => {
  const {customers} = useSelector(state => state.searchedCustomer);
// console.log('searchedCustomer', customers.customers)
  const selectHandler = id => {
    // console.log('Selected Customer Id', id);
    navigation.navigate('Loan Generation', {id});
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView horizontal>
          <DataTable>
            {/* Table Header */}
            <DataTable.Header style={style.tableHeader}>
              <DataTable.Title style={style.columnHeader} width={15}>
                <Text style={style.tableTitle}>Sr. No.</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={150}>
                <Text style={style.tableTitle}>Customer ID.</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>Name</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>Gender</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>Address</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>Pincode</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>E-Mail ID</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>Mobile</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>PAN Card</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>Aaadhar No.</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={100}>
                <Text style={style.tableTitle}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>

            {/* Table Rows */}
            <FlatList
              data={customers?.customers}
              renderItem={({item, index}) => (
                <DataTable.Row style={style.tableRow}>
                  <DataTable.Cell style={style.tableCell} width={15}>
                    {index + 1}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={150}>
                    {item?.id}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    {`${item?.title}. ${item?.customerName}`}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    {item?.gender}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    {item?.residentialAddress}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    {item?.pinCode}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    {item?.email}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    {item?.mobileNumber}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    {item?.panCardNumber}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    {item?.aadhaarNumber}
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={100}>
                    <Button
                      style={style.button}
                      mode="contained"
                      dark={true}
                      textColor="white"
                      onPress={() => selectHandler(item?.id)}>
                      Select
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              keyExtractor={item => item.id}
            />
          </DataTable>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({});
export default SearchedCustomer;
