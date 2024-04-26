import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

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
    label: 'Label',
    value: 'Value',
  },
  {
    id: 2,
    label: 'Label',
    value: 'Value',
  },
  {
    id: 1,
    label: 'Label',
    value: 'Value',
  },
  {
    id: 2,
    label: 'Label',
    value: 'Value',
  },
];

const scpLoanStatusDropdoenObj = [
  {
    id: 1,
    label: 'Select Customer',
    options: scpLoanStatusObj,
  },
  {
    id: 1,
    label: 'Select User',
    options: scpLoanStatusObj,
  },
  {
    id: 1,
    label: 'Select SCP',
    options: scpLoanStatusObj,
  },
  {
    id: 1,
    label: 'Select SCP',
    options: scpLoanStatusObj,
  },
];
const LoanGenerationForm = ({setToggleLoanForm}) => {
  const handleStack = () => {
    setToggleLoanForm(false);
  };

  const handleCancel = () => {
    setToggleLoanForm(false);
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.row}>
            {scpLoanStatusObj.map((item, index) => {
              return (
                <>
                  <View style={styles.inputText} key={index}>
                    <Text style={styles.lebel}>{item.label}</Text>
                    <Text style={styles.textValue}>
                      {/* {userByScpDetails?.scpDetail?.education || 'NA'} */}
                      {item.value}
                    </Text>
                  </View>
                </>
              );
            })}
          </View>

          <View style={styles.dropdownGroup}>
            {scpLoanStatusDropdoenObj?.map((item, index) => {
              return (
                <DropdownComponent
                  style={style.dropdown}
                  label={item.label}
                  options={Data}
                />
              );
            })}
          </View>

          <View style={styles.buttonGroup}>
            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              textColor="white"
              onPress={handleStack}>
              <Text style={styles.buttonLebel}>Submit</Text>
            </Button>

            <Button
              style={styles.button}
              mode="contained"
              dark={true}
              textColor="white"
              onPress={handleCancel}>
              <Text style={styles.buttonLebel}>Cancel</Text>
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 7,
    rowGap: 20,
    flexWrap: 'wrap',
    padding: 15,
  },

  inputText: {width: '49%'},

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

  dropdownGroup: {
    marginTop: 20,
    rowGap: 10,
  },

  buttonGroup: {
    marginTop: 30,
    rowGap: 15,
  },

  button: {
    borderRadius: 4,
    backgroundColor: 'green',
    height: 50,
    justifyContent: 'center',
    // marginTop: 10,
  },

  buttonLebel: {
    fontSize: 18,
    fontWeight: '600',
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
