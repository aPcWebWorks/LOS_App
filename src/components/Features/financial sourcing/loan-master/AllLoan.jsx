import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DataTable} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import {TouchableOpacity} from 'react-native-gesture-handler';

const AllLoan = ({filteredLoans, customers}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const numberOfCustomersPerPageList = [2, 3, 4];

  // const [page, setPage] = React.useState(0);
  // const [numberOfCustomersPerPage, onCustomersPerPageChange] = React.useState(
  //   numberOfCustomersPerPageList[0],
  // );
  // const from = page * numberOfCustomersPerPage;
  // const to = Math.min((page + 1) * numberOfCustomersPerPage, customers?.length);

  // useEffect(() => {
  //   setPage(0);
  // }, [numberOfCustomersPerPage]);

  const handleUpdate = item => {
    if (item.response) {
      navigation.navigate('Loan Update', {updatePayload: item.response});
    } else {
      console.log('please select customer');
    }
  };
  return (
    <>
      <View style={style.table}>
        <ScrollView horizontal>
          <DataTable key="">
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
            <FlatList
              data={filteredLoans}
              renderItem={({item, index}) => (
                <DataTable.Row key={item?.response?.id} style={style.tableRow}>
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
                    <View style={{flexDirection: 'row', columnGap: 20}}>
                      <TouchableOpacity>
                        <Icon
                          onPress={() =>
                            navigation.navigate('Loan Details', {
                              id: item?.response?.id,
                            })
                          }
                          name="visibility"
                          size={20}
                          color="#000"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Icon
                          onPress={() => handleUpdate(item)}
                          name="edit"
                          size={20}
                          color="#000"
                        />
                      </TouchableOpacity>
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              keyExtractor={item => item?.response?.id}
            />
          </DataTable>
        </ScrollView>
        {/* <DataTable>
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
        </DataTable> */}
      </View>
    </>
  );
};

const style = StyleSheet.create({
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
