import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';

const CustomerTable = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(numberOfItemsPerPageList[0]);

  const [items] = useState([
    {
      key: 1,
      name: 'Tushar Dhotre',
      mobile: 3564553132,
      email: 'admin1@gmail.com',
      gender: 'male',
      action: 'Ud',
    },
    {
      key: 2,
      name: 'Vikrant Pawar',
      mobile: 3564553132,
      email: 'admin1@gmail.com',
      gender: 'male',
      action: 'Ud',
    },
    {
      key: 3,
      name: 'Pranav Joshi',
      mobile: 3564553132,
      email: 'admin1@gmail.com',
      gender: 'male',
      action: 'Ud',
    },
    {
      key: 4,
      name: 'John Doe',
      mobile: 3564553132,
      email: 'admin1@gmail.com',
      gender: 'male',
      action: 'Ud',
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Mobile No.</DataTable.Title>
          <DataTable.Title>E-mail</DataTable.Title>
          <DataTable.Title>Gender</DataTable.Title>
          <DataTable.Title>Action</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map(item => (
          <DataTable.Row key={item.key}>
            <DataTable.Cell>{item.key}</DataTable.Cell>
            <DataTable.Cell>{item.name}</DataTable.Cell>
            <DataTable.Cell>{item.mobile}</DataTable.Cell>
            <DataTable.Cell>{item.email}</DataTable.Cell>
            <DataTable.Cell>{item.gender}</DataTable.Cell>
            <DataTable.Cell>{item.action}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </ScrollView>
    </>
  );
};

export default CustomerTable;
