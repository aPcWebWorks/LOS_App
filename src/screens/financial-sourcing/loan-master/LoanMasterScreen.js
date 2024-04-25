import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Button, Searchbar} from 'react-native-paper';

const LoanMasterScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  console.log('searchQuery', searchQuery);
  return (
    <SafeAreaView style={style.container}>
      <View style={style.elementGroup}>
        <Searchbar
          style={style.search}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          mode="bar"
        />

        <Button
          style={style.button}
          mode="contained"
          dark={true}
          textColor="white">
          Add New
        </Button>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },

  elementGroup: {
    // width: '100%',
    flexDirection: 'row',
    // backgroundColor: 'red',
    columnGap: 10,
    // height: 40,
  },
  search: {
    flex: 3,
    borderRadius: 0,
    backgroundColor: '#ecf9ec',
  },
  button: {
    flex: 1,
    // height: 50,
    backgroundColor: 'green',
    borderRadius: 0,
    fontSize: 16,
    justifyContent: 'center',
  },
});
export default LoanMasterScreen;
