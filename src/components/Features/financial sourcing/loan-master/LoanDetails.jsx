import React from 'react';
import {StyleSheet, View, Text, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';

const LoanDetails = ({singalLoanDetails}) => {
  const {documents} = useSelector(state => state.document);

  const data = Object.entries(singalLoanDetails).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  return (
    <>
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={({item}) => (
          <>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>
                {item.label.split(/(?=[A-Z])/).join(' ')} :
              </Text>
              <Text style={styles.textValue}>{item.value}</Text>
            </View>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <FlatList
        data={documents}
        scrollEnabled={false}
        renderItem={({item, index}) => (
          <>
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Document {index + 1} :</Text>
              <Image
                source={{uri: item}}
                style={{width: 200, height: 100, objectFit: 'contain'}}
              />
            </View>
          </>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    color: 'black',
  },
  textValue: {
    fontSize: 16,
    flex: 2,
    marginLeft: 10,
    color: 'black',
  },
});

export default LoanDetails;
