import React, {useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, DataTable} from 'react-native-paper';

const AllLoan = ({filteredLoans, customers}) => {
  const numberOfCustomersPerPageList = [2, 3, 4];

  const [page, setPage] = React.useState(0);
  const [numberOfCustomersPerPage, onCustomersPerPageChange] = React.useState(
    numberOfCustomersPerPageList[0],
  );
  const from = page * numberOfCustomersPerPage;
  const to = Math.min((page + 1) * numberOfCustomersPerPage, customers?.length);

  useEffect(() => {
    setPage(0);
  }, [numberOfCustomersPerPage]);

  return (
    <>
      <View style={style.table}>
        <ScrollView horizontal>
          <DataTable key="">
            {/* Table Header */}
            <DataTable.Header style={style.tableHeader}>
              <DataTable.Title style={style.columnHeader} width={25}>
                <Text style={style.tableTitle}>ID</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={150}>
                <Text style={style.tableTitle}>Vi. Ref. No.</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={100}>
                <Text style={style.tableTitle}>Loan Type ID.</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={200}>
                <Text style={style.tableTitle}>Loan Amount</Text>
              </DataTable.Title>
              <DataTable.Title style={style.columnHeader} width={100}>
                <Text style={style.tableTitle}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>

            {/* Table Rows */}
            <FlatList
              data={filteredLoans}
              renderItem={({item, index}) => (
                <DataTable.Row style={style.tableRow}>
                  <DataTable.Cell style={style.tableCell} width={25}>
                    <Text style={style.tableData}>{index + 1}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={150}>
                    <Text style={style.tableData}>
                      {item?.response?.virefno}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={100}>
                    <Text style={style.tableData}>
                      {item?.response?.loanTypeId}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={200}>
                    <Text style={style.tableData}>
                      {item?.response?.loanAmount}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={style.tableCell} width={100}>
                    <Button
                      style={style.button}
                      mode="contained"
                      dark={true}
                      textColor="white">
                      Update
                    </Button>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              keyExtractor={item => item.id}
            />
          </DataTable>
        </ScrollView>
        <DataTable>
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(
              customers?.length / numberOfCustomersPerPage,
            )}
            onPageChange={page => setPage(page)}
            label={`${from + 5}-${to} of ${customers?.length}`}
            showFastPaginationControls
            numberOfItemsPerPageList={numberOfCustomersPerPageList}
            numberOfItemsPerPage={numberOfCustomersPerPage}
            onItemsPerPageChange={onCustomersPerPageChange}
            selectPageDropdownLabel={'Rows per page'}
          />
        </DataTable>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'green',
    borderRadius: 0,
    fontSize: 16,
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
    color: 'black',
  },
  tableData: {
    color: 'black',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    justifyContent: 'center',
  },
});

export default AllLoan;
