import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {
  Modal,
  Portal,
  Button,
  PaperProvider,
  Searchbar,
} from 'react-native-paper';
import DropdownComponent from '../../../components/Common/dropdown/Dropdown';

const Data = [
  {label: 'Name', value: 'name'},
  {label: 'Aadhar or PAN Number', value: 'aadharorpannumber'},
  {label: 'Customer ID', value: 'customerid'},
];

const scpLoanStatusObj = [
  {
    id: 1,
    label: 'Education',
    value: 'Value',
  },
  {
    id: 2,
    label: 'Occupation',
    value: 'Value',
  },
];

const LoanGenerationForm = ({setToggleLoanForm}) => {
  const handleStack = () => {
    setToggleLoanForm(false);
  };

  return (
    <>
      <SafeAreaView>
        {scpLoanStatusObj.map((item, index) => {
          return (
            <>
              <View style={[styles.row, styles.rowTopMargin]} key={index}>
                <View style={styles.widthFifty}>
                  <Text style={styles.lebel}>{item.label}</Text>
                  <Text style={styles.textValue}>
                    {/* {userByScpDetails?.scpDetail?.education || 'NA'} */}
                    {item.value}
                  </Text>
                </View>

                <View style={styles.widthFifty}>
                  <Text style={styles.lebel}>{item.label}</Text>
                  <Text style={styles.textValue}>
                    {/* {userByScpDetails?.scpDetail?.occupation || 'NA'} */}
                    {item.value}
                  </Text>
                </View>
              </View>
            </>
          );
        })}

        <Button
          style={style.modalButton}
          mode="contained"
          dark={true}
          textColor="white"
          onPress={handleStack}>
          Submit
        </Button>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  rowTopMargin: {
    marginTop: 20,
  },
  lebel: {
    fontWeight: '400',
    fontSize: 13,
    letterSpacing: 0.8,
    color: 'black',
  },
  textValue: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    // marginLeft: 4,
    marginTop: 4,
  },
  widthFifty: {
    width: '50%',
  },

  modalButton: {
    borderRadius: 4,
    backgroundColor: 'green',
    height: 55,
    justifyContent: 'center',
    marginTop: 20,
  },
});

const LoanMasterScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalSearchQuery, setModalSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [toggleLoanForm, setToggleLoanForm] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleSearchCustomer = () => {
    setToggleLoanForm(true);
    setVisible(false);
  };

  return (
    <PaperProvider>
      <SafeAreaView style={style.container}>
        {!toggleLoanForm ? (
          <>
            <Portal>
              <Modal
                visible={!toggleLoanForm ? visible : hide}
                onDismiss={hideModal}
                // dismissable={false}
                dismissableBackButton={false}
                contentContainerStyle={style.modal}>
                <Text style={style.modalText}>SCP NO. : SCP000300</Text>

                <View style={style.modalSection}>
                  <DropdownComponent
                    style={style.dropdown}
                    label="Select Customer"
                    options={Data}
                  />

                  <Searchbar
                    style={style.modalSearchBar}
                    placeholder="Search"
                    onChangeText={setModalSearchQuery}
                    value={modalSearchQuery}
                    mode="bar"
                  />

                  <Button
                    style={style.modalButton}
                    mode="contained"
                    dark={true}
                    textColor="white"
                    onPress={handleSearchCustomer}>
                    Search Customer
                  </Button>
                </View>
              </Modal>
            </Portal>
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
                textColor="white"
                onPress={showModal}>
                Add New
              </Button>
            </View>
          </>
        ) : (
          <LoanGenerationForm
            navigation={navigation}
            setToggleLoanForm={setToggleLoanForm}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
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

  dropdown: {backgroundColor: '#ecf9ec', borderWidth: 0, height: 55},

  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 60,
    rowGap: 20,
  },

  modalSection: {rowGap: 15},
  modalText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  modalButton: {
    borderRadius: 4,
    backgroundColor: 'green',
    height: 55,
    justifyContent: 'center',
    marginTop: 20,
  },

  modalSearchBar: {borderRadius: 4, backgroundColor: '#ecf9ec'},
});

export default LoanMasterScreen;
